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
                        {details && details.length > 0 ? (
                            details.map((detail, idx) => (
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
                            ))
                        ) : (
                            <div className="col-span-2">
                                <div className="h-full p-4 rounded-lg bg-[#122620] hover:bg-[#E5BE90]/10 transition-colors duration-300">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D6AD60] mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-300 text-sm leading-relaxed">No specifications available</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const PropertySpecifications = ({ specifications }) => {
    // Default specifications if none provided
    const defaultSpecifications = [
        {
            icon: FaBuilding,
            title: "Structure & Brickwork",
            details: specifications?.structure || ["No structure specifications available"]
        },
        {
            icon: FaPaintBrush,
            title: "External & Interior Finish",
            details: [
                ...(specifications?.externalFinish || []),
                ...(specifications?.interiorFinish || [])
            ].length > 0 ? [
                ...(specifications?.externalFinish || []),
                ...(specifications?.interiorFinish || [])
            ] : ["No finish specifications available"]
        },
        {
            icon: FaDoorOpen,
            title: "Doors and Hardware",
            details: specifications?.doors || ["No door specifications available"]
        },
        {
            icon: FaWindowMaximize,
            title: "Windows",
            details: specifications?.windows || ["No window specifications available"]
        },
        {
            icon: FaLayerGroup,
            title: "Flooring",
            details: specifications?.flooring || ["No flooring specifications available"]
        },
        {
            icon: FaUtensils,
            title: "Kitchen Counter",
            details: specifications?.kitchen || ["No kitchen specifications available"]
        },
        {
            icon: FaBath,
            title: "Washroom",
            details: specifications?.washroom || ["No washroom specifications available"]
        },
        {
            icon: FaElevator,
            title: "Elevator",
            details: specifications?.elevator || ["No elevator specifications available"]
        },
        {
            icon: FaBolt,
            title: "Electricity",
            details: specifications?.electricity || ["No electricity specifications available"]
        },
        {
            icon: FaWater,
            title: "Water Supply",
            details: specifications?.waterSupply || ["No water supply specifications available"]
        }
    ];

    // Create table data from specifications
    const tableData = [
        { category: "Structure & Brickwork", specifications: specifications?.structure || ["Not specified"] },
        { category: "External Finish", specifications: specifications?.externalFinish || ["Not specified"] },
        { category: "Interior Finish", specifications: specifications?.interiorFinish || ["Not specified"] },
        { category: "Doors & Hardware", specifications: specifications?.doors || ["Not specified"] },
        { category: "Windows", specifications: specifications?.windows || ["Not specified"] },
        { category: "Flooring", specifications: specifications?.flooring || ["Not specified"] },
        { category: "Kitchen Counter", specifications: specifications?.kitchen || ["Not specified"] },
        { category: "Washroom", specifications: specifications?.washroom || ["Not specified"] },
        { category: "Elevator", specifications: specifications?.elevator || ["Not specified"] },
        { category: "Electricity", specifications: specifications?.electricity || ["Not specified"] },
        { category: "Water Supply", specifications: specifications?.waterSupply || ["Not specified"] }
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 mb-20">
                    {defaultSpecifications.map((spec, index) => (
                        <SpecificationCard
                            key={index}
                            icon={spec.icon}
                            title={spec.title}
                            details={spec.details}
                            index={index}
                        />
                    ))}
                </div>

                {/* Specifications Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-[#1A332C] to-[#122620] rounded-2xl overflow-hidden shadow-xl border border-[#E5BE90]/20"
                >
                    <div className="p-4 bg-gradient-to-r from-[#E5BE90]/10 to-transparent border-b border-[#E5BE90]/20">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <FaClipboardList className="text-[#E5BE90]" />
                            Complete Specifications Overview
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">Detailed breakdown of all property specifications</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#122620]/50 border-b border-[#E5BE90]/20">
                                    <th className="px-6 py-4 text-left text-[#E5BE90] font-semibold text-base tracking-wide">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-[#E5BE90] font-semibold text-base tracking-wide">
                                        Specifications
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`border-b border-[#E5BE90]/10 hover:bg-[#E5BE90]/5 transition-colors duration-300 ${index % 2 === 0 ? 'bg-[#1A332C]/30' : 'bg-[#122620]/30'
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[#E5BE90] flex-shrink-0"></div>
                                                <span className="text-white font-medium text-base">{row.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap items-center">
                                                {Array.isArray(row.specifications) ? (
                                                    row.specifications.map((spec, specIndex) => (
                                                        <div key={specIndex} className="flex items-center">
                                                            <span className="text-gray-300 text-base leading-relaxed">
                                                                {spec.length > 50 ? `${spec.substring(0, 50)}...` : spec}
                                                            </span>
                                                            {specIndex < row.specifications.length - 1 && (
                                                                <span className="text-[#E5BE90] text-base mx-3">,</span>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="flex items-center">
                                                        <span className="text-gray-300 text-base leading-relaxed">
                                                            {row.specifications.length > 50 ? `${row.specifications.substring(0, 50)}...` : row.specifications}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="p-3 bg-gradient-to-r from-transparent to-[#E5BE90]/5 border-t border-[#E5BE90]/20">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Total Categories: {tableData.length}</span>
                            <span>Last Updated: {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PropertySpecifications; 