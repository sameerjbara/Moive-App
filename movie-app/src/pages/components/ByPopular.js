import React, {useState} from "react";


/**
 * this component is one of the four methods of searching, this one is by popular movies, and is triggered by a click
 * of a button, the component receive 5 props
 * @param apiKey the api key for TMBD
 * @param receiveResults a function that sends the result to the searchresult component
 * @param showLoading a function that handles show/hide of loading icon in search result component
 * @param receiveInfo a function that send an info message to the bysearch component to be displayed to user
 * @param receiveShow a function that handles, show/hide operations for the info messages
 * @returns {JSX.Element}
 * @constructor
 */
function ByPopular({apiKey, receiveResults, showLoading,receiveInfo, receiveShow}){

    /**
     * this function is triggered by click on the popular movies button and handles the request from the api
     * @param event receives an event
     * @returns {Promise<void>}
     */
    const handlePopularSubmit = async (event) => {
        event.preventDefault();
        showLoading(true); //show loading
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Failed to retrieve movies: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            receiveResults(data.results);
            receiveShow(false);
        }catch (error){
            receiveShow(true);
            receiveInfo(error);
        }finally{
            showLoading(false);
        }
    };
    return(
        <>
            <h2>Popular Movies</h2>
            <p>for popular movies in the market</p>
            <form onSubmit={handlePopularSubmit}>
                <button className="btn btn-success my-1" type="submit">Popular Movies</button>
            </form>
        </>
    );
}

export default ByPopular;