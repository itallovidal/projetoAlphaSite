import * as Styles from '../registration.styled.ts';
import React from "react";
import {GlobalContext} from "../../../context/globalContext.tsx";
import {FacebookLogo, Globe, InstagramLogo, LinkedinLogo, WhatsappLogo, YoutubeLogo} from "phosphor-react";
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
            setTimeout(function() {
                if(politic.whatsappCommunity){
                    window.location.href = politic.whatsappCommunity;
                }
            }, 5000);
        })
            .catch(()=>{
                console.log('error')
            })

    }, [])

    return loading ? <Styles.LoadingGif src={loadingGif}/> : (
        <Styles.ConclusionWrapper>
            <p>Sucesso!!</p>

            <p>
                Bem vindo à família Carrilho! Conecte-se conosco através das mídias sociais abaixo, e fique por dentro das
                atualizações em primeira mão entrando em nossa comunidade do whatsApp!
            </p>

            <Styles.Socials>
                {politic.whatsappCommunity && (
                    <>
                        <h3> Iremos lhe enviar para o whatsapp já já.</h3>
                        <a  target="_blank" href={`${politic.whatsappCommunity}`}>
                            <WhatsappLogo size={32} weight="light" />
                        </a>
                    </>

                )}

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