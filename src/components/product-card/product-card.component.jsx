import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component'

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
    const { addItemToCart } = useContext(CartContext);

    const addProducttoCart = () => addItemToCart(product);

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