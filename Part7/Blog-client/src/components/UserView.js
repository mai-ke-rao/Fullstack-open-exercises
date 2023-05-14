//NISAM DAO KEYS ELEMENTIMA LISTE JER ME MRZI
import {useSelector} from 'react-redux'
import {useParams, Link} from 'react-router-dom'



const UserBlogs = ({users}) => {
    // console.log('users at least: ',users);
      const id = useParams().id
      console.log('id is :',id);
      const user = users.find(a => a.id === id)
      
      console.log('found user: ',user);
      return(
          <div>
          <h1>Finally</h1>
            <ul>  {user.blogs.map(blog =><li key={blog.id}> {blog.title}</li> )}</ul>
          </div>
      )
   }


const UserView = ({users}) => {

console.log('juzer', users);

    return(
        <div>
        <h2> Users </h2>
        <table> 
        <tbody>
            <tr><td></td><td>blogs created</td></tr>
            {users.map(user => <tr key={user.id}><td key={user.id}><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogCount}</td></tr>)}
            </tbody>
        </table>
        {setTimeout(() => window.scrollBy(0, 1100),350)}
        </div>
    )
}

export default UserView
export {UserBlogs}