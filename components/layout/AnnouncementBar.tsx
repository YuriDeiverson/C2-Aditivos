export default function AnnouncementBar() {
  const items = [
    { icon: "🚚", text: "Enviamos para todo o Brasil" },
    { icon: "💳", text: "Até 6x sem juros no cartão" },
    { icon: "✅", text: "Qualidade garantida em cada lote" },
  ];

  return (
    <div className="announcement-bar">
      {/* Desktop - Static */}
      <div className="ann-inner desktop-only">
        {items.map((item, i) => (
          <span key={i} className="ann-item">
            <span className="ann-icon">{item.icon}</span>
            <span>{item.text}</span>
          </span>
        ))}
      </div>

      {/* Mobile - Marquee */}
      <div className="ann-marquee mobile-only">
        <div className="ann-marquee-track">
          {[...items, ...items, ...items].map((item, i) => (
            <span key={i} className="ann-marquee-item">
              <span className="ann-icon">{item.icon}</span>
              <span>{item.text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
