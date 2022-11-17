import { ErrorMessage, Field } from "formik";
import Abb from "../utilities/Abb";

export default function TextField(props: textFieldProps){
  return (<>
            <div className='mb-3'>
                <label htmlFor={props.fieldName}>{props.displayName}</label>   <abbr className='text-danger text-decoration-none' title={props.abbTitle} >{props.abbSymbol}</abbr>
                <Field name={props.fieldName} className="form-control" id={props.fieldName} type={props.type} />
                <ErrorMessage name={props.fieldName}>{(msg)=> <span className='text-danger'>{msg}</span>}</ErrorMessage>
            </div>
  </>)
}

interface textFieldProps{
    abbTitle?:string;
    abbSymbol?:string;
    displayName:string;
    fieldName:string;
    type:'text' | 'password';
}
TextField.defaultProps = {
  type : 'text'
}