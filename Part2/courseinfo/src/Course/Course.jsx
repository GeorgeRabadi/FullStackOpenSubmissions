
const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Total = (props) => {
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
      <Total sumOfExercises = { ((course.parts).map( part => part.exercises)).reduce( (sum, current) => sum + current, 0) } />
      </>
     
  
    )
  }

  export default Course