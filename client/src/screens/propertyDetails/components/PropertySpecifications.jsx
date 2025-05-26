import React from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaBuilding, FaPaintBrush, FaDoorOpen, FaWindowMaximize, FaLayerGroup, FaUtensils, FaBath, FaBolt, FaWater } from 'react-icons/fa';
import { FaElevator } from 'react-icons/fa6';
const SpecificationCard = ({ icon: Icon, title, details, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative h-full"
        >
            <div className="bg-[#1a332d] border border-[#D6AD60]/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="p-8">
                    {/* Icon and Title Section */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-full bg-[#E5BE90] flex items-center justify-center text-[#122620] shadow-lg flex-shrink-0">
                            <Icon className="text-2xl" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-[#E5BE90] font-source-serif tracking-wide">{title}</h3>
                            <div className="w-full h-0.5 bg-[#E5BE90]/20 mt-2"></div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {details.map((detail, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="col-span-2 md:col-span-1"
                            >
                                <div className="h-full p-4 rounded-lg bg-[#122620] hover:bg-[#E5BE90]/10 transition-colors duration-300">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D6AD60] mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{detail}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const PropertySpecifications = () => {
    const specifications = [
        {
            icon: FaBuilding,
            title: "Structure & Brickwork",
            details: [
                "Premium RCC Frame Structure",
                "High-grade Cement (OPC 53 Grade)",
                "First-class Brickwork with 1:6 Mortar Ratio",
                "Reinforced Concrete Columns and Beams"
            ]
        },
        {
            icon: FaPaintBrush,
            title: "External & Interior Finish",
            details: [
                "Premium Weatherproof Exterior Paint",
                "High-quality Interior Putty Finish",
                "Textured Wall Finishes",
                "Anti-bacterial Interior Paint"
            ]
        },
        {
            icon: FaDoorOpen,
            title: "Doors and Hardware",
            details: [
                "Premium Brand Main Door",
                "High-quality Internal Doors",
                "Stainless Steel Hardware",
                "Security Locks and Fittings"
            ]
        },
        {
            icon: FaWindowMaximize,
            title: "Windows",
            details: [
                "Double-glazed UPVC Windows",
                "Premium Quality Glass",
                "Weather-resistant Frames",
                "Safety Grills and Mosquito Nets"
            ]
        },
        {
            icon: FaLayerGroup,
            title: "Flooring",
            details: [
                "Premium Vitrified Tiles",
                "Anti-skid Bathroom Tiles",
                "Marble/Granite Flooring in Common Areas",
                "High-quality Tile Adhesives"
            ]
        },
        {
            icon: FaUtensils,
            title: "Kitchen Counter",
            details: [
                "Premium Granite/Quartz Countertops",
                "Stainless Steel Sink",
                "High-quality Plumbing Fixtures",
                "Modular Kitchen Units"
            ]
        },
        {
            icon: FaBath,
            title: "Washroom",
            details: [
                "Premium Sanitaryware Brands",
                "Anti-skid Floor Tiles",
                "High-quality CP Fittings",
                "Modern Bathroom Fixtures"
            ]
        },
        {
            icon: FaElevator,
            title: "Elevator",
            details: [
                "Premium Brand Elevator",
                "Safety Features and Sensors",
                "Emergency Backup System",
                "Regular Maintenance Schedule"
            ]
        },
        {
            icon: FaBolt,
            title: "Electricity",
            details: [
                "Premium Electrical Points",
                "Modular Switches",
                "LED Lighting Fixtures",
                "Power Backup System"
            ]
        },
        {
            icon: FaWater,
            title: "Water Supply",
            details: [
                "Municipal Water Connection",
                "24/7 Water Supply",
                "Water Treatment System",
                "Rainwater Harvesting",
                "Rainwater Harvesting",

            ]
        }
    ];

    return (
        <section className="py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaClipboardList className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Specifications</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider">Premium Quality Materials</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
                    {specifications.map((spec, index) => (
                        <SpecificationCard
                            key={index}
                            icon={spec.icon}
                            title={spec.title}
                            details={spec.details}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertySpecifications; 