import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Intro = (props) => {
  const { onClickStart, onNameChange, onClickRandomize } = props;
  return (
    <div className="flex-wrapper">
      <Form.Control
        type="input"
        id="name"
        name="name"
        placeholder="Insert a pet name"
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Button className="intro-button" onClick={onClickStart} variant="primary">
        Start the quiz
      </Button>{" "}
      <Button
        className="intro-button"
        onClick={onClickRandomize}
        variant="secondary"
      >
        Randomize
      </Button>{" "}
    </div>
  );
};

export default Intro;
