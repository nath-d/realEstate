import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCheckCircle, FaImage, FaUpload } from 'react-icons/fa';

const MaterialCertifications = ({ certifications = [] }) => {
    // Default certifications if none provided
    const defaultCertifications = [
        {
            material: "Cement",
            brand: "UltraTech Cement",
            certificate: "ISO 9001:2015",
            description: "Premium quality cement meeting international standards for strength and durability",
            verified: true,
            imageUrl: "https://images.unsplash.com/photo-1744132813635-128ed5004f65?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            material: "Steel Rods",
            brand: "TATA Tiscon",
            certificate: "BIS 1786:2008",
            description: "High-strength TMT bars ensuring structural integrity and earthquake resistance",
            verified: true,
            imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            material: "Sand",
            brand: "Local Premium",
            certificate: "IS 383:2016",
            description: "Fine aggregate meeting Indian standards for construction quality",
            verified: true,
            imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            material: "Bricks",
            brand: "Premium Clay",
            certificate: "IS 12894:2002",
            description: "First-class bricks with superior compressive strength",
            verified: true,
            imageUrl: "https://images.unsplash.com/photo-1590644365607-1c5a0c82f9b9?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            material: "Waterproofing",
            brand: "Dr. Fixit",
            certificate: "ISO 9001:2015",
            description: "Advanced waterproofing solutions for long-lasting protection",
            verified: true,
            imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            material: "Paints",
            brand: "Asian Paints",
            certificate: "ISO 9001:2015",
            description: "Premium quality paints with superior finish and durability",
            verified: true,
            imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                                className="group relative overflow-hidden rounded-3xl border border-[#E5BE90]/20 hover:border-[#E5BE90]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#E5BE90]/10 hover:-translate-y-2"
                            >
                                {/* Dynamic Background Image */}
                                <div className="blur-sm absolute inset-0 opacity-20 group-hover:opacity-15 transition-opacity duration-500">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url('${cert.imageUrl || 'https://images.unsplash.com/photo-1744132813635-128ed5004f65?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}`
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 p-8">
                                    {/* Header Section */}
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-4 h-4 rounded-full bg-[#E5BE90] flex-shrink-0 shadow-sm"></div>
                                                <h3 className="text-2xl font-bold text-white font-source-serif leading-tight">{cert.material}</h3>
                                            </div>
                                            <p className="text-[#E5BE90] font-semibold text-lg tracking-wide leading-relaxed">{cert.brand}</p>
                                        </div>
                                        {cert.verified && (
                                            <div className="flex items-center justify-center w-14 h-14 bg-[#E5BE90]/20 rounded-full border-2 border-[#E5BE90]/40 shadow-lg">
                                                <FaCheckCircle className="text-[#E5BE90] text-2xl" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Certificate Badge */}
                                    <div className="mb-8">
                                        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#E5BE90]/25 to-[#D6AD60]/25 rounded-2xl px-6 py-4 border-2 border-[#E5BE90]/40 shadow-lg">
                                            <FaCertificate className="text-[#E5BE90] text-xl" />
                                            <div>
                                                <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Certificate</p>
                                                <p className="text-white font-bold text-lg leading-tight">{cert.certificate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="relative mb-6">
                                        <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-[#E5BE90] to-[#D6AD60] rounded-full shadow-sm"></div>
                                        <p className="text-gray-200 text-base leading-relaxed pl-6 font-medium">{cert.description}</p>
                                    </div>

                                    {/* Material Image Preview */}
                                    {/* {cert.imageUrl && (
                                        <div className="mt-8">
                                            <div className="relative group/image">
                                                <img
                                                    src={cert.imageUrl}
                                                    alt={`${cert.material} - ${cert.brand}`}
                                                    className="w-full h-40 object-cover rounded-2xl border-2 border-[#E5BE90]/30 group-hover/image:border-[#E5BE90]/60 transition-all duration-300 shadow-lg"
                                                />
                                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                                                    <FaImage className="text-white text-3xl" />
                                                </div>
                                            </div>
                                        </div>
                                    )} */}

                                    {/* Bottom Accent */}
                                    {/* <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E5BE90] via-[#D6AD60] to-[#E5BE90] opacity-80"></div> */}
                                </div>

                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#E5BE90]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default MaterialCertifications; 