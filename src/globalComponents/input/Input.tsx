import {HTMLProps} from "react";
import * as Styles from './Input.styled.ts'
import {UseFormRegister, FieldValues, Path} from "react-hook-form";


interface IInputProps<T extends FieldValues> extends HTMLProps<HTMLInputElement>{
    labelName: string,
    proportion?: number,
    errorMessage?: string,
    register: UseFormRegister<T>,
}

function Input<T extends FieldValues>({register, errorMessage, proportion, labelName, ...props} : IInputProps<T> ) {

    return (
        <Styles.FieldWrapper $proportion={proportion ? proportion : 1}>
            <label htmlFor={props.id}>{labelName}</label>
            <input {...props}
                   {...register(props.id as Path<T>, {
                       valueAsDate: props.id === `data_nascimento`,
                   })}/>
            <span className={errorMessage ? 'errorActive' : undefined}>{errorMessage}</span>
        </Styles.FieldWrapper>
    );
}

export default Input;

// {...register(props.id)}