import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../services/authService';
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = authService.getToken();
            if (token) {
                let userData = authService.getUser();

                // If we have a token but no user data, try to refresh it
                if (!userData) {
                    console.log('Token exists but no user data, refreshing...');
                    const refreshResult = await authService.refreshUserData();
                    if (refreshResult.success) {
                        userData = refreshResult.user;
                    }
                }

                setUser(userData);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = '0';
            document.body.style.left = '0';
            document.body.style.right = '0';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
        }

        // Cleanup function to reset body styles when component unmounts
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
        };
    }, [isOpen]);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-[#122620] shadow-md w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24 md:h-36">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img src="/logoFinalSvg.svg" alt="MG Constructions" className="h-20 md:h-28 w-auto object-contain" />
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
                        <Link to="/contact" className="text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 relative group">
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B68D40] transition-all duration-500 group-hover:w-full"></span>
                        </Link>
                        {/* <button className="bg-[#D6AD60] text-[#122620] px-6 py-2.5 rounded-md hover:bg-[#B68D40] transition-all duration-200 font-montserrat font-medium tracking-wide shadow-sm hover:shadow text-lg">
                            Sign In
                        </button> */}

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/favorites" className="text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 font-montserrat text-sm">
                                    <FaHeart className="inline mr-1" />
                                    Favorites
                                </Link>
                                <Link to="/profile" className="text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 font-montserrat text-sm">
                                    {user.firstName}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-transparent backdrop-blur-sm border-2 border-[#D6AD60] text-[#D6AD60] px-6 py-2.5 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button
                                    className="bg-transparent backdrop-blur-sm border-2 border-[#D6AD60] text-[#D6AD60] px-6 py-2.5 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                                >
                                    Sign in
                                </button>
                            </Link>
                        )}
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

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="md:hidden fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm" onClick={toggleMenu}>
                        <div
                            className="fixed inset-y-0 right-0 w-full h-full bg-[#122620] shadow-2xl transform transition-all duration-500 ease-in-out animate-slide-in-right border-l-4 border-[#D6AD60]/60"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
                            }}
                        >
                            {/* Mobile Menu Header */}
                            <div className="relative flex justify-center items-center px-6 py-6 border-b-2 border-[#D6AD60]/30 bg-gradient-to-l from-[#122620] to-[#1a3830]">
                                <Link to="/" onClick={toggleMenu} className="flex justify-center">
                                    <img src="/logoFinalSvg.svg" alt="MG Constructions" className="h-16 w-auto object-contain" />
                                </Link>
                                <button
                                    onClick={toggleMenu}
                                    className="absolute right-4 p-2 rounded-full text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] focus:outline-none text-xl transition-all duration-200 hover:scale-110 hover:rotate-90"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Mobile Menu Content */}
                            <div className="flex flex-col h-[calc(100vh-5rem)] overflow-hidden">
                                <div className="flex-1 px-6 py-6 space-y-4 font-source-serif text-xl tracking-wide overflow-y-auto">
                                    <Link
                                        to="/"
                                        onClick={toggleMenu}
                                        className="block px-6 py-4 rounded-lg text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] transition-all duration-300 relative group border-r-4 border-transparent hover:border-[#D6AD60] text-center"
                                    >
                                        Home
                                        <span className="absolute bottom-2 right-6 w-0 h-[2px] bg-[#B68D40] transition-all duration-500 group-hover:w-[calc(100%-3rem)]"></span>
                                    </Link>
                                    <Link
                                        to="/properties"
                                        onClick={toggleMenu}
                                        className="block px-6 py-4 rounded-lg text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] transition-all duration-300 relative group border-r-4 border-transparent hover:border-[#D6AD60] text-center"
                                    >
                                        Properties
                                        <span className="absolute bottom-2 right-6 w-0 h-[2px] bg-[#B68D40] transition-all duration-500 group-hover:w-[calc(100%-3rem)]"></span>
                                    </Link>
                                    <Link
                                        to="/about"
                                        onClick={toggleMenu}
                                        className="block px-6 py-4 rounded-lg text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] transition-all duration-300 relative group border-r-4 border-transparent hover:border-[#D6AD60] text-center"
                                    >
                                        About
                                        <span className="absolute bottom-2 right-6 w-0 h-[2px] bg-[#B68D40] transition-all duration-500 group-hover:w-[calc(100%-3rem)]"></span>
                                    </Link>
                                    <Link
                                        to="/contact"
                                        onClick={toggleMenu}
                                        className="block px-6 py-4 rounded-lg text-[#D6AD60] hover:text-[#B68D40] hover:bg-[#1a3830] transition-all duration-300 relative group border-r-4 border-transparent hover:border-[#D6AD60] text-center"
                                    >
                                        Contact
                                        <span className="absolute bottom-2 right-6 w-0 h-[2px] bg-[#B68D40] transition-all duration-500 group-hover:w-[calc(100%-3rem)]"></span>
                                    </Link>
                                </div>

                                {/* Mobile Menu Footer - Authentication Section */}
                                <div className="flex-shrink-0 px-6 py-6 border-t-2 border-[#D6AD60]/30 bg-gradient-to-t from-[#0f1e18] to-[#122620]">
                                    {user ? (
                                        <div className="space-y-3">
                                            <Link
                                                to="/favorites"
                                                onClick={toggleMenu}
                                                className="flex items-center justify-center w-full px-6 py-3 bg-[#D6AD60] text-[#122620] rounded-lg hover:bg-[#B68D40] transition-all duration-300 font-montserrat font-semibold tracking-wide shadow-lg hover:shadow-xl text-base hover:scale-105"
                                            >
                                                <FaHeart className="mr-2" />
                                                Favorites
                                            </Link>
                                            <Link
                                                to="/profile"
                                                onClick={toggleMenu}
                                                className="block w-full text-center px-6 py-3 bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] rounded-lg hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-300 font-montserrat font-semibold tracking-wide text-base hover:scale-105"
                                            >
                                                Profile ({user.firstName})
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    toggleMenu();
                                                }}
                                                className="w-full text-center px-6 py-3 bg-transparent border-2 border-red-400 text-red-400 rounded-lg hover:bg-red-400 hover:text-white transition-all duration-300 font-montserrat font-semibold tracking-wide text-base hover:scale-105"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <Link to="/login" onClick={toggleMenu} className="block w-full">
                                                {/* <button className="mb-12 w-full text-center px-6 py-3 bg-[#D6AD60] text-[#122620] rounded-lg hover:bg-[#B68D40] transition-all duration-300 font-montserrat font-semibold tracking-wide shadow-lg hover:shadow-xl text-base hover:scale-105">
                                                    Sign In
                                                </button> */}
                                                <button
                                                    className="uppercase mb-12 w-full text-center px-6 py-3 bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-300 font-montserrat font-semibold tracking-wide text-base hover:scale-105"
                                                >
                                                    Sign In
                                                </button>
                                            </Link>
                                            {/* <Link to="/register" onClick={toggleMenu} className="block w-full">
                                                <button className="w-full text-center px-6 py-3 bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] rounded-lg hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-300 font-montserrat font-semibold tracking-wide text-base hover:scale-105">
                                                    Sign Up
                                                </button>
                                            </Link> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 