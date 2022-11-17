export default function SelectNumber(props: selectNumberProps){

    //let arr = [1,2,3,4,5];
    let arr = Array(props.maxValue).fill(0);//[0,0,0...0]
    return (<>
     <div>
         <select onChange={(e)=>{
            console.log(e.currentTarget.value)
            props.onSelected(parseInt(e.currentTarget.value,10))
            
            }}>
             {arr.map((_,index)=><option key={index+1} value={index+1}>{index+1}</option>)}
         </select>
     </div>
     
     </>)
 }

 interface selectNumberProps{
    maxValue:number;
    onSelected(value:number):void;
 }

 //Set default value or optional parameter 

 SelectNumber.defaultProps = {
    maxValue:5
 }