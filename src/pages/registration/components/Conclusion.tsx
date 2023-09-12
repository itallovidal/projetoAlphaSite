import * as Styles from '../registration.styled.ts';
import {useOutletContext} from "react-router-dom";
import {IUser} from "../registration.tsx";

function Conclusion() {
    const {userData} = useOutletContext<{userData: IUser}>()
    console.log(userData)

    return (
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