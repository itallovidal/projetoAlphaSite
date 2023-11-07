import * as Styles from '../registration.styled.ts';
import React from "react";
import {GlobalContext} from "../../../context/globalContext.tsx";
import {FacebookLogo, Globe, InstagramLogo, LinkedinLogo, YoutubeLogo} from "phosphor-react";
import loadingGif from '../../../assets/loadingSend.gif'
import {useNavigate, useParams} from "react-router-dom";

function Conclusion() {
    const [loading, setLoading] = React.useState(true)
    const {concludeForm, politic,  userData} = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const {id} = useParams()


    React.useEffect(()=>{
        if(!userData.endereco){
            navigate(`/${id}`)
            return
        }
        concludeForm()
            .then(()=>{
            setLoading(false)
        })
            .catch(()=>{
                console.log('error')
            })

    }, [])

    return loading ? <Styles.LoadingGif src={loadingGif}/> : (
        <Styles.ConclusionWrapper>
            <p>Sucesso!!</p>

            <p>
                Em breve enviaremos um email com atualizações.
                Enquanto isso, conecte-se conosco através
                das nossas redes sociais.
            </p>

            <Styles.Socials>
                {politic.facebook && (
                    <a  target="_blank" href={`${politic.facebook}`}>
                        <FacebookLogo  size={32} weight="light" />
                    </a>
                )}

                {politic.linkedin &&(
                    <a  target="_blank" href={`${politic.linkedin}`}>
                        <LinkedinLogo size={32} weight="light" />
                    </a>
                )}


                {politic.youtube &&(
                    <a  target="_blank" href={`${politic.youtube}`}>
                        <YoutubeLogo size={32} weight="light" />
                    </a>
                )}


                {politic.instagram &&(
                    <a  target="_blank" href={`${politic.instagram}`}>
                        <InstagramLogo size={32}  weight="light"/>
                    </a>
                )}


                {politic.siteInstitucional &&(
                    <a  target="_blank" href={`${politic.siteInstitucional}`}>
                        <Globe size={32} weight="light"/>
                    </a>
                )}
            </Styles.Socials>
        </Styles.ConclusionWrapper>
    );
}

export default Conclusion;