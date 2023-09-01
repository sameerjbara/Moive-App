package hac;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class that handles the API endpoints related to the cart.
 */
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class CartController {

    /**
     * The cart instance.
     */
    @Autowired
    private Cart cart;

    /**
     * Adds a movie to the cart.
     *
     * @param movie The movie to add to the cart.
     * @return The number of movies in the cart after adding the movie.
     */
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000")
    public int addToCart(@RequestBody Movie movie) {
        cart.add(movie);
        return cart.getContents().size();
    }

    /**
     * Removes a movie from the cart.
     *
     * @param movie The movie to remove from the cart.
     */
    @PostMapping("/remove")
    @CrossOrigin(origins = "http://localhost:3000")
    public void removeFromCart(@RequestBody Movie movie) {
        cart.remove(movie);
    }

    /**
     * Retrieves the contents of the cart.
     *
     * @return The list of movies in the cart.
     */
    @GetMapping("/contents")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Movie> getCartContents() {
        return cart.getContents();
    }

    /**
     * Removes all movies from the cart.
     */
    @DeleteMapping("/remove-all")
    @CrossOrigin(origins = "http://localhost:3000")
    public void removeAllFromCart() {
        cart.clear();
    }
}