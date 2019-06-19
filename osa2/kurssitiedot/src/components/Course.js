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

const Total = ({parts}) => {
  const countExercises = (sum, part) => sum + part.exercises
  const numOfExercises = parts.reduce(countExercises, 0)
  return (
    <p><strong>total of {numOfExercises} exercises</strong></p>
  )
}

const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}  />
    </div>
  )
}

export default Course
