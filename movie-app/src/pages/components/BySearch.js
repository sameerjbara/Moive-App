import React, {useEffect, useState} from 'react';
import SearchHistory from "./SearchHistory";

/**
 * this component represent one method of the four to perform a search, this method is a search field that
 * receives the user's search, sends a request to the api according to that query and returns the search result
 * the component has 4 states and 3 props
 * @param apiKey the api key for the TMDB
 * @param receiveResults a function that updates the search results and sends them to the search result component
 * @param showLoading a function that shows/hides the loading icon in the searchResult component
 * @returns {JSX.Element}
 * @constructor
 */
function BySearch({ apiKey, receiveResults, showLoading }){
    const [query, setQuery] = useState('');  //a state that is updated when the user submits his search
    const [infoMsg, setInfoMsg] = useState(''); //info message to be displayed for user if needed
    const [showMsg, setShowMsg] = useState(false); // boolean state to handle show/hide info messages
    const [searchHistory, setSearchHistory] = useState( []); //a state that adds movies to the search list

    /**
     * this function receives an event and changes the query accordingly
     * @param event
     */
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };


    /**
     * this function is an async function since it calls another async function awaiting a promise, the function
     * receives an event, and handles the submit upon that search. firstly it checks if the result is valid,
     * then requests a response from the api and updates the search history.
     * @param event
     * @returns {Promise<void>}
     */
    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        //if the user submitted on an empty field, inform him
        if(!query){
            setShowMsg(true);
            setInfoMsg('make sure to provide a movie');
        }else {
            setShowMsg(false);
            await fetchData(query);
            const newSearchHistory = [...searchHistory, query];
            setSearchHistory(newSearchHistory);
        }
    };

    /**
     * this function receives a query and sends a request upon that query, the response is the search result.
     * @param q query given by user
     * @returns {Promise<void>}
     */
    async function fetchData(q){
        try {
            showLoading(true);
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${q}`);
            if (!response.ok) {
                throw new Error(`Failed to retrieve movies: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.total_results === 0) {// if the search was too complicated inform the user so.
                setShowMsg(true);
                setInfoMsg("mhmm, could not find anything like that, maybe try use keywords?")
            } else {
                setShowMsg(false);
            }
            receiveResults(data.results)//send the received movies to the search result component
        } catch (error) {
            setShowMsg(true);
            setInfoMsg(error);
        }finally{
            showLoading(false);
        }
    }

    /**
     * this function handles a button that clears the history of the user.
     */
    const handleClearHistory = () => {
        setSearchHistory([]);
    };


    return(
        <>
            <div className='row border border-primary rounded text-center my-5 mx-4'>
                <SearchHistory history={searchHistory} onSearch={q => fetchData(q)}/>
                <button className="btn btn-link" onClick={handleClearHistory}>
                    Clear History
                </button>
                <div className='col-12'>
                    <h1>Search the market for movies!</h1>
                    <p className="text-center">search for your favorite movie!</p>
                    {showMsg ? <p className='text-bg-danger'>{infoMsg}</p> : " "}
                    <form className='my-1' onSubmit={handleSearchSubmit}>
                        <input className='border border-primary rounded' type="text" value={query} onChange={handleQueryChange} />
                        <button className="btn btn-primary mx-1" type="submit">Search</button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default BySearch;