const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

console.log(process.env.MONGOBD_URI);
const url = "mongodb+srv://bilde:debildebil@clus0.bpumznl.mongodb.net/?retryWrites=true&w=majority"
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {    console.log('connected to MongoDB')  }) 
   .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })
   
   function validator(val){
    let x = val.indexOf('-');
    console.log(x);
    if(!Number(val.slice(x+1))){ //neradi
    console.log('only single - allowed');
    return false;}
   if(x!==-1 && x<2)
   {
    console.log("you can use '-' seperator only after first 2 numerals.");
  return false
  }
  return true;
 }
 const custom = [validator, 'Number must contain 8 digits, only single "-" seprator allowed and after two digits']
const  personShema = new mongoose.Schema({
 name: {
  type: String,   
   minLength: 3,    
   required: true  
},
  number: {
    type: String,
    minLength: 8,
   validate: custom
  }
   // id: String
})
/*personShema.path('number').validate({validator : function() { throw new Error(message); },
// `errors['name']` will be "Oops!"
message: function(props) { return props.reason.message; }
});*/

  personShema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person',  personShema)