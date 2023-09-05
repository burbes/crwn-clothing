import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';

import Button, { BUTTON_TYPES_CLASSES}from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems
} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => navigate('/checkout');

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (<CartItem key={item.id} item={item} />
                    ))) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler} buttonType='inverted' >GOTOCHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;