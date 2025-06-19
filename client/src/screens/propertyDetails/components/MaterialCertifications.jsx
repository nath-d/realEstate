import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCheckCircle } from 'react-icons/fa';

const MaterialCertifications = ({ certifications = [] }) => {
    // Default certifications if none provided
    const defaultCertifications = [
        {
            material: "Cement",
            brand: "UltraTech Cement",
            certificate: "ISO 9001:2015",
            description: "Premium quality cement meeting international standards for strength and durability",
            verified: true
        },
        {
            material: "Steel Rods",
            brand: "TATA Tiscon",
            certificate: "BIS 1786:2008",
            description: "High-strength TMT bars ensuring structural integrity and earthquake resistance",
            verified: true
        },
        {
            material: "Sand",
            brand: "Local Premium",
            certificate: "IS 383:2016",
            description: "Fine aggregate meeting Indian standards for construction quality",
            verified: true
        },
        {
            material: "Bricks",
            brand: "Premium Clay",
            certificate: "IS 12894:2002",
            description: "First-class bricks with superior compressive strength",
            verified: true
        },
        {
            material: "Waterproofing",
            brand: "Dr. Fixit",
            certificate: "ISO 9001:2015",
            description: "Advanced waterproofing solutions for long-lasting protection",
            verified: true
        },
        {
            material: "Paints",
            brand: "Asian Paints",
            certificate: "ISO 9001:2015",
            description: "Premium quality paints with superior finish and durability",
            verified: true
        }
    ];

    // Use provided certifications if available, otherwise use defaults
    const displayCertifications = certifications.length > 0 ? certifications : defaultCertifications;

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
            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaCertificate className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Material Certifications</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider">Quality Assured Building Materials</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>

                {displayCertifications.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No material certifications available for this property.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {displayCertifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="bg-[#122620]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#E5BE90]/20 hover:border-[#E5BE90]/40 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{cert.material}</h3>
                                        <p className="text-[#E5BE90] font-medium">{cert.brand}</p>
                                    </div>
                                    {cert.verified && (
                                        <FaCheckCircle className="text-[#E5BE90] text-xl" />
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-[#E5BE90]/10 rounded-lg p-3">
                                        <p className="text-sm text-gray-400">Certificate</p>
                                        <p className="text-white font-medium">{cert.certificate}</p>
                                    </div>
                                    <p className="text-gray-400 text-sm">{cert.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default MaterialCertifications; 