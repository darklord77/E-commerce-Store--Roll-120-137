import { motion } from "framer-motion";

const services = [
    {
        title: "Book Printing & Publishing",
        description:
            "We offer premium quality printing and publishing services for authors and educational institutions.",
        icon: "print",
    },
    {
        title: "E-Book Access",
        description:
            "Enjoy instant access to thousands of e-books directly from your device, anytime and anywhere.",
        icon: "devices",
    },
    {
        title: "Fast Delivery",
        description:
            "Get your favorite books delivered right to your doorstep with our fast and reliable delivery network.",
        icon: "local_shipping",
    },
    {
        title: "Student Discounts",
        description:
            "Special offers and discounts for students and educators on selected categories and new arrivals.",
        icon: "school",
    },
    {
        title: "Gift Wrapping",
        description:
            "Make your gifts special with our beautiful gift wrapping options for all occasions.",
        icon: "card_giftcard",
    },
];

const Services = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-gray-800 mb-4"
                >
                    Our Services
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 max-w-2xl mx-auto mb-12"
                >
                    At <span className="text-indigo-600 font-semibold">BookVerse</span>, we
                    offer a variety of services to make your reading and publishing
                    experience seamless and enjoyable.
                </motion.p>

                {/* Services Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition duration-300"
                        >
                            <span className="material-icons text-indigo-600 text-4xl mb-4">
                                {service.icon}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
