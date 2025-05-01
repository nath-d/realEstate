// import React, { useRef } from 'react';
// import { motion, useAnimation, useInView } from 'framer-motion';

// const FutureVision = ({ image, alt }) => {
//     const sectionRef = useRef(null);
//     const controls = useAnimation();
//     const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

//     React.useEffect(() => {
//         if (isInView) {
//             controls.start('visible');
//         }
//     }, [isInView, controls]);

//     const goals = [
//         {
//             id: 1,
//             title: "Market Expansion",
//             description: "Expanding our presence to new markets and regions",
//             icon: (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//             )
//         },
//         {
//             id: 2,
//             title: "Technology Innovation",
//             description: "Implementing cutting-edge solutions for better client experiences",
//             icon: (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                 </svg>
//             )
//         },
//         {
//             id: 3,
//             title: "Sustainability Initiatives",
//             description: "Promoting eco-friendly properties and green building practices",
//             icon: (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
//                 </svg>
//             )
//         },
//         {
//             id: 4,
//             title: "Community Engagement",
//             description: "Strengthening our ties with local communities and organizations",
//             icon: (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
//                 </svg>
//             )
//         },
//         {
//             id: 5,
//             title: "Agent Development",
//             description: "Investing in our team's growth and professional excellence",
//             icon: (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
//                 </svg>
//             )
//         },
//         {
//             id: 6,
//             title: "Client Experience Excellence",
//             description: "Elevating our service standards to exceed client expectations",
//             icon: (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
//                 </svg>
//             )
//         }
//     ];

//     const timeline = [
//         {
//             year: "2023",
//             title: "Foundation & Growth",
//             description: "Established our presence with a focus on luxury properties and personalized service."
//         },
//         {
//             year: "2024",
//             title: "Market Expansion",
//             description: "Expanding to new neighborhoods and introducing innovative technology solutions."
//         },
//         {
//             year: "2025",
//             title: "Sustainability Focus",
//             description: "Launching our green initiative and promoting eco-friendly property developments."
//         },
//         {
//             year: "2026",
//             title: "Industry Leadership",
//             description: "Aiming to become the leading luxury real estate platform with global recognition."
//         }
//     ];

//     return (
//         <section
//             ref={sectionRef}
//             className="py-20 bg-[#122620] relative overflow-hidden"
//         >
//             {/* Background Elements */}
//             <div className="absolute top-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
//             <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
//             <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>
//             <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                 {/* Header */}
//                 <motion.div
//                     className="text-center mb-16"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={controls}
//                     variants={{
//                         visible: {
//                             opacity: 1,
//                             y: 0,
//                             transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
//                         }
//                     }}
//                 >
//                     <div className="inline-block mb-4">
//                         <span className="inline-block w-16 h-1 bg-[#D6AD60] mb-2"></span>
//                         <h2 className="text-3xl md:text-4xl lg:text-5xl font-source-serif text-[#F4EBD0] mb-4">
//                             Future Vision & Goals
//                         </h2>
//                         <span className="inline-block w-16 h-1 bg-[#D6AD60]"></span>
//                     </div>
//                     <p className="text-[#F4EBD0]/80 font-montserrat text-lg max-w-2xl mx-auto">
//                         Our commitment to transforming the real estate experience through innovation and excellence
//                     </p>
//                 </motion.div>

//                 {/* Vision Statement and Image */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//                     {/* Vision Statement */}
//                     <motion.div
//                         className="order-1"
//                         initial={{ opacity: 0, x: -30 }}
//                         animate={controls}
//                         variants={{
//                             visible: {
//                                 opacity: 1,
//                                 x: 0,
//                                 transition: { duration: 0.6, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }
//                             }
//                         }}
//                     >
//                         <div className="bg-[#F4EBD0]/5 border border-[#D6AD60]/20 rounded-lg p-8 h-full">
//                             <h3 className="text-2xl font-source-serif text-[#D6AD60] mb-4">Our Vision</h3>
//                             <p className="text-[#F4EBD0]/80 font-montserrat text-lg leading-relaxed mb-6">
//                                 At ProjectEstate, we envision a future where real estate transactions are seamless, transparent, and personalized. Our goal is to leverage technology and human expertise to create exceptional experiences for our clients.
//                             </p>
//                             <p className="text-[#F4EBD0]/80 font-montserrat text-lg leading-relaxed">
//                                 We are committed to continuous innovation, sustainable practices, and building lasting relationships with our communities. Our vision extends beyond transactions to creating lasting value for all stakeholders.
//                             </p>
//                         </div>
//                     </motion.div>

