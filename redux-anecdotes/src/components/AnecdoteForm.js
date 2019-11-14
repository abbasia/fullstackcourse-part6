import React from "react";
import { connect } from "react-redux";
import { create } from "../reducers/anecdoteReducer";

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();
    const text = event.target.anecdote.value;
    event.target.anecdote.value = "";

    props.create(text);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default connect(null, { create })(AnecdoteForm);
