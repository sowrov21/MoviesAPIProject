import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../endpoin";
import DisplayServerSideErrors from "../utilities/DisplayServerSideErrors";
import { authencationResponse, userCredentials } from "./auth.models";
import AuthenicationContext from "./AuthencationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";

export default function Register(props: registerProps){
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenicationContext);
    
async function register(credentials:userCredentials) {
    try {
        const response = await axios
        .post<authencationResponse>(`${urlAccounts}/create`, credentials);
        saveToken(response.data);
        update(getClaims());
        navigate('/');
        console.log(response);
    } catch (error) {
        // @ts-ignore
        setErrors(error.response.data)
    }
}

    return (

        <>
        <h3>Register</h3>
        <DisplayServerSideErrors errors={errors}/>
        <AuthForm
        model={{email:'',password:''}}
        onSubmit = { async value => await register(value)}
        
        />
        </>
    )
}
interface registerProps{

}