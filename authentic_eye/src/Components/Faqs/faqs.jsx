import React, { useState } from "react";
import "./faqs.css";

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is this platform about?",
            answer: "This platform detects deepfake videos using advanced AI, helping users verify the authenticity of digital content."
        },
        {
            question: "Who can use this platform?",
            answer: "Anyone concerned about fake media—journalists, educators, content creators, or everyday users—can use this platform for verification."
        },
        {
            question: "How can I check if a video or image is a deepfake?",
            answer: "Simply upload the file or provide a URL. Our AI will analyze it and return a detailed deepfake detection report."
        },
        {
            question: "What types of deepfakes can be detected?",
            answer: "We detect facial manipulations, synthetic images, voice alterations, lip-sync edits, and other AI-generated modifications in media."
        },
        {
            question: "How accurate is the detection system?",
            answer: "Our system uses cutting-edge machine learning models trained on diverse datasets, offering high accuracy. Still, manual review is advised for critical content."
        },
        {
            question: "Do I need to create an account to use the platform?",
            answer: "No account is needed for basic analysis. Creating an account unlocks extra features like detailed reports, history tracking, and batch uploads."
        },
        {
            question: "Is my uploaded content safe and private?",
            answer: "Yes, your privacy is our priority. All uploaded files are encrypted and automatically deleted after processing, unless you choose to save them."
        }
    ];


    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${openIndex === index ? "open" : ""}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            <span>{faq.question}</span>
                            <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
                        </div>
                        {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQs;