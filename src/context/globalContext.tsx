import React, {ReactNode} from "react";
import {postUser} from "../utils/API.ts";
import {useNavigate} from "react-router-dom";
import {IGlobalContext, IPolitic, IUser} from "../@types/interfaces";
import {IOverviewForm} from "../pages/registration/components/OverviewForm.tsx";
import {IAddressForm} from "../pages/registration/components/AddressForm.tsx";

export const GlobalContext = React.createContext({} as IGlobalContext)

interface GlobalContextProps{
    children: ReactNode
}
function GlobalContextProvider({children} : GlobalContextProps){
    const navigate = useNavigate()

    const [politic, setPolitic] = React.useState<IPolitic>({} as IPolitic)
    const [userData, setUserData] = React.useState<IUser>({} as IUser)

    function setPoliticData(data: IPolitic){
        setPolitic(data)
    }
    function finishOverview(data: IOverviewForm ){
        setUserData((prev)=> {
            return {...prev, ...data}
        });
        console.log('received')
        navigate(`/${politic.id}/address`, {
            state: 'address'
        })
    }

    function finishForm(data: IAddressForm){
        setUserData((prev)=> {
            return {...prev,
                endereco:{...data}}
        });
        navigate(`/${politic.id}/conclusion`, {
            state: 'finish'
        })
    }

    async function concludeForm(){
        if(politic){
            const response =  await postUser(userData, politic.collection_id)
            return response.status === 201;
        }

        return false
    }

    return (
        <GlobalContext.Provider value={{politic, userData,finishOverview, finishForm, concludeForm, setPoliticData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider