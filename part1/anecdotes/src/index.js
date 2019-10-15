import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ShowAnecdote = ({anecdote, text}) => {
  return (
    <>
      <h2>{text}</h2>
      <p>{anecdote}</p>
    </>
  );
}

const Button = ({text, onclick}) => {
  return (
    <>
      <button onClick={onclick}>
        {text}
      </button>
    </>
  );
}

const DisplayVotes = ({votes}) => {
  if (!votes)
    return (
      <>
        has no votes <br />
      </>
    );
  else
    return (
      <>
        has {votes} votes <br />
      </>
    );
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([]);
  const nextAnecdote = () => {
    let rand = Math.floor(Math.random() * 6);
    setSelected(rand);
  }
  const increaseVotes = () => {
    let newVotes = [...votes];
    if (!newVotes[selected]) {
      newVotes[selected] = 0;
    }
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  let maxIndex = 0;
  for (let i = 1; i < votes.length; i++) {
    if (votes[maxIndex] < votes[i])
      maxIndex = i;
  }

  return (
    <div>
      <ShowAnecdote anecdote={props.anecdotes[selected]} text={'Anecdote of the day'} />
      <DisplayVotes votes={votes[selected]}/>
      <Button text='vote' onclick={() => increaseVotes()}/>
      <Button text='next anecdote' onclick={() => nextAnecdote()} />
      <ShowAnecdote anecdote={props.anecdotes[maxIndex]} text={'Anecdote with most votes'} />
      <DisplayVotes votes={votes[maxIndex]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);