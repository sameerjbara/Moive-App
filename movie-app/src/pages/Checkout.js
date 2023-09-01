import React, { useState } from 'react';
import {Link, redirect} from "react-router-dom";
import ErrorMessages from "./components/ErrorMessages";
import TotalPayment from "./CheckoutComponents/TotalPayment";
import PaymentForm from "./CheckoutComponents/PaymentForm";

/**
 * this page receives a prop which is the total price so it can inform the user how much he is paying for.
 * it also has multiple states, these states represent the user's details, email firstname and last name.
 * 3 more states that change if any of the validations failed.
 * @param totalPrice
 * @returns {JSX.Element}
 * @constructor
 */
const Checkout = ({totalPrice}) =>{

    const [errorMsg, setErrorMsg] = useState();

    return (
        <div>
            <TotalPayment totalPrice={totalPrice}/>
            <div>
                <ErrorMessages errorMsg={errorMsg}/>
            </div>

            <PaymentForm totalPrice={totalPrice}
                         receiveErrorMsg={msg => setErrorMsg(msg)}/>
        </div>
    );
}

export default Checkout