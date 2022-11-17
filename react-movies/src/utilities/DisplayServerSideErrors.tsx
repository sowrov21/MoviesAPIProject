export default function DisplayServerSideErrors(props: displayServerSideErrorsProps){

    return(
        <>
           {
            props.errors?
            <ul style={{color:'red'}}>
                {props.errors.map((error,index) => <li key={index}>{error}</li>)}
            </ul>
            :null 
           }
        </>
    )
}

interface displayServerSideErrorsProps{
 errors?: string[];
}