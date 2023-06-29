import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './questions.css';

export default function Questions({ questions }) {
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [storedData, setStoredData] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);
  console.log(questions);
  const unswers =
    questions && currentQuestionIndex < questions.length
      ? [
          questions[currentQuestionIndex].correct_answer,
          ...questions[currentQuestionIndex].incorrect_answers,
        ]
      : [];

  const checkIfAnswerIsCorrect = (questionIndex, answer) => {
    const question = questions[questionIndex];
    return question.correct_answer === answer; // boolean
  };

  const handleAnswerClick = (answerOfTheButtonWeClickedNow) => {
    setStoredData(() => [
      ...storedData,
      {
        questionIndex: currentQuestionIndex,
        answer: answerOfTheButtonWeClickedNow,
        allAnswers: [
          questions[currentQuestionIndex].correct_answer,
          ...questions[currentQuestionIndex].incorrect_answers,
        ],
        isCorrect: checkIfAnswerIsCorrect(
          // true or false
          currentQuestionIndex,
          answerOfTheButtonWeClickedNow
        ),
      },
    ]);

    setShowNextButton(true);
  };

  const handleNextClick = () => {
    setcurrentQuestionIndex(currentQuestionIndex + 1);
    setShowNextButton(false);
  };

  return (
    <>
      {questions && currentQuestionIndex < questions.length ? (
        <div key={uuidv4()}>
          <h2>Question: {questions[currentQuestionIndex].question}</h2>
          {unswers.map((answer, index) => (
            <button
              onClick={() => handleAnswerClick(answer)}
              type="button"
              key={uuidv4()}
              disabled={showNextButton}
            >
              {answer}
            </button>
          ))}
          {showNextButton && (
            <button
              onClick={() => handleNextClick()}
              type="button"
            >
              Next question!
            </button>
          )}
        </div>
      ) : (
        <div>
          <h1>Results:</h1>
          <h2>Score:</h2>
          <p>{`${storedData.filter((item) => item.isCorrect).length}/
          ${questions.length}`}</p>
          <h2>Questions:</h2>
          {storedData.map((item) => (
            <div key={item.answer}>
              <h2>Question: {questions[item.questionIndex].question}</h2>
              {item.allAnswers.map((answer) => (
                <span
                  key={answer}
                  style={
                    item.answer === answer
                      ? { color: item.isCorrect ? 'green' : 'red' }
                      : {}
                  }
                >
                  {answer}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
