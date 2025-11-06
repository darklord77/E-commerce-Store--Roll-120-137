import { motion } from "framer-motion";

export default function OrderConfirmation() {
    const orderId = Math.floor(Math.random() * 1000000);
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5); // 5 days later

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center"
            >
                <div className="flex justify-center mb-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                        alt="Success"
                        className="w-20 h-20"
                    />
                </div>

                <h1 className="text-3xl font-bold text-green-600 mb-3">
                    Thank You for Your Purchase!
                </h1>
                <p className="text-gray-600 mb-6">
                    Your order has been placed successfully. We’ll notify you once it’s shipped.
                </p>

                <div className="text-left bg-gray-100 p-4 rounded-lg mb-6">
                    <p><span className="font-semibold">Order ID:</span> #{orderId}</p>
                    <p><span className="font-semibold">Order Date:</span> {today.toDateString()}</p>
                    <p><span className="font-semibold">Estimated Delivery:</span> {deliveryDate.toDateString()}</p>
                    <p><span className="font-semibold">Payment Method:</span> Cash on Delivery</p>
                    <p><span className="font-semibold">Total:</span> $34.97</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a
                        href="/books"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Continue Shopping
                    </a>
                    <a
                        href="/orders"
                        className="border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-lg transition"
                    >
                        View My Orders
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
