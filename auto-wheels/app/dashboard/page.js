
'use client'
export default function Dashboard() {


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
