import { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

export default function Checkout() {
    const [cart] = useState([
        { _id: "1", title: "Atomic Habits", price: 14.99, quantity: 1 },
        { _id: "2", title: "The Alchemist", price: 9.99, quantity: 2 },
    ]);

    const handleSubmit = (data) => {
        console.log("Order placed:", data);
        alert("✅ Order placed successfully!");
    };

    return (
        <div className="min-h-screen bg-white py-10 px-4 md:px-16 lg:px-24">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
                Checkout
            </h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <CheckoutForm onSubmit={handleSubmit} />
                </div>
                <div className="w-full md:w-1/3">
                    <OrderSummary cart={cart} />
                </div>
            </div>
        </div>
    );
}
