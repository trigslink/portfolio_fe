import React, { useState, useEffect } from 'react';

export const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the terms
    const hasAccepted = localStorage.getItem('trigslink_terms_accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('trigslink_terms_accepted', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Welcome to Trigslink</h2>
          <p className="text-gray-400 text-sm mt-1">Please read and accept our terms before proceeding.</p>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-96 overflow-y-auto text-gray-300 text-sm space-y-4 custom-scrollbar">
          <p>
            <strong>1. Autonomous Settlement:</strong> Trigslink utilizes an autonomous, machine-verified truth engine. By participating, you acknowledge that market resolutions are executed deterministically by code within 15 seconds of market closure.
          </p>
          <p>
            <strong>2. Regulatory Compliance & Geo-Restrictions:</strong> You confirm that you are not accessing this protocol from a restricted jurisdiction. Trigslink does not condone the use of VPNs to bypass regional restrictions. 
          </p>
          <p>
            <strong>3. Not Financial Advice:</strong> The information provided on this platform, including market probabilities, does not constitute financial advice. Prediction markets carry inherent risks, and you should only participate with funds you can afford to lose.
          </p>
          <p>
            <strong>4. Smart Contract Risk:</strong> While our smart contracts undergo rigorous testing, interacting with decentralized blockchain protocols carries technical risks. Trigslink is not liable for losses resulting from network failures, exploits, or user error.
          </p>
        </div>

        {/* Footer & Actions */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            By clicking "I Agree", you legally accept these terms and conditions.
          </p>
          <button 
            onClick={handleAccept}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            I Agree, Enter Trigslink
          </button>
        </div>
      </div>
    </div>
  );
};