import * as Styles from './footer.styled.ts'
import {FacebookLogo, InstagramLogo} from "phosphor-react";
import React from "react";
import {GlobalContext} from "../../context/globalContext.tsx";


function Footer() {
    const {politic} = React.useContext(GlobalContext)

    return politic ? (
        <Styles.Footer>
            <Styles.Content>
                <Styles.SocialMediaWrapper>
                    <h3>Redes Sociais</h3>

                    <Styles.SocialMediaIcons>
                        <a  target="_blank" href={`https://${politic.facebook}`}>
                            <FacebookLogo  size={32} weight="light" />
                        </a>

                        <a  target="_blank" href={`https://${politic.instagram}`}>
                            <InstagramLogo  size={32} weight="light" />
                        </a>
                        {/*<YoutubeLogo size={32} weight="light" />*/}
                        {/*<TwitterLogo size={32} weight="light" />*/}
                    </Styles.SocialMediaIcons>

                    {/*<picture>*/}
                    {/*    /!*<img src={voteIcon} alt=""/>*!/*/}
                    {/*</picture>*/}
                </Styles.SocialMediaWrapper>

                <Styles.Contact>
                    <h3>Contate-nos!</h3>

                    <span>{politic.email}</span>
                    <span>{politic.siteInstitucional}</span>
                </Styles.Contact>
            </Styles.Content>
        </Styles.Footer>
    ) : null
}

export default Footer;