import React from 'react'

const Part = ({part}) => <p> {part.name} {part.exercises} </p>

const ShowTotal = ({course}) => 
  <b>total of {course.parts.reduce((x, y) => x + y.exercises, 0)} exercises</b>

const Course = ({course}) => {
  const displayParts = () => course.parts.map(x => <Part key={x.id} part={x} />)

  return (
    <>
      <h3>{course.name}</h3>
      {displayParts()}
      <ShowTotal course={course}/>
    </>
  );
}

export default Course
