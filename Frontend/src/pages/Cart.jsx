import { useState } from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

export default function Cart() {
    const [cart, setCart] = useState([
        {
            _id: "1",
            title: "Atomic Habits",
            author: "James Clear",
            image: "/books/atomic.jpg",
            price: 14.99,
            quantity: 1,
        },
        {
            _id: "2",
            title: "The Alchemist",
            author: "Paulo Coelho",
            image: "/books/alchemist.jpg",
            price: 9.99,
            quantity: 2,
        },
    ]);

    const handleIncrease = (id) =>
        setCart((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );

    const handleDecrease = (id) =>
        setCart((prev) =>
            prev.map((item) =>
                item._id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );

    const handleRemove = (id) =>
        setCart((prev) => prev.filter((item) => item._id !== id));

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen py-10 px-4 md:px-16 lg:px-24 bg-white">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
                Your Shopping Cart
            </h1>

            {cart.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-600 mb-4">Your cart is empty!</p>
                    <a
                        href="/books"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        Go to Shop
                    </a>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        {cart.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                    <div className="w-full md:w-1/3">
                        <CartSummary subtotal={subtotal} />
                    </div>
                </div>
            )}
        </div>
    );
}
