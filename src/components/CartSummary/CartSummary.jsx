import './CartSummary.css';
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { createOrder, deleteOrder } from "../../Service/OrderService.js";
import { toast } from "react-hot-toast";
import { createRazorpayOrder, verifyPayment } from "../../Service/PaymentService.js";
import { AppConstants } from "../../util/constants.js";

const CartSummary = ({ customerName, mobileNumber, setMobileNumber, setCustomerName, onPlaceOrder }) => {
    const { cartItems, clearCart } = useContext(AppContext);
    const [processingMode, setProcessingMode] = useState(null); // 'cash' | 'upi' | null
    const [orderDetails, setOrderDetails] = useState(null);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    const tax = cartItems.reduce((total, item) => total + (item.price * item.quantity * (item.gst / 100)), 0);
    const grandTotal = totalAmount + tax;

    const clearAll = () => {
        setCustomerName("");
        setMobileNumber("");
        clearCart();
    };

    const placeOrder = () => {
        if (orderDetails) {
            onPlaceOrder({
                ...orderDetails,
                razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
                razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
            });
            clearAll();
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const deleteOrderOnFailure = async (orderId) => {
        try {
            await deleteOrder(orderId);
            console.log(`Order ${orderId} deleted successfully`);
        } catch (error) {
            console.error("Failed to delete order:", error);
            toast.error("Failed to clean up order");
        }
    };

    const completePayment = async (paymentMode) => {
        setProcessingMode(paymentMode);

        if (!customerName || customerName.trim() === "") {
            toast.error("Customer name is required");
            setProcessingMode(null);
            return;
        }

        if (!mobileNumber || mobileNumber.trim() === "") {
            toast.error("Mobile number is required");
            setProcessingMode(null);
            return;
        }

        // Validate customerName length (counting letters only, excluding spaces)
        const nameLetters = customerName.trim().replace(/\s/g, "").length;
        if (nameLetters <= 3) {
            toast.error("Name must be more than 3 letters");
            setProcessingMode(null);
            return;
        }
        if (nameLetters >= 20) {
            toast.error("Name must be less than 20 letters");
            setProcessingMode(null);
            return;
        }

        // Validate mobileNumber (exactly 10 digits)
        if (!/^\d{10}$/.test(mobileNumber)) {
            toast.error("Mobile number must be exactly 10 digits");
            setProcessingMode(null);
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            setProcessingMode(null);
            return;
        }

        const orderData = {
            customerName,
            phoneNumber: mobileNumber,
            cartItems,
            subtotal: totalAmount,
            tax,
            grandTotal,
            paymentMethod: paymentMode.toUpperCase(),
        };

        try {
            const response = await createOrder(orderData);
            const savedData = response.data;

            if (response.status === 201 && paymentMode === "cash") {
                toast.success("Cash received");
                setOrderDetails(savedData);
            } else if (response.status === 201 && paymentMode === "upi") {
                const razorpayLoaded = await loadRazorpayScript();
                if (!razorpayLoaded) {
                    toast.error('Unable to load Razorpay');
                    await deleteOrderOnFailure(savedData.orderId);
                    setProcessingMode(null);
                    return;
                }

                const razorpayResponse = await createRazorpayOrder({ amount: grandTotal, currency: 'INR' });

                const options = {
                    key: AppConstants.RAZORPAY_KEY_ID,
                    amount: razorpayResponse.data.amount,
                    currency: razorpayResponse.data.currency,
                    order_id: razorpayResponse.data.id,
                    name: "My Retail Shop",
                    description: "Order payment",
                    handler: async function (response) {
                        await verifyPaymentHandler(response, savedData);
                    },
                    prefill: {
                        name: customerName,
                        contact: mobileNumber,
                    },
                    theme: {
                        color: "#3399cc",
                    },
                    modal: {
                        ondismiss: async () => {
                            await deleteOrderOnFailure(savedData.orderId);
                            toast.error("Payment cancelled");
                            setProcessingMode(null);
                        },
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.on("payment.failed", async (response) => {
                    await deleteOrderOnFailure(savedData.orderId);
                    toast.error("Payment failed");
                    console.error(response.error.description);
                    setProcessingMode(null);
                });
                rzp.open();
            }
        } catch (error) {
            console.error("Payment error:", error.response?.data || error.message);
            if (error.response?.status === 403) {
                toast.error("Session expired or access denied. Please log in again.");
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                toast.error("Payment processing failed: " + (error.response?.data?.message || error.message));
            }
        } finally {
            if (paymentMode === 'cash') {
                setProcessingMode(null);
            }
        }
    };

    const verifyPaymentHandler = async (response, savedOrder) => {
        const paymentData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId: savedOrder.orderId,
        };
        try {
            const paymentResponse = await verifyPayment(paymentData);
            if (paymentResponse.status === 200) {
                toast.success("Payment successful");
                setOrderDetails({
                    ...savedOrder,
                    paymentDetails: {
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    },
                });
            } else {
                toast.error("Payment processing failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Payment failed");
        } finally {
            setProcessingMode(null);
        }
    };

    return (
        <div className="mt-2">
            <div className="cart-summary-details">
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Items Price :</span>
                    <span className="text-light">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Tax(CGST) :</span>
                    <span className="text-light">₹{(tax*0.5).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Tax(SGST) :</span>
                    <span className="text-light">₹{(tax*0.5).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-light">Total Amount :</span>
                    <span className="text-light">₹{grandTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="d-flex gap-3">
                <button
                    className="btn btn-success flex-grow-1"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        completePayment("cash");
                    }}
                    disabled={!!processingMode}
                >
                    {processingMode === "cash" ? "Processing..." : "Cash"}
                </button>

                <button
                    className="btn btn-primary flex-grow-1"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        completePayment("upi");
                    }}
                    disabled={!!processingMode}
                >
                    {processingMode === "upi" ? "Processing..." : "UPI"}
                </button>
            </div>

            <div className="d-flex gap-3 mt-2">
                <button
                    className="btn btn-warning flex-grow-1"
                    onClick={placeOrder}
                    disabled={!!processingMode || !orderDetails}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default CartSummary;