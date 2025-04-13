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

const StatisticLine = ({ label, score }) => (
  <>
    <tr>
      <td>{label}</td>
      <td>{score}</td>
    </tr>
  </>
);

const Statistics = ({ scores }) => {
  const { good, neutral, bad, average, all, positive } = scores;
  if (!all) return <p>No feedback given</p>;
  return (
    <table>
      <tbody>
        <StatisticLine label="good" score={good} />
        <StatisticLine label="neutral" score={neutral} />
        <StatisticLine label="bad" score={bad} />
        <StatisticLine label="all" score={all} />
        <StatisticLine label="average" score={average} />
        <StatisticLine label="Positive" score={positive + " %"} />
      </tbody>
    </table>
  );
};

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
    setPositive(((100 * total) / allTotal).toFixed(2));
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

  return (
    <div>
      <Header header={headers[0]} />
      <Button onClick={addGood} text="good " />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      <Header header={headers[1]} />
      <Statistics scores={{ good, neutral, bad, all, average, positive }} />
    </div>
  );
};

export default App;
