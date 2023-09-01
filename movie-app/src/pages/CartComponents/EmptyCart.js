import movieGif from "../components/Images/movie.gif";
import React from "react";

/**
 * this component shows the use an informative message that the cart is empty and he should add movies to cart first
 * with a lovely gif for design purposes
 * @param movieGif
 * @returns {JSX.Element}
 * @constructor
 */
function EmptyCart({movieGif}){
    return(
        <>
            <div>
                <div className="row border border-primary rounded text-center my-5 mx-4 bg-dark">
                    <h2 className="bg text-center text-warning">
                        Your Cart is Empty! Maybe try adding movies to the cart first!
                    </h2>
                </div>
                <div>
                    <img src={movieGif} alt={"movie gif"} height={"400"} width={"400"}/>
                </div>
            </div>
        </>
    )
}

export default EmptyCart;