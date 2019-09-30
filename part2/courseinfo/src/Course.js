import React from 'react'

const Header = ({course}) => 
    <h2>
        {course}
    </h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
    const rows = () => parts.map(part => 
        <Part 
            key={part.id} 
            part={part} 
        />
    )
    
    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({parts}) => {
    const Sum = parts.reduce( 
        (sum, part) => 
            sum + part.exercises,
            0 
        )
    
    return (
        <p>
            <b>
                Total of {Sum} exercises
            </b>
        </p>
    )
}

const Course = ({course}) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)

export default Course