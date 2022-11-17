import { Field, useFormikContext } from "formik";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import './MarkdownField.css'

export default function MarkdownField(props: markdownFieldProps){

  const {values} = useFormikContext<any>();
    return(

        <div className="mb-3 form-markdown">
            <div>
                <label htmlFor="">{props.displayName}</label>
                <div>
                   <Field name={props.fieldName} as="textarea" className="form-textarea"/> 
                </div>
            </div>

            <div>
            <label htmlFor="">{props.displayName} (preview):</label>
            <div className="markdown-container">   
                <ReactMarkdown>{values[props.fieldName]}</ReactMarkdown>
            </div>
            </div>
        </div>

)
}
interface markdownFieldProps{
displayName:string;
fieldName:string;
}