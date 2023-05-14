const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const error = require('../utils/logger')
const { update } = require('lodash')

usersRouter.post('/', async(request, response) =>
{
const {username, name, password} = request.body
if(password.length>2 && password){
const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    blogCount : 0,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
}else { 
  console.log("bad user or password")
  response.status(400).end();}
})

usersRouter.get('/', async(request, response) =>
{
  const users = await User.find({}).populate('blogs',{title:1,authot:1,url:1})
  console.log(users,' user in a backend controller');
  response.json(users)
})
usersRouter.put("/:id", async(request, response) =>
{
     //zavisi sta prosledim u request
     const body = request.body
 

     const updated = await User.findByIdAndUpdate(request.params.id, body, {new : true})
     console.log('body as it is in backend controller',updated);
     response.json(updated)
})




module.exports = usersRouter