import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../form/TextField";
import Button from "../utilities/Button";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import * as Yup from 'yup'
import MapField from "../form/MapField";
import coordinateDTO from "../utilities/coordinates.model";


export default function MovieTheaterForm(props: movieTheaterFormProps){


  function transformCoordinates():coordinateDTO[] | undefined {
     if(props.model.latitude && props.model.longitude){
      const response: coordinateDTO = {lat:props.model.latitude,
      lng:props.model.longitude
      }
      return [response];
     }
     return undefined;
  }

 return(
         <Formik
         initialValues={props.model} 
         onSubmit = {props.onSubmit}
         validationSchema={Yup.object({
          //Here All Form Input Fields Validation Rules 
          name:Yup.string().required("The name is required").firstLetterUppercase()
        })}
         >
            {(formikProps) => (
               <Form>
                <TextField displayName="Name" fieldName="name"/>
                  
                  <div style={{marginBottom: '1rem'}}>
                      <MapField latField="latitude" lngField="longitude"
                      coordinates={transformCoordinates()}
                      />
                  </div>
                  <Button className="btn btn-primary" disabled={formikProps.isSubmitting} type="submit" >Save</Button>
                <Link className='btn btn-secondary' to="/movietheaters"> Cancel</Link>
                </Form> 
           )}   
         </Formik>
    )

}
interface movieTheaterFormProps{

model:movieTheaterCreationDTO;
onSubmit(values: movieTheaterCreationDTO, action: FormikHelpers<movieTheaterCreationDTO>):void;
}