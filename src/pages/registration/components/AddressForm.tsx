import * as Styles from '../registration.styled.ts';
import {useForm} from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {Link} from "react-router-dom";
import Input from "../../../globalComponents/input/Input.tsx";
import Button from "../../../globalComponents/button/Button.tsx";
import React from "react";
import {GlobalContext} from "../../../context/globalContext.tsx";

// schema de validacão
const schema =  z.object({
    cep:   z.string().min(8, {message: 'CEP precisa de 8 caracteres.'})
            .max(8,{message: 'Máximo de 8 caracteres.'})
            .regex(/\d{5}\d{3}/, {message: 'Digite um cep válido'}),
    bairro: z.string()
        .min(3, {message:"Mínimo de 3 caracteres."}),
    uf: z.string({
        required_error: 'Escreva o uf'
        }).min(2, {message: 'Mínimo de 2 caracteres.'})
        .max(2, {message: 'Máximo de 2 caracteres.'}),
    rua: z.string({
        required_error: 'Digite a rua, por favor.'
    }).min(3,  {message: 'Pelo menos 3 caracteres.'}),
    cidade: z.string().nonempty({message: 'Por favor, coloque a cidade.'})
})

// interface inferida do schema
export interface IAddressForm extends z.infer<typeof schema>{}




function AddressForm() {
    const {finishForm} = React.useContext(GlobalContext)
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<IAddressForm>({
        resolver: zodResolver(schema)
    })

    function handleStep(data: IAddressForm){
        console.log('Address finished')
        finishForm(data)
    }

    return (
        <Styles.Form onSubmit={handleSubmit(handleStep)}>

            <Styles.FieldSet>
                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.cep?.message}
                    labelName={'CEP'}
                    type={'text'}
                    id={'cep'}
                    placeholder={'Ex.: 21320340'}/>

                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.bairro?.message}
                    labelName={'Bairro'}
                    type={'text'}
                    id={'bairro'}
                    placeholder={'Ex.: Madureira'}/>
            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.uf?.message}
                    proportion={1}
                    labelName={'UF'}
                    type={'text'}
                    id={'uf'}
                    maxLength={2}
                    placeholder={'Ex.: RJ'}/>

                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.rua?.message}
                    proportion={4}
                    labelName={'Rua'}
                    type={'text'}
                    id={'rua'}
                    placeholder={'Ex.: Rua santo antônio'}/>
            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.cidade?.message}
                    proportion={1}
                    labelName={'Cidade'}
                    type={'text'}
                    id={'cidade'}
                    placeholder={'Ex.: Rio de Janeiro'}/>

                <div id={'container_button'}>
                    <Link to={'/'}>
                        <Button type={"button"} variant={'secondary'}>Voltar</Button>
                    </Link>
                    <Button type={"submit"} variant={'primary'}>Avançar</Button>
                </div>

            </Styles.FieldSet>

        </Styles.Form>
    );
}

export default AddressForm;