package hac;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a cart that stores a list of movies.
 */
@Component
public class Cart implements Serializable {

    /**
     * Constructs an instance of the Cart class.
     */
    public Cart() {
        this.contents = new ArrayList<>();
    }

    /**
     * The list of movies in the cart.
     */
    private final List<Movie> contents;

    /**
     * Adds a movie to the cart if it is not already present.
     *
     * @param movie The movie to add to the cart.
     */
    public void add(Movie movie) {
        if (check(movie) == -1) {
            contents.add(movie);
        }
    }

    /**
     * Removes a movie from the cart.
     *
     * @param movie The movie to remove from the cart.
     */
    public void remove(Movie movie) {
        contents.remove(check(movie));
    }

    /**
     * Clears the cart by removing all movies.
     */
    public void clear() {
        contents.clear();
    }

    /**
     * Retrieves the contents of the cart.
     *
     * @return The list of movies in the cart.
     */
    public List<Movie> getContents() {
        return contents;
    }

    /**
     * Checks if a movie is present in the cart.
     *
     * @param movie The movie to check.
     * @return The index of the movie in the cart if found, or -1 if not present.
     */
    public int check(Movie movie) {
        for (var i = 0; i < contents.size(); i++) {
            if (contents.get(i).getId() == movie.getId()) {
                return i;
            }
        }
        return -1;
    }
}