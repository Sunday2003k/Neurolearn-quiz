const questions = [
  {
    text: "How do you best remember new information?",
    options: [
      { text: "See it in a chart or diagram", type: "visual" },
      { text: "Hear it explained", type: "auditory" },
      { text: "Read or write it", type: "reading" },
      { text: "Do a hands-on activity", type: "kinesthetic" }
    ]
  },
  {
    text: "What's your favorite way to study?",
    options: [
      { text: "Watch videos or look at visuals", type: "visual" },
      { text: "Listen to recordings or lectures", type: "auditory" },
      { text: "Take notes and review them", type: "reading" },
      { text: "Practice with exercises or labs", type: "kinesthetic" }
    ]
  },
  {
    text: "When giving directions, you prefer to:",
    options: [
      { text: "Draw a map", type: "visual" },
      { text: "Explain out loud", type: "auditory" },
      { text: "Write them step-by-step", type: "reading" },
      { text: "Physically walk someone through it", type: "kinesthetic" }
    ]
  },
  {
    text: "In class, you prefer:",
    options: [
      { text: "Charts, graphs, slides", type: "visual" },
      { text: "Group discussions", type: "auditory" },
      { text: "Textbooks and handouts", type: "reading" },
      { text: "Experiments or role play", type: "kinesthetic" }
    ]
  },
  {
    text: "To relax, you often:",
    options: [
      { text: "Watch something", type: "visual" },
      { text: "Listen to music", type: "auditory" },
      { text: "Read a book", type: "reading" },
      { text: "Go for a walk or do something physical", type: "kinesthetic" }
    ]
  }
];

let current = 0;
let scores = {
  visual: 0,
  auditory: 0,
  reading: 0,
  kinesthetic: 0
};

function loadQuestion() {
  if (current >= questions.length) {
    showResult();
    return;
  }

  const q = questions[current];
  document.getElementById("question").textContent = q.text;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      scores[opt.type]++;
      current++;
      loadQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

function showResult() {
  const resultDiv = document.getElementById("result");
  document.getElementById("quiz").style.display = "none";
  resultDiv.style.display = "block";

  // Find the max score
  const bestType = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  resultDiv.innerHTML = `
    <h2>Your Learning Style is: ${bestType.toUpperCase()}</h2>
    <p>You learn best through ${learningDescriptions[bestType]}.</p>
  `;
}

const learningDescriptions = {
  visual: "images, diagrams, and spatial understanding",
  auditory: "hearing information and discussions",
  reading: "reading and writing to absorb material",
  kinesthetic: "hands-on activities and movement"
};

window.onload = loadQuestion;
