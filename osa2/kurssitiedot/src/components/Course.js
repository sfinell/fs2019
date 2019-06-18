import React from 'react'

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <>
    {parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )}
    </>
  )
}

// const Total = ({parts}) => {
//   return (
//     <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
//   )
// }

const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

//<Total parts={course.parts}  />

export default Course
