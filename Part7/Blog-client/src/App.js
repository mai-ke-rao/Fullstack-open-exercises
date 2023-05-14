// kad se user loguje prebrojati blogeve a nakon svakog dodavanja inkrementirati
//imaj blog counter u databazi usera.
import { useState, useEffect, useRef } from 'react'
import Blog, {BlogFull} from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import Toggable from './components/Toggable'
import CreateNew from './components/CreateNew'
import {useSelector, useDispatch} from 'react-redux'
import { createBlogReducer, getBlogsReducer, addCommentReducer } from './reducers/blogReducer'
import { setNotification, notificationReducer } from './reducers/notificationReducer'
import {setUser} from './reducers/userReducer'
import UserView, {UserBlogs} from './components/UserView'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"


const App = () => {

  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
//const[notification, setNotification] = useState('')
//PROBLEM AKO SALJES STALNO STAROG USERA NIKAD N
const user = useSelector(state => state.user)
const blogs = useSelector(state=> state.blogs) 
const notification = useSelector(state=> state.notification)
//see blogs in backend: done
const dispatch = useDispatch()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(getBlogsReducer(blogs))
    )  
    console.log("blogovi",blogs);
  }, [notification])
  useEffect(() => {
    blogService.getUsers().then(blogs =>
      setUsers(blogs)
    )  
    console.log("looseri",users);
  }, [])
//NE ZNAM CEMU OVO SLUZI
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const userLocal = JSON.parse(loggedUserJSON)
     // setUser(user)
      blogService.setToken(userLocal.token)
    }
  }, [])

  const blogFormRef = useRef()

  async function addLike (vlog) {
   var blog = {...vlog}
    blog.likes += 1
    blogService
    .putLike(blog).then(returnedinfo => {
     blogs.forEach(blo => {
      if(blo.id === returnedinfo.id)
      {
        blo = returnedinfo
        
      }})  
  dispatch(getBlogsReducer(blogs))
  dispatch(notificationReducer(notification.concat(" ")))
  });
  }


  const handleLogin = async (event) => {
    console.log("makar nesto");
event.preventDefault()
    try {
      const userEntry = await login({
        username, password,
      })
      console.log("i am down");
      blogService.setToken(userEntry.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(userEntry)
      ) 
    console.log("down");
    console.log('userEntry u hanleloginu/app.dzijesu', userEntry);
      dispatch(setUser(userEntry))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("jebo mamu svoju");
      dispatch(setNotification('wrong user or password', 5))
    }
  }
  
const logout = () => {
  window.localStorage.removeItem('loggedNoteappUser')
 dispatch(setUser(null))
}


async function handleCreate (body) {
  console.log("Im in");
 try{     blogService
         .addNew(body).then(returnedinfo => {
          //setBlogs(blogs.concat(returnedinfo))
          dispatch(createBlogReducer(returnedinfo))
          //dispatch(BlogIncrement(user))

            dispatch(setNotification(`A new blog  is created `,5))
        

         /* setNotification(`A new blog  is created `)
          setTimeout(() => {
            setNotification(``)
          }, 5000)*/
          blogFormRef.current.toggleVisibility()
         })
         console.log('ovo je user u app.dzijesu', user);
         let x = true
  blogService  //PROBLEM JE JER USER UVEK DRZI JEDAN TE ISTI BLOGCOUNT
  .countBlog(user, x).then(returnedinfo => {
    var tempino = users.map(user => user.id === returnedinfo.data.id ? returnedinfo.data : user)
    dispatch(setUser(returnedinfo.data))
    setUsers(tempino)
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
  
  var blogevi = [...blogs]
  blogevi.sort((a,b) => b.likes - a.likes)
  return (
    <div>
     <div className="navbar">
         
  <p><Link to={'/'}>Blogs</Link>  <Link to={'/users'}>Users</Link> <span>user: {user.username} - {user.name} is logged in <button onClick={logout} id='Logout'> logout</button></span></p>
</div>
    <Toggable buttonLabel="Create new" ref={blogFormRef}>
    
    <CreateNew handleCreate={handleCreate}/>

     
    </Toggable>

    {notification}
 
      {blogevi.map(blog => 
        <Link to={`/blog/${blog.id}`} style={{textDecoration: 'none'}}> <Blog key={blog.id} blog={blog} blogs={blogs} addLike={addLike}/> </Link>)}
       {/*  addlike i setblogs ukonio*/ }
       <Routes>
 
  <Route path='/blog/:id' element={<BlogFull blogs ={blogevi} addLike={addLike} />}/>
  <Route path='/users' element={ <UserView users={users}/>}/>
  <Route path='/users/:id' element={<><UserView users={users}/><UserBlogs users={users}/></>}/>
</Routes>
    </div>
  )}
}




export {App}
