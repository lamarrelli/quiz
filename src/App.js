import React, { useState } from 'react';
import images from './data/images';
import * as XLSX from 'xlsx';
import './App1.css';

function App() {
  const [mode, setMode] = useState('menu'); // 'menu', 'quiz', 'gallery', or 'questions'
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const loadedQuestions = jsonData.map(row => row[0]); // Prima colonna
      setQuestions(loadedQuestions);
      setMode('questions');
    };
    reader.readAsArrayBuffer(file);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goBackToMenu = () => {
    setMode('menu');
    setCurrentQuestion(0);
  };

  return (
    <div className="container">
      {mode === 'menu' && (
        <div className="menu card">
          <h1 className="title">Quiz dei vetrini di istologia</h1>
          <div className="menu-buttons">
            <button onClick={() => setMode('quiz')} className="menu-button">Inizia Quiz</button>
            <button onClick={() => setMode('gallery')} className="menu-button">Guarda la galleria</button>
            <button onClick={() => setMode('upload')} className="menu-button">Domande</button>
          </div>
        </div>
      )}

      {mode === 'upload' && (
        <div className="card">
          <h1 className="title">Carica un file Excel</h1>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          <button onClick={goBackToMenu} className="menu-button">Torna al Menù</button>
        </div>
      )}

      {mode === 'questions' && (
        <div className="card">
          <h1 className="title">Domanda</h1>
          <p>{questions[currentQuestion]}</p>
          <button onClick={handleNextQuestion} className="submit-button">Prossima Domanda</button>
          <button onClick={goBackToMenu} className="menu-button-end">Torna al Menù</button>
        </div>
      )}

      {mode === 'quiz' && (
        <div className="card">
          <header className="banner">
            <button onClick={goBackToMenu} className="home-button">Home</button>
            <h1 className="banner-title">Istologia Quiz</h1>
          </header>
          <img
            className="quiz-image"
            src={images[0].url}
            alt="quiz"
          />
          <p className="question">Esempio di domanda dal quiz delle immagini</p>
          <form>
            <input className="input" type="text" placeholder="La tua risposta" />
            <button className="submit-button" type="submit">Cliccami</button>
          </form>
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




