import * as Styles from '../registration.styled.ts';
import {useForm} from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {Link, useOutletContext} from "react-router-dom";
import Input from "../../../globalComponents/input/Input.tsx";
import Button from "../../../globalComponents/button/Button.tsx";

// schema de validacão
const schema =  z.object({
    cep:   z.string().min(8, {message: 'CEP precisa de 8 caracteres.'})
            .max(8,{message: 'Máximo de 8 caracteres.'})
            .regex(/\d{5}\d{3}/, {message: 'Digite um cep válido'}),
    district: z.string()
        .min(3, {message:"Mínimo de 3 caracteres."}),
    UF: z.string({
        required_error: 'Escreva o UF'
        }).min(2, {message: 'Mínimo de 2 caracteres.'})
        .max(2, {message: 'Máximo de 2 caracteres.'}),
    street: z.string({
        required_error: 'Digite a rua, por favor.'
    }).min(3,  {message: 'Pelo menos 3 caracteres.'}),
    city: z.string().nonempty({message: 'Por favor, coloque a cidade.'})
})

// interface inferida do schema
export interface IAddressForm extends z.infer<typeof schema>{}


interface IOutletContext{
    finishForm: (a: IAddressForm)=> void
}
function AddressForm() {
    const {finishForm} = useOutletContext<IOutletContext>()
    const {register ,formState: {errors}, handleSubmit} = useForm<IAddressForm>({
        resolver: zodResolver(schema)
    })


    function handleStep(data: IAddressForm){
        console.log('submitting form 2')
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
                    errorMessage={errors.district?.message}
                    labelName={'Bairro'}
                    type={'text'}
                    id={'district'}
                    placeholder={'Ex.: Madureira'}/>
            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.UF?.message}
                    proportion={1}
                    labelName={'UF'}
                    type={'text'}
                    id={'UF'}
                    placeholder={'Ex.: RJ'}/>

                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.street?.message}
                    proportion={4}
                    labelName={'Rua'}
                    type={'text'}
                    id={'street'}
                    placeholder={'Ex.: Rua santo antônio'}/>
            </Styles.FieldSet>

            <Styles.FieldSet>
                <Input <IAddressForm>
                    register={register}
                    errorMessage={errors.city?.message}
                    proportion={1}
                    labelName={'Cidade'}
                    type={'text'}
                    id={'city'}
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