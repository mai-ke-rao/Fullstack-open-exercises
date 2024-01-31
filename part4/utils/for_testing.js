const Blog = require('../models/blog')
const initialBlogs = [
  {
  //  _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    users: [
      "65ba2361455ef1b8e1ef6822"
    ]
   // __v: 0
  },
  {
   // _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    users: [
      "65ba2361455ef1b8e1ef6822"
    ]
   // __v: 0
  },
  {
   // _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    users: [
      "65ba2361455ef1b8e1ef6822"
    ]
   // __v: 0
  },
  {
   // _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    users: [
      "65ba2361455ef1b8e1ef6822"
    ]
   // __v: 0
  },
  {
   // _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 1,
    users: [
      "65ba2361455ef1b8e1ef6822"
    ]
   // __v: 0
  },
  {
   // _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    users: [
      "65ba2361455ef1b8e1ef6822"
    ]
  //  __v: 0
  }  
]

const mostBlogs = (initialBlogs) => {
   var ac = 0;
   const countArray = []
  const autori = []
  initialBlogs.forEach(element => {
  var nasao = false  
    var i = 0; 
   autori.forEach(autor => {
    if(autor === element.author)
    {   
         countArray[i]++
        nasao = true
        
  }
  i++
})
  if(!nasao){
    autori.push(element.author)
    countArray[ac] = 1
    ac++
  }
  
  })
  var winner = countArray[0]
  for(var x =1; x<countArray.length; x++)
{
   if(winner < countArray[x])
   {
    winner = countArray[x]
   }
}
const k = countArray.indexOf(winner)
const obj = {
    author: autori[k],
    blogs: winner
  
}
return obj

}
const mostliked = (initialBlogs) => {
  var ac = 0;
  const countArray = []
   const autori = []
   initialBlogs.forEach(element => {
    var nasao = false  
      var i = 0; 
     autori.forEach(autor => {
      if(autor === element.author)
      {   
           countArray[i] += element.likes
          nasao = true
          
    }
    i++
  })
    if(!nasao){
      autori.push(element.author)
      countArray[ac] = element.likes
      ac++
    }
    
    })
    var winner = countArray[0]
    for(var x =1; x<countArray.length; x++)
  {
     if(winner < countArray[x])
     {
      winner = countArray[x]
     }
  }
  const k = countArray.indexOf(winner)
  const obj = {
      author: autori[k],
      likes: winner
    
  }
  return obj
    
}
const dummy = (initialBlogs) => {
  // ...
  return 1
}
const totalLikes = (initialBlogs) => {
var x= 0;
initialBlogs.forEach(element => {
    x += element.likes
  });
  return x;
}
const mostlikes = (initialBlogs) => {
  var x = -1;
  const temp = {};
  initialBlogs.forEach(element => {
    if(element.likes > x){
      x= element.likes
    }
  })
  return x;
    
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}



module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  mostlikes,
  blogsInDb,
  mostBlogs,
  mostliked
}

