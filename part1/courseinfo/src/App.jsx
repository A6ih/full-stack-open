const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
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
    </>
  );
};

export default App;
