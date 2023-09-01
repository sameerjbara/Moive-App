import React, { useState } from 'react';

/**
 * this component handles the items stored in the user's hisotry, the history is not persistent, refreshing the page
 * will result in clearing the history(could add the usage of localstorage to resolve the issue). the component has
 * one boolean state that shows/hides history list. and 2 props described below:
 * @param history history object that is updated when an item is added to history
 * @param onSearch function that lifts up the query, when an item is clicked on the search history a fetch is called
 *                  upon this item.
 * @returns {JSX.Element}
 * @constructor
 */
function SearchHistory({history, onSearch}){
    const [showHistory, setShowHistory] = useState(false);

    /**
     * this function receives a query and is lifted up for the parent component
     * @param query
     */
    const handleHistoryClick = (query) => {
        onSearch(query);
    };

    /**
     * a function that shows/hides history list
     */
    const handleToggleHistory = () => {
        setShowHistory(!showHistory);
    };

    return (
        <div className="search-history">
            <button className="btn btn-link" onClick={handleToggleHistory}>
                {showHistory ? 'Hide' : 'Show'} Search History
            </button>
            {showHistory && (
                <>
                    {history.length === 0 ? <p>you dont have anything on history yet!</p> :
                        <ul className="list-group">
                            {history.map((query) => (

                                <button
                                    type='button'
                                    key={query}
                                    className="list-group-item btn"
                                    onClick={() => handleHistoryClick(query)}
                                >
                                    {query}
                                </button>
                            ))}
                        </ul>
                    }
                </>
            )}
        </div>
    );
}

export default SearchHistory;