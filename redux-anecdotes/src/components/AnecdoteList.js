import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const vote = anecdote => {
    props.addVote(anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 2);
  };
  return (
    <>
      {props.visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === "") {
    return anecdotes;
  }
  return anecdotes.filter(anecdote => anecdote.content.includes(filter));
};
const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  };
};

export default connect(mapStateToProps, { addVote, setNotification })(
  AnecdoteList
);
