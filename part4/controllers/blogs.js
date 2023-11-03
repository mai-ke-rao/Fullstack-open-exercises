
const blogsRouter = require('express').Router()
const { findByIdAndDelete } = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor, userExtractor } = require('../utils/middleware')
const Comment = require('../models/comment')
const blog = require('../models/blog')

//NEMOZE DA POPULISE KAD NEMA NIKAKVE REFERENTNE AJDIJEVE
//TREBACE MI NEKI LEFT JOIN NPR
blogsRouter.get('/', async(request, response) => {
const blogs = await Blog.find({}).populate('comments').populate('users',{username:1, name:1})
response.json(blogs)   
})
blogsRouter.post('/:id/comments', async(request, response) => {
  var body = request.body
  var id = request.params.id
  console.log('body that I put directly in comment reply', body,'id of a blog in question',id);
  //PROBAJ DA NAPRAVIS TU NEKU ID SPONU. TO JE JEDINO STO MI PADA NAPAMET
  const comment = {
       reply: body.reply,
       //blog: id
  }
  //const savedComment = await comment.save()
 const tblog = await Blog.findById(id)
 tblog.comments.push(comment.reply)
 console.log('koment:',comment.reply, 'novi blog',tblog);
 const updated = await Blog.findByIdAndUpdate(id, tblog, {new : true})
  response.status(201).json(updated)
})
blogsRouter.post('/', userExtractor, async(request, response) => {
  var body = request.body
  const user = request.user

 
  const blog = new Blog({
    users: user.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    __v: 0
  })
  //blog.user = blog.user.concat(user.id)
 //IRRELEVANT PART
  if(Object.is(undefined, blog.title)){
  response.status(400).end()}
 else if(Object.is(undefined, blog.url)){
  response.status(400).end()}
  else{
if(Object.is(undefined, blog.likes))
{ 
blog.likes = 0;
}
//END OF THE IRRELEVANT PART
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
response.status(201).json(result)
  }    
})

blogsRouter.put('/:id', async(request,response) => 
{
  const body = request.body

  const blog = {
    _id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    __v: 0
  }
console.log(blog);
 updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
   response.json(updatedNote)
   
})

blogsRouter.delete('/:id',userExtractor, async(request,response)=>
{

  var blogo = await Blog.findById(request.params.id)
  console.log(request.user.id);
  if (blogo.users.toString() === request.user.id.toString())
  {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
  }
  return response.status(401).json({ error: 'token invalid for specified blog deletion'})  
  
})


module.exports = blogsRouter