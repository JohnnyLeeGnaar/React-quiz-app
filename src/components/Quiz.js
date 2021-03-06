import React, { useState, useEffect } from "react";

import { randomize, scramble } from "../utils/api";
import questions from "../utils/mock";

import Button from "react-bootstrap/Button";

import Intro from "./Intro";
import Outro from "./Outro";

const INPUT_LIMIT = process.env.REACT_APP_INPUT_LIMIT;

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState([]);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let start = localStorage.getItem("start");
    let startParsed = JSON.parse(start);
    let question = localStorage.getItem("currentQuestion");
    let questionIndex = Number(question, 10);
    let answers = localStorage.getItem("answers");
    let name = localStorage.getItem("name");
    if (name) {
      setName(name);
    } else {
      setName("");
    }
    let answersParsed = JSON.parse(answers);
    if (answersParsed) {
      setAnswers(answersParsed);
    } else {
      setAnswers([]);
    }
    setCurrentQuestion(questionIndex);

    setStart(startParsed);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("start", start);
  }, [currentQuestion, answers, start, name]);

  const onClickHandler = (newAnswer) => {
    if (currentQuestion <= questions.length) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setAnswers([...answers, newAnswer]);
    } else {
      alert(answers);
    }
  };

  const onClickReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setStart(false);
    setName("");
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("answers");
    localStorage.removeItem("start");
    localStorage.removeItem("name");
  };

  const onClickScramble = () => {
    let scrambledAnswers = scramble(answers);
    setAnswers(scrambledAnswers);
    setCurrentQuestion(scrambledAnswers.length);
    setStart(true);
  };

  const onClickStart = () => {
    setStart(true);
  };

  const onClickRandomize = () => {
    let randomAnswers = randomize(questions);
    setAnswers(randomAnswers);
    setCurrentQuestion(randomAnswers.length);
    setStart(true);
  };

  const onNameChange = (name) => {
    if (name.length < INPUT_LIMIT) {
      setName(name);
      localStorage.setItem("name", name);
    } else {
      alert(`Pet name can only be ${INPUT_LIMIT} characters long`);
    }
  };

  return (
    <>
      {start === true ? (
        <div className="flex-container">
          {currentQuestion < questions.length ? (
            <div>
              {currentQuestion + 1}/{questions.length + " "}
              {questions[currentQuestion].question}
              <div className="button-list">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <Button
                    className="quiz-input-button"
                    key={index}
                    onClick={(e) => onClickHandler(e.target.value)}
                    value={answer}
                    variant="info"
                  >
                    {" "}
                    {answer}
                  </Button>
                ))}
                <Button
                  className="quiz-input-button"
                  onClick={onClickReset}
                  variant="light"
                >
                  Try again
                </Button>{" "}
              </div>
            </div>
          ) : (
            <Outro
              name={name}
              answers={answers}
              onClickReset={onClickReset}
              onClickScramble={onClickScramble}
            ></Outro>
          )}
        </div>
      ) : (
        <Intro
          onClickStart={onClickStart}
          onNameChange={onNameChange}
          onClickRandomize={onClickRandomize}
        ></Intro>
      )}
    </>
  );
};

export default Quiz;

/*<p>{`Current index ${currentQuestion} answers: ${answers}`}</p>
                <Button
                  className="intro-button"
                  onClick={onClickReset}
                  variant="primary"
                >
                  Retry test
                </Button>{" "}
                */
