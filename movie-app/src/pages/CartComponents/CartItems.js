import {v4 as uuidv4} from "uuid";
import React from "react";

/**
 * this component displays the list of items currently in cart. the component has 3 props
 * @param cart current movies in cart
 * @param handleClearCart function that handles clearing the cart
 * @param deleteFromCart function that handles deleting an item from cart
 * @returns {JSX.Element}
 * @constructor
 */
function CartItems({cart, handleClearCart, deleteFromCart }){
    return(
        <>
            <div className="col-sm-5 border border-info rounded text-center my-2 mx-5 container fluid">
                <button className="btn btn-danger text-center my-2" onClick={() => handleClearCart()}>
                    Clear Cart
                </button>
                <ul>
                    <div>
                        {cart.map((movieData) => (
                            <li key={uuidv4()}>
                                <div className="row">
                                    <div className="col">
                                        <h2>{movieData.title}</h2>
                                        {!movieData.backdrop_path ? (
                                            <p>There's no image for this movie</p>
                                        ) : (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`}
                                                alt={movieData.overview}
                                                className="rounded my-1 img-fluid"
                                            />
                                        )}
                                        <p>
                                            {movieData.overview
                                                ? movieData.overview
                                                : "There's no overview for this movie."}
                                        </p>
                                        <p>price: {movieData.price}</p>
                                    </div>
                                    <div className="col d-flex justify-content-center">
                                        <button
                                            className="btn btn-danger align-self-center"
                                            onClick={() => deleteFromCart(movieData)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </>
    )
}

export default CartItems