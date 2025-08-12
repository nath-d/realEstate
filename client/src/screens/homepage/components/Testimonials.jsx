// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useAnimation, useInView } from 'framer-motion';
// import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight, FaSmile, FaUsers, FaRedo, FaHeart } from 'react-icons/fa';

// const Testimonials = () => {
//     const sectionRef = useRef(null);
//     const controls = useAnimation();
//     const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
//     const [currentTestimonial, setCurrentTestimonial] = useState(0);

//     useEffect(() => {
//         if (isInView) {
//             controls.start('visible');
//         }
//     }, [isInView, controls]);

//     const testimonials = [
//         {
//             id: 1,
//             name: "Rajesh Kumar",
//             role: "Homeowner",
//             image: "/person1.jpeg",
//             quote: "Finding our dream home was a breeze with ProjectEstate. The team's dedication and attention to detail made the entire process smooth and enjoyable. We couldn't be happier with our new home!",
//             rating: 5,
//             location: "Mumbai, Maharashtra"
//         },
//         {
//             id: 2,
//             name: "Priya Sharma",
//             role: "Property Investor",
//             image: "/person2.jpeg",
//             quote: "As an investor, I need a platform I can trust. ProjectEstate has consistently delivered quality properties and excellent service. Their market insights have been invaluable for my investment decisions.",
//             rating: 5,
//             location: "Delhi, NCR"
//         },
//         {
//             id: 3,
//             name: "Amit Patel",
//             role: "First-time Buyer",
//             image: "/person1.jpeg",
//             quote: "Being a first-time homebuyer, I was nervous about the process. The team at ProjectEstate guided me through every step, making it less daunting. Their expertise and patience were truly appreciated.",
//             rating: 5,
//             location: "Bangalore, Karnataka"
//         },
//         {
//             id: 4,
//             name: "Neha Gupta",
//             role: "Property Seller",
//             image: "/person3.jpeg",
//             quote: "Selling my property through ProjectEstate was the best decision. They handled everything professionally and got me a great deal in record time. Highly recommend their services!",
//             rating: 5,
//             location: "Pune, Maharashtra"
//         },
//         {
//             id: 5,
//             name: "Vikram Singh",
//             role: "Real Estate Developer",
//             image: "/person1.jpeg",
//             quote: "Working with ProjectEstate has been a game-changer for our projects. Their platform has helped us reach the right buyers and streamline our sales process significantly.",
//             rating: 5,
//             location: "Hyderabad, Telangana"
//         }
//     ];

//     const renderStars = (rating) => {
//         return [...Array(5)].map((_, index) => (
//             <FaStar
//                 key={index}
//                 className={`w-4 h-4 ${index < rating ? 'text-[#D6AD60] fill-current' : 'text-gray-300'}`}
//             />
//         ));
//     };

//     const nextTestimonial = () => {
//         setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     };

//     const prevTestimonial = () => {
//         setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//     };

//     // Trust Indicators Data
//     const trustIndicators = [
//         {
//             id: 1,
//             value: "98%",
//             label: "Satisfaction Rate",
//             description: "Client satisfaction score",
//             icon: <FaSmile className="w-8 h-8 text-[#122620]" />
//         },
//         {
//             id: 2,
//             value: "4.9/5",
//             label: "Average Rating",
//             description: "From verified reviews",
//             icon: <FaStar className="w-8 h-8 text-[#122620]" />
//         },
//         {
//             id: 3,
//             value: "10K+",
//             label: "Happy Clients",
//             description: "Successfully served",
//             icon: <FaUsers className="w-8 h-8 text-[#122620]" />
//         },
//         {
//             id: 4,
//             value: "85%",
//             label: "Repeat Clients",
//             description: "Choose us again",
//             icon: <FaRedo className="w-8 h-8 text-[#122620]" />
//         }
//     ];

//     return (
//         <section
//             ref={sectionRef}
//             className="py-20 bg-gradient-to-br from-[#F4EBD0] via-[#F8F2E0] to-[#F4EBD0] relative overflow-hidden"
//         >
//             {/* Background Elements */}
//             <div className="absolute inset-0 bg-[#D6AD60]/5 opacity-30"></div>

