import React, {ReactNode} from "react";
import {getPolitic, postUser} from "../utils/API.ts";
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



    React.useEffect(()=>{
        if(politic && politic.id){
            getPolitic(politic.id).then((data)=>{
                console.log(data)
                setPolitic(data)
            })
        }
    },[politic.id])


    function setID(id: string){
        setPolitic((prev)=>{
            return {...prev, id: id}
        })
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
        <GlobalContext.Provider value={{politic, finishOverview, finishForm, concludeForm, setID}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider