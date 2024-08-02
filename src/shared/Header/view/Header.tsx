
import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Container from "../../UI/Container"
import LangSelector from "../../UI/LangSelector"
import { currentLang } from "../../../i18next"

const Header = () => {

    const {t} = useTranslation()

    return(
        <Box sx={{
            position: 'sticky',
            zIndex: '1', 
            top: '0.1px',
            background: "#fff"
        }}>
        <Container>
            <Box sx={{
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& a':{ 
                    textDecoration: 'none !important',
                    fontSize: '24px',
                    color: '#000',
                    fontWeight: 'bold',
                    padding: '8px 16px'
                }
            }}>
                <Box>
                    <Link to={'/'}>{t('Home')}</Link>
                    <Link to={'/cart'}>{t('Cart')}</Link>
                </Box>
                <LangSelector defaultOption={currentLang} />
            </Box>
        </Container>
        </Box>
    )
}

export default Header