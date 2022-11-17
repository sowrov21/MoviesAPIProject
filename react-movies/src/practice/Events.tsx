import { useState } from "react";

export default function Events(){

   const [text,textUpdate] = useState('');
   const [canSee,canSeeUpdate] = useState(false);
    function handleCheckboxChange()
   {
    //alert('Hello');
    canSeeUpdate(!canSee);
   }
   function handleKeyUp(e:React.KeyboardEvent<HTMLInputElement>){
    console.log(e.currentTarget.value);
    textUpdate(e.currentTarget.value);
   }

    return(<>
    <h1>Event Example</h1>
     <div>    <input type="checkbox" onChange={handleCheckboxChange} /></div>
   {canSee ? <div>You can see</div>: <div>Not Allowed</div> }
     <div> <button onClick={()=>{
        alert("I have been clicked");
     }}> click me</button> </div>
     <div><input type="text" onKeyUp={(e)=>handleKeyUp(e)}/> </div>

     <div><h3>{text}</h3></div>
    </>)
}