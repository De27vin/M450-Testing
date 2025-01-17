import { render, screen, fireEvent } from "@testing-library/react";
import Wishlist from "../components/Wishlist";

const mockRemoveFromWishlist = jest.fn();
const mockClearWishlist = jest.fn();

const mockWishlist = [
    {
        id: 1,
        title: "Trip to Paris",
        description: "Enjoy Paris",
        startTrip: new Date(2024, 0, 1),
        endTrip: new Date(2024, 0, 7),
    },
    {
        id: 2,
        title: "Trip to Rome",
        description: "Explore Rome",
        startTrip: new Date(2024, 1, 10),
        endTrip: new Date(2024, 1, 15),
    },
];

describe("Wishlist Component", () => {
    test("renders 'Wishlist is empty' when no items exist", () => {
        render(
            <Wishlist
                wishlist={[]}
                removeFromWishlist={mockRemoveFromWishlist}
                clearWishlist={mockClearWishlist}
            />
        );

        expect(screen.getByText(/Wishlist is empty/i)).toBeInTheDocument();
    });

    test("renders items in the wishlist", () => {
        render(
            <Wishlist
                wishlist={mockWishlist}
                removeFromWishlist={mockRemoveFromWishlist}
                clearWishlist={mockClearWishlist}
            />
        );

        expect(screen.getByText(/Trip to Paris/i)).toBeInTheDocument();
        expect(screen.getByText(/Trip to Rome/i)).toBeInTheDocument();
    });

    test("calls removeFromWishlist when delete button is clicked", () => {
        render(
            <Wishlist
                wishlist={mockWishlist}
                removeFromWishlist={mockRemoveFromWishlist}
                clearWishlist={mockClearWishlist}
            />
        );

        const deleteButtons = screen.getAllByText(/delete Item/i);

        // Simulate click on the first item's delete button
        fireEvent.click(deleteButtons[0]);

        expect(mockRemoveFromWishlist).toHaveBeenCalled();
    });

    test("calls clearWishlist when 'empty wishlist' button is clicked", () => {
        render(
            <Wishlist
                wishlist={mockWishlist}
                removeFromWishlist={mockRemoveFromWishlist}
                clearWishlist={mockClearWishlist}
            />
        );

        const clearButton = screen.getByText(/empty wishlist/i);
        fireEvent.click(clearButton);

        expect(mockClearWishlist).toHaveBeenCalled();
    });

    test("'empty wishlist' button is disabled when wishlist is empty", () => {
        render(
            <Wishlist
                wishlist={[]}
                removeFromWishlist={mockRemoveFromWishlist}
                clearWishlist={mockClearWishlist}
            />
        );

        const clearButton = screen.getByText(/empty wishlist/i);
        expect(clearButton).toBeDisabled();
    });
});
