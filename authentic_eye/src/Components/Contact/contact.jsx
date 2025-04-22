import React from 'react';
import './contact.css';

const Contact = () => {
    return (
        <div className="contact">
            <div className="contact-container">
                <form className="contact-form">
                    <div className="contact-title">
                        <h2>Contact Us</h2>
                    </div>
                    <hr />
                    <div className="input-details">
                        <input type="hidden" />
                        <input type="text" name="name" placeholder="Your name" className="contact-inputs" required />
                        <input type="email" name="email" placeholder="Your email" className="contact-inputs" required />
                        <textarea name="message" placeholder="Your message" className="contact-inputs" required></textarea>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;