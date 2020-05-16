import React from 'react';

type AllParts = {
  name?: string;
  exerciseCount?: number;
  description?: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string;
}

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "How to do Course parts";
  groupProjectCount: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
)

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: AllParts }> = ({ part }) => (
  <p>
    {part.name} {part.exerciseCount} <br/> 
    {part.description? <>Description: {part.description}<br /></> : null }
    {part.groupProjectCount? <>Project Count: {part.groupProjectCount}<br /></> : null}
    {part.exerciseSubmissionLink? <>Submission Link: <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></> : null}
  </p>
)

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
<div>
  {courseParts.map(part => {
    switch (part.name) {
      case "Fundamentals":
        return(
          <Part part={part} />
        );
      case "Using props to pass data":
        return(
          <Part part={part} />
        );       
      case "Deeper type usage":
        return(
          <Part part={part} />
        );
      case "How to do Course parts":
        return(
          <Part part={part} />
        );
      default:
        return assertNever(part);
    }    
  }  
  )}
</div>
)

const Total: React.FC<{ total: number }> = ({ total }) => (
  <p>
  Number of exercises {total}
  </p>
)

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "How to do Course parts",
      exerciseCount: 12,
      description: "Self made course part",
      groupProjectCount: 1
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

export default App;