import React from "react";

const SafetyGuide = () => {
  return (
    <div className="safety-guide-container">
      <h2 className="safety-guide-heading">Buy & Sell Safely on Auto-Wheels</h2>
      <div className="safety-guide-section">
        <h3 className="section-heading">For Buyers</h3>
        <ul className="safety-guide-list">
          <li className="list-item">Inquire clearly the condition of the vehicle, price, payment and delivery method beforehand.</li>
          <li className="list-item">Use a safe location to meet and transact; preferably transact inside a bank. Thoroughly inspect the vehicle and check whether it meets the specifications mentioned in the ad.</li>
          <li className="list-item">Beware of unrealistic offers. If an offer is significantly below market price, then take the decision cautiously to avoid any scam.</li>
          <li className="list-item">Never send the transaction amount before the delivery of the vehicle.</li>
          <li className="list-item">Verify vehicle chassis number.</li>
          <li className="list-item">Check the history of a vehicle for theft by verifying engine number & chassis number with the police station.</li>
        </ul>
      </div>
      <div className="safety-guide-section">
        <h3 className="section-heading">For Sellers</h3>
        <ul className="safety-guide-list">
          <li className="list-item">Use a safe location to meet and transact; preferably transact inside a bank. Thoroughly inspect the vehicle and check whether it meets the specifications mentioned in the ad.</li>
          <li className="list-item">Try to take full payment at the time of delivery.</li>
          <li className="list-item">Avoid cash transactions. Use a banking channel to transact i.e. money order, cheque, etc.</li>
          <li className="list-item">Watch out for fake/counterfeit currency, cheque, money order, etc.</li>
          <li className="list-item">Verify the buyer's credentials and ask for proof of person’s ID and address.</li>
          <li className="list-item">Do not reveal any financial information with the buyer except the one required for the payment.</li>
        </ul>
      </div>
    </div>
  );
};

export default SafetyGuide;
