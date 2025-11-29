import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const MortgageCalculator = ({ price, onClose }) => {
    const [formData, setFormData] = useState({
        loanAmount: parseFloat(price.replace(/[^0-9.]/g, '')),
        loanTerm: 20,
        interestRate: 6.5
    });

    // Separate display values for inputs to allow typing
    const [displayValues, setDisplayValues] = useState({
        loanAmount: parseFloat(price.replace(/[^0-9.]/g, '')).toString(),
        loanTerm: '20',
        interestRate: '6.5'
    });

    const [emi, setEmi] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        calculateMortgage();
    }, [formData]);

    const calculateMortgage = () => {
        const principal = formData.loanAmount; // P
        const monthlyRate = formData.interestRate / 100 / 12; // r (monthly interest rate)
        const numberOfPayments = formData.loanTerm * 12; // n (number of months)

        // EMI Formula: P*r(1+r)^n/([(1+r)^n]-1)
        let monthlyEmi = 0;
        if (monthlyRate > 0) {
            const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
            const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
            monthlyEmi = numerator / denominator;
        } else {
            // If interest rate is 0, EMI is just principal divided by number of payments
            monthlyEmi = principal / numberOfPayments;
        }

        const totalAmountPayable = monthlyEmi * numberOfPayments;
        const totalInterestPaid = totalAmountPayable - principal;

        setEmi(monthlyEmi);
        setTotalPayment(totalAmountPayable);
        setTotalInterest(totalInterestPaid);
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        
        // For range inputs, update both formData and displayValues
        if (type === 'range') {
            const numValue = parseFloat(value);
            setFormData(prev => ({
                ...prev,
                [name]: numValue
            }));
            setDisplayValues(prev => ({
                ...prev,
                [name]: numValue.toString()
            }));
            return;
        }
        
        // For text inputs, update display value immediately
        setDisplayValues(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Parse and validate the number for formData
        let cleanValue = value;
        if (name === 'loanAmount') {
            cleanValue = value.replace(/[^0-9.]/g, '');
        }
        
        const numValue = parseFloat(cleanValue);
        
        // If it's a valid number, update formData
        if (!isNaN(numValue) && numValue > 0) {
            let validatedValue = numValue;
            if (name === 'loanAmount') {
                validatedValue = Math.max(100000, Math.min(50000000, numValue));
            } else if (name === 'loanTerm') {
                validatedValue = Math.max(1, Math.min(30, numValue));
            } else if (name === 'interestRate') {
                validatedValue = Math.max(1, Math.min(30, numValue));
            }
            
            setFormData(prev => ({
                ...prev,
                [name]: validatedValue
            }));
        }
    };

    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        
        // Clean the value for parsing
        let cleanValue = value;
        if (name === 'loanAmount') {
            cleanValue = value.replace(/[^0-9.]/g, '');
        }
        
        const numValue = parseFloat(cleanValue);
        
        // If empty or invalid, set to minimum value
        if (cleanValue === '' || isNaN(numValue) || numValue <= 0) {
            let defaultValue;
            if (name === 'loanAmount') {
                defaultValue = 100000;
            } else if (name === 'loanTerm') {
                defaultValue = 1;
            } else if (name === 'interestRate') {
                defaultValue = 1;
            }
            
            setFormData(prev => ({
                ...prev,
                [name]: defaultValue
            }));
            setDisplayValues(prev => ({
                ...prev,
                [name]: defaultValue.toString()
            }));
        } else {
            // Update display value to match the validated formData value
            setDisplayValues(prev => ({
                ...prev,
                [name]: formData[name].toString()
            }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #D6AD60;
                    cursor: pointer;
                    border: 3px solid #122620;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                }
                .slider::-moz-range-thumb {
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #D6AD60;
                    cursor: pointer;
                    border: 3px solid #122620;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                }
                .slider::-webkit-slider-track {
                    background: linear-gradient(to right, #D6AD60, #374151);
                    border-radius: 6px;
                    height: 8px;
                }
                .slider::-moz-range-track {
                    background: linear-gradient(to right, #D6AD60, #374151);
                    border-radius: 6px;
                    height: 8px;
                }
                .slider:hover::-webkit-slider-thumb {
                    transform: scale(1.1);
                    transition: transform 0.2s ease;
                }
            `}</style>
            <div className="bg-[#122620] rounded-xl shadow-2xl w-full max-w-4xl relative border border-[#D6AD60]/30 max-h-[90vh] overflow-y-auto">
                <div className="p-4 sm:p-5">
                <div className="sticky top-0 bg-[#122620] z-10 pb-3 border-b border-[#D6AD60]/20 mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-source-serif tracking-wide text-xl sm:text-2xl font-bold text-[#D6AD60]">EMI Calculator</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Input Controls */}
                    <div className="space-y-4">
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                            <h3 className="text-base font-semibold text-[#D6AD60] mb-4">Loan Parameters</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-300">Loan Amount</label>
                                        <input
                                            type="text"
                                            name="loanAmount"
                                            value={displayValues.loanAmount}
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            placeholder="Enter amount"
                                            className="w-32 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-[#D6AD60] font-bold text-right"
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        name="loanAmount"
                                        min="100000"
                                        max="50000000"
                                        step="50000"
                                        value={formData.loanAmount}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>₹ 1L</span>
                                        <span>₹ 5Cr</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-300">Loan Tenure</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                name="loanTerm"
                                                value={displayValues.loanTerm}
                                                onChange={handleInputChange}
                                                onBlur={handleInputBlur}
                                                placeholder="Years"
                                                className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-[#D6AD60] font-bold text-right"
                                            />
                                            <span className="text-sm text-gray-400">years</span>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        name="loanTerm"
                                        min="1"
                                        max="30"
                                        step="1"
                                        value={formData.loanTerm}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>1 year</span>
                                        <span>30 years</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-300">Interest Rate</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                name="interestRate"
                                                value={displayValues.interestRate}
                                                onChange={handleInputChange}
                                                onBlur={handleInputBlur}
                                                placeholder="Rate"
                                                className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-[#D6AD60] font-bold text-right"
                                            />
                                            <span className="text-sm text-gray-400">% p.a.</span>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        name="interestRate"
                                        min="1"
                                        max="30"
                                        step="0.1"
                                        value={formData.interestRate}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>1%</span>
                                        <span>30%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="space-y-4">
                        {/* EMI Highlight */}
                        <div className="rounded-xl p-4 border-4 border-[#D6AD60]/80">
                            <div className="text-center">
                                <div className="text-sm font-medium text-gray-300 mb-1">Monthly EMI</div>
                                <div className="text-2xl sm:text-3xl font-bold text-[#D6AD60] mb-1">
                                    ₹ {emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                                </div>
                                <div className="text-xs text-gray-400">per month for {formData.loanTerm} years</div>
                            </div>
                        </div>

                        {/* Breakdown Cards */}
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                            <h3 className="text-base font-semibold text-[#D6AD60] mb-3">Payment Breakdown</h3>
                            
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-gray-700/30 rounded-lg p-3">
                                        <div className="text-xs font-medium text-gray-400 mb-1">Principal Amount</div>
                                        <div className="text-base font-bold text-white">₹ {formData.loanAmount.toLocaleString('en-IN')}</div>
                                    </div>
                                    <div className="bg-gray-700/30 rounded-lg p-3">
                                        <div className="text-xs font-medium text-gray-400 mb-1">Total Interest</div>
                                        <div className="text-base font-bold text-orange-400">₹ {totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                                    </div>
                                </div>

                                <div className="bg-gray-700/30 rounded-lg p-3">
                                    <div className="text-xs font-medium text-gray-400 mb-1">Total Amount Payable</div>
                                    <div className="text-lg font-bold text-green-400">₹ {totalPayment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Statistics - Full Width Section */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 mt-4">
                    <h3 className="text-base font-semibold text-[#D6AD60] mb-3">Loan Summary</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                            <div className="text-xs font-medium text-gray-400 mb-1">Loan Tenure</div>
                            <div className="text-base font-bold text-white">{formData.loanTerm} years</div>
                            <div className="text-xs text-gray-500">{formData.loanTerm * 12} months</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                            <div className="text-xs font-medium text-gray-400 mb-1">Interest Rate</div>
                            <div className="text-base font-bold text-white">{formData.interestRate}%</div>
                            <div className="text-xs text-gray-500">per annum</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                            <div className="text-xs font-medium text-gray-400 mb-1">Total Payments</div>
                            <div className="text-base font-bold text-white">{formData.loanTerm * 12}</div>
                            <div className="text-xs text-gray-500">monthly payments</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                            <div className="text-xs font-medium text-gray-400 mb-1">Interest Ratio</div>
                            <div className="text-base font-bold text-white">{((totalInterest/formData.loanAmount)*100).toFixed(1)}%</div>
                            <div className="text-xs text-gray-500">of principal</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default MortgageCalculator; 