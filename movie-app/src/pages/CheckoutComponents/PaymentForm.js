import React, {useState} from "react";

/**
 * this component displays the payment form in the checkout page, it validates the fields before submitting, and
 * receives 2 props
 * @param totalPrice the total and final price (final if the user doesn't go back to cart)
 * @param receiveErrorMsg function to update error msg state if there is any.
 * @returns {JSX.Element}
 * @constructor
 */
function PaymentForm({totalPrice, receiveErrorMsg}){
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [successfulMsg, setSuccessfulMsg] = useState(null);

    /**
     * this function updates the email when changed by the user
     * @param event
     */
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    /**
     * this function updates the first name state
     * @param event
     */
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    /**
     * this function updates the last name state
     * @param event
     */
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    /**
     * this function handles the submit it first validates all of the fields and accordingly informs the user for
     * errors. Then a fetch is sent to the SQL server where it saves the details of the user and the amount of payment
     * afterwards the function clears the cart and redirects to the main page, if the payment was successful.
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        let isFormValid = true;

        // Validate email
        if (!email) {
            setEmailError("Email is required");
            isFormValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email");
            isFormValid = false;
        } else {
            setEmailError(null);
        }

        // Validate first name
        if (!firstName) {
            setFirstNameError("First name is required");
            isFormValid = false;
        } else {
            setFirstNameError(null);
        }

        // Validate last name
        if (!lastName) {
            setLastNameError("Last name is required");
            isFormValid = false;
        } else {
            setLastNameError(null);
        }

        if (!isFormValid) {
            // If the form is not valid, return without proceeding further
            return;
        }

        const purchaseData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            payment: totalPrice,
        };

        try {
            receiveErrorMsg(null);
            const response = await fetch('/debug/purchases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData),
            });

            if (!response.ok) {
                throw new Error('Failed to add purchase');
            }

            await Promise.all([
                fetch('/debug/purchases', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
                fetch('/api/cart/remove-all', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            ]);

            // Display success message and redirect after 3 seconds
            setSuccessfulMsg('Payment was successful, redirecting you to the market');
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } catch (error) {
            receiveErrorMsg(error);
        }
    };

    return (
        <>
            <div className="container">
                {successfulMsg && (
                    <h3 className="text-success text-center">{successfulMsg}</h3>
                )}
            </div>
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`form-control ${emailError ? "is-invalid" : ""}`}
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && (
                            <div className="invalid-feedback">{emailError}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${firstNameError ? "is-invalid" : ""}`}
                            id="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        {firstNameError && (
                            <div className="invalid-feedback">{firstNameError}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${lastNameError ? "is-invalid" : ""}`}
                            id="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                        {lastNameError && (
                            <div className="invalid-feedback">{lastNameError}</div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary my-2">
                        Complete your Purchase
                    </button>
                </form>
            </div>
        </>
    );

}

export default PaymentForm;