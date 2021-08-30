export function randomize(questions) {
  let randomAnswers = [];
  for (let i = 0; i < questions.length; i++) {
    for (const property in questions[i]) {
      if (property === "answers") {
        randomAnswers[i] =
          questions[i][property][
            Math.floor(Math.random() * questions[i][property].length)
          ];
      }

      //console.log(`${property}: ${questions[i][property]}`);
    }
  }
  return randomAnswers;
}

export function scramble(answers) {
  let scrambledAnswers = answers.map((answer) =>
    answer
      .split("")
      .sort(function () {
        return Math.random() - 0.5;
      })
      .join("")
  );

  return scrambledAnswers;
}