//             {/* Floating Elements */}
//             <div className="absolute top-20 left-10 w-32 h-32 bg-[#D6AD60]/10 rounded-full blur-xl"></div>
//             <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#122620]/5 rounded-full blur-xl"></div>
//             <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#D6AD60]/8 rounded-full blur-lg"></div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                 {/* Header - Keeping the existing style */}
//                 <motion.div
//                     className="text-center mb-20"
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
//                     <h2 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">Client Testimonials</h2>
//                     <div className="flex justify-center items-center gap-4">
//                         <motion.span
//                             initial={{ width: 0 }}
//                             whileInView={{ width: 120 }}
//                             transition={{ duration: 0.8 }}
//                             className="h-0.5 bg-[#D6AD60]"
//                         ></motion.span>
//                         <p className="text-[#122620]/80">What our clients say about us</p>
//                         <motion.span
//                             initial={{ width: 0 }}
//                             whileInView={{ width: 120 }}
//                             transition={{ duration: 0.8 }}
//                             className="h-0.5 bg-[#D6AD60]"
//                         ></motion.span>
//                     </div>
//                 </motion.div>

//                 {/* Main Testimonial Display */}
//                 <motion.div
//                     className="mb-20"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={controls}
//                     variants={{
//                         visible: {
//                             opacity: 1,
//                             y: 0,
//                             transition: { duration: 0.8, delay: 0.2 }
//                         }
//                     }}
//                 >
//                     <div className="max-w-4xl mx-auto">
//                         <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
//                             {/* Background Quote Icon */}
//                             <div className="absolute top-8 right-8 text-[#D6AD60]/10">
//                                 <FaQuoteLeft size={80} />
//                             </div>

//                             {/* Quote Icon */}
//                             <div className="absolute top-8 left-8 text-[#D6AD60]">
//                                 <FaQuoteLeft size={24} />
//                             </div>

//                             {/* Testimonial Content */}
//                             <div className="relative z-10">
//                                 <motion.div
//                                     key={currentTestimonial}
//                                     initial={{ opacity: 0, x: 20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     exit={{ opacity: 0, x: -20 }}
//                                     transition={{ duration: 0.5 }}
//                                     className="text-center"
//                                 >
//                                     <p className="text-lg md:text-xl text-[#122620]/80 leading-relaxed mb-8 italic">
//                                         "{testimonials[currentTestimonial].quote}"
//                                     </p>

//                                     {/* Rating */}
//                                     <div className="flex justify-center mb-6">
//                                         {renderStars(testimonials[currentTestimonial].rating)}
//                                     </div>

//                                     {/* Author Info */}
//                                     <div className="flex items-center justify-center space-x-4">
//                                         {/* Avatar */}
//                                         {/*
//                                         <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#D6AD60]/20">
//                                             <img
//                                                 src={testimonials[currentTestimonial].image}
//                                                 alt={testimonials[currentTestimonial].name}
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                         */}
//                                         <div className="text-left">
//                                             <h4 className="text-xl font-bold text-[#122620]">
//                                                 {testimonials[currentTestimonial].name}
//                                             </h4>
//                                             <p className="text-[#D6AD60] font-medium">
//                                                 {testimonials[currentTestimonial].role}
//                                             </p>
//                                             <p className="text-[#122620]/60 text-sm">
//                                                 {testimonials[currentTestimonial].location}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             </div>

//                             {/* Navigation Dots */}
//                             <div className="flex justify-center mt-8 space-x-2">
//                                 {testimonials.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setCurrentTestimonial(index)}
//                                         className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
//                                             ? 'bg-[#D6AD60] w-8'
//                                             : 'bg-[#D6AD60]/30 hover:bg-[#D6AD60]/50'
//                                             }`}
//                                     />
//                                 ))}
//                             </div>

//                             {/* Navigation Arrows */}
//                             <button
//                                 onClick={prevTestimonial}
//                                 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#D6AD60] hover:bg-[#D6AD60] hover:text-white transition-all duration-300"
//                             >
//                                 <FaArrowLeft size={16} />
//                             </button>
//                             <button
//                                 onClick={nextTestimonial}
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#D6AD60] hover:bg-[#D6AD60] hover:text-white transition-all duration-300"
//                             >
//                                 <FaArrowRight size={16} />
//                             </button>
//                         </div>
//                     </div>
//                 </motion.div>

