import {IUser} from "../@types/interfaces";

export async function postUser(data : IUser, collection_id: string){
    console.log(data)

    const response = await fetch(`http://localhost:3333/voters/${collection_id}`, {
        method: 'POST',
        cache: "no-cache",
        headers:{
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data)
    })

    return response
}

export async function getPolitic(id: string){
    const response = await fetch(`http://localhost:3333/politics/${id}`)
    const data = await response.json()

    return data
}