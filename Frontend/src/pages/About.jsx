import { motion } from "framer-motion";

const About = () => {
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
                    About Us
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 max-w-3xl mx-auto mb-12"
                >
                    Welcome to <span className="text-indigo-600 font-semibold">BookVerse</span> —
                    your one-stop destination for all things books.
                    We believe that books are not just stories, but gateways to knowledge, imagination, and inspiration.
                </motion.p>

                {/* Mission and Vision */}
                <div className="grid md:grid-cols-2 gap-10 mt-8 text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white shadow-md rounded-2xl p-8"
                    >
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                            Our Mission
                        </h3>
                        <p className="text-gray-600">
                            To make reading accessible to everyone and provide high-quality books,
                            both in print and digital formats, while supporting authors and publishers
                            worldwide.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white shadow-md rounded-2xl p-8"
                    >
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                            Our Vision
                        </h3>
                        <p className="text-gray-600">
                            To build a community of passionate readers and authors, bridging the gap
                            between creativity and knowledge through technology and service excellence.
                        </p>
                    </motion.div>
                </div>

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-xl italic text-gray-700">
                        “A room without books is like a body without a soul.” – Marcus Tullius Cicero
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
