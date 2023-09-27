import * as Styles from './registration.styled.ts'

import profilePlaceholder from '../../assets/profilePicturePlaceholder.jpg'

import {Outlet, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {IOverviewForm} from "./components/OverviewForm.tsx";
import {IAddressForm} from "./components/AddressForm.tsx";

// export type IUser = IOverviewForm & IAddressForm

export interface IUser extends IOverviewForm{
    endereco: IAddressForm
}
function Registration() {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [userData, setUserData] = React.useState<IUser>({} as IUser)
    console.log(userData)
    function finishOverview(data: IOverviewForm ){
        setUserData((prev)=> {
            return {...prev, ...data}
        });
        console.log('received')
        navigate('/address')
    }

    function finishForm(data: IAddressForm){
        setUserData((prev)=> {
            return {...prev,
                endereco:{...data}}
        });
        navigate('/conclusion')
    }


    return (
        <Styles.ContentWrapper>
            <Styles.Content>
                <Styles.FormWrapper>
                    <Styles.Header>
                        <h1>Cadastramento</h1>
                        <h3>Precisaremos de algumas informações.</h3>
                    </Styles.Header>

                    <Styles.FormStatus step={pathname === '/' ? 1 : pathname === '/address' ? 2 : 3 }>
                        <span>Dados Gerais</span>
                        <span>Endereço</span>
                        <span>Agradecimento</span>
                    </Styles.FormStatus>

                <Outlet context={{finishOverview, finishForm, userData}}/>

                </Styles.FormWrapper>
                <Styles.BannerWrapper>
                    <picture>
                        <img src={profilePlaceholder} alt=""/>
                    </picture>

                    <label htmlFor="">Nome d. Candidato</label>
                </Styles.BannerWrapper>
            </Styles.Content>
        </Styles.ContentWrapper>
    );
}

export default Registration;