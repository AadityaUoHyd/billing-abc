import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../Service/CategoryService.js";
import { fetchItems } from "../Service/ItemService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth, setAuth] = useState({ token: null, role: null });
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem => cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? { ...item, quantity: newQuantity } : item));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const setAuthData = (token, role) => {
        setAuth({ token, role });
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        if (storedToken && storedRole) {
            setAuth({ token: storedToken, role: storedRole });
        }
    }, []);

    useEffect(() => {
        async function loadData() {
            if (auth.token) {
                try {
                    const categoryResponse = await fetchCategories(auth.token);
                    const itemResponse = await fetchItems(auth.token);
                    setCategories(categoryResponse.data);
                    setItemsData(itemResponse.data);
                } catch (error) {
                    console.error('Failed to load data:', error);
                }
            }
        }
        loadData();
    }, [auth.token]);

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};
