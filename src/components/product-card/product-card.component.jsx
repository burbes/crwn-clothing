import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';

import { addItemToCart } from '../../store/cart/cart.action';

import {BUTTON_TYPES_CLASSES} from '../button/button.component'

import { 
    ProductCardContainer,
    ProductCardImage,
    ProductCardButton,
    ProductCardFooter,
    ProductCardName,
    ProductCardPrice    
 }
from 
'./product-card.styles.jsx'

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProducttoCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <ProductCardImage src={imageUrl} alt={`${name}`} />
            <ProductCardFooter>
                <ProductCardName>{name}</ProductCardName>
                <ProductCardPrice>{price}</ProductCardPrice>
            </ProductCardFooter>
            <ProductCardButton $buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProducttoCart}>
                Add to cart
            </ProductCardButton>
        </ProductCardContainer>);
}

export default ProductCard;