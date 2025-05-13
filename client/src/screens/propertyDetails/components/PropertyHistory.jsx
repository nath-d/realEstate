import React from 'react';
import { motion } from 'framer-motion';
import { FaHistory, FaChartLine, FaCalendarAlt, FaDollarSign, FaClock } from 'react-icons/fa';

const PropertyHistory = ({ history }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(parseFloat(price.replace(/[^0-9.]/g, '')));
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaClock className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-white">Property History</h2>
                    <div className="flex justify-center items-center gap-4">
                        <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
                        <p className="text-gray-400">Track the property's value over time</p>
                        <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
                    </div>
                </motion.div>

                <div className="bg-[#1A332C] rounded-3xl p-8 shadow-xl border border-[#E5BE90]/10">
                    {/* Key Information */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        <motion.div
                            variants={item}
                            className="bg-[#122620] p-6 rounded-3xl border border-[#E5BE90]/5"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center mr-4">
                                    <FaCalendarAlt className="text-[#E5BE90] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-[#E5BE90] font-bold text-lg">Listed Date</h3>
                                    <p className="text-white text-xl mt-1">{formatDate(history.listedDate)}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={item}
                            className="bg-[#122620] p-6 rounded-3xl border border-[#E5BE90]/5"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center mr-4">
                                    <FaDollarSign className="text-[#E5BE90] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-[#E5BE90] font-bold text-lg">Last Sold</h3>
                                    <p className="text-white mt-1">{formatDate(history.lastSoldDate)}</p>
                                    <p className="text-[#E5BE90] font-bold text-xl">{formatPrice(history.lastSoldPrice)}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={item}
                            className="bg-[#122620] p-6 rounded-3xl border border-[#E5BE90]/5"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center mr-4">
                                    <FaChartLine className="text-[#E5BE90] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-[#E5BE90] font-bold text-lg">Price Change</h3>
                                    <p className="text-white mt-1">
                                        {formatPrice(history.priceHistory[history.priceHistory.length - 1].price)} - Current
                                    </p>
                                    <p className="text-green-400 font-bold">
                                        +{formatPrice(
                                            (parseFloat(history.priceHistory[history.priceHistory.length - 1].price.replace(/[^0-9.]/g, '')) -
                                                parseFloat(history.lastSoldPrice.replace(/[^0-9.]/g, ''))).toString()
                                        )}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Price History Timeline */}
                    <div className="mt-12">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center mr-3">
                                <FaHistory className="text-[#E5BE90]" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Price History Timeline</h3>
                        </div>

                        <div className="relative pl-6">
                            {/* Timeline Line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E5BE90]/20"></div>

                            {/* Timeline Events */}
                            <motion.div
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                {history.priceHistory.map((event, index) => (
                                    <motion.div
                                        key={index}
                                        variants={item}
                                        className="relative pl-12"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 w-12 h-12 rounded-full bg-[#E5BE90]/10 border border-[#E5BE90]/30 flex items-center justify-center">
                                            <FaDollarSign className="text-[#E5BE90]" />
                                        </div>

                                        {/* Event Content */}
                                        <div className="bg-[#122620] p-6 rounded-3xl border border-[#E5BE90]/5">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-[#E5BE90] font-bold text-2xl">
                                                        {formatPrice(event.price)}
                                                    </p>
                                                    <p className="text-gray-400 mt-1">
                                                        {formatDate(event.date)}
                                                    </p>
                                                </div>
                                                {index > 0 && (
                                                    <div className="text-right">
                                                        <div className={`flex items-center justify-end space-x-2 ${parseFloat(event.price.replace(/[^0-9.]/g, '')) >
                                                                parseFloat(history.priceHistory[index - 1].price.replace(/[^0-9.]/g, ''))
                                                                ? 'text-green-400'
                                                                : 'text-red-400'
                                                            }`}>
                                                            <span className="text-2xl font-bold">
                                                                {parseFloat(event.price.replace(/[^0-9.]/g, '')) >
                                                                    parseFloat(history.priceHistory[index - 1].price.replace(/[^0-9.]/g, ''))
                                                                    ? '↑'
                                                                    : '↓'}
                                                            </span>
                                                            <span className="font-bold">
                                                                {formatPrice(
                                                                    Math.abs(
                                                                        parseFloat(event.price.replace(/[^0-9.]/g, '')) -
                                                                        parseFloat(history.priceHistory[index - 1].price.replace(/[^0-9.]/g, ''))
                                                                    ).toString()
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyHistory; 