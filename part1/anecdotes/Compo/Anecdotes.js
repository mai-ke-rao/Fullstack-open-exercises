import { Title } from './Title'
const Anecdotes = (props) =>
{
   const {name , points, anecdote} = props;
   return(
    <div>
        <Title name={name} />
            <p>
                {anecdote}
            </p>
            <p>
                This anecdote has {points} votes.
            </p>
    </div>
   )

}
export {Anecdotes};