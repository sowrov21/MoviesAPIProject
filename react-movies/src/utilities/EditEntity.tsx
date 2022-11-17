import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayServerSideErrors from "./DisplayServerSideErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation,TRead>
        (props: editEntityProps<TCreation,TRead>){

    
	const { id }:any = useParams();
    const navigate = useNavigate();
	const [entity, setEntity] = useState<TCreation>();
    const [errors,setErrors] = useState<string[]>([])
	useEffect(() => {
		axios
			.get(`${props.url}/${id}`)
			.then((response: AxiosResponse<TRead>) => {
				console.log(response.data);
				setEntity(props.transform(response.data));
			});
	}, [id]);

	async function edit(entityToEdit: TCreation) {
		try {

			if(props.transformFormData){
			const formData = props.transformFormData(entityToEdit);
			await axios({
				method: 'put',
				url: `${props.url}/${id}`,
				data: formData,
				headers: {'Content-Type': 'multipart/form-data'}
			  });
	  
			  //navigate('/actors');
	  

			}else{
				await axios.put(`${props.url}/${id}`, entityToEdit);
			}

			navigate(props.redirectURL);
		} catch (error) {
			//console.log(error);
			// @ts-ignore
			if (error && error.response) {
				// @ts-ignore
				setErrors(error.response.data);
			}
		}
	}

return(

  <>
    
    <h3>Edit {props.entityName}</h3>
			<div>
				<DisplayServerSideErrors errors={errors} />
			</div>
        {entity ? props.children(entity, edit) : <Loading/>}
  
  </>
)

}


interface editEntityProps<TCreation,TRead>{
    url:string;
    redirectURL: string;
    entityName:string;
    transform(entity: TRead) : TCreation;
	transformFormData?(model: TCreation): FormData;
    children(entity: TCreation, edit: (entity: TCreation)=> void): ReactElement;
}

EditEntity.defaultProps = {
    transform:(entity: any) => entity
}