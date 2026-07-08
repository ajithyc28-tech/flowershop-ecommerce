import { useState } from "react";
import "./contact.css";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  async function SendMessage() {

    if (!name.trim()) {
      alert("Enter Your Name");
      return;
    }

    if (!email.trim()) {
      alert("Enter Your Email");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter Valid Email");
      return;
    }

    if (!number.trim()) {
      alert("Enter Your Number");
      return;
    }

    if (number.length !== 10) {
      alert("Number Must Be 10 Digits");
      return;
    }

    if (!message.trim()) {
      alert("Enter Your Message");
      return;
    }

    await fetch(
      "http://localhost:3000/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          number,
          message
        })
      }
    );

    alert("Message Sent Successfully");

    setName("");
    setEmail("");
    setNumber("");
    setMessage("");
  }

  return (
    <div className="contact-container">

      <div className="contact-card">

        <h1>Contact Us</h1>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={number}
          onChange={(e) =>
            setNumber(e.target.value)
          }
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button onClick={SendMessage}>
          Send Message
        </button>

      </div>

    </div>
  );
}

export default Contact;