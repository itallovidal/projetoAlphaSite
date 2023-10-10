import {IPolitic, IUser} from "../@types/interfaces";
import {api} from "./axiosConfig.ts";
import {AxiosError} from "axios";

export async function postUser(data : IUser, collection_id: string){

    console.log(data)

    const response = await fetch(`https://projetoalphaapi.onrender.com/voters/${collection_id}`, {
        method: 'POST',
        cache: "no-cache",
        headers:{
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data)
    })

    return response
}

export async function getPolitic(id: string) : Promise<IPolitic>{
    try {
        const response = await api.get(`/politics/${id}`)
        return response.data
    }catch (e: any){

        if(e instanceof AxiosError){
            if(e.response){
                throw new Error(e.response.data.message)
            }
        }

        throw new Error(e)
    }
}