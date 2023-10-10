import * as Styles from './errorPage.styled.ts'
import notFound from '../../assets/notFound.svg'
import qrcodeerror from '../../assets/qrcodeerror.svg'

interface errorPageProps{
    errorType: "404" | "idNotFound"
}

const errorSchema = {
    "404":{
        header: <h1><b>OPS!</b> Rota não encontrada.</h1>,
        paragraph: <p>Parece que você está tentado acessar uma página que não existe.</p>,
        imagePath: notFound
    },
    "idNotFound":{
        header: <h1><b>OPS!</b> QR Incorreto.</h1>,
        paragraph: <p>Algo deu errado no scan do QR Code.</p>,
        imagePath: qrcodeerror
    }
}
function ErrorPage({errorType} : errorPageProps){
    return (
       <Styles.Wrapper>

           {errorSchema[errorType].header}
           {errorSchema[errorType].paragraph}

           <picture>
               <img src={errorSchema[errorType].imagePath} alt=""/>
           </picture>
       </Styles.Wrapper>
    )
}

export default ErrorPage