export interface User {
    username: string
    jwttoken: string;
    roles: string;
}

export const unknownUser:User = {
    username: "",
    jwttoken: "",
    roles: ""
}