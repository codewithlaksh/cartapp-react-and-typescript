import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import CartItem from './CartItem'
import { formatCurrency } from '../utilities/formatCurrency'
import storeItems from '../data/items.json'

type ShoppingCartProps = {
    isOpen: boolean
}

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart();
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item, index) => {
                        return <CartItem key={index} {...item} />
                    })}
                </Stack>
                <hr className="my-3" />
                <div className="fw-bold fs-5">
                    Total {formatCurrency(
                        cartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(i => i.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                    )}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
