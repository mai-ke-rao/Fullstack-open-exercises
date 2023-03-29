import blogService from '../services/blogs'

import { useState } from "react"



const Blog = ({blog, blogs, setBlogs, addLike}) => {

  const[show, setShow] = useState(false)
  const[no,setNo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
const toggle = () => {
  //console.log(blog);
  
setShow(!show)
}
// jedini razlog zasto blog ima poslednja dva parametra su addLike i remove, to otezava testing, a mozda i nije tolko optimizovano.
//ovo me sada o nemogucava da uradim zadatak 5.15 jer oni ocekuju da se add like salje kao eventhandler u <Blog> komponentu 
/*async function addLike (blog) {
  blog.likes += 1
  blogService
  .putLike(blog).then(returnedinfo => {
   blogs.forEach(blo => {
    if(blo.id === returnedinfo.id)
    {
      blo = returnedinfo
      
    }})  
setBlogs(blogs)
setNo(!no)
});
}
*/
async function remove (blog) {
  blogService
  .kick(blog).then(r=>
    {    const temp = blogs.filter((blo)=>blo.id !== blog.id)
    
     setBlogs(temp)
     setNo(!no)
    
     });
 
}

if(!show){
  return (
    <div style={blogStyle}>      <div>
        {blog.title} {blog.author} <button onClick={toggle}>view</button>
      </div>
      
  </div>
)}
if(show){
  return(
    <div style={blogStyle} className="krompir">     
    {blog.title} {blog.author} <button onClick={toggle}>hide</button><br></br>
    <a href={blog.url}>{blog.url}</a><br></br>
   <div>likes: {blog.likes} <button onClick={()=>addLike(blog)}>like</button></div><br></br>
   <div>{blog.users[0].username} {blog.users[0].name}
  <button onClick={()=>remove(blog)}>Remove</button></div>
  

</div> )
}
}



export default Blog