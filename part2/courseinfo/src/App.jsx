const Header = ({ title }) => {
  return (
    <>
      <h3>{title}</h3>
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
      <h4>total of {exercises} exercises</h4>
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
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
