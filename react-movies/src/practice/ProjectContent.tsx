export default function ProjectContent(props:projectContentProps){
    return(<>
    <h1>ProjectContent Header</h1>
    <div>{props.children}</div>
    <h1>ProjectContent Footer</h1>
    <div>{props.other}</div>
    
    </>)
}

interface projectContentProps{
    children:React.ReactNode;
    other:React.ReactNode;
}