
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import Toggable from './components/Toggable'
import CreateNew from './components/CreateNew'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
const[notification, setNotification] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [notification])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  async function addLike (blog) {
    blog.likes += 1
    blogService
    .putLike(blog).then(returnedinfo => {
     blogs.forEach(blo => {
      if(blo.id === returnedinfo.id)
      {
        blo = returnedinfo
        
      }})  
  setBlogs(blogs)
  setNotification(' ')
  });
  }


  const handleLogin = async (event) => {
    console.log("makar nesto");
event.preventDefault()
    try {
      const user = await login({
        username, password,
      })
      console.log("i am down");
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
    console.log("down");
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("jebo mamu svoju");
      setNotification('wrong user or password')
      setTimeout(() => {
        setNotification('')
      }, 5000)
      
    }
  }
  
const logout = () => {
  window.localStorage.removeItem('loggedNoteappUser')
  setUser(null)
}



async function handleCreate (body) {
  console.log("Im in");
 try{     blogService
         .addNew(body).then(returnedinfo => {
          setBlogs(blogs.concat(returnedinfo))
          setNotification(`A new blog  is created `)
          setTimeout(() => {
            setNotification(``)
          }, 5000)
          blogFormRef.current.toggleVisibility()
         })
         }
  catch{
    console.log("Code didtn do");
    }
}

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          id="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          id="Password"
          onChange={({ target }) => setPassword(target.value)}
          
        />
        <p>{username}   {password}</p>
      </div>
      <button type="submit" id ='Login'>login</button>
    </form>      
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
       {notification}
      </div>
    )
  }
  if(user){
  
    blogs.sort((a,b) => b.likes - a.likes)
  return (
    <div>
    <h2>blogs</h2>
      <p>user: {user.username} - {user.name} is logged in <button onClick={logout} id='Logout'> logout</button></p>
     <h2> Create new</h2>
      
    <Toggable buttonLabel="Create new" ref={blogFormRef}>
    
    <CreateNew handleCreate={handleCreate}/>

     
    </Toggable>

    {notification}
  
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} addLike={addLike}/> )}
    </div>
  )}
}
export {App}
