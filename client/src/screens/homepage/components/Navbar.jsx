import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-[#122620] shadow-md w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24 md:h-28">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img src="/logoConcept2.svg" alt="MG Pacific Estates" className="h-20 md:h-16 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-10 font-source-serif text-lg lg:text-xl tracking-wide font-normal">
                        <Link to="/" className="text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-full"></span>
                        </Link>
                        <Link to="/properties" className="text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 relative group">
                            Properties
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-full"></span>
                        </Link>
                        {/* <Link to="/temp" className="text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 relative group">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-full"></span>
                        </Link> */}
                        <Link to="/about" className="text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 relative group">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-full"></span>
                        </Link>
                        <Link to="/propertyDet" className="text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 relative group">
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-full"></span>
                        </Link>
                        {/* <button className="bg-[#D6AD60] text-[#122620] px-6 py-2.5 rounded-md hover:bg-[#B68D40] transition-all duration-200 font-montserrat font-medium tracking-wide shadow-sm hover:shadow text-lg">
                            Sign In
                        </button> */}

                        <button
                            className="bg-transparent backdrop-blur-sm border-2 border-[#D6AD60] text-[#D6AD60] px-6 py-2.5 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                        >
                            Sign in
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] focus:outline-none text-2xl transition-colors duration-200"
                        >
                            <span className={isOpen ? 'hidden' : 'block'}>☰</span>
                            <span className={isOpen ? 'block' : 'hidden'}>✕</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="h-[80vh] px-2 pt-4 pb-3 space-y-1 sm:px-3 bg-[#122620] shadow-lg mt-2 font-source-serif text-lg tracking-wide border-2 border-[#D6AD60]/60">
                        <Link to="/" className="block px-4 py-3 rounded-md text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] transition-colors duration-200 relative group">
                            Home
                            <span className="absolute bottom-0 left-4 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-[calc(100%-2rem)]"></span>
                        </Link>
                        <Link to="/properties" className="block px-4 py-3 rounded-md text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] transition-colors duration-200 relative group">
                            Properties
                            <span className="absolute bottom-0 left-4 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-[calc(100%-2rem)]"></span>
                        </Link>
                        <Link to="/about" className="block px-4 py-3 rounded-md text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] transition-colors duration-200 relative group">
                            About
                            <span className="absolute bottom-0 left-4 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-[calc(100%-2rem)]"></span>
                        </Link>
                        <Link to="/contact" className="block px-4 py-3 rounded-md text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] transition-colors duration-200 relative group">
                            Contact
                            <span className="absolute bottom-0 left-4 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-[calc(100%-2rem)]"></span>
                        </Link>
                        <div className="px-4 py-3">
                            <button className="w-full text-center px-4 py-3 bg-[#D6AD60] text-[#122620] rounded-md hover:bg-[#B68D40] transition-all duration-200 font-montserrat font-medium tracking-wide shadow-sm hover:shadow text-lg">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 