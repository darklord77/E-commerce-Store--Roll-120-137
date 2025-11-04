import React from 'react';

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
                <div className="max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
                        Discover Your Next Favorite <span className="text-indigo-600">Book</span> Today
                    </h1>
                    <p className="text-gray-600 mt-4">
                        Explore thousands of titles across genres, authors, and collections — right here on BookVerse.
                    </p>
                    <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                        Browse Books
                    </button>
                </div>

                <div className="mt-10 md:mt-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                        alt="books"
                        className="w-80 md:w-96"
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;
