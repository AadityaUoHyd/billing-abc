import './CartItems.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const CartItems = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(AppContext);
    return (
        <div className="p-3 h-100 overflow-y-auto">
            {cartItems.length === 0 ? (
                <p className="text-light">
                    Your cart is empty.
                </p>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map((item, index) => (

                        <div key={index} className="cart-item mb-3 p-3 bg-dark rounded">
                            <div className="d-flex justify-content-between align-items-center">

                                {/* Column 1: Item Name & Quantity Controls */}
                                <div className="d-flex flex-column justify-content-start align-items-start" style={{ flex: 1 }}>
                                    <h6 className="mb-2 text-light">{item.name}</h6>
                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                                            disabled={item.quantity === 1}
                                        >
                                            <i className="bi bi-dash"></i>
                                        </button>
                                        <span className="text-light">{item.quantity}</span>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                                        >
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Column 2: Price & Tax */}
                                <div className="d-flex flex-column justify-content-center align-items-left" style={{ flex: 0.3 }}>
                                    <p className="mb-2 text-light">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    <p className="mb-0 text-light">{(item.gst).toFixed(2)}%</p>
                                </div>

                                {/* Column 3: Delete Button */}
                                <div className="d-flex justify-content-center align-items-right pr-0" style={{ flex: 0.3 }}>
                                    <button
                                        className="btn btn-danger btn-md"
                                        style={{ width: "auto" }}
                                        onClick={() => removeFromCart(item.itemId)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>

                            </div>
                        </div>



                    ))}
                </div>
            )}
        </div>
    )
}

export default CartItems;
