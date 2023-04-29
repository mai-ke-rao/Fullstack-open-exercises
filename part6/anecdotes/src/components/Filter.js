import {filterReducer} from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const Filter = () => {
      
    const dispatch = useDispatch()
    const response = useSelector(state =>state.filter)
    const handleChange = (event) => {
      event.preventDefault()
      // input-field value is in variable event.target.value
      let fill = event.target.value
      console.log(fill, "ovo je bio fill");
     // console.log(dispatch(filterReducer(fill)));
      dispatch(filterReducer(fill))

    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
        
      </div>
    )
  }
  
  export default Filter