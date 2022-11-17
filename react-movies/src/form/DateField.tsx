import { useFormikContext } from "formik";

export default function DateField(props: dateFieldProps){

    const {values,validateForm, touched, errors} = useFormikContext<any>();
    return (
            <div className="mb-3">
                <label htmlFor=""></label>
                 <input 
                 type="date"
                 className="form-control"
                 id={props.fieldName}
                 name={props.fieldName}
                 defaultValue={values[props.fieldName]?.toLocaleDateString("en-CA")}

                 onChange = { e => {
                    const date = new Date(e.currentTarget.value+'T00:00:00');
                    values[props.fieldName] = date;
                    validateForm();
                 }}
                 />
                 {touched[props.fieldName] && errors[props.fieldName] ?
                  <div className="text-danger">{errors[props.fieldName]?.toString()}</div>: null
                 
                 }
            </div>
        )

}
interface dateFieldProps{
 fieldName:string;
 displayname:string;
}