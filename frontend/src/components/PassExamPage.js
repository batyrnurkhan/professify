import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PassExamPage = () => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleChange = (questionId, selectedAnswer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform exam submission logic here
    console.log(selectedAnswers);
    navigate('/teacher-profile');
  };

  return (
    <div className="passExamPage">
      <h2>Pass the Exam</h2>
      <form onSubmit={handleSubmit}>
        {/* Example exam questions */}
        <div className="questionGroup">
          <h3>Question 1:</h3>
          <p>What is the capital of France?</p>
          <div className="answerOptions">
            <label>
              <input
                type="radio"
                name="question1"
                value="Paris"
                onChange={() => handleChange('question1', 'Paris')}
              />
              Paris
            </label>
            <label>
              <input
                type="radio"
                name="question1"
                value="London"
                onChange={() => handleChange('question1', 'London')}
              />
              London
            </label>
            <label>
              <input
                type="radio"
                name="question1"
                value="Berlin"
                onChange={() => handleChange('question1', 'Berlin')}
              />
              Berlin
            </label>
          </div>
        </div>
        <div className="questionGroup">
          <h3>Question 2:</h3>
          <p>What is the chemical symbol for gold?</p>
          <div className="answerOptions">
            <label>
              <input
                type="radio"
                name="question2"
                value="Au"
                onChange={() => handleChange('question2', 'Au')}
              />
              Au
            </label>
            <label>
              <input
                type="radio"
                name="question2"
                value="Ag"
                onChange={() => handleChange('question2', 'Ag')}
              />
              Ag
            </label>
            <label>
              <input
                type="radio"
                name="question2"
                value="Cu"
                onChange={() => handleChange('question2', 'Cu')}
              />
              Cu
            </label>
          </div>
        </div>
        {/* Add more question groups as needed */}
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PassExamPage;
