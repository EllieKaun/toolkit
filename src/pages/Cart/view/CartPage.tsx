import { useEffect } from "react";
import CartFeature from "../../../features/Cart";
import Container from "../../../shared/UI/Container";
import { toast } from "react-toastify";

const CartPage = () => {

    const notifyDelete = () => toast.error("Удалено из корзины");


    useEffect(() => {
        const alert = localStorage.getItem("isItemDeleted")
        if(alert && +alert){
            notifyDelete()
            setTimeout(() => localStorage.setItem("isItemDeleted", "0"), 0)
        }
    }, [])

    return (
        <Container>
            <CartFeature />
        </Container>
    )
}


export default CartPage