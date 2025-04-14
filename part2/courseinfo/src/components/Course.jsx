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

export default Course;