import { useState } from "react";

const Header = ({ header }) => (
  <>
    <h1>{header}</h1>
  </>
);

const Button = ({ text, onClick }) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
);

const Votes = ({label, score}) => <><p>{label} - {score}</p></>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const headers = ["give feedback", "statistics"];
  const btnTexts = {
    good : "good",
    neutral: "neutral",
    bad: "bad"
  }

  return (
    <div>
      <Header header={headers[0]} />
      <Button onClick={() => setGood(good + 1)} text={btnTexts.good} />
      <Button onClick={() => setNeutral(neutral + 1)} text={btnTexts.neutral} />
      <Button onClick={() => setBad(bad + 1)} text={btnTexts.bad} />
      <Header header={headers[1]} />
      <Votes label={btnTexts.good} score={good} />
      <Votes label={btnTexts.neutral} score={neutral} />
      <Votes label={btnTexts.bad} score={bad} />
    </div>
  );
};

export default App;
