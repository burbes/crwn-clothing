
import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems
        .find(cartItem => cartItem.id === cartItemToAdd.id);
    if (existingCartItem) {
        return cartItems
            .map(cartItem =>
                cartItem.id === cartItemToAdd.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem);
    } else {
        return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
    }
}

const remCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems
        .find(cartItem => cartItem.id === cartItemToRemove.id);
    if (existingCartItem.quantity === 1) {
        return cartItems
            .filter(cartItem => cartItem.id !== cartItemToRemove.id);
    } else {
        return cartItems
            .map(cartItem =>
                cartItem.id === cartItemToRemove.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem);
    }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems
        .filter(cartItem => cartItem.id !== cartItemToClear.id);
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        setCartItems(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = remCartItem(cartItems, productToRemove);
        setCartItems(newCartItems);
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        setCartItems(newCartItems);
    }

    // sum quantity of all cart items
    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);


    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);


    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
};