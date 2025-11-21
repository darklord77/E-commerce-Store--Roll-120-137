import { useState } from "react";

export default function CheckoutForm({ onSubmit }) {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        paymentMethod: "cash",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-md"
        >
            <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
            </div>

            <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full Address"
                className="border rounded-lg px-4 py-2 w-full"
                required
            />

            <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="border rounded-lg px-4 py-2 w-full md:w-1/2"
                required
            />

            <h2 className="text-2xl font-semibold mt-6">Payment Method</h2>
            <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={form.paymentMethod === "card"}
                        onChange={handleChange}
                    />
                    Credit / Debit Card
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={form.paymentMethod === "bank"}
                        onChange={handleChange}
                    />
                    Bank Transfer
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={form.paymentMethod === "cash"}
                        onChange={handleChange}
                    />
                    Cash on Delivery
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4"
            >
                Place Order
            </button>
        </form>
    );
}
