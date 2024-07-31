
import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"


const Header = () => {

    const {t} = useTranslation()

    return(
        <Box>
            <Link to={'/'}>{t('Home')}</Link>
            <span>''</span>
            <Link to={'/cart'}>Cart</Link>
        </Box>
    )
}

export default Header