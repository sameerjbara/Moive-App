import React, {StrictMode, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import NavBar from './pages/NavBar'
import Market from './pages/Market'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ErrorPage from './pages/ErrorPage'
export const UserContext = React.createContext();

/**
 * this is the app component, uses browser routers to handle the 4 routes we have, '/' route which is the navigation
 * bar and its index is the market, /cart shows the cart, /checkout shows the pay form and '*' if the route
 * doesn't match any of the above routes. in the app we also have two states, one of them handled by context, and it
 * represents the current number of items in the cart. the other one is a lifted up state that represents the total
 * price for payment and is sent to the checkout page.
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [numOfItems, setNumOfItems] = useState()
    const [totalPrice, setTotalPrice] = useState()

    return (
        <StrictMode>
            <BrowserRouter>
                <UserContext.Provider value={{numOfItems, setNumOfItems }}>

                    <Routes>
                        <Route path = "/" element={<NavBar />}>
                            <Route index element={<Market />} />
                            <Route path = "/Cart" element={<Cart getTotalPrice = {price => setTotalPrice(price)}/>} />
                            <Route path = "/Checkout" element={<Checkout totalPrice={totalPrice}/>} />
                            <Route path ={"*"} element={<ErrorPage/>} />
                        </Route>

                    </Routes>
                </UserContext.Provider>

            </BrowserRouter>
        </StrictMode>
    );
};

export default App;
