import {IUser} from "../pages/registration/registration.tsx";

export async function postUser(data : IUser){
    console.log(data)

    const response = fetch('http://localhost:3333/politics/XvLbi3mhFVcZqhqgLJFD/registration', {
        method: 'POST',
        cache: "no-cache",

        headers:{
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data)
    })

    return response
}