//                     {/* Image */}
//                     <motion.div
//                         className="relative h-full min-h-[300px] order-2"
//                         initial={{ opacity: 0, x: 30 }}
//                         animate={controls}
//                         variants={{
//                             visible: {
//                                 opacity: 1,
//                                 x: 0,
//                                 transition: { duration: 0.6, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }
//                             }
//                         }}
//                     >
//                         <div className="absolute inset-0 overflow-hidden rounded-lg shadow-xl">
//                             <img
//                                 src={image}
//                                 alt={alt}
//                                 className="w-full h-full object-cover"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-[#122620]/80 to-transparent"></div>
//                         </div>
//                         <div className="absolute top-0 left-0 right-0 p-6">
//                             <div className="bg-[#D6AD60] text-[#122620] font-montserrat font-medium px-6 py-3 rounded-md inline-block">
//                                 Looking Forward
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>

//                 {/* Strategic Goals */}
//                 <motion.div
//                     className="mb-16"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={controls}
//                     variants={{
//                         visible: {
//                             opacity: 1,
//                             y: 0,
//                             transition: { duration: 0.6, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }
//                         }
//                     }}
//                 >
//                     <h3 className="text-2xl font-source-serif text-[#D6AD60] mb-6 text-center">Strategic Goals</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {goals.map((goal) => (
//                             <motion.div
//                                 key={goal.id}
//                                 className="group"
//                                 whileHover={{
//                                     y: -5,
//                                     transition: {
//                                         duration: 0.3,
//                                         ease: [0.6, -0.05, 0.01, 0.99]
//                                     }
//                                 }}
//                             >
//                                 <div className="flex flex-col p-6 bg-[#F4EBD0]/5 border border-[#D6AD60]/20 rounded-lg hover:bg-[#F4EBD0]/10 transition-all duration-300 h-full">
//                                     <div className="w-12 h-12 rounded-md bg-[#F4EBD0]/10 flex items-center justify-center mb-4 group-hover:bg-[#D6AD60] group-hover:text-white transition-colors duration-300">
//                                         {goal.icon}
//                                     </div>
//                                     <h4 className="text-xl font-source-serif text-[#F4EBD0] mb-2">{goal.title}</h4>
//                                     <p className="text-[#F4EBD0]/70 font-montserrat text-sm leading-relaxed">{goal.description}</p>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </motion.div>

//                 {/* Growth Timeline */}
//                 <motion.div
//                     className="mb-16"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={controls}
//                     variants={{
//                         visible: {
//                             opacity: 1,
//                             y: 0,
//                             transition: { duration: 0.6, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
//                         }
//                     }}
//                 >
//                     <h3 className="text-2xl font-source-serif text-[#D6AD60] mb-6 text-center">Growth Timeline</h3>
//                     <div className="relative">
//                         <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#D6AD60]/20"></div>
//                         <div className="space-y-8">
//                             {timeline.map((item, index) => (
//                                 <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
//                                     <div className="w-5/12 relative">
//                                         <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-[#D6AD60] transform -translate-x-1/2"></div>
//                                         <div className="bg-[#F4EBD0]/5 border border-[#D6AD60]/20 rounded-lg p-6 ml-8">
//                                             <div className="text-[#D6AD60] font-source-serif font-bold text-xl mb-2">{item.year}</div>
//                                             <h4 className="text-[#F4EBD0] font-source-serif text-lg mb-2">{item.title}</h4>
//                                             <p className="text-[#F4EBD0]/70 font-montserrat text-sm">{item.description}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </motion.div>

//                 {/* Call to Action */}
//                 <motion.div
//                     className="text-center"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={controls}
//                     variants={{
//                         visible: {
//                             opacity: 1,
//                             y: 0,
//                             transition: { duration: 0.6, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
//                         }
//                     }}
//                 >
//                     <a
//                         href="/about"
//                         className="inline-block bg-[#D6AD60] text-[#122620] font-montserrat font-medium px-10 py-4 rounded-md hover:bg-[#F4EBD0] transition-all duration-500 transform hover:scale-105 shadow-md hover:shadow-lg"
//                     >
//                         Join Our Journey
//                     </a>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default FutureVision; 

