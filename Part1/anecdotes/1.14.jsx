import { useState } from 'react'

  

const Button = ({selected ,setSelected, anecdotes}) =>
{
  let random = Math.floor(Math.random() * (anecdotes.length))

  while(random == selected)
  {  
    random = Math.floor(Math.random() * (anecdotes.length))
  }


  return(
    <>
    <button onClick={() => setSelected(random)}>
      next anecdote
    </button>
    </>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0));


  const vote = () => 
  {
    console.log(votes[selected])

    const updatedVotes = [...votes];

    updatedVotes[selected] = votes[selected] + 1;

    setVotes(updatedVotes);

  }

  const MostVoted = () =>
  {
     let largest = 0;
     let j = 0;

     for(let i = 0; i < votes.length; i++)
     {
        if(votes[i] > largest)
        {
          largest = votes[i]
          j = i
        }
     }

     return anecdotes[j]
  }
  

  return (
    <div>
      {anecdotes[selected]}
      <br />
      Has {votes[selected]} votes
      <br />
      <button onClick={vote}>vote</button>
      <Button selected = {selected} setSelected = {setSelected} anecdotes = {anecdotes}/>
      <h1>Anecdote with most votes</h1>
      {MostVoted()}
    </div>
  )
}

export default App