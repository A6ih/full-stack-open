const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.parts[0].title} - {props.parts[0].noOfExercises} Exercises
      </p>
      <p>
        {props.parts[1].title} - {props.parts[1].noOfExercises} Exercises
      </p>
      <p>
        {props.parts[2].title} - {props.parts[2].noOfExercises} Exercises
      </p>
    </>
  );
};

const App = () => {
  const courseInfo = {
    title: "Half Stack application development",
    parts: [
      {
        title: "Fundamentals of React",
        noOfExercises: 10,
      },
      {
        title: "Using props to pass data",
        noOfExercises: 7,
      },
      {
        title: "State of a component",
        noOfExercises: 14,
      },
    ],
  };

  return (
    <>
      <Header title={courseInfo.title} />
      <Content parts={courseInfo.parts} />
    </>
  );
};

export default App;
