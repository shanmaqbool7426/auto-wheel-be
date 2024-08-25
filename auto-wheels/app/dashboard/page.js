
'use client'

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

console.log('dashboard',session);
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${'03035699524'}?text=${encodeURIComponent('hi auto-wheels')}`;
    window.open(whatsappUrl, '_blank');
  };


  return (
    <button onClick={handleClick} className="whatsapp-chat-button">
      Chat via WhatsApp
    </button>
  );
}
