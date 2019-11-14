import anecdotesService from "../services/anecdotes";
/*
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};
*/
const sorter = (a, b) => {
  if (a.votes < b.votes) return 1;
  if (a.votes > b.votes) return -1;
  return 0;
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE": {
      const mapped = state.map(anecdote => {
        if (anecdote.id === action.data.id) {
          return action.data;
        }
        return anecdote;
      });
      const sorted = mapped.sort(sorter);

      return sorted;
    }

    case "CREATE": {
      const items = [...state, action.data];
      const sorted = items.sort(sorter);
      return sorted;
    }

    case "INIT_ANECDOTES": {
      return action.data;
    }

    default:
      return state;
  }
};

export default reducer;

export const addVote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    });
    console.log(newAnecdote);
    dispatch({ type: "UPDATE", data: newAnecdote });
  };
};
export const create = text => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(text);
    dispatch({ type: "CREATE", data: newAnecdote });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({ type: "INIT_ANECDOTES", data: anecdotes });
  };
};
