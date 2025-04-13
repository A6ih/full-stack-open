import { useState } from "react";

const Display = ({ header, anecdote, votesText}) => (
  <>
    <h1>{header}</h1>
    <p>{anecdote}</p>
    <p>{votesText}</p>
  </>
);

const Button = ({ text, onClick }) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    findIndex(copy);
  };

  const findIndex = (array) => {
    const copy = [...array]
    const largestNumber = copy.sort((a, b) => b - a)[0];
    const index = array.indexOf(largestNumber);
    setMostVotes(index);
  }

  return (
    <div>
      <Display header="Anecdote of the day" anecdote={anecdotes[selected]} votesText={`has ${votes[selected]} votes`} />
      <Button onClick={randomAnecdote} text="next anecdote" />
      <Button onClick={voteAnecdote} text="vote" />
      <Display header="Anecdote with most votes" anecdote={anecdotes[mostVotes]} votesText={`has ${votes[mostVotes]} votes`}/>
    </div>
  );
};

export default App;
