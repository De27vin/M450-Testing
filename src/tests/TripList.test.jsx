import { render, screen, fireEvent } from "@testing-library/react";
import TripList from "../components/TripList";
import '@testing-library/jest-dom/extend-expect';

const mockTrips = [
    { id: 1, title: "Trip to Paris", description: "Enjoy Paris", startTrip: [2024, 1, 15], endTrip: [2024, 1, 20] },
    { id: 2, title: "Trip to Rome", description: "Explore Rome", startTrip: [2024, 2, 10], endTrip: [2024, 2, 15] },
];

const mockAddToWishlist = jest.fn();

describe("TripList Component", () => {
    test("renders TripList component with no trips", () => {
        render(<TripList addToWishlist={mockAddToWishlist} />);
        expect(screen.getByText(/Productlist is empty/i)).toBeInTheDocument();
    });

    test("renders trips correctly", () => {
        // Mock useState for trips
        jest.spyOn(React, "useState").mockImplementation(() => [mockTrips, jest.fn()]);
        render(<TripList addToWishlist={mockAddToWishlist} />);

        // Check if trips are displayed
        expect(screen.getByText(/Trip to Paris/i)).toBeInTheDocument();
        expect(screen.getByText(/Trip to Rome/i)).toBeInTheDocument();
    });

    test("filters trips by month", () => {
        render(<TripList addToWishlist={mockAddToWishlist} />);
        const select = screen.getByLabelText(/Filter by Month:/i);

        // Select January (month = 1)
        fireEvent.change(select, { target: { value: "1" } });

        // Check filtered trips
        expect(screen.getByText(/Trip to Paris/i)).toBeInTheDocument();
        expect(screen.queryByText(/Trip to Rome/i)).not.toBeInTheDocument();
    });

    test("calls addToWishlist when 'Add to Wishlist' button is clicked", () => {
        jest.spyOn(React, "useState").mockImplementation(() => [mockTrips, jest.fn()]);
        render(<TripList addToWishlist={mockAddToWishlist} />);

        const addButton = screen.getAllByText(/Add to Wishlist/i)[0];
        fireEvent.click(addButton);

        // Check if addToWishlist is called with correct trip
        expect(mockAddToWishlist).toHaveBeenCalledWith(mockTrips[0]);
    });
});
