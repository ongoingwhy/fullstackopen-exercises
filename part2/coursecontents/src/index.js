import React from 'react'
import ReactDOM from 'react-dom'

const Part = ({part}) => <> {part.name} {part.exercises} <br /> </>

const ShowTotal = ({course}) => 
  <b>total of {course.parts.reduce((x, y) => x + y.exercises, 0)} exercises</b>

const Course = ({course}) => {
  const displayParts = () => course.parts.map(x => <Part key={x.id} part={x} />)

  return (
    <>
      <h1>{course.name}</h1>
      {displayParts()}
      <ShowTotal course={course}/>
    </>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)