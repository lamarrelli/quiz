import React, { useState } from 'react';
import images from './data/images';
import './App1.css';

function App() {
  const [mode, setMode] = useState('menu'); // 'menu', 'quiz', or 'gallery'
  const [currentImage, setCurrentImage] = useState(getRandomImage());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim().toLowerCase() === currentImage.correctAnswer.toLowerCase()) {
      setFeedback('Giusto! Ben fatto.');
    } else {
      setFeedback(`Sbagliato, la risposta giusta era: ${currentImage.correctAnswer}`);
    }
  };

  const handleNext = () => {
    setCurrentImage(getRandomImage());
    setUserAnswer('');
    setFeedback('');
  };

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  const goBackToMenu = () => {
    setMode('menu');
    setUserAnswer('');
    setFeedback('');
    setIsImageEnlarged(false);
  };

  return (
    <div className="container">
      {mode === 'menu' && (
        <div className="menu card">
          <h1 className="title">Quiz dei vetrini di istologia</h1>
          <div className="menu-buttons">
            <button onClick={() => setMode('quiz')} className="menu-button">Inizia Quiz</button>
            <button onClick={() => setMode('gallery')} className="menu-button">Guarda la galleria</button>
          </div>
        </div>
      )}

      {mode === 'quiz' && (
        <div className="card">
          <header className="banner">
            <button onClick={goBackToMenu} className="home-button">Home</button>
            <h1 className="banner-title">Istologia Quiz</h1>
          </header>
          <img
            className={`quiz-image ${isImageEnlarged ? 'enlarged' : ''}`}
            src={currentImage.url}
            alt="quiz"
            onClick={toggleImageSize}
          />
          <p className="question">{currentImage.question}</p>
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="La tua risposta"
            />
            <button className="submit-button" type="submit">Cliccami</button>
          </form>
          {feedback && (
            <>
              <p className={`feedback ${feedback.startsWith('Correct') ? 'correct' : 'incorrect'}`}>
                {feedback}
              </p>
              <button
                className="next-button"
                onClick={handleNext}
              >
                Prossima immagine
              </button>
            </>
          )}
        </div>
      )}

      {mode === 'gallery' && (
        <div className="card">
          <header className="banner">
            <h1 className="banner-title">Galleria dei vetrini</h1>
          </header>
          <div className="gallery">
            {images.map((image, index) => (
              <div key={index} className="gallery-item">
                <img
                  className="gallery-image"
                  src={image.url}
                  alt={`gallery-${index}`}
                  onClick={toggleImageSize}
                />
                <p className="gallery-answer">{image.correctAnswer}</p>
              </div>
            ))}
          </div>
          <button onClick={goBackToMenu} className="menu-button-end">Menù</button>
        </div>
      )}
    </div>
  );
}

export default App;




