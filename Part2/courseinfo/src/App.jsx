const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Total = ({course}) => {
  return <p>Number of exercises {props.sumOfExercises}</p>
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({name , exercises}) => {

  
  return(
    <>     
        <Part name = {name} exercises = {exercises} />
    </>
  )

}

const Course = ({course}) => {

  
  console.log(course.parts)
  return(

    <>
    <Header name = {course.name}/>
    {
      (course.parts).map( part  => <Content key = {part.id} name = {part.name} exercises = {part.exercises} />)
      
    }
    
    </>
   

  )
}

const App = () => {
  const course = {
    id: 1,
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

  return <Course course={course} />
}

export default App