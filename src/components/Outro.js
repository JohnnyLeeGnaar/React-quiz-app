import React from "react";
import Button from "react-bootstrap/Button";

const Outro = (props) => {
  const { name, answers, onClickReset, onClickScramble } = props;
  return (
    <div>
      <p>{`My pet ${name} is ${answers[0]}, and althought he likes to ${answers[1]}, he really hates ${answers[2]}`}</p>
      <Button className="intro-button" onClick={onClickReset} variant="primary">
        Retry test
      </Button>{" "}
      <Button
        className="intro-button"
        onClick={onClickScramble}
        variant="secondary"
      >
        Scramble
      </Button>{" "}
    </div>
  );
};

export default Outro;