import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const FutureVision = () => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const goals = [
        {
            id: 1,
            title: "Market Expansion",
            description: "Expanding our presence to new markets while deepening our roots in existing communities.",
            icon: (
                <svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            )
        },
        {
            id: 2,
            title: "Technology Innovation",
            description: "Continuously enhancing our digital platforms with cutting-edge technology to provide seamless experiences.",
            icon: (
                <svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            )
        },
        {
            id: 3,
            title: "Sustainability Initiatives",
            description: "Implementing eco-friendly practices and promoting sustainable real estate development.",
            icon: (
                <svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
            )
        },
        {
            id: 4,
            title: "Community Engagement",
            description: "Strengthening our commitment to local communities through partnerships and charitable initiatives.",
            icon: (
                <svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            )
        },
        {
            id: 5,
            title: "Agent Development",
            description: "Investing in our team's professional growth through advanced training and mentorship programs.",
            icon: (
                <svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
            )
        },
        {
            id: 6,
            title: "Client Experience Excellence",
            description: "Elevating our service standards to deliver exceptional experiences that exceed expectations.",
            icon: (
                <svg className="w-8 h-8 text-[#D6AD60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
            )
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
                    <div className="inline-block mb-4">
                        <span className="inline-block w-16 h-1 bg-[#D6AD60] mb-2"></span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-source-serif text-[#F4EBD0] mb-4">
                            Future Vision & Goals
                        </h2>
                        <span className="inline-block w-16 h-1 bg-[#D6AD60]"></span>
                    </div>
                    <p className="text-[#F4EBD0]/80 font-montserrat text-lg max-w-2xl mx-auto">
                        Our commitment to growth, innovation, and excellence in real estate.
                    </p>
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
                        <p className="text-[#F4EBD0] font-montserrat text-lg leading-relaxed italic text-center">
                            "To transform the real estate experience by combining cutting-edge technology with personalized service, creating lasting value for our clients and communities while setting new standards of excellence in the industry."
                        </p>
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
                                            {goal.icon}
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
                                {/* 2023 */}
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#D6AD60] transform -translate-x-1/2"></div>
                                    <div className="bg-[#F4EBD0]/5 p-6 border-l-2 border-[#D6AD60]">
                                        <h4 className="text-xl font-source-serif text-[#D6AD60] mb-2">2023</h4>
                                        <p className="text-[#F4EBD0]/80 font-montserrat">Launched our AI-powered property matching platform</p>
                                    </div>
                                </div>

                                {/* 2024 */}
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#D6AD60] transform -translate-x-1/2"></div>
                                    <div className="bg-[#F4EBD0]/5 p-6 border-l-2 border-[#D6AD60]">
                                        <h4 className="text-xl font-source-serif text-[#D6AD60] mb-2">2024</h4>
                                        <p className="text-[#F4EBD0]/80 font-montserrat">Expanding to three new markets and launching virtual tour technology</p>
                                    </div>
                                </div>

                                {/* 2025 */}
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#D6AD60] transform -translate-x-1/2"></div>
                                    <div className="bg-[#F4EBD0]/5 p-6 border-l-2 border-[#D6AD60]">
                                        <h4 className="text-xl font-source-serif text-[#D6AD60] mb-2">2025</h4>
                                        <p className="text-[#F4EBD0]/80 font-montserrat">Implementing sustainable development initiatives and community programs</p>
                                    </div>
                                </div>

                                {/* 2026 */}
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#D6AD60] transform -translate-x-1/2"></div>
                                    <div className="bg-[#F4EBD0]/5 p-6 border-l-2 border-[#D6AD60]">
                                        <h4 className="text-xl font-source-serif text-[#D6AD60] mb-2">2026</h4>
                                        <p className="text-[#F4EBD0]/80 font-montserrat">Achieving industry leadership in technology integration and client satisfaction</p>
                                    </div>
                                </div>
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
                    <a
                        href="/contact"
                        className="inline-block bg-[#D6AD60] text-[#122620] font-montserrat font-medium px-10 py-4 rounded-md hover:bg-[#F4EBD0] transition-all duration-500 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        Join Our Journey
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FutureVision;