import Button from "../../../globalComponents/button/Button.tsx";
import Input from "../../../globalComponents/input/Input.tsx";
import * as Styles from '../registration.styled.ts';
import {useForm} from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import React from "react";
import {GlobalContext} from "../../../context/globalContext.tsx";
import {mascaraTelefone} from "../../../utils/inputMasks.ts";

// schema de validacão
const schema =  z.object({
    nome:   z.string()
            .min(3, {message:"Mínimo de 3 caracteres."}),
    sobrenome: z.string()
            .min(3, {message:"Mínimo de 3 caracteres."}),
    data_nascimento: z.string().nonempty("Não deixe em branco!").refine((data)=>{
        const dia = Number(data.substring(0,2))
        return !(dia < 0 || dia > 31 || isNaN(dia));

    }, {message: "Adicione um dia válido."}).refine((data)=>{
        const mes = Number(data.substring(3,5))
        return !(mes < 0 || mes > 12 || isNaN(mes));
    }, {message: "Adicione um mês válido."}).refine((data)=>{
        const ano = Number(data.substring(6,10))
        return !(ano < 0 || ano > 2024 || isNaN(ano));
    }, {message: "Adicione um ano válido."}),
    email: z.string()
            .email({message: 'email inválido.'}),
    telefone: z.string()
        .nonempty({message:"Digite o número de celular."})
        .regex(/^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$/, {message: "Número inválido."})
})

// interface inferida do schema
export interface IOverviewForm extends z.infer<typeof schema>{}



function OverviewForm() {
    const {finishOverview} = React.useContext(GlobalContext)
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<IOverviewForm>({
        resolver: zodResolver(schema)
    })

    function handleStep(data: IOverviewForm){
        finishOverview(data)
    }


    React.useEffect(()=>{
        const tel = document.querySelector<HTMLInputElement>('#telefone')!

        tel.addEventListener('keypress', function (this: HTMLInputElement){
            mascaraTelefone(this, tel);
        }) // Dispara quando digitado no campo

        tel.addEventListener('change', function(this: HTMLInputElement) {
            mascaraTelefone(this, tel)
        } )

    }, [])


    return (
        <Styles.Form onSubmit={handleSubmit(handleStep)}>
            <Styles.FieldSet>
                <Input<IOverviewForm>
                    register={register}
                    errorMessage={errors.nome?.message}
                    labelName={'Nome'}
                    type={'text'}
                    id={'nome'}
                    placeholder={'Ex.: João'}/>

                <Input<IOverviewForm>
                    register={register}
                    errorMessage={errors.sobrenome?.message}
                    labelName={'Sobrenome'}
                    type={'text'}
                    id={'sobrenome'}
                    placeholder={'Ex.: Silva'}/>
            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IOverviewForm>
                    register={register}
                    errorMessage={errors.data_nascimento?.message}
                    proportion={1}
                    labelName={'Data de Nascimento'}
                    id={'data_nascimento'}
                    />

                <Input <IOverviewForm>
                    register={register}
                    errorMessage={errors.email?.message}
                    proportion={3}
                    labelName={'Email'}
                    type={'text'}
                    id={'email'}
                    placeholder={'Ex.: joaosilva123@gmail.com'}/>
            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IOverviewForm>
                    register={register}
                    errorMessage={errors.telefone?.message}
                    proportion={1}
                    labelName={'Telefone'}
                    type={'text'}
                    maxLength={15}
                    id={'telefone'}
                    placeholder={'Ex.: (21) 99999-9999'}/>

                <div id={'container_button'}>
                    <Button type={"submit"} variant={'primary'}>Avançar</Button>
                </div>

            </Styles.FieldSet>

        </Styles.Form>
    );
}

export default OverviewForm;