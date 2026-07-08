import { useEffect, useState } from "react";
import "./ContactMessages.css";

function ContactMessages() {

    const [messages, setMessages] =
        useState([]);

    useEffect(() => {

        fetch(
            "http://localhost:3000/messages"
        )
        .then((res) => res.json())
        .then((data) =>
            setMessages(data)
        );

    }, []);

    return (

        <div className="messages-container">

            <div className="overlay">

                <h1 className="title">
                    Contact Messages
                </h1>

                {
                    messages.length === 0 ?

                    (
                        <p className="empty">
                            No Messages Found
                        </p>
                    )

                    :

                    (

                        messages.map((item) => (

                            <div
                                className="message-card"
                                key={item._id}
                            >

                                <h3>
                                    {item.name}
                                </h3>

                                <p>
                                    <strong>Email:</strong>
                                    {item.email}
                                </p>

                                <p>
                                    <strong>Number:</strong>
                                    {item.number}
                                </p>

                                <p>
                                    <strong>Message:</strong>
                                    {item.message}
                                </p>

                            </div>

                        ))

                    )
                }

            </div>

        </div>

    );
}

export default ContactMessages;