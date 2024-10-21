let questions = [
  {
    num: 1,
    question: "На кого бежит зверь в известной пословице?",
    answer: "Б. На ловца",
    options: ["А. На вдовца", "Б. На ловца", "В. На стрельца", "Г. Наживца"],
  },
  {
    num: 2,
    question:
      "Что из перечисленного является разновидностью компьютерной игры, а не жанром песен Винни-Пуха?",
    answer: "А. Бродилка",
    options: ["А. Бродилка", "Б. Вопилка", "В. Кричалка", "Г. Сопелка"],
  },
  {
    num: 3,
    question: "Что обычно вырастает у взрослого человека?",
    answer: "В. Зуб мудрости",
    options: [
      "А. Печень трезвости",
      "Б. Сердце нежности",
      "В. Зуб мудрости",
      "Г. Ребро смелости",
    ],
  },
  {
    num: 4,
    question: "Какие животные являются героями российского мультсериала?",
    answer: "А. Три кота",
    options: ["А. Три кота", "Б. Три крота", "В. Три кита", "Г. Три бобра"],
  },
  {
    num: 5,
    question: "Откуда вышел месяц из детской считалочки?",
    answer: "В. Из тумана",
    options: [
      "А. Из-за острова на стержень",
      "Б. Из огня да в полымя",
      "В. Из тумана",
      "Г. Из грязи в князи",
    ],
  },
  {
    num: 6,
    question: "Какое выражение говорит о нелегком, нешуточном деле?",
    answer: "В. Не фунт изюму",
    options: [
      "А. Не пуд кураги",
      "Б. Не кило инжира",
      "В. Не фунт изюму",
      "Г. Не тонна урюка",
    ],
  },
  {
    num: 7,
    question: "Что теряет спортсмен, который долго не тренировался?",
    answer: "Б. Форму",
    options: ["А. След", "Б. Форму", "В. Нюх", "Г. Совесть"],
  },
  {
    num: 8,
    question: "Какими были обезьяны в серии книг об Изумрудном городе?",
    answer: "Б. Летучими",
    options: ["А. Пахучими", "Б. Летучими", "В. Прыгучими", "Г. Горючими"],
  },
  {
    num: 9,
    question:
      "Имя какого спортсмена совпадает с названием снаряда для арбалета?",
    answer: "А. Усэйн Болт",
    options: [
      "А. Усэйн Болт",
      "Б. Сергей Бубка",
      "В. Александр Ус",
      "Г. Феликс Лох",
    ],
  },
  {
    num: 10,
    question:
      'Как заканчивается русская пословица: "Не красна изба углами, а красна..."',
    answer: "В. ...пирогами",
    options: [
      "А. ...сапогами",
      "Б. ...утюгами",
      "В. ...пирогами",
      "Г. ...оригами",
    ],
  },
];
const startBtn = document.getElementById("startBtn");
const exitBtn = document.getElementById("exitBtn");
const continueBtn = document.getElementById("continueBtn");
const popupInfo = document.getElementById("popUp");
const main = document.querySelector(".main__background");
const quizSection = document.querySelector(".quiz-section__container");
const resultSection = document.querySelector(".result__section");

let counter = 0;
let num = 1;
let userScore = 0;

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  main.style.display = "none";
  quizSection.style.display = "flex";

  nextQuestion(0);
  questionCounter(1);
  score();
};

const nextBtn = document.getElementById("nextBtn");
const questionList = document.querySelector(".option-list");

nextBtn.onclick = () => {
  if (counter < questions.length - 1) {
    counter++;
    nextQuestion(counter);
    num++;
    questionCounter(num);
    nextBtn.classList.remove("active");
  } else {
    console.log("completed");
    showResultSection();
  }
};

const tryAgainBtn = document.querySelector(".tryAgain__btn");
const mainPageBtn = document.querySelector(".mainPage__btn");

tryAgainBtn.onclick = () => {
  resultSection.classList.remove("active");
  quizSection.style.display = "flex";
  nextBtn.classList.remove("active");

  counter = 0;
  num = 1;
  userScore = 0;
  nextQuestion(counter);
  questionCounter(num);
};

mainPageBtn.onclick = () => {
  main.style.display = "flex";
  quizSection.style.display = "none";
  resultSection.classList.remove("active");
  counter = 0;
  num = 1;
  userScore = 0;
  nextQuestion(counter);
  questionCounter(num);
  score();
};

function nextQuestion(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].question}`;
  let questionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

  questionList.innerHTML = questionTag;

  const option = document.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "userSelect(this)");
  }
}

function userSelect(answer) {
  let selectedAnswer = answer.textContent;
  let correctAnswer = questions[counter].answer;
  let allAnswers = questionList.children;
  if (selectedAnswer == correctAnswer) {
    console.log("correct answer");
    answer.classList.add("correct");
    userScore++;
    score();
  } else {
    console.log("answer is wrong");
    answer.classList.add("incorrect");
  }

  for (let i = 0; i < allAnswers.length; i++) {
    if (allAnswers[i].innerText == correctAnswer) {
      allAnswers[i].setAttribute("class", "option correct");
    }
  }

  for (let i = 0; i < allAnswers.length; i++) {
    allAnswers[i].style.pointerEvents = "none";
  }

  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const total = document.getElementById("total");
  total.textContent = `${index} из ${questions.length} Вопросов`;
}

function score() {
  const headerScore = document.querySelector(".header-score");
  headerScore.innerHTML = `Баллы: ${userScore}`;
}

function showResultSection() {
  quizSection.style.display = "none";
  resultSection.classList.add("active");

  const scoreText = document.querySelector(".score__text");
  scoreText.innerHTML = `Вы набрали ${userScore} баллов из ${questions.length}`;

  const progressCircle = document.querySelector(".circular__progress");
  const progressValue = document.querySelector(".progress__value");
  let startValue = -1;
  let endValue = (userScore / questions.length) * 100;
  let speed = 30;

  let progressInterval = setInterval(() => {
    startValue++;
    progressValue.innerHTML = `${startValue}%`;
    progressCircle.style.background = `conic-gradient(rgb(196, 114, 126) ${
      startValue * 3.6
    }deg, rgba(255, 255, 255, 0.1) 0deg)`;
    if (startValue == endValue) {
      clearInterval(progressInterval);
    }
  }, speed);
}
