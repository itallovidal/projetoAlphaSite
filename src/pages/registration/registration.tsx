import * as Styles from './registration.styled.ts'
import {Outlet, useLocation, useParams} from "react-router-dom";
import {GlobalContext} from "../../context/globalContext.tsx";
import React from 'react'



function Registration() {
    const {state} = useLocation()
    const {politic, setID} = React.useContext(GlobalContext)
    const {id} = useParams()

    React.useEffect(()=>{
        if(id)
            setID(id)
    }, [id])


    return politic
        ? (
        <Styles.ContentWrapper>
            <Styles.Content>
                <Styles.FormWrapper>
                    <Styles.Header>
                        <h1>{JSON.stringify(politic)}</h1>
                        <h3>Precisaremos de algumas informações.</h3>
                    </Styles.Header>

                    <Styles.FormStatus step={state === null ? 1 : state === 'address' ? 2 : 3 }>
                        <span>Dados Gerais</span>
                        <span>Endereço</span>
                        <span>Agradecimento</span>
                    </Styles.FormStatus>

                <Outlet/>

                </Styles.FormWrapper>
                <Styles.BannerWrapper>
                    <picture>
                        <img src={politic.profile_image} alt=""/>
                    </picture>

                    <label htmlFor="">{politic.nome}</label>
                </Styles.BannerWrapper>
            </Styles.Content>
        </Styles.ContentWrapper>
    ) : null
}

export default Registration;