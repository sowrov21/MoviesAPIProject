import React from "react";
import { claim } from "./auth.models";

const AuthenicationContext = React.createContext<{
    claims: claim[];
    update(claims: claim[]):void;
}>({claims: [], update: ()=>{}});

export default AuthenicationContext;