import React from "react";

export default function WhatsAppButton() {
  const phoneNumber = "919080902615"; 
  const message = "Hello 👋, I am interested in your Agri Tourism packages. Can you share details about farm visits, farm stays, horse riding, boating, and other activities?";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#ece02dff",
        color: "white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "28px",
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      💬
    </a>
  );
}
