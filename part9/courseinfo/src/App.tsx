import React from 'react';

interface Parts {
  name: string; 
  exerciseCount: number;
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return(
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  )
}

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
)

const Content: React.FC<{ courseParts: Parts[] }> = ({ courseParts }) => (
<div>
  <p>
    {courseParts[0].name} {courseParts[0].exerciseCount}
  </p>
  <p>
    {courseParts[1].name} {courseParts[1].exerciseCount}
  </p>
  <p>
    {courseParts[2].name} {courseParts[2].exerciseCount}
  </p>
</div>
)

const Total: React.FC<{ total: number }> = ({ total }) => (
  <p>
  Number of exercises {total}
  </p>
)

export default App;
