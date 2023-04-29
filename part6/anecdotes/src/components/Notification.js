import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <>
    <div style={style}>
      <div>
     { useSelector(state => state.notification )}
</div></div>
     
  </>  
  )
}
export default Notification