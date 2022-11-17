export default function Button(props:buttonProps){

    return (<>
    <button  disabled = {props.disabled} type={props.type} className={props.className} onClick={props.onClick}>{(!props.disabled) ? props.children: <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> {props.waitingMsg}</>}</button>
    </>)
}

interface buttonProps{
children?:React.ReactNode;
onClick?():void;
type?:"button"|"submit";
disabled?:boolean;
waitingMsg?:string
className:string
}
Button.defaultValue = {
    type:"button",
    disabled:false,
    waitingMsg:"Please wait.."
}