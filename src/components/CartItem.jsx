import { motion } from "framer-motion";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    return (
        <motion.div
            className="flex flex-col md:flex-row items-center justify-between border-b py-4 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center gap-4 w-full md:w-2/3">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded-lg shadow"
                />
                <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.author}</p>
                    <p className="text-blue-600 font-medium mt-1">${item.price}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() => onDecrease(item._id)}
                >
                    −
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() => onIncrease(item._id)}
                >
                    +
                </button>
                <button
                    className="text-red-500 hover:text-red-700 text-sm ml-3"
                    onClick={() => onRemove(item._id)}
                >
                    Remove
                </button>
            </div>
        </motion.div>
    );
}
