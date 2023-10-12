import {IOverviewForm} from "../pages/registration/components/OverviewForm.tsx";
import {IAddressForm} from "../pages/registration/components/AddressForm.tsx";

export interface IUser extends IOverviewForm{
    endereco: IAddressForm
}

export interface IPolitic{
    nome: string,
    profile_image: string,
    id: string,
    collection_id: string
    email: string,
    siteInstitucional: string,
    facebook: string,
    linkedin: string
}

export interface IGlobalContext{
    politic: IPolitic,
    finishOverview: (data: IOverviewForm)=> void
    finishForm: (data: IAddressForm)=> void
    concludeForm: ()=> Promise<boolean>,
    setPoliticData: (data: IPolitic)=> void
}