import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getBlogsReducer, addCommentReducer } from "../reducers/blogReducer";
import {setUser} from '../reducers/userReducer'
import { Link, useNavigate, useParams } from "react-router-dom";
import { setNotification, notificationReducer } from '../reducers/notificationReducer'
import { Navigate } from "react-router-dom";

 

const BlogFull = ({blogs, addLike, remove}) => {
  const notification = useSelector(state=> state.notification)
  const [tekst, setTekst] = useState('')
  const [ajdi, setAjdi] = useState('')
//  const navigate = useNavigate()
  const dispatch = useDispatch()


  /*async function remove(blog) {
    blogService.kick(blog).then((r) => {
      const temp = blogs.filter((blo) => blo.id !== blog.id);
//hmmm okej ovo vraca isfilitrarane blogeve

 navigate('/blogs')
      dispatch(getBlogsReducer(temp));
     
    });}*/
 
 
    var id = useParams().id
 console.log('id is :',id);
 const blog = blogs.find(blog => blog.id === id)
 //setAjdi(id)


 const handleComment = async (event) => {
  console.log('problem is retarded');
 event.preventDefault()
 var koment = {reply: tekst}
 
  try{
   blogService
   .addComment(koment, id)
   .then(returnedinfo => {
    // const tempo = blogs.find(blog => blog.id === id)
    setTekst('')
    dispatch(setNotification('shit is gettin traction', 5))
   //  dispatch(addCommentReducer(returnedinfo ))
   
    
   })
 }
 catch{
   console.log('logiranje komenta i idea u submit handleru', koment, id);
   dispatch(setNotification('wrong user or password', 5))
 }
 }


return(<div>
  {blog.title} {blog.author}
  <br></br>
        <a href={blog.url}>{blog.url}</a>
        <br></br>
        <div>
          likes: {blog.likes}{" "}
          <button onClick={() => addLike(blog)}>like</button>
        </div>
        <br></br>
        <div>
        {/*ne radi na pocetnim blog postovima*/}
       
          {blog.users[0].username} {blog.users[0].name}
          <button onClick={() => remove(blog)}>Remove</button>
        </div>
        <div> <h4>Comments</h4>
  {tekst}
        <form onSubmit={handleComment}>
          <input type="text" value={tekst} onChange={({target}) => setTekst(target.value)}></input>
          <button type="submit">add comment</button>
        </form>
    
        <ul>
         {blog.comments.map(comment=> <li>{comment}</li> )}
        </ul>
            
        </div>
        
        </div>
      
)


}

const Blog = ({ blog, blogs, setBlogs, addLike }) => {

  const blogStyle = {
    
    borderRadius: 25,
    paddingTop: 10,
    paddingLeft: 15,
    paddingBottom: 4,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    textDecoration: 'none'
  };

    return (
      <div style={blogStyle} className="dan">
        {" "}
        <div>
       {blog.title} {blog.author} 
        </div>
      </div>
    );
  }
 


export default Blog;
export {BlogFull};
