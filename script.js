    const questions = [
      {
        question: "Who is known as the 'Father of the Nation' in India?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Subhas Bose"],
        answer: "Mahatma Gandhi",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        answer: "Mars",
      },
      {
        question: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        answer: "Canberra",
      },
      {
        question: "Who wrote the National Anthem of India?",
        options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Mahatma Gandhi", "Sarojini Naidu"],
        answer: "Rabindranath Tagore",
      },
      {
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Au", "Gd", "Go"],
        answer: "Au",
      },
    ];

    let currentQuestion = 0;
    let usedLifelines = { fiftyFifty: false, audiencePoll: false, skip: false };

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const moneyLadder = document.getElementById("moneyLadder");

    const lifelineButtons = {
      fiftyFifty: document.getElementById("fiftyFifty"),
      audiencePoll: document.getElementById("audiencePoll"),
      skip: document.getElementById("skip"),
    };

    function loadQuestion() {
      const q = questions[currentQuestion];
      questionElement.textContent = q.question;
      optionsElement.innerHTML = "";
      q.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsElement.appendChild(btn);
      });
      updateLadder();
    }

    function checkAnswer(selected) {
      const correct = questions[currentQuestion].answer;
      if (selected === correct) {
        alert("✅ Correct Answer!");
        currentQuestion++;
        if (currentQuestion < questions.length) loadQuestion();
        else alert("🎉 Congratulations! You’ve won the quiz!");
      } else {
        alert("❌ Wrong Answer! Game Over!");
        currentQuestion = 0;
        loadQuestion();
      }
    }

    function updateLadder() {
      moneyLadder.innerHTML = "";
      for (let i = 0; i < questions.length; i++) {
        const div = document.createElement("div");
        div.className = "money-step";
        div.textContent = `Q${i + 1}: ₹${(i + 1) * 10000}`;
        if (i === currentQuestion) div.classList.add("active");
        moneyLadder.appendChild(div);
      }
    }

    // Lifeline: 50–50
    lifelineButtons.fiftyFifty.onclick = () => {
      if (usedLifelines.fiftyFifty) return alert("❗ Already used!");
      usedLifelines.fiftyFifty = true;
      const q = questions[currentQuestion];
      const correct = q.answer;
      let wrongOptions = q.options.filter((o) => o !== correct);
      wrongOptions = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
      Array.from(optionsElement.children).forEach((btn) => {
        if (wrongOptions.includes(btn.textContent)) btn.style.visibility = "hidden";
      });
    };

    // Lifeline: Audience Poll
    lifelineButtons.audiencePoll.onclick = () => {
      if (usedLifelines.audiencePoll) return alert("❗ Already used!");
      usedLifelines.audiencePoll = true;
      const percentages = [70, 10, 10, 10].sort(() => Math.random() - 0.5);
      alert("📊 Audience Poll:\nA: " + percentages[0] + "%\nB: " + percentages[1] + "%\nC: " + percentages[2] + "%\nD: " + percentages[3] + "%");
    };

    // Lifeline: Skip
    lifelineButtons.skip.onclick = () => {
      if (usedLifelines.skip) return alert("❗ Already used!");
      usedLifelines.skip = true;
      alert("⏩ Skipping to next question!");
      currentQuestion++;
      loadQuestion();
    };

    loadQuestion();