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
    const renderedParts = parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)

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
            <b>total of {total} exercises</b>
        </>
    )
}

export const Course = ({course}) => {
    return (
        <>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
    )
}