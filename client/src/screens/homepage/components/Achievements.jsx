import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Achievements = ({ image, alt }) => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const achievements = [
        {
            id: 1,
            number: "500+",
            title: "Properties Sold",
            description: "Successfully closed transactions across diverse property types"
        },
        {
            id: 2,
            number: "98%",
            title: "Client Satisfaction",
            description: "Consistently high ratings from our valued clients"
        },
        {
            id: 3,
            number: "15+",
            title: "Years Experience",
            description: "Decades of expertise in the real estate market"
        },
        {
            id: 4,
            number: "25+",
            title: "Industry Awards",
            description: "Recognition for excellence in real estate services"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-[#122620] relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iI0Q2QUQ2MCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
            <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>

            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                        }
                    }}
                >
                    <div className="inline-block mb-4">
                        <span className="inline-block w-16 h-1 bg-[#D6AD60] mb-2"></span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-source-serif text-[#F4EBD0] mb-4">
                            Our Achievements
                        </h2>
                        <span className="inline-block w-16 h-1 bg-[#D6AD60]"></span>
                    </div>
                    <p className="text-[#F4EBD0]/80 font-montserrat text-lg max-w-2xl mx-auto">
                        Milestones that define our success and commitment to excellence
                    </p>
                </motion.div>

                {/* Image and Achievements Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    {/* Image */}
                    <motion.div
                        className="relative h-full order-2 lg:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
                            }
                        }}
                    >
                        <div className="absolute inset-0 overflow-hidden rounded-lg shadow-xl">
                            <img
                                src={image}
                                alt={alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#122620]/80 to-transparent"></div>
                        </div>
                        <div className="absolute top-0 left-0 right-0 p-8">
                            <div className="bg-[#D6AD60] text-[#122620] font-montserrat font-medium px-6 py-3 rounded-md inline-block">
                                Excellence Recognized
                            </div>
                        </div>
                    </motion.div>

                    {/* Achievements Grid */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }
                            }
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {achievements.map((achievement) => (
                                <motion.div
                                    key={achievement.id}
                                    className="group"
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -10,
                                        transition: {
                                            duration: 0.4,
                                            ease: [0.22, 1, 0.36, 1]
                                        }
                                    }}
                                >
                                    <div className="flex flex-col items-center text-center p-8 bg-[#F4EBD0]/5 border border-[#D6AD60]/20 rounded-lg hover:bg-[#F4EBD0]/10 transition-all duration-300 h-full">
                                        <h3 className="text-4xl font-source-serif text-[#D6AD60] mb-2 group-hover:text-[#F4EBD0] transition-colors duration-300">{achievement.number}</h3>
                                        <h4 className="text-xl font-source-serif text-[#F4EBD0] mb-4">{achievement.title}</h4>
                                        <p className="text-[#F4EBD0]/70 font-montserrat text-sm leading-relaxed">{achievement.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
                        }
                    }}
                >
                    <a
                        href="/about"
                        className="inline-block bg-[#D6AD60] text-[#122620] font-montserrat font-medium px-12 py-5 rounded-md hover:bg-[#F4EBD0] transition-all duration-500 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        Learn More About Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Achievements; 