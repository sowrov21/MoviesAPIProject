import { Formik, FormikHelpers,Form } from "formik";
import { Link } from "react-router-dom";
import TextField from "../form/TextField";
import Button from "../utilities/Button";
import { actorCreationDTO } from "./actors.model";
import * as Yup from 'yup'
import DateField from "../form/DateField";
import ImageField from "../form/ImageField";
import MarkdownField from "../form/MarkdownField";

export default function ActorForm(props: actorFormProps){
return(<>

   <Formik
   initialValues={props.model} 
   onSubmit = {props.onSubmit}
   validationSchema={Yup.object({
    //Here All Form Input Fields Validation Rules 
    name:Yup.string().required("The name is required").firstLetterUppercase(),
    dateOfBirth:Yup.date().nullable().required("The Date is required")
  })}
   >
    {(formikProps)=> (
     
        <Form>
              <TextField fieldName="name" displayName="Name"/>

              <DateField fieldName="dateOfBirth" displayname="Date of Birth"/>

              <ImageField displayName="Picture" field="picture" imageURL={props.model.pictureURL}/>

              <MarkdownField displayName="Biography" fieldName="biography"/>
              
               <Button className="btn btn-primary" disabled={formikProps.isSubmitting} type ="submit" waitingMsg="Saving..">Save</Button>
               <Link className='btn btn-secondary' to="/actors"> Cancel</Link>
        </Form>

    )}
   </Formik>
</>)
}
interface actorFormProps{
    model:actorCreationDTO;
    onSubmit(values: actorCreationDTO, action: FormikHelpers<actorCreationDTO>):void;
}