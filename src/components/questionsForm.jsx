import { useState, useEffect } from 'react';
import axios from 'axios';
import Questions from './questions';

//random 5 questions
function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export default function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=50&category=9&type=multiple')
      .then((res) => setQuestions(getMultipleRandom(res.data.results, 5)))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="questionForm">
      {questions.length > 0 && <Questions questions={questions} />}
    </div>
  );
}
