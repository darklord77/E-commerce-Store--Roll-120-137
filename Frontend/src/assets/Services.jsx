import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            icon: '📚',
            title: 'Book Recommendations',
            description: 'Get personalized book recommendations based on your reading preferences and history.',
            features: ['AI-powered suggestions', 'Genre-based filtering', 'Bestseller lists', 'Staff picks']
        },
        {
            icon: '🚚',
            title: 'Fast Delivery',
            description: 'Quick and reliable shipping options to get your books delivered when you need them.',
            features: ['Same-day delivery', 'Express shipping', 'Free shipping over $50', 'International delivery']
        },
        {
            icon: '📖',
            title: 'Digital Library',
            description: 'Access thousands of e-books and audiobooks instantly with our digital platform.',
            features: ['Instant downloads', 'Offline reading', 'Multi-device sync', 'Unlimited access']
        },
        {
            icon: '🎯',
            title: 'Book Club',
            description: 'Join our community of readers and participate in monthly book discussions.',
            features: ['Monthly selections', 'Author Q&As', 'Discussion forums', 'Exclusive events']
        },
        {
            icon: '🔄',
            title: 'Easy Returns',
            description: 'Hassle-free returns and exchanges with our customer-friendly return policy.',
            features: ['30-day returns', 'Free return shipping', 'Instant refunds', 'Exchange options']
        },
        {
            icon: '💝',
            title: 'Gift Services',
            description: 'Perfect gift options for book lovers with beautiful packaging and gift cards.',
            features: ['Gift wrapping', 'Digital gift cards', 'Personalized notes', 'Surprise boxes']
        }
    ];

    const plans = [
        {
            name: 'Basic Reader',
            price: 'Free',
            description: 'Perfect for casual readers',
            features: [
                'Browse full catalog',
                'Standard shipping',
                'Basic recommendations',
                'Customer support'
            ],
            popular: false
        },
        {
            name: 'Book Lover',
            price: '$9.99/month',
            description: 'For avid readers',
            features: [
                'Everything in Basic',
                'Free shipping on all orders',
                'Priority customer support',
                'Early access to new releases',
                'Monthly book recommendations'
            ],
            popular: true
        },
        {
            name: 'Bookworm Pro',
            price: '$19.99/month',
            description: 'Ultimate reading experience',
            features: [
                'Everything in Book Lover',
                'Unlimited digital library access',
                'Exclusive author events',
                'Personal reading consultant',
                'Premium gift services'
            ],
            popular: false
        }
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
                            Our Services
                        </h1>
                        <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                            Discover all the ways BookVerse makes your reading journey better, from personalized recommendations to premium delivery options.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-display">What We Offer</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Comprehensive services designed to enhance your reading experience
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.03 }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="text-5xl mb-6 text-center">{service.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{service.title}</h3>
                                <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                                
                                <div className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mr-3"></div>
                                            <span className="text-gray-600 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-display">Choose Your Plan</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Select the perfect plan for your reading habits and unlock exclusive benefits
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.03 }}
                                className={`relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    plan.popular ? 'ring-2 ring-indigo-600 transform scale-105' : ''
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-indigo-600 mb-2">{plan.price}</div>
                                    <p className="text-gray-600">{plan.description}</p>
                                </div>
                                
                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    plan.popular
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                                        : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                                }`}>
                                    {plan.price === 'Free' ? 'Get Started' : 'Choose Plan'}
                                </button>
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
                            Ready to Enhance Your Reading?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8">
                            Join BookVerse today and discover a world of amazing books and exclusive services
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
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;