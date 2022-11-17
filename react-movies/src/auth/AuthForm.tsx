import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.models";
import * as Yup from 'yup'
import TextField from "../form/TextField";
import Button from "../utilities/Button";
import { Link } from "react-router-dom";
export default function AuthForm (props: authFormProps){

    return(
          <Formik
            initialValues={props.model}
            onSubmit = {props.onSubmit}
            validationSchema = {Yup.object({
                email: Yup.string().required('The email is required')
                           .email('Enter valid email'),
                password: Yup.string().required("This field is required")
            })}
          >
            {formikProps => (
                <Form>
                    <TextField displayName="Email" fieldName="email"/>
                    <TextField displayName="Password" fieldName="password" type="password"/>
                    <Button className="btn btn-success" disabled={formikProps.isSubmitting} type= "submit">Send</Button>
                    <Link className="btn btn-danger" to="/" >Cancel</Link>
                </Form>
            )}
          </Formik>
    )
}

interface authFormProps{
    model: userCredentials;
    onSubmit(values: userCredentials, action: FormikHelpers<userCredentials>):void

}