import * as Styles from '../registration.styled.ts';
import React from "react";
import {GlobalContext} from "../../../context/globalContext.tsx";
import {FacebookLogo, InstagramLogo} from "phosphor-react";

function Conclusion() {
    const [loading, setLoading] = React.useState(true)
    const {concludeForm, politic} = React.useContext(GlobalContext)

    React.useEffect(()=>{
        concludeForm()
            .then(()=>{
            setLoading(false)
        })
            .catch(()=>{
                console.log('error')
            })

    }, [])

    return loading ? null : (
        <Styles.ConclusionWrapper>
            <p>Sucesso!</p>

            <p>
                Em breve enviaremos um email com atualizações.
                Enquanto isso que conecte-se conosco através
                das nossas redes sociais.
            </p>

            <Styles.Socials>
                <a  target="_blank" href={`https://${politic!.facebook}`}>
                    <FacebookLogo  size={48} weight="fill" />
                </a>

                <a  target="_blank" href={`https://${politic!.instagram}`}>
                    <InstagramLogo  size={48} weight="fill" />
                </a>
            </Styles.Socials>
        </Styles.ConclusionWrapper>
    );
}

export default Conclusion;