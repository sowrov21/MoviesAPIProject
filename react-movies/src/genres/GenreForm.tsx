import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../form/TextField";
import Button from "../utilities/Button";
import DisplayServerSideErrors from "../utilities/DisplayServerSideErrors";
import * as Yup from 'yup'
import { genreCreationDTO } from "./genres.model";

export default function GenreForm(props: genreFormProps){

    return(

        <Formik initialValues={props.model} 
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                //Here All Form Input Fields Validation Rules 
                name: Yup.string().required("The Name is required")
                .max(50," Max length is 50 character").firstLetterUppercase()
            })}
        >
                {(formikProps) => (
                    <Form>
                        <TextField fieldName="name" displayName="Name" abbTitle="The Name is required" abbSymbol="*" />
                        <Button className="btn btn-primary btn-sm" disabled={formikProps.isSubmitting} type="submit" waitingMsg="Saving..">Save</Button>
                        <Link className='btn btn-secondary btn-sm' to="/genres"> Cancel</Link>
                    </Form>
                )}
            </Formik> 
    )
}


interface genreFormProps{
    model: genreCreationDTO;
    onSubmit(values:genreCreationDTO, action: FormikHelpers<genreCreationDTO>):void;
}