import React, { useContext, useReducer } from 'react';
import BySearch from './components/BySearch';
import ByDiscover from './components/ByDiscover';
import ByPopular from './components/ByPopular';
import ByGenre from './components/ByGenre';
import SearchResult from './components/SearchResult';
import loadingIcon from './components/Images/loading-gif.gif';
import { UserContext } from '../App';

const API_KEY = '5f47ffadee56c65136633d95e42a97d8'; //TMDB API key


/**
 * the initial values of variables for the reducer
 * @type {{movies: *[], infoMsg: string, showLoading: boolean, showMsg: boolean}}
 */
const initialState = {
    movies: [],
    showLoading: false,
    infoMsg: '',
    showMsg: false,
};

/**
 * reducer function that handles state updates
 * @param state all of the states
 * @param action the action made
 * @returns {(*&{infoMsg})|(*&{showMsg})|(*&{showLoading})|*|(*&{movies})}
 */
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload };
        case 'SET_LOADING':
            return { ...state, showLoading: action.payload };
        case 'SET_INFO_MSG':
            return { ...state, infoMsg: action.payload };
        case 'SET_SHOW_MSG':
            return { ...state, showMsg: action.payload };
        default:
            return state;
    }
};

/**
 * the market page Where it calls 4 other components, a search by a search bar, by a discover button, but popular
 * button and by genre dropdown, it also calls another component that displays the result of each search. the page
 * displayes all of the 4 searches and the results.
 * @returns {JSX.Element}
 * @constructor
 */
const Market = () => {
    const n = useContext(UserContext);//number of current items in cart

    const [state, dispatch] = useReducer(reducer, initialState);

    const { movies, showLoading, infoMsg, showMsg } = state;

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <BySearch
                        apiKey={API_KEY}
                        receiveResults={(mov) => dispatch({ type: 'SET_MOVIES', payload: mov })}
                        showLoading={(show) => dispatch({ type: 'SET_LOADING', payload: show })}
                    />
                    <p className="text-center">If you don't know what you are searching for, use some help. </p>
                    <div className="row">
                        <div className="col">
                            {showMsg ? <p className="text-bg-danger">{infoMsg}</p> : ' '}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 border border-success rounded text-center my-2 mx-5">
                            <ByDiscover
                                apiKey={API_KEY}
                                receiveResults={(mov) => dispatch({ type: 'SET_MOVIES', payload: mov })}
                                showLoading={(show) => dispatch({ type: 'SET_LOADING', payload: show })}
                                receiveInfo={(msg) => dispatch({ type: 'SET_INFO_MSG', payload: msg })}
                                receiveShow={(show) => dispatch({ type: 'SET_SHOW_MSG', payload: show })}
                            />
                        </div>
                        <div className="col-lg-3 col-md-6 border border-success rounded text-center my-2 mx-5">
                            <ByPopular
                                apiKey={API_KEY}
                                receiveResults={(mov) => dispatch({ type: 'SET_MOVIES', payload: mov })}
                                showLoading={(show) => dispatch({ type: 'SET_LOADING', payload: show })}
                                receiveInfo={(msg) => dispatch({ type: 'SET_INFO_MSG', payload: msg })}
                                receiveShow={(show) => dispatch({ type: 'SET_SHOW_MSG', payload: show })}
                            />
                        </div>
                        <div className="col-lg-3 col-md-6 border border-success rounded text-center my-2 mx-5">
                            <ByGenre
                                apiKey={API_KEY}
                                receiveResults={(mov) => dispatch({ type: 'SET_MOVIES', payload: mov })}
                                showLoading={(show) => dispatch({ type: 'SET_LOADING', payload: show })}
                                receiveInfo={(msg) => dispatch({ type: 'SET_INFO_MSG', payload: msg })}
                                receiveShow={(show) => dispatch({ type: 'SET_SHOW_MSG', payload: show })}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 border border-danger rounded text-center my-2 mx-5">
                            <SearchResult
                                movies={movies}
                                loadingIcon={loadingIcon}
                                showLoading={showLoading}
                                getNumOfItems={(num) => n.setNumOfItems(num)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Market;