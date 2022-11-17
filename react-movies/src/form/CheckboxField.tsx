import { Field } from "formik";

export default function CheckboxField(props: checkboxFieldProps){
return(
<div className="mb-3 form-check">
  <Field className="form-check-input" id={props.fieldName} name={props.fieldName}
  type="checkbox"
  />
  <label htmlFor={props.fieldName}>{props.displayName}</label>
</div>
)
}
interface checkboxFieldProps{
displayName:string;
fieldName:string;
}