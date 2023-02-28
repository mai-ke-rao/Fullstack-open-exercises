const SearchButton = ({take, persona, ibuffer}) => { 
   let tak = [];
    //ovo nije dobro jer vraca samo jednu instancu imena a i ne radi uopste jer take je samo ime nije ceo entry
    for(let i=0; i<persona.length;i++){
     // console.log(take[i]);
      for(let x=0; x<ibuffer.length; x++)
      {
        tak[x] = persona[ibuffer[x]];
      }
     // console.log(tak);
     // if(take[i]){
   return(<ul>{tak.map(tak => <li key={tak.name}>Name: {tak.name} Number: {tak.number}</li>)}</ul>)
      
       }
  }
export {SearchButton};  