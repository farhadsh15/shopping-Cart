import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

// Functions
import { isInCart, quantityCount } from '../helper/functions';

// Context
import { CartContext } from '../context/CartContextProvider';
import { ProductsContext } from '../context/ProductContextProvider';

// Icons
import trashIcon from "../assets/icons/trash.svg";

// Style
import styles from "./ProductDetails.module.css";

const ProductDetails = (props) => {

    const data = useContext(ProductsContext);
    const {state, dispatch} = useContext(CartContext);
    const id = props.match.params.id;
    const product = data[id - 1];
    const { title, price, category, image, description } = product;

    const productData = data[id - 1];
    console.log(productData)

    return (
        <div className={styles.container}>
            <img className={styles.image} src={image} alt="product" />
            <div className={styles.textContainer}>
                <h3>{title}</h3>
                <p className={styles.description}>{description}</p>
                <p className={styles.category}><span>Category:</span> {category}</p>
                <div className={styles.buttonContainer}>
                    <span className={styles.price}>{price} $</span>

                    {/* ..................... */}
                    <div className={styles.buttonContainer}>
                        {quantityCount(state, productData.id) === 1 && <button className={styles.smallButton} onClick={() => dispatch({type: "REMOVE_ITEM", payload: productData})}><img src={trashIcon} alt="trash" /></button>}
                        {quantityCount(state, productData.id) > 1 && <button className={styles.smallButton} onClick={() => dispatch({type: "DECREASE", payload: productData})}>-</button>}
                        {quantityCount(state, productData.id) > 0 && <span className={styles.counter}>{quantityCount(state, productData.id)}</span>}
                        {
                            isInCart(state, productData.id) ?
                            <button className={styles.smallButton} onClick={() => dispatch({type: "INCREASE", payload: productData})}>+</button> :
                            <button onClick={() => dispatch({type: "ADD_ITEM", payload: productData})}>Add to Cart</button>
                        }
                    </div>
                    {/* ..................... */}

                    <Link to="/products">Back to Shop</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;