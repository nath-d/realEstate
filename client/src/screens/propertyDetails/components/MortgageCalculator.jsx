import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const MortgageCalculator = ({ price, onClose }) => {
    const [formData, setFormData] = useState({
        homePrice: parseFloat(price.replace(/[^0-9.]/g, '')),
        downPayment: 20,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 1.2,
        insurance: 0.5,
        pmi: 0.5
    });

    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        calculateMortgage();
    }, [formData]);

    const calculateMortgage = () => {
        const principal = formData.homePrice * (1 - formData.downPayment / 100);
        const monthlyRate = formData.interestRate / 100 / 12;
        const numberOfPayments = formData.loanTerm * 12;

        // Calculate monthly mortgage payment
        const monthlyMortgage = principal *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Calculate additional monthly costs
        const monthlyTax = (formData.homePrice * formData.propertyTax / 100) / 12;
        const monthlyInsurance = (formData.homePrice * formData.insurance / 100) / 12;
        const monthlyPMI = formData.downPayment < 20 ?
            (formData.homePrice * formData.pmi / 100) / 12 : 0;

        const totalMonthly = monthlyMortgage + monthlyTax + monthlyInsurance + monthlyPMI;
        const total = totalMonthly * numberOfPayments;
        const totalInterestPaid = total - principal;

        setMonthlyPayment(totalMonthly);
        setTotalPayment(total);
        setTotalInterest(totalInterestPaid);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#122620] rounded-lg p-6 w-full max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <FaTimes size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Mortgage Calculator</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Home Price
                            </label>
                            <input
                                type="number"
                                name="homePrice"
                                value={formData.homePrice}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Down Payment (%)
                            </label>
                            <input
                                type="number"
                                name="downPayment"
                                value={formData.downPayment}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Loan Term (years)
                            </label>
                            <select
                                name="loanTerm"
                                value={formData.loanTerm}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            >
                                <option value="15">15 years</option>
                                <option value="20">20 years</option>
                                <option value="30">30 years</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Interest Rate (%)
                            </label>
                            <input
                                type="number"
                                name="interestRate"
                                value={formData.interestRate}
                                onChange={handleInputChange}
                                step="0.1"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">Monthly Payment Breakdown</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Principal & Interest</span>
                                <span className="text-white">${monthlyPayment.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Property Tax</span>
                                <span className="text-white">
                                    ${((formData.homePrice * formData.propertyTax / 100) / 12).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Insurance</span>
                                <span className="text-white">
                                    ${((formData.homePrice * formData.insurance / 100) / 12).toFixed(2)}
                                </span>
                            </div>
                            {formData.downPayment < 20 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">PMI</span>
                                    <span className="text-white">
                                        ${((formData.homePrice * formData.pmi / 100) / 12).toFixed(2)}
                                    </span>
                                </div>
                            )}
                            <div className="border-t border-gray-700 my-3"></div>
                            <div className="flex justify-between">
                                <span className="text-[#D4AF37] font-semibold">Total Monthly Payment</span>
                                <span className="text-[#D4AF37] font-semibold">${monthlyPayment.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Total Payment</span>
                                <span className="text-white">${totalPayment.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Total Interest</span>
                                <span className="text-white">${totalInterest.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MortgageCalculator; 