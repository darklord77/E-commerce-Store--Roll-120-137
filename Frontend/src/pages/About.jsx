import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
    const features = [
        {
            icon: '📚',
            title: 'Curated Collection',
            description: 'Handpicked books across all genres from bestsellers to hidden gems'
        },
        {
            icon: '🚚',
            title: 'Fast Delivery',
            description: 'Quick and reliable shipping to get your books to you as soon as possible'
        },
        {
            icon: '💝',
            title: 'Great Prices',
            description: 'Competitive pricing with regular discounts and special offers'
        },
        {
            icon: '🌟',
            title: 'Quality Service',
            description: 'Exceptional customer service and support for all your reading needs'
        }
    ];

    const stats = [
        { number: '10K+', label: 'Happy Readers' },
        { number: '5K+', label: 'Books Available' },
        { number: '50+', label: 'Categories' },
        { number: '99%', label: 'Satisfaction Rate' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
                            About BookVerse
                        </h1>
                        <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                            We're passionate about connecting readers with amazing books and creating a community where stories come alive.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-display">
                                Our Story
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Founded in 2024, BookVerse began as a simple idea: to make great books accessible to everyone. 
                                We believe that every book has the power to transform lives, spark imagination, and connect people 
                                across cultures and generations.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Today, we're proud to serve thousands of book lovers worldwide, offering carefully curated 
                                collections that span every genre and interest. From timeless classics to contemporary bestsellers, 
                                we're here to help you discover your next favorite read.
                            </p>
                            <Link
                                to="/books"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-block"
                            >
                                Explore Our Collection
                            </Link>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 shadow-xl">
                                <div className="text-6xl mb-4 text-center">📖</div>
                                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Our Mission</h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    To inspire a love of reading by providing access to diverse, high-quality books 
                                    and fostering a community where stories and ideas can flourish.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-display">Why Choose BookVerse?</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We're committed to providing the best book shopping experience with these key features
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.03 }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-display">BookVerse by Numbers</h2>
                        <p className="text-gray-600 text-lg">Our growing community of book lovers</p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.03 }}
                                className="text-center"
                            >
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
                                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-indigo-100">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                            Ready to Start Your Reading Journey?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8">
                            Join thousands of readers who have discovered their next favorite book with BookVerse
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/books"
                                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                            >
                                Browse Books
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;