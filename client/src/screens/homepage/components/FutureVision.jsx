import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { getFutureVisionContent, getFutureVisionGoals, getFutureVisionTimeline } from '../../../services/futureVisionService';
import { Link } from 'react-router-dom';

const FutureVision = () => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const [visionText, setVisionText] = useState(null);
    const [goals, setGoals] = useState([]);
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        (async () => {
            const content = await getFutureVisionContent();
            setVisionText(content?.visionText || null);
            setGoals(await getFutureVisionGoals());
            setTimeline(await getFutureVisionTimeline());
        })();
    }, []);

    const renderIcon = (iconKey) => {
        switch (iconKey) {
            case 'globe':
                return (<svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>);
            case 'monitor':
                return (<svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4h18v12H3zM8 20h8"></path></svg>);
            case 'leaf':
                return (<svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13a10 10 0 0014 0 10 10 0 00-14 0zm0 0V7a4 4 0 018 0v6"></path></svg>);
            case 'people':
                return (<svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>);
            case 'book':
                return (<svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>);
            case 'star':
                return (<svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>);
            default:
                return (<svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);
        }
    };


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
            className="py-32 bg-[#122620] relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iI0Q2QUQ2MCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
            <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-24"
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center mb-6">
                            {/* <div className="w-20 h-20 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                <FaHome className="text-[#E5BE90] text-4xl" />
                            </div> */}
                        </div>
                        <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Our Future Vision</h2>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex justify-center items-center gap-4">
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#D6AD60]"
                                ></motion.span>
                                <p className="text-gray-400">Our vision for the future</p>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#D6AD60]"
                                ></motion.span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Vision Statement */}
                <motion.div
                    className="mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
                        }
                    }}
                >
                    <div className="max-w-4xl mx-auto bg-[#F4EBD0]/5 p-12 border border-[#D6AD60]/20 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
                        <h3 className="text-2xl font-source-serif text-[#D6AD60] mb-6 text-center">Our Vision</h3>
                        {visionText && (
                            <p className="text-[#F4EBD0] font-montserrat text-lg leading-relaxed italic text-center">{`"${visionText}"`}</p>
                        )}
                    </div>
                </motion.div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Goals Column */}
                    <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }
                            }
                        }}
                    >
                        <h3 className="text-2xl font-source-serif text-[#F4EBD0] mb-10 text-center lg:text-left">Strategic Goals</h3>
                        <div className="space-y-8">
                            {goals.map((goal) => (
                                <motion.div
                                    key={goal.id}
                                    className="group"
                                    variants={itemVariants}
                                    whileHover={{
                                        x: 10,
                                        transition: {
                                            duration: 0.4,
                                            ease: [0.22, 1, 0.36, 1]
                                        }
                                    }}
                                >
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 flex items-center justify-center bg-[#122620] border border-[#D6AD60]/30 mr-6 mt-1">
                                            {renderIcon(goal.icon)}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-source-serif text-[#F4EBD0] mb-2 group-hover:text-[#D6AD60] transition-colors duration-300">{goal.title}</h4>
                                            <p className="text-[#F4EBD0]/70 font-montserrat text-sm leading-relaxed">{goal.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Timeline Column */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
                            }
                        }}
                    >
                        <h3 className="text-2xl font-source-serif text-[#F4EBD0] mb-10 text-center lg:text-left">Growth Timeline</h3>
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-0 top-0 h-full w-0.5 bg-[#D6AD60]"></div>

                            {/* Timeline Items */}
                            <div className="space-y-12">
                                {timeline.map((item) => (
                                    <div key={item.id} className="relative pl-8">
                                        <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#D6AD60] transform -translate-x-1/2"></div>
                                        <div className="bg-[#F4EBD0]/5 p-6 border-l-2 border-[#D6AD60]">
                                            <h4 className="text-xl font-source-serif text-[#D6AD60] mb-2">{item.year}</h4>
                                            <p className="text-[#F4EBD0]/80 font-montserrat">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    className="mt-32 text-center"
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
                    <Link
                                to="/properties"
                                className="inline-block bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                            >
                                Join Our Journey
                            </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FutureVision;