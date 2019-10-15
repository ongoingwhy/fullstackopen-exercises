import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({onclick, text}) => {
  return (  
    <button onClick={onclick}>
      {text}
    </button>
  );
}

const Feedback = (props) => {
  return (
    <div>
      <h2>give feedback</h2>
      <Button onclick={props.increaseGood} text='good' />
      <Button onclick={props.increaseNeutral} text='neutral' />
      <Button onclick={props.increaseBad} text='bad' />
    </div>
  );
}

const Statistics = (props) => {
  return (
    <div>
      <h2>statistics</h2>
      <p>good {props.good}<br/>neutral {props.neutral}<br/>bad {props.bad}</p>
    </div>
  );
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => () =>  setGood(good + 1);
  const increaseNeutral = () => () => setNeutral(neutral + 1);
  const increaseBad = () => () => setBad(bad + 1);

  return (
    <div>
      <Feedback increaseGood={increaseGood()} increaseNeutral={increaseNeutral()} 
      increaseBad={increaseBad()} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)