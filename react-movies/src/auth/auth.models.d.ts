export interface claim {
    name: string;
    value:string;
}
export interface userCredentials {
    email: string;
    password:string;
}
export interface authencationResponse {
    token: string;
    expiration:Date;
}