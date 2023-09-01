import React, {useEffect, useState} from "react";


/**
 * this component is one of the 4 methods of searching, this method is by genre and it provides a drop down of limited
 * amount of genres (five only) the component uses useEffect to trigger the search for the selected genre, the
 * component receives 5 props and has 3 states
 * @param apiKey the api key for TMBD
 * @param receiveResults a function that sends the result to the searchresult component
 * @param showLoading a function that handles show/hide of loading icon in search result component
 * @param receiveInfo a function that send an info message to the bysearch component to be displayed to user
 * @param receiveShow a function that handles, show/hide operations for the info messages
 * @returns {JSX.Element}
 * @constructor
 */
function ByGenre({apiKey, receiveResults, showLoading,receiveInfo, receiveShow}){
    const [genres, setGenres] = useState([]); //a state that has our five genres taken from the api
    const [selectedGenre, setSelectedGenre] = useState(''); //genre selected from the drop box
    const [movies, setMovies] = useState([]); //movies result

    //useEffect hook, to request our 5 genres
    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
            const data = await response.json();
            setGenres(data.genres);
        };

        fetchGenres();
    }, []);

    /**
     * useEffect hook, using selected genre as the dependency, so when another genre is chosen request immediately
     * from the api
     */
    useEffect(() => {
        const fetchMovies = async () => {
            try{
                showLoading(true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&include_adult=false`
                );
                if (!response.ok) {
                    throw new Error(`Failed to retrieve movies: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                receiveResults(data.results);
                receiveShow(false);
            }catch (error){
                receiveShow(true);
                receiveInfo(error);
            }finally {
                showLoading(false);
            }
        };

        if (selectedGenre !== '') {
            fetchMovies();
        } else {
            setMovies([]);
        }



    }, [selectedGenre]);

    /**
     * this function handles the change of value in the drop down and updates the selected genre which triggers the hook
     * @param event
     */
    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };
    return(
        <>
            <div>
                <h1>Genre</h1>
                <p>choose your genre</p>
                <select className="border-2 border-success rounded" value={selectedGenre} onChange={handleGenreChange}>
                    <option value="">Select a genre</option>
                    {genres
                        .filter((genre) => ['Action','Animation', 'Comedy', 'Music', 'Family'].includes(genre.name))
                        .map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                </select>
            </div>
        </>
    );
}

export default ByGenre