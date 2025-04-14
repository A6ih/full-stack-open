const Header = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} title={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ exercises }) => {
  return (
    <>
      <p>total of {exercises}</p>
    </>
  );
};

const Part = ({ title, exercises }) => {
  return (
    <>
      <p>
        {title} - {exercises}
      </p>
    </>
  );
};

const Course = ({ course }) => {
  const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total exercises={total} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
