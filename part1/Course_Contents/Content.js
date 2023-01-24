import { Part } from './Part'
const Content = (props) => {
  const nesto =  props.delovi
 return(
     <div>
        { 
            
     nesto.map(element => (<Part part  = {element.name} exercises = {element.exercises}/>))           
  
                 
        }
     </div>
   
)
   
}
export { Content }
