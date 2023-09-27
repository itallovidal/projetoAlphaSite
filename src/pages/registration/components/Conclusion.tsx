import * as Styles from '../registration.styled.ts';
import {useOutletContext} from "react-router-dom";
import {IUser} from "../registration.tsx";
import React from "react";
import {postUser} from "../../../utils/API.ts";

function Conclusion() {
    const {userData} = useOutletContext<{userData: IUser}>()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(()=>{
        postUser(userData).then((response)=>{
            console.log(response.status)
            setLoading(false)
        })
    }, [])

    return loading ? null : (
        <Styles.ConclusionWrapper>
            <p>Suas informações foram armazenadas.</p>

            <p>
                Em breve enviaremos um email com atualizações.
                Enquanto isso que conecte-se conosco através
                das nossas redes sociais.
            </p>
        </Styles.ConclusionWrapper>
    );
}

export default Conclusion;