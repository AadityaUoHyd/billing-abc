import './ReceiptPopup.css';
import './Print.css';
import { FaMobileAlt } from "react-icons/fa";

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
    return (
        <div className="receipt-popup-overlay text-dark">
            <div className="receipt-popup">
                <div className="text-center mb-4">
                    <i className="bi bi-check-circle-fill text-success fs-1"></i>
                </div>
                <h3 className="text-center mb-4">Order Receipt</h3>

                <p>
                    <strong>Order ID:</strong> {orderDetails.orderId}
                </p>
                <p>
                    <strong>Name:</strong> {orderDetails.customerName}
                </p>
                <p>
                    <strong>Phone:</strong> {orderDetails.phoneNumber}
                </p>
                <hr className="my-3" />
                <h5 className="mb-3">Items Ordered</h5>
                <div className="cart-items-scrollable">
                    {orderDetails.items.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between mb-2">
                            <span>{item.name} x{item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <hr className="my-3" />
                <div className="d-flex justify-content-between mb-2">
                    <span><strong>Subtotal:</strong></span>
                    <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span><strong>Tax (CGST):</strong></span>
                    <span>₹{(orderDetails.tax * 0.5).toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span><strong>Tax (SGST):</strong></span>
                    <span>₹{(orderDetails.tax * 0.5).toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-4">
                    <span><strong>Grand Total:</strong></span>
                    <span>₹{orderDetails.grandTotal.toFixed(2)}</span>
                </div>

                <p>
                    <strong>Payment Method:</strong> {orderDetails.paymentMethod}
                </p>

                {
                    orderDetails.paymentMethod === "UPI" && (
                        <>
                            <p>
                                <strong>Razorpay Order ID: </strong> {orderDetails.razorpayOrderId}
                            </p>
                            <p>
                                <strong>Razorpay Payment ID: </strong> {orderDetails.razorpayPaymentId}
                            </p>
                        </>
                    )
                }

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button className="btn btn-warning" onClick={onPrint}>Print Receipt</button>
                    <button className="btn btn-danger" onClick={onClose}>Close</button>
                </div>

                {/* Add this below the buttons */}
                <div className="text-center mt-4 mb-2">
                    <p className="fw-semibold text-success">Thank you for shopping with us!</p>
                </div>

                <footer className="text-center border-top pt-2 mt-2 small text-muted">
                    <p><strong>{import.meta.env.VITE_SHOP_NAME}</strong>,&nbsp;{import.meta.env.VITE_SHOP_ADDRESS}</p>
                    <p><FaMobileAlt />{import.meta.env.VITE_SHOP_MOBILE}</p>
                </footer>

            </div>
        </div>
    )
}

export default ReceiptPopup;
