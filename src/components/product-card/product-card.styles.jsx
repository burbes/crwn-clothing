import styled from 'styled-components';

export const ProductCardImage = styled.img`
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
`;

export const ProductCardButton = styled.button`
  width: 80%;
  height: 50px; // Set an explicit height
  line-height: 50px; // Center the text vertically
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
  align-items: center; // Center content vertically for flex container
  justify-content: center; // Center content horizontally for flex container



    // If you want to apply styles based on props, you can do something like:

    ${props => props.$buttonType === 'inverted' && `
        background-color: white;
        color: black;
        border: 1px solid black;

        &:hover {
            background-color: black;
            color: white;
            border: none;
        }

        @media screen and (max-width: 800px) {
            background-color: black;
            color: white;
            border: none;
        }
        

    `}
`;

export const ProductCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;

    &:hover {
        ${ProductCardImage} {
            opacity: 0.8;
        }

        ${ProductCardButton} {
            opacity: 0.85;
            display: flex;            
        }
    }
`;

export const ProductCardFooter = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
`;

export const ProductCardName = styled.span`
    width: 90%;
    margin-bottom: 15px;
`;

export const ProductCardPrice = styled.span`
    width: 10%;
`;



// .product-card-container {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     height: 350px;
//     align-items: center;
//     position: relative;
  
//     img {
//       width: 100%;
//       height: 95%;
//       object-fit: cover;
//       margin-bottom: 5px;
//     }
  
//     button {
//       width: 80%;
//       opacity: 0.7;
//       position: absolute;
//       top: 255px;
//       display: none;
//     }
  
//     &:hover {
//       img {
//         opacity: 0.8;
//       }
  
//       button {
//         opacity: 0.85;
//         display: flex;
//       }
//     }
  
//     .footer {
//       width: 100%;
//       height: 5%;
//       display: flex;
//       justify-content: space-between;
//       font-size: 18px;
  
//       .name {
//         width: 90%;
//         margin-bottom: 15px;
//       }
  
//       .price {
//         width: 10%;
//       }
//     }
//   }
  