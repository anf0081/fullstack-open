const Course = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({parts}) => {
  const exercisesArray = parts.map(part => part.exercises)
  const totalExercises = exercisesArray.reduce((a, b) => a + b, 0)
  return (
    <p><strong>Total of {totalExercises} exercises</strong></p>
  )
}

export default Course