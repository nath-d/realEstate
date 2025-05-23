import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCheckCircle, FaShieldAlt, FaAward, FaMedal, FaStar, FaTrophy, FaRibbon } from 'react-icons/fa';

const Achievements = () => {
    const achievements = [
        {
            title: "Premium Cement Certification",
            description: "ISO 9001:2015 certified cement from leading manufacturers",
            icon: FaCertificate,
            category: "Materials",
            year: "2024",
            stats: "Grade 53 OPC"
        },
        {
            title: "Steel Quality Assurance",
            description: "TMT bars certified by Bureau of Indian Standards (BIS)",
            icon: FaShieldAlt,
            category: "Structural",
            year: "2024",
            stats: "Fe 500D Grade"
        },
        {
            title: "Sand Quality Control",
            description: "IS 383 certified river sand and M-sand",
            icon: FaCheckCircle,
            category: "Materials",
            year: "2024",
            stats: "Zone II"
        },
        {
            title: "Brick Standards",
            description: "IS 12894 certified fly ash bricks",
            icon: FaMedal,
            category: "Materials",
            year: "2024",
            stats: "Class 1"
        },
        {
            title: "Paint Certification",
            description: "ISI marked premium quality paints",
            icon: FaStar,
            category: "Finishing",
            year: "2024",
            stats: "IS 15489"
        },
        {
            title: "Electrical Standards",
            description: "ISI certified electrical fittings and wires",
            icon: FaAward,
            category: "Electrical",
            year: "2024",
            stats: "IS 694"
        }
    ];

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
        <section className="py-20 relative overflow-hidden bg-[#122620]">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        {/* <div className="w-20 h-20 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaCertificate className="text-[#E5BE90] text-4xl" />
                        </div> */}
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Certifications</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider">Quality Assured Materials</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pt-20"
                >
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group relative h-[350px]"
                        >
                            <div className="relative h-full flex flex-col border-b border-[#E5BE90]/20 pb-6">
                                {/* Large Background Icon */}
                                <div className="absolute -right-4 -top-4 w-32 h-32 text-[#E5BE90]/5 transform group-hover:scale-110 transition-transform duration-500">
                                    <achievement.icon className="w-full h-full" />
                                </div>

                                <div className="relative flex-grow">
                                    {/* Main Icon */}
                                    <div className="w-24 h-24 bg-[#E5BE90]/10 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-105 transition-all duration-500">
                                        <achievement.icon className="text-[#E5BE90] text-5xl" />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-3xl font-bold text-white group-hover:text-[#E5BE90] transition-colors duration-500 font-source-serif tracking-wide">
                                                {achievement.title}
                                            </h3>
                                            <span className="text-[#E5BE90] text-sm font-medium">
                                                {achievement.year}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                                            {achievement.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-[#E5BE90] text-sm font-medium">
                                                {achievement.category}
                                            </span>
                                            <span className="text-2xl font-bold text-[#E5BE90] font-source-serif tracking-wide">
                                                {achievement.stats}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Recognition Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <div className="relative">
                        {/* Large Background Icon */}
                        <div className="absolute -right-8 -top-8 w-48 h-48 text-[#E5BE90]/5">
                            <FaRibbon className="w-full h-full" />
                        </div>

                        <div className="relative">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="flex items-center gap-8">
                                    <div className="w-24 h-24 bg-[#E5BE90]/10 rounded-2xl flex items-center justify-center">
                                        <FaRibbon className="text-[#E5BE90] text-5xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-4">Quality Assured Construction</h3>
                                        <p className="text-gray-400 max-w-xl">
                                            Every material used in our construction meets or exceeds industry standards,
                                            ensuring the highest quality and safety for your dream home.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-[#E5BE90] mb-2">100%</div>
                                        <div className="text-gray-400">Certified Materials</div>
                                    </div>
                                    <div className="h-16 w-px bg-[#E5BE90]/20"></div>
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-[#E5BE90] mb-2">ISO</div>
                                        <div className="text-gray-400">Certified</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Achievements; 