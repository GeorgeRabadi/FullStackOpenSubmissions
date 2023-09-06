import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text , value}) => {

  return(
    <div>{text} {value}</div>
  )

}

const Statistics = ({good , bad, neutral, setGood, setNeutral, setBad}) =>
{
  if(good == 0 && bad == 0 && neutral == 0)
  {
    return (
      <>
      <h1>give feedback</h1>
      <Button handleClick = { () => setGood(good+1)} text = "good"></Button>
      <Button handleClick = { () => setNeutral(neutral+1)} text = "neutral"></Button>
      <Button handleClick = { () => setBad(bad+1)} text = "bad"></Button>
      <h1>Statistics</h1>
      <div>No feedback given</div>
      </>
      )
  
  }
  
  return (
    <>
    <h1>give feedback</h1>
    <Button handleClick = { () => setGood(good+1)} text = "good"></Button>
    <Button handleClick = { () => setNeutral(neutral+1)} text = "neutral"></Button>
    <Button handleClick = { () => setBad(bad+1)} text = "bad"></Button>
    <h1>Statistics</h1>
    <StatisticLine text = "good" value = {good} />
    <StatisticLine text = "neutral" value = {neutral} />
    <StatisticLine text = "bad" value = {bad} />
    <StatisticLine text = "all" value = {bad + good + neutral} />
    <StatisticLine text = "average" value = {(good - bad)/(bad + good + neutral)}/>
    <StatisticLine text = "positive" value = {good/(bad + good + neutral) + "%"}/>

    </>
  )
 
}
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
     <Statistics good = {good} bad = {bad} neutral = {neutral} setGood = {setGood} setBad = {setBad} setNeutral = {setNeutral}/>
    </div>
  )
}

export default App