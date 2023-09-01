import {Link} from "react-router-dom";
import React from "react";

/**
 * this component displays the current total payment in the cart page, the component receives 2 props
 * @param cart current movies in cart
 * @param getTotalPrice function to get the total price.
 * @returns {JSX.Element}
 * @constructor
 */
function PaymentDetails({cart, getTotalPrice}){
    return(
        <>
            <div className="col-sm-4 my-2 mx-5">
                <div className="row">
                    <div className="col border border-success rounded text-center">
                        <h5 className="my-2">Total Price:- </h5>
                        <p className="my-2">
                            Number of movies in cart: {cart.length}, 3.99$ each!
                        </p>
                        <h5 className="my-2 text-danger">{cart.length * 3.99} US Dollars </h5>
                        <p className="my-2">
                            If you're ready, please use the button below to checkout.
                        </p>
                        <Link className="btn btn-primary my-3" to="/Checkout"
                              onClick={() => getTotalPrice(cart.length * 3.99)}>
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentDetails;