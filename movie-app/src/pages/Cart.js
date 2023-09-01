import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import loadingIcon from "./components/Images/loading-gif.gif"
import {UserContext} from "../App";
import { v4 as uuidv4 } from 'uuid';
import movieGif from "./components/Images/movie.gif"
import ErrorMessages from "./components/ErrorMessages";
import EmptyCart from "./CartComponents/EmptyCart";
import CartItems from "./CartComponents/CartItems";
import PaymentDetails from "./CartComponents/PaymentDetails";

/**
 * this page represents the cart, it has a list of all of the movies the user added to cart and his total price,
 * it also provides the button for checkout. the component receives the a function as a prop to lift up a state.
 * the component has 3 states, cart which holds all of the movies in the cart(handled by the backend server),
 * showLoading which shows or hides the loading errorMsg to inform the user if any errors occured.
 * @param getTotalPrice
 * @returns {JSX.Element}
 * @constructor
 */
const Cart = ({ getTotalPrice }) =>{
    const [cart, setCart] = useState([]);  //current movies in cart
    const [showLoading, setShowLoading] = useState(false); //show/hide loading Icon
    const [errorMsg, setErrorMsg] = useState(); //error Messages if any
    const n = useContext(UserContext);  //current number of items in the list

    //get the contents in cart
    useEffect(() => {
        handleChanges()
        fetch('/api/cart/contents')
            .then(response => response.json())
            .then(data => setCart(data))
            .catch(error => setErrorMsg(error))
            .finally(() => setShowLoading(false));
    }, []);

    //delete an item from cart and get updated contents afterwards immediately
    const deleteFromCart = (movie) => {
        const cart = {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
            price: "3.99 $"
        };
        handleChanges()

        fetch("/api/cart/remove", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cart),
        })
            .then(() => {
                // Refresh the cart contents after the item has been removed
                fetch("/api/cart/contents")
                    .then((response) => response.json())
                    .then((data) => {
                        setCart(data)
                        n.setNumOfItems(data.length)
                    })
                    .catch((error) => setErrorMsg(error));
            })
            .catch((error) => {
                setErrorMsg(error);
            })
            .finally(() => {
                setShowLoading(false);
            });
    };

    /**
     * this function handles changes, such as showing a loading icon and removing error messages.
     */
    function handleChanges(){
        setShowLoading(true);
        setErrorMsg(null);
    }

    //clear the whole cart fetch and get the contents to update the website
    const handleClearCart = () => {
        handleChanges()
        fetch("/api/cart/remove-all", {
                method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                // Refresh the cart contents after the item has been removed
                fetch("/api/cart/contents")
                    .then((response) => response.json())
                    .then((data) => {
                        setCart(data);
                        n.setNumOfItems(data.length)
                    })
                    .catch((error) => setErrorMsg(error));
            })
            .catch((error) => {
                setErrorMsg(error);
            })
            .finally(() => {
                setShowLoading(false);
            });
    };


    return (
        <div>
            <div>
                <ErrorMessages errorMsg={errorMsg}/>
            </div>
            <div className="container">
                <div className="my-5 text-center">
                    {showLoading ? (
                        <img src={loadingIcon} alt="..." className="img-fluid" height="100" width="100" />
                    ) : (
                        <div>
                            {cart.length === 0 ? (
                                <EmptyCart movieGif={movieGif}/>
                            ) : (
                                <div>
                                    <div className="row">
                                        <CartItems cart={cart}
                                                   handleClearCart={handleClearCart}
                                                   deleteFromCart={deleteFromCart}/>
                                        <PaymentDetails cart={cart}
                                                        getTotalPrice={amount => getTotalPrice(amount)}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Cart;
