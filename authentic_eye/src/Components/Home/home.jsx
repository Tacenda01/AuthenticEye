import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "./home.css";

const Home = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoResult, setVideoResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");

    const handleVideoChange = (e) => {
        setVideoFile(e.target.files[0]);
        setVideoResult(null);
    };


    const showLoadingMessages = () => {
        let messages = [
            "Processing the file...",
            "Analyzing content...",
            "Scanning for manipulations...",
            "Evaluating authenticity...",
        ];
        let i = 0;
        setLoadingText(messages[i]);
        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setLoadingText(messages[i]);
        }, 1500);
        return interval;
    };

    const uploadVideo = async () => {
        if (!videoFile) {
            alert("Please select a video first.");
            return;
        }
        const formData = new FormData();
        formData.append('file', videoFile);
        setLoading(true);
        const interval = showLoadingMessages();

        try {
            const response = await fetch("http://localhost:5000/predict/video", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setVideoResult(data.result);
            } else {
                setVideoResult(`Error: ${data.error}`);
            }
        } catch (error) {
            setVideoResult(`Network error: ${error.message}`);
        } finally {
            clearInterval(interval);
            setLoading(false);
        }
    };


    return (
        <div className="home-container">
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-message">{loadingText}</div>
                </div>
            )}

            <header className="hero-section">
                <h1 className="site-title">AuthenticEye</h1>
                <h2 className="typewriter-text">
                    <Typewriter
                        words={[
                            "Detect Deepfake Videos Instantly",
                            "Scan Suspicious Images Seamlessly",
                            "AI-Powered Authenticity Analysis",
                            "Your Truth Guardian in the Digital World",
                        ]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={60}
                        deleteSpeed={40}
                        delaySpeed={2000}
                    />
                </h2>
            </header>

            <section className="about-section">
                <h2>About Us</h2>
                <p>
                    AuthenticEye is your trusted companion in the battle against digital deception. With the exponential rise in manipulated media—especially deepfake videos and synthetic images—verifying authenticity has become more important than ever.

                    Leveraging state-of-the-art Artificial Intelligence and Deep Learning algorithms, AuthenticEye empowers users to detect deepfakes with just a few clicks. Whether you're a journalist verifying a source, a researcher analyzing visual data, or simply a concerned citizen wanting the truth, our tool provides fast, reliable, and transparent analysis.

                    Our platform supports image and video uploads, automatically scanning for manipulation patterns, facial inconsistencies, and synthetic audio cues to produce a detailed authenticity score.

                    With a strong focus on privacy, security, and usability, AuthenticEye ensures that your data is never misused or stored without consent.

                    Join the movement to protect digital truth. Because in an age of misinformation, seeing shouldn’t always mean believing.
                </p>
            </section>

            <section className="upload-section">
                <div className="upload-box">
                    <h3>Upload a Video</h3>
                    <input type="file" accept="video/*" onChange={handleVideoChange} />
                    <button onClick={uploadVideo}>Check Video</button>
                    {videoResult && (
                        <div>
                            <p className="result-text">Result: {videoResult}</p>
                            {videoResult.toLowerCase().includes("real") && (
                                <p className="human-verification-note">
                                    Note: This video appears to be real, but human verification is recommended for complete assurance.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
