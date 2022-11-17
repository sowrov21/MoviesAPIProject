
import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { actorMovieDTO } from "../actors/actors.model";

export default function TypeAheadActors(props: typeAheadActorsProps){

const actors: actorMovieDTO[] =[
    {id:1, name: 'Sowrov', character:'', picture:'https://cutt.ly/sVccEz7'},
    {id:2, name: 'Tom Holland', character:'', picture:'https://cutt.ly/fVccaue'},
    {id:3, name: 'Sharukh Khan', character:'', picture:'https://cutt.ly/1Vcx6R2'},
    {id:4, name: 'Amir', character:'', picture:'https://cutt.ly/1Vccx3x'}
];

const selected: actorMovieDTO[] =[];

const [dragElemnent, setdragElemnent] = useState<actorMovieDTO|undefined>(undefined);

function handleDragStart(actor:actorMovieDTO){
    setdragElemnent(actor);
}

function handleDragOver(actor:actorMovieDTO){
    if(!dragElemnent){
        return;
    }
    if(actor.id !== dragElemnent.id){
        const dragElemnentIndex = props.actors.findIndex(x=>x.id === dragElemnent.id);
        const actorIndex = props.actors.findIndex(x=>x.id === actor.id);

        const actors = [...props.actors];
        actors[actorIndex] = dragElemnent;
        actors[dragElemnentIndex] =actor;
        props.onAdd(actors);
        
    }   
}

    return(
        <div className="mb-3">
        <label htmlFor="">{props.displayName}</label>
        <Typeahead
        id="typeahead"
        onChange={ actors => {
            // @ts-ignore
            if(props.actors.findIndex(x => x.id === actors[0].id) === -1){
            // @ts-ignore
                props.onAdd([...props.actors,actors[0]]);
            }
            console.log(actors);
        
        }}
        options ={actors}
        // @ts-ignore
        labelKey = {actor => actor.name}
        filterBy ={['name']}
        placeholder = "Search actor by name.."
        minLength={1}
        flip = {true}
        selected ={selected}
        renderMenuItemChildren = { actor => (
            
            <>
            <img src={ // @ts-ignore
            actor.picture}
             alt="actor"
             
             style={{
                height: '64px',
                marginRight: '10px',
                width: '54px'
             }}
             />
             <span>
                {
                    // @ts-ignore
                    actor.name
                }
            </span>
            </>
        )}

        />

        <ul className="list-group">
                {props.actors.map(actor => <li key={actor.id}
                className = "list-group-item list-group-item-action"
                draggable = {true}
                onDragStart = {()=>{ handleDragStart(actor)}}
                onDragOver = {()=>{ handleDragOver(actor)}}
                >
                {props.listUI(actor)}
                <span className="badge badge-primary badge-pill pointer text-dark"
                style = {{marginLeft: '0.5rem'}}
                onClick = {()=>{props.onRemove(actor)}}
                >X</span>
                </li>)}
        </ul>
        </div>
    )
}

interface typeAheadActorsProps{
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors:actorMovieDTO[]):void;
    onRemove(actor:actorMovieDTO):void
    listUI(actor:actorMovieDTO): ReactElement;

}