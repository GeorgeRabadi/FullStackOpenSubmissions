import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good , bad, neutral, setGood, setNeutral, setBad}) =>
{
  return (
    <>
    <h1>give feedback</h1>
    <Button handleClick = { () => setGood(good+1)} text = "good"></Button>
    <Button handleClick = { () => setNeutral(neutral+1)} text = "neutral"></Button>
    <Button handleClick = { () => setBad(bad+1)} text = "bad"></Button>
    <h1>Statistics</h1>
    <div>good {good}</div>
    <div>neutral {neutral}</div>
    <div>bad {bad}</div>
    <div>all {bad + good + neutral}</div>
    <div>average {(good - bad)/(bad + good + neutral)}</div>
    <div>psotive {good/(bad + good + neutral)}%</div>
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