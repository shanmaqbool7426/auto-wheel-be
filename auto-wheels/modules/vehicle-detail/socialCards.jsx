'use client'
import React, { useState } from 'react';
import {
    PhoneIcon,
    WhatsappIcon,
    MessageIcon,
    DollarIcon,
} from "@/components/Icons";

const SocialCards = ({ detail,scrollToMessage }) => {
    const [showPhone, setShowPhone] = useState(false);

    const socialsCards = [
        {
            icon: <PhoneIcon />,
            title: showPhone ? detail?.data?.contactInfo.mobileNumber : "(71*******)",
            subtitle: !showPhone ? "Show Number" : "",
            underline: !showPhone,
            onClick: () => setShowPhone(true), // Show phone number
        },
        {
            icon: <WhatsappIcon />,
            title: "CHAT VIA WHATSAPP",
            onClick: () => window.open('https://api.whatsapp.com/send/?phone=923069829158&text&app_absent=0&lang=en', '_blank'), // Redirect to WhatsApp
        },
        {
            icon: <MessageIcon />,
            title: "Message To Dealer",
            uppercase: true,
            onClick:scrollToMessage
        },
        {
            icon: <DollarIcon />,
            title: "Make an offer price",
            uppercase: true,
        },
    ];

    return (
        <div className="row">
            {socialsCards.map((card, index) => (
                <div className="col-12" key={index}>
                    <div
                        className={`card mb-3 ${index > 0 ? 'whatsapp-icon' : 'seller-phone-card'}`}
                        onClick={card.onClick} // Attach onClick handler
                        style={{ cursor: card.onClick ? 'pointer' : 'default' }} // Show pointer cursor if clickable
                    >
                        <div className="card-body gap-2 align-items-center">
                            {card.icon}
                            <h5 className={`fw-bold mb-0 ${card.uppercase ? 'text-uppercase' : ''}`}>
                                {card.title}
                            </h5>
                            {card.subtitle && (
                                <span className="text-decoration-underline text-muted">
                                    {card.subtitle}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SocialCards;
