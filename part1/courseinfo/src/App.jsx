const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Part = ({part, exercises}) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  const renderedParts = parts.map(part => <Part key={part.exercises} part={part.name} exercises={part.exercises}/>)

  return (
    <>
      {renderedParts}
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
  
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

export const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}
