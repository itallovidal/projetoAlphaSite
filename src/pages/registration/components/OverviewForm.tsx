import Button from "../../../globalComponents/button/Button.tsx";
import Input from "../../../globalComponents/input/Input.tsx";
import * as Styles from '../registration.styled.ts';
import {useForm} from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {useOutletContext} from "react-router-dom";
import React from "react";

// schema de validacão
const schema =  z.object({
    name:   z.string()
            .min(3, {message:"Mínimo de 3 caracteres."}),
    lastName: z.string()
            .min(3, {message:"Mínimo de 3 caracteres."}),
    birthday: z.date(),
    email: z.string()
            .email({message: 'email inválido.'}),
    telephone: z.string()
        .nonempty({message:"Digite o número de celular."})
        .regex(/^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/, {message: "Número inválido."})
})

// interface inferida do schema
export interface IOverviewForm extends z.infer<typeof schema>{}


interface IOutletContext{
    finishOverview: (a: IOverviewForm)=> void
}

function mascaraTelefone(e: HTMLInputElement, tel: HTMLInputElement) {

    let valor = e.value
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    tel.value = valor // Insere o(s) valor(es) no campo
}


function OverviewForm() {
    const {finishOverview} = useOutletContext<IOutletContext>()
    const {register ,formState: {errors}, handleSubmit} = useForm<IOverviewForm>({
        resolver: zodResolver(schema)
    })

    function handleStep(data: IOverviewForm){
        console.log('submitting form')
        finishOverview(data)
    }



    React.useEffect(()=>{
        const tel = document.querySelector<HTMLInputElement>('#telephone')!

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
                    errorMessage={errors.name?.message}
                    labelName={'Nome'}
                    type={'text'}
                    id={'name'}
                    placeholder={'Ex.: João'}/>

                <Input<IOverviewForm>
                    register={register}
                    errorMessage={errors.lastName?.message}
                    labelName={'Sobrenome'}
                    type={'text'}
                    id={'lastName'}
                    placeholder={'Ex.: Silva'}/>
            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IOverviewForm>
                    register={register}
                    errorMessage={errors.birthday?.message && 'Selecione uma data.'}
                    proportion={1}
                    labelName={'Data de Nascimento'}
                    type={'date'}
                    id={'birthday'}
                    placeholder={'Ex.: 10/10/2000'}/>

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
                    errorMessage={errors.telephone?.message}
                    proportion={1}
                    labelName={'Telefone'}
                    type={'text'}
                    maxLength={15}
                    id={'telephone'}
                    placeholder={'Ex.: (21) 99999-9999'}/>

                <div id={'container_button'}>
                    <Button type={"submit"} variant={'primary'}>Avançar</Button>
                </div>

            </Styles.FieldSet>

        </Styles.Form>
    );
}

export default OverviewForm;