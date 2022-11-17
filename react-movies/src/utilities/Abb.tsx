export default function Abb(props:abbreviationProps){
    return (<>
    
          <abbr className='text-danger text-decoration-none' title={props.title} >{props.children}</abbr>
         
         </>)
}

interface abbreviationProps{
    title:string
    children?:React.ReactNode
}
Abb.defaulPropsValue ={
    title:''
}