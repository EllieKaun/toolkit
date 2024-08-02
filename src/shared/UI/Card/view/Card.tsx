import { CardProps } from "../type/CardType"
import { FC, useState, useEffect } from "react"
import { Button, Typography, Box } from "@mui/material"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Card:FC<CardProps> = (props) => {

    const {cardData, inCart} = props

    const {t} = useTranslation()

    const location = useLocation()

    const notify = () => toast.success("Добавленно в корзину");
    const notifyDelete = () => toast.error("Удалено из корзины");

    const [isInCart, setIsInCart] = useState(inCart)

    useEffect(() => {
        const currentData = localStorage.getItem('cartData') ? [...JSON.parse(localStorage.getItem('cartData')  || "")] : []
        currentData.forEach((item) => {
            if(item.id === cardData.id){
                setIsInCart(true)
            }
        })
    }, [])

    const handleAddToCart = () => {
        const currentData =localStorage.getItem('cartData') ? [...JSON.parse(localStorage.getItem('cartData')  || "")] : []
        currentData?.push(cardData)
        localStorage.setItem('cartData', JSON.stringify(currentData))
        notify()
        setIsInCart(true)
    }
    
    const handleDeleteFromCard = () => {
        const currentData = localStorage.getItem('cartData') ? [...JSON.parse(localStorage.getItem('cartData')  || "")] : []
        const filtredCart = currentData.filter((item) => (cardData.id !== item.id))
        localStorage.setItem('cartData', JSON.stringify(filtredCart))
        if(location.pathname === '/cart'){
            window.location.reload()
            localStorage.setItem('isItemDeleted', '1')
        }else{
            notifyDelete()
            setIsInCart(false)
        }
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            justifyContent: "space-between",
            border: '1px solid',
            borderRadius: '8px',
            padding: '8px 16px'
        }}>
            <Typography>{cardData.title}</Typography>
            <Typography>{cardData.id}</Typography>
            {isInCart ? 
                <Button onClick={handleDeleteFromCard}>{t('RemoveFromCart')}</Button> : 
                <Button variant="contained" onClick={handleAddToCart}>{t('AddToCart')}</Button>
            }
        </Box>
    )
}

export default Card