import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App Component User Interactions", () => {
    test("renders App component", () => {
        render(<App />);
        expect(screen.getByText(/Welcome to biztrips-App/i)).toBeInTheDocument();
    });

    test("adds a trip to the wishlist", () => {
        render(<App />);

        // Simuliere ein Trip-Objekt
        const trip = {
            id: 1,
            title: "Trip to Paris",
            description: "Enjoy Paris",
            startTrip: "2024-01-01",
            endTrip: "2024-01-07",
        };

        // Suche den "Add to Wishlist"-Button
        const addToWishlistButton = screen.getByText(/Add to Wishlist/i);

        // Füge das Trip hinzu
        fireEvent.click(addToWishlistButton);

        // Überprüfe, ob das Trip in der Wishlist angezeigt wird
        expect(screen.getByText(/Trip to Paris/i)).toBeInTheDocument();
    });

    test("removes a trip from the wishlist", () => {
        render(<App />);

        // Simuliere ein Trip-Objekt
        const trip = {
            id: 1,
            title: "Trip to Paris",
            description: "Enjoy Paris",
            startTrip: "2024-01-01",
            endTrip: "2024-01-07",
        };

        // Suche den "Add to Wishlist"-Button und füge das Trip hinzu
        const addToWishlistButton = screen.getByText(/Add to Wishlist/i);
        fireEvent.click(addToWishlistButton);

        // Suche den "Delete Item"-Button in der Wishlist
        const deleteItemButton = screen.getByText(/delete Item/i);
        fireEvent.click(deleteItemButton);

        // Überprüfe, ob das Trip entfernt wurde
        expect(screen.queryByText(/Trip to Paris/i)).not.toBeInTheDocument();
    });

    test("clears the wishlist", () => {
        render(<App />);

        // Simuliere ein Trip-Objekt
        const trip = {
            id: 1,
            title: "Trip to Paris",
            description: "Enjoy Paris",
            startTrip: "2024-01-01",
            endTrip: "2024-01-07",
        };

        // Suche den "Add to Wishlist"-Button und füge das Trip hinzu
        const addToWishlistButton = screen.getByText(/Add to Wishlist/i);
        fireEvent.click(addToWishlistButton);

        // Suche den "empty wishlist"-Button
        const clearButton = screen.getByText(/empty wishlist/i);
        fireEvent.click(clearButton);

        // Überprüfe, ob die Wishlist geleert wurde
        expect(screen.getByText(/Wishlist is empty/i)).toBeInTheDocument();
    });
});
