import React from "react";

/**
 * this component displays the total final price in the checkout page and receives one prop
 * @param totalPrice total final price
 * @returns {JSX.Element}
 * @constructor
 */
function TotalPayment({totalPrice}){
    return(
        <>
            <div className="border border-danger rounded text-center my-5 mx-5">
                <h1>your total, in US dollars, is: <h1 className="text-danger">{totalPrice}</h1></h1>
                <p>Enter your details below to complete your purchase!</p>
            </div>
        </>
    );
}

export default TotalPayment;