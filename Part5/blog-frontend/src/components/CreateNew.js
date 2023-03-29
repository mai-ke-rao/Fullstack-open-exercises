import {useState} from 'react'

const CreateNew = ({handleCreate}) => {
  const[title, setTitle]= useState('')
const[author,setAuthor]=useState('')
const[url, setUrl]=useState('')
console.log("signes of life");
  const addNewBlog = (event) => {
  console.log("Im in");
  event.preventDefault()
  setAuthor(author)
         setTitle(title)
         setUrl(url)
  handleCreate({
    author: author,
    title: title,
    url: url
  })
 
  
  setAuthor('')
    setTitle('')
    setUrl('')
   
   
  }
    return(
        <div>
        <form onSubmit={addNewBlog}>
        <div>
          title: 
          <input type="text" id='Title' value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
  <div>
    author: 
    <input type="text" id="Author" value={author} onChange={({target}) => setAuthor(target.value)}/>
    </div>
    <div>
      Url:
      <input type="text" id="Url" value={url} onChange={({target}) => setUrl(target.value)}/>
    </div>
    <button type="submit" id='Send'>Create</button>
        </form>
        </div>
    )
}
export default CreateNew