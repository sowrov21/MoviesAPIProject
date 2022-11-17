import { transform } from "typescript";
import { urlActors } from "../endpoin";
import EditEntity from "../utilities/EditEntity";
import { convertActorToFormData } from "../utilities/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO, actorDTO } from "./actors.model";

export default function EditActors(){

function transform(actor: actorDTO): actorCreationDTO{
  
    return {
        name: actor.name,
        pictureURL: actor.picture,
        biography: actor.biography,
        dateOfBirth: new Date(actor.dateOfBirth)

    }
}
  

    return(
    <EditEntity <actorCreationDTO,actorDTO> 
    url = {urlActors} redirectURL ="/actors" entityName ="Actor"
    transformFormData = {convertActorToFormData}
    transform = {transform}
    >
        {(entity,edit) => 
        
        <ActorForm
        model={entity}
        onSubmit = { async values => await edit(values)}
        />
        }
    </EditEntity>
    
    )
}