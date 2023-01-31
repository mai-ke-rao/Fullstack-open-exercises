
const random0tom = (max) => {
    return Math.floor(Math.random() * (max))
}
const setToValue = (func, newValue) => () => {
    func(newValue)
}

const Button = (props) =>{
return (
    <button onClick={setToValue(props.func, props.value)}>
        {props.name}
    </button>
)
}

export { Button,random0tom, setToValue }