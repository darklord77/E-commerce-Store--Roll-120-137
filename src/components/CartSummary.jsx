export default function CartSummary({ subtotal }) {
    const shipping = subtotal > 0 ? 5 : 0;
    const total = subtotal + shipping;

    return (
        <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                Proceed to Checkout
            </button>
        </div>
    );
}
