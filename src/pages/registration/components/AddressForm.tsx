import * as Styles from '../registration.styled.ts';
import {useForm} from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {Link, useNavigate, useParams} from "react-router-dom";
import Input from "../../../globalComponents/input/Input.tsx";
import Button from "../../../globalComponents/button/Button.tsx";
import React from "react";
import {GlobalContext} from "../../../context/globalContext.tsx";
import {bairroValidation, cepValidation, ruaValidation} from "./validations.ts";


// schema de validacão
const schema =  z.object({
    cep:   z.string().optional(),
    bairro: z.string().optional(),
    rua: z.string().optional(),
    cidade: z.string().nonempty({message: 'Por favor, coloque a cidade.'}),
    uf: z.string({
        required_error: 'Escreva o uf'
        }).min(2, {message: 'Mínimo de 2 caracteres.'})
        .max(2, {message: 'Máximo de 2 caracteres.'}),
})

// interface inferida do schema
export interface IAddressForm extends z.infer<typeof schema>{}




function AddressForm() {
    const {finishForm, userData} = React.useContext(GlobalContext)
    const {
        register,
        setError,
        formState: {errors, dirtyFields},
        handleSubmit
    } = useForm<IAddressForm>({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate()
    const {id} = useParams()

    const opcty = dirtyFields.cep || dirtyFields.rua || dirtyFields.bairro ? 1 : 0.3



    React.useEffect(()=>{
        if(!userData.nome){
            navigate(`/${id}`)
            return
        }
    },[])

    console.log()

    function handleStep(data: IAddressForm){
        console.log('Address finished')

        if(data.cep && data.cep?.length > 0){
            const cepResult = cepValidation.safeParse(data.cep)

            if(!cepResult.success){
                const errorMsg = JSON.parse(cepResult.error.message)[0].message
                setError("cep", {type: "custom", message: errorMsg})
                return
            }
        }

        if(data.rua && data.rua?.length > 0){
            const ruaResult = ruaValidation.safeParse(data.rua)
            if(!ruaResult.success){
                const errorMsg = JSON.parse(ruaResult.error.message)[0].message
                setError("rua", {type: "custom", message: errorMsg})
                return
            }
        }

        if(data.bairro && data.bairro?.length > 0){
            const bairroResult = bairroValidation.safeParse(data.bairro)

            if(!bairroResult.success){
                const errorMsg = JSON.parse(bairroResult.error.message)[0].message
                setError("bairro", {type: "custom", message: errorMsg})
                return
            }
        }


        console.log("tudo correto")
        finishForm(data)
    }

    return (
        <Styles.Form onSubmit={handleSubmit(handleStep)}>

            <Styles.FieldSet>
                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.cidade?.message}
                    proportion={2}
                    labelName={'Cidade'}
                    type={'text'}
                    id={'cidade'}
                    placeholder={'Ex.: Rio de Janeiro'}/>

                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.uf?.message}
                    proportion={1}
                    labelName={'UF'}
                    type={'text'}
                    id={'uf'}
                    maxLength={2}
                    placeholder={'Ex.: RJ'}/>

            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.cep?.message}
                    labelName={'CEP (Opcional)'}
                    type={'text'}
                    id={'cep'}
                    maxLength={8}
                    opacity={opcty}
                    placeholder={'Ex.: 21320340'}/>

                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.bairro?.message}
                    labelName={'Bairro (Opcional)'}
                    type={'text'}
                    id={'bairro'}
                    opacity={opcty}
                    placeholder={'Ex.: Madureira'}/>



            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.rua?.message}
                    proportion={4}
                    labelName={'Rua (Opcional)'}
                    type={'text'}
                    id={'rua'}
                    opacity={opcty}
                    placeholder={'Ex.: Rua santo antônio'}/>

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