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
      <Part
        title={props.parts[0].title}
        exercises={props.parts[0].noOfExercises}
      />
      <Part
        title={props.parts[1].title}
        exercises={props.parts[1].noOfExercises}
      />
      <Part
        title={props.parts[2].title}
        exercises={props.parts[2].noOfExercises}
      />
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>Number of Exercises - {props.exercises}</p>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.title} - {props.exercises}
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

  const total = courseInfo.parts.reduce(
    (acc, curr) => acc + curr.noOfExercises,
    0
  );

  return (
    <>
      <Header title={courseInfo.title} />
      <Content parts={courseInfo.parts} />
      <Total exercises={total} />
    </>
  );
};

export default App;
