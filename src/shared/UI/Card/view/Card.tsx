import { CardProps } from "../type/CardType"
import { FC, useState } from "react"
import { Button, Typography, Box } from "@mui/material"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";


const Card:FC<CardProps> = (props) => {

    const {cardData, inCart} = props

    const location = useLocation()

    const notify = () => toast.success("Добавленно в корзину");
    const notifyDelete = () => toast.error("Удалено из корзины");

    const [isInCart, setIsInCart] = useState(inCart)

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
                <Button onClick={handleDeleteFromCard}>Удалить из корзины</Button> : 
                <Button variant="contained" onClick={handleAddToCart}>Добавить в корзину</Button>
            }
        </Box>
    )
}

export default Card