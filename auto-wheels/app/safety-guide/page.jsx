import React from "react";
// import "./SafetyGuide.css"; // Import the CSS file

const SafetyGuide = () => {
  return (
    <>
          <h2>Buy & Sell Safely on [Your Platform Name]</h2>

    <div className="safety-guide-container">
      <div className="guide-section">
        <h3>For Buyers</h3>
        <ul>
          <li>Inquire clearly the condition of the vehicle, price, payment and delivery method beforehand.</li>
          <li>Use a safe location to meet and transact; preferably transact inside a bank. Thoroughly inspect the vehicle and check whether it meets the specifications mentioned in the ad.</li>
          <li>Beware of unrealistic offers. If an offer is significantly below market price, then take the decision cautiously to avoid any scam.</li>
          <li>Never send the transaction amount before the delivery of the vehicle.</li>
          <li>Verify vehicle chassis number.</li>
          <li>Check the history of a vehicle for theft by verifying engine number & chassis number with the police station.</li>
        </ul>
      </div>
      <div className="guide-section">
        <h3>For Sellers</h3>
        <ul>
          <li>Use a safe location to meet and transact; preferably transact inside a bank. Thoroughly inspect the vehicle and check whether it meets the specifications mentioned in the ad.</li>
          <li>Try to take full payment at the time of delivery.</li>
          <li>Avoid cash transactions. Use a banking channel to transact i.e. money order, cheque, etc.</li>
          <li>Watch out for fake/counterfeit currency, cheque, money order, etc.</li>
          <li>Verify the buyer's credentials and ask for proof of person’s ID and address.</li>
          <li>Do not reveal any financial information with the buyer except the one required for the payment.</li>
        </ul>
      </div>
    </div>

    </>
  );
};

export default SafetyGuide;