//                 {/* Trust Indicators - Redesigned */}
//                 <motion.div
//                     className="mt-20"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={controls}
//                     variants={{
//                         visible: {
//                             opacity: 1,
//                             y: 0,
//                             transition: { duration: 0.8, delay: 0.4 }
//                         }
//                     }}
//                 >
//                     <div className="text-center mb-12">
//                         <h3 className="text-3xl font-bold text-[#122620] mb-4">Why Clients Trust Us</h3>
//                         <p className="text-[#122620]/70 max-w-2xl mx-auto">
//                             Our commitment to excellence and client satisfaction has earned us the trust of thousands of families across India.
//                         </p>
//                     </div>

//                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//                         {trustIndicators.map((indicator, index) => (
//                             <motion.div
//                                 key={indicator.id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                                 className="group"
//                             >
//                                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-[#D6AD60]/10">
//                                     <div className="text-center">
//                                         <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D6AD60]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                                             {indicator.icon}
//                                         </div>
//                                         <div className="text-3xl font-bold text-[#D6AD60] mb-2">
//                                             {indicator.value}
//                                         </div>
//                                         <h4 className="text-lg font-semibold text-[#122620] mb-1">
//                                             {indicator.label}
//                                         </h4>
//                                         <p className="text-sm text-[#122620]/60">
//                                             {indicator.description}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </motion.div>

//                 {/* Call to Action */}
//                 <motion.div
//                     className="mt-20 text-center"
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                 >
//                     <div className="bg-gradient-to-r from-[#122620] to-[#1A332C] rounded-3xl p-8 md:p-12 text-white">
//                         <h3 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h3>
//                         <p className="text-[#D6AD60] mb-8 max-w-2xl mx-auto">
//                             Join thousands of satisfied clients who have found their perfect home with ProjectEstate.
//                         </p>
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="bg-[#D6AD60] text-[#122620] font-bold py-4 px-8 rounded-xl hover:bg-[#E5BE90] transition-all duration-300 shadow-lg"
//                         >
//                             Start Your Journey Today
//                         </motion.button>
//                     </div>
//                 </motion.div>
//             </div >
//         </section >
//     );
// };

// export default Testimonials;


import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight, FaSmile, FaUsers, FaRedo, FaHeart } from 'react-icons/fa';

