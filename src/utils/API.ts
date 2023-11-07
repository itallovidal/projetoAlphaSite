import {IPolitic, IUser} from "../@types/interfaces";
import {api} from "./axiosConfig.ts";
import {AxiosError} from "axios";

export async function postUser(data : IUser, collection_id: string){

    const response = await api.post(`voters/${collection_id}`, data , {
        method: 'POST',
        headers:{
            "Content-Type": 'application/json',
        },
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