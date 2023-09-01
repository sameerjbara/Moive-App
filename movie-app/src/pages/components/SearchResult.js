import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import ErrorMessages from "./ErrorMessages";


/**
 * this component displays the movies the user searching for, it could be by any of the searching methods provided
 * the component receives four props and has a single state for error management
 * @param movies movie object that consists of movies from the search result
 * @param loadingIcon loading Icon in order to inform the user we are fetching the data
 * @param showLoading a boolean value that shows or hides the loading icon
 * @param getNumOfItems a function that lifts up the current number of items in cart
 * @returns {JSX.Element}
 * @constructor
 */
function SearchResult({movies, loadingIcon, showLoading, getNumOfItems}){
    const [errorMsg, setErrorMsg] = useState();

    /**
     * this function handles the fetch to /add which adds the movie to the cart in the back-end, it receives the
     * movie that was chosen to be added to cart and sends it to the server, the response received is the current
     * size of the cart, so we can inform the user how many movies he currently has in cart
     * @param movie
     */
    const handleAddToCart = (movie) => {
        setErrorMsg(null);
        const cart = {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
            price: "3.99 $"
        };

        fetch("/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cart),
        }).then(response => response.json())
          .then(data => getNumOfItems(data))
          .catch(error => setErrorMsg(error));

    };


    return(
        <div>
            <div>
                <ErrorMessages errorMsg={errorMsg}/>
            </div>
            <h2>Search Results:-</h2>
            {showLoading ? <img src={loadingIcon} alt="..." className="img-fluid" height="100" width="100"/> :
                <div>
                    {movies.map((movie) => (
                        <div key={uuidv4()}>
                            {!movie.title ? " " :
                                <div>
                                    <div>
                                        <h2>{movie.title}</h2>
                                        {!movie.backdrop_path ? <p>there's no image for this movie</p> :
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                             alt={movie.overview}
                                             className="rounded my-1"/>}
                                        <p>{movie.overview ? movie.overview : <p>there's no overview for this movie</p>}</p>
                                        <h5>Price: </h5><p> 3.99$</p>
                                    </div>
                                    <button className='btn btn-danger'
                                            onClick = {() => handleAddToCart(movie)}>ADD TO CART</button>
                                    <div className="border-bottom my-4"></div>
                                </div>
                                }
                        </div>
                    ))}
                </div>
                }
        </div>
    );
}

export default SearchResult;