const Testimonials = () => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const testimonials = [
        {
            id: 1,
            name: "Rajesh Kumar",
            role: "Homeowner",
            image: "/person1.jpeg",
            quote: "Finding our dream home was a breeze with ProjectEstate. The team's dedication and attention to detail made the entire process smooth and enjoyable. We couldn't be happier with our new home!",
            rating: 5,
            location: "Mumbai, Maharashtra"
        },
        {
            id: 2,
            name: "Priya Sharma",
            role: "Property Investor",
            image: "/person2.jpeg",
            quote: "As an investor, I need a platform I can trust. ProjectEstate has consistently delivered quality properties and excellent service. Their market insights have been invaluable for my investment decisions.",
            rating: 5,
            location: "Delhi, NCR"
        },
        {
            id: 3,
            name: "Amit Patel",
            role: "First-time Buyer",
            image: "/person1.jpeg",
            quote: "Being a first-time homebuyer, I was nervous about the process. The team at ProjectEstate guided me through every step, making it less daunting. Their expertise and patience were truly appreciated.",
            rating: 5,
            location: "Bangalore, Karnataka"
        },
        {
            id: 4,
            name: "Neha Gupta",
            role: "Property Seller",
            image: "/person3.jpeg",
            quote: "Selling my property through ProjectEstate was the best decision. They handled everything professionally and got me a great deal in record time. Highly recommend their services!",
            rating: 5,
            location: "Pune, Maharashtra"
        },
        {
            id: 5,
            name: "Vikram Singh",
            role: "Real Estate Developer",
            image: "/person1.jpeg",
            quote: "Working with ProjectEstate has been a game-changer for our projects. Their platform has helped us reach the right buyers and streamline our sales process significantly.",
            rating: 5,
            location: "Hyderabad, Telangana"
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-[#D6AD60] fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Trust Indicators Data
    const trustIndicators = [
        {
            id: 1,
            value: "98%",
            label: "Satisfaction Rate",
            description: "Client satisfaction score",
            icon: <FaSmile className="w-8 h-8 text-[#122620]" />
        },
        {
            id: 2,
            value: "4.9/5",
            label: "Average Rating",
            description: "From verified reviews",
            icon: <FaStar className="w-8 h-8 text-[#122620]" />
        },
        {
            id: 3,
            value: "10K+",
            label: "Happy Clients",
            description: "Successfully served",
            icon: <FaUsers className="w-8 h-8 text-[#122620]" />
        },
        {
            id: 4,
            value: "85%",
            label: "Repeat Clients",
            description: "Choose us again",
            icon: <FaRedo className="w-8 h-8 text-[#122620]" />
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-gradient-to-br from-[#F4EBD0] via-[#F8F2E0] to-[#F4EBD0] relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[#D6AD60]/5 opacity-30"></div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-[#D6AD60]/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#122620]/5 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#D6AD60]/8 rounded-full blur-lg"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header - Keeping the existing style */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
                        }
                    }}
                >
                    <h2 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">Client Testimonials</h2>
                    <div className="flex justify-center items-center gap-4">
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#D6AD60]"
                        ></motion.span>
                        <p className="text-[#122620]/80">What our clients say about us</p>
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#D6AD60]"
                        ></motion.span>
                    </div>
                </motion.div>

                {/* Main Testimonial Display */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, delay: 0.2 }
                        }
                    }}
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                            {/* Background Quote Icon */}
                            <div className="absolute top-8 right-8 text-[#D6AD60]/10">
                                <FaQuoteLeft size={80} />
                            </div>

                            {/* Quote Icon */}
                            <div className="absolute top-8 left-8 text-[#D6AD60]">
                                <FaQuoteLeft size={24} />
                            </div>

                            {/* Testimonial Content */}
                            <div className="relative z-10">
                                <motion.div
                                    key={currentTestimonial}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center"
                                >
                                    <p className="text-lg md:text-xl text-[#122620]/80 leading-relaxed mb-8 italic">
                                        "{testimonials[currentTestimonial].quote}"
                                    </p>

                                    {/* Rating */}
                                    <div className="flex justify-center mb-6">
                                        {renderStars(testimonials[currentTestimonial].rating)}
                                    </div>

                                    {/* Author Info */}
                                    <div className="flex items-center justify-center space-x-4">
                                        {/* <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#D6AD60]/20">
                                            <img
                                                src={testimonials[currentTestimonial].image}
                                                alt={testimonials[currentTestimonial].name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div> */}
                                        <div className="text-left">
                                            <h4 className="text-xl font-bold text-[#122620]">
                                                {testimonials[currentTestimonial].name}
                                            </h4>
                                            <p className="text-[#D6AD60] font-medium">
                                                {testimonials[currentTestimonial].role}
                                            </p>
                                            <p className="text-[#122620]/60 text-sm">
                                                {testimonials[currentTestimonial].location}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Navigation Dots */}
                                <div className="flex justify-center mt-8 space-x-2">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentTestimonial(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                                                ? 'bg-[#D6AD60] w-8'
                                                : 'bg-[#D6AD60]/30 hover:bg-[#D6AD60]/50'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevTestimonial}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#D6AD60] hover:bg-[#D6AD60] hover:text-white transition-all duration-300"
                                >
                                    <FaArrowLeft size={16} />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#D6AD60] hover:bg-[#D6AD60] hover:text-white transition-all duration-300"
                                >
                                    <FaArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Trust Indicators - Redesigned */}
                <motion.div
                    className="mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, delay: 0.4 }
                        }
                    }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-[#122620] mb-4">Why Clients Trust Us</h3>
                        <p className="text-[#122620]/70 max-w-2xl mx-auto">
                            Our commitment to excellence and client satisfaction has earned us the trust of thousands of families across India.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {trustIndicators.map((indicator, index) => (
                            <motion.div
                                key={indicator.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-[#D6AD60]/10">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D6AD60]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {indicator.icon}
                                        </div>
                                        <div className="text-3xl font-bold text-[#D6AD60] mb-2">
                                            {indicator.value}
                                        </div>
                                        <h4 className="text-lg font-semibold text-[#122620] mb-1">
                                            {indicator.label}
                                        </h4>
                                        <p className="text-sm text-[#122620]/60">
                                            {indicator.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-r from-[#122620] to-[#1A332C] rounded-3xl p-8 md:p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h3>
                        <p className="text-[#D6AD60] mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied clients who have found their perfect home with ProjectEstate.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#D6AD60] text-[#122620] font-bold py-4 px-8 rounded-xl hover:bg-[#E5BE90] transition-all duration-300 shadow-lg"
                        >
                            Start Your Journey Today
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section >
    );
};

export default Testimonials;