
import { toggle, setToggle} from './App'
const Button01 = ({toggle, func}) =>
{
    return(<button onClick={()=>func(!toggle)}>Search</button>)
}
export  {Button01};