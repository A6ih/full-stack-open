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

const Votes = ({ label, score }) => (
  <>
    <p>
      {label} = {score}
    </p>
  </>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const addGood = () => {
    const total = good + 1;
    const allTotal = total + neutral + bad;
    setGood(total);
    setAll(allTotal);
    setAverage(((total - bad) / allTotal).toFixed(2));
    setPositive(((100 * total) / allTotal).toFixed(2))
  };
  const addNeutral = () => {
    const total = neutral + 1;
    const allTotal = total + good + bad;
    setNeutral(total);
    setAll(allTotal);
    setAverage(((good - bad) / allTotal).toFixed(2));
    setPositive(((100 * good) / allTotal).toFixed(2));
  };
  const addBad = () => {
    const total = bad + 1;
    const allTotal = total + neutral + good;
    setBad(total);
    setAll(allTotal);
    setAverage(((good - total) / allTotal).toFixed(2));
    setPositive(((100 * good) / allTotal).toFixed(2));
  };

  const headers = ["give feedback", "statistics"];
  const btnTexts = {
    good: "good",
    neutral: "neutral",
    bad: "bad",
  };

  return (
    <div>
      <Header header={headers[0]} />
      <Button onClick={addGood} text={btnTexts.good} />
      <Button onClick={addNeutral} text={btnTexts.neutral} />
      <Button onClick={addBad} text={btnTexts.bad} />
      <Header header={headers[1]} />
      <Votes label={btnTexts.good} score={good} />
      <Votes label={btnTexts.neutral} score={neutral} />
      <Votes label={btnTexts.bad} score={bad} />
      <Votes label="all" score={all} />
      <Votes label="average" score={average} />
      <Votes label="Positive" score={positive + " %"} />
    </div>
  );
};

export default App;
