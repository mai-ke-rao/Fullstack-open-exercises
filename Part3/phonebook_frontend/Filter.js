import {SearchButton} from './SearchButton'
const Filter = ({persons, newSearch, toggle}) =>{
    let give = [];
    let take = [];  
    if(!toggle)
    {
      return
    }
   let ibuffer = [];
    let counter = 0;
    console.log(persons);
    for(let i=0; i<persons.length;i++)
    {  let dummy = persons[i].name;
     /* console.log("dummy",dummy);
      console.log("person",persons[i].name);
      console.log("iterator: ", i);*/
      let temp = dummy.split(' ')
      
      if(newSearch.toLowerCase() === temp[0].toLowerCase() && newSearch) // null null equality was in a way
      { //console.log(newSearch);
        //console.log(temp[0]);
        take[i] = temp[0] ;
        ibuffer[counter] = i;
        counter++
        
      }
    }
    give=[...take];
    //console.log(give);
   
    return (<div><SearchButton take={give} persona={persons} ibuffer={ibuffer}></SearchButton></div>)
    
  }
export {Filter};  