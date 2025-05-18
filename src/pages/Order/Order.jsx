import './Order.css';
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory.jsx";
import DisplayItems from "../../components/DisplayItems/DisplayItems.jsx";
import CustomerForm from "../../components/CustomerForm/CustomerForm.jsx";
import CartItems from "../../components/CartItems/CartItems.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx";
import ReceiptPopup from "../../components/ReceiptPopup/ReceiptPopup.jsx"; // Import ReceiptPopup

const Order = () => {
    const { categories, auth } = useContext(AppContext);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [showPopup, setShowPopup] = useState(false); // State for popup
    const [orderDetails, setOrderDetails] = useState(null); // State for order details

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!auth.token) {
            navigate("/login");
        }
    }, [auth.token, navigate]);

    // Handle placing order and showing popup
    const handlePlaceOrder = (details) => {
        setOrderDetails(details); // Store order details
        setShowPopup(true); // Show popup
    };

    // Handle printing receipt
    const handlePrintReceipt = () => {
        window.print();
    };

    return (
        <div className="order-wrapper">
            <div className="order-container">
                <div className="left-column">
                    <div className="category-card">
                        <h2 className="section-title text-center">Categories</h2>
                        <div className="category-content">
                            <DisplayCategory
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                categories={categories}
                            />
                        </div>
                    </div>
                    <hr className="section-divider" />
                    <div className="items-card">
                        <h2 className="section-title text-center">Items</h2>
                        <div className="items-content">
                            <DisplayItems selectedCategory={selectedCategory} />
                        </div>
                    </div>
                </div>
                <div className="right-column">
                    <div className="customer-form-card">
                        <h2 className="section-title">Customer Details</h2>
                        <div className="customer-form-content">
                            <CustomerForm
                                customerName={customerName}
                                mobileNumber={mobileNumber}
                                setMobileNumber={setMobileNumber}
                                setCustomerName={setCustomerName}
                            />
                        </div>
                    </div>
                    <hr className="section-divider" />
                    <div className="cart-items-card">
                        <h2 className="section-title">Cart Items</h2>
                        <div className="cart-items-content">
                            <CartItems />
                        </div>
                    </div>
                    <hr className="section-divider" />
                    <div className="cart-summary-card">
                        <h2 className="section-title">Order Summary</h2>
                        <div className="cart-summary-content">
                            <CartSummary
                                customerName={customerName}
                                mobileNumber={mobileNumber}
                                setMobileNumber={setMobileNumber}
                                setCustomerName={setCustomerName}
                                onPlaceOrder={handlePlaceOrder} // Pass callback
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <ReceiptPopup
                    orderDetails={orderDetails}
                    onClose={() => setShowPopup(false)}
                    onPrint={handlePrintReceipt}
                />
            )}
        </div>
    );
};

export default Order;