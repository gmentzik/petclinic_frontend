import { User, unknownUser } from "../api/models/User";


export const storeCurrentUserToLocalStorage= (user: User) => {
    localStorage.setItem('petUser', JSON.stringify(user));
}

export const removeCurrentUserFromLocalStorage= () => {
    localStorage.removeItem('petUser');
}

export const getCurrentUserFromLocalStorage= ():User => {
    const petUserJson = localStorage.getItem('petUser');
    const petUser:User = petUserJson !== null ? JSON.parse(petUserJson) : unknownUser;
    return petUser;
}