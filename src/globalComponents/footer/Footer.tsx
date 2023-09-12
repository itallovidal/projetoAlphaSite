import * as Styles from './footer.styled.ts'
import {FacebookLogo, InstagramLogo, TwitterLogo, YoutubeLogo} from "phosphor-react";
import voteIcon from '../../assets/vote.png'
function Footer() {
    return (
        <Styles.Footer>
            <Styles.Content>
                <Styles.SocialMediaWrapper>
                    <h3>Redes Sociais</h3>

                    <Styles.SocialMediaIcons>
                        <FacebookLogo size={32} weight="light" />
                        <InstagramLogo size={32} weight="light" />
                        <YoutubeLogo size={32} weight="light" />
                        <TwitterLogo size={32} weight="light" />
                    </Styles.SocialMediaIcons>

                    <picture>
                        <img src={voteIcon} alt=""/>
                    </picture>
                </Styles.SocialMediaWrapper>

                <Styles.Contact>
                    <h3>Contate-nos!</h3>

                    <span>pessoa@gmail.com</span>
                    <span>21 9999 99999</span>
                    <span>siteinstitucional.com</span>

                </Styles.Contact>
            </Styles.Content>
        </Styles.Footer>
    );
}

export default Footer;