import { Link } from "react-router-dom";
import { urlActors } from "../endpoin";
import IndexEntity from "../utilities/IndexEntity";
import { actorDTO } from "./actors.model";

export default function IndexActors(){
    return(<>
    
    <IndexEntity <actorDTO> 
    url = {urlActors} createURL ='/actors/create' title = "Actors"
    entityName="Actor"
    
    >
        {(actors,buttons) => <>
        
        <thead>
            <tr>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {actors?.map(actor => <tr key={actor.id}>
                <td>{actor.name}</td>
                <td>
                    {buttons(`/actors/edit/${actor.id}`,actor.id)}
                </td>
            </tr>)}
        </tbody>
        
        </>}
    </IndexEntity>
        

    </>)
}