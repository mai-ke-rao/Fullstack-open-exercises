import { useState } from 'react'
import { Button, random0tom } from './Components/Button'
import { Anecdotes } from './Components/Anecdotes'
import ReactDOM from 'react-dom/client'

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

const App = (props) => {
  const { anecdotes } = props;
  const temp = [0,0,0,0,0,0,0,0];
  const [points, vote_point] = useState(temp);
  console.log(temp);
  console.log(points);
  const [selected, setSelected] = useState(0);
  const copy_points = [...points];
        copy_points[selected] += 1;  
  const indexOfMax = points.indexOf(Math.max(...points));
  return (
    <div>
   <h2>Randome Quote</h2>
   <Anecdotes name={'Anecdote of the day'} anecdote={anecdotes[selected]} points={points[selected]} />
     
      
      <Button name={'vote'} func={vote_point} value={copy_points}></Button>
      <Button name={'Next quote'} func={setSelected} value={random0tom(anecdotes.length)}></Button>
      <h2>Quote with most votes</h2>
      <Anecdotes name={'Anecdote of the day'} anecdote={anecdotes[indexOfMax]} points={points[indexOfMax]} />
    </div>
  )
}
const root = ReactDOM.createRoot(
  
  document.getElementById('root'));
  root.render(<App anecdotes={anecdotes} />)


export default App

 
