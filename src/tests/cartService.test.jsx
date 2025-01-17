import { getProducts, getCartItems } from "../services/cartService";

global.fetch = jest.fn();

describe("cartService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getProducts fetches and returns products on success", async () => {
        const mockProducts = [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducts,
        });

        const products = await getProducts();

        expect(fetch).toHaveBeenCalledWith("http://localhost:8080/products");
        expect(products).toEqual(mockProducts);
    });

    test("getProducts throws an error on fetch failure", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(getProducts()).rejects.toBeDefined();
        expect(fetch).toHaveBeenCalledWith("http://localhost:8080/products");
    });

    test("getCartItems fetches and returns cart items on success", async () => {
        const mockCartItems = [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartItems,
        });

        const cartItems = await getCartItems();

        expect(fetch).toHaveBeenCalledWith("http://localhost:8080/cart/items");
        expect(cartItems).toEqual(mockCartItems);
    });

    test("getCartItems throws an error on fetch failure", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(getCartItems()).rejects.toBeDefined();
        expect(fetch).toHaveBeenCalledWith("http://localhost:8080/cart/items");
    });
});
