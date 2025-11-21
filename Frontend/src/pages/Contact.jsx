import { motion } from "framer-motion";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-5xl mx-auto text-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-gray-800 mb-4"
                >
                    Contact Us
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 max-w-3xl mx-auto mb-12"
                >
                    Have questions, suggestions, or need support?
                    We’d love to hear from you! Fill out the form below or reach us through our contact info.
                </motion.p>

                {/* Contact Section */}
                <div className="grid md:grid-cols-2 gap-10 text-left">
                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white shadow-lg rounded-2xl p-8 space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message..."
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Send Message
                        </button>
                    </motion.form>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white shadow-lg rounded-2xl p-8 space-y-4"
                    >
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                            Get in Touch
                        </h3>
                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">Address:</span> 123 Library
                            Street, Lahore, Pakistan
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">Phone:</span> +92 300 1234567
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">Email:</span>{" "}
                            contact@bookverse.com
                        </p>

                        <div className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Business Hours</h4>
                            <p className="text-gray-600">Monday – Saturday: 9:00 AM – 8:00 PM</p>
                            <p className="text-gray-600">Sunday: Closed</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
