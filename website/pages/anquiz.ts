
let backhome2 = document.getElementById("backhome2") as HTMLButtonElement;

interface QuestionOption {
  text: string;
  genre: string;
}

interface Question {
  text: string;
  options: QuestionOption[];
}


const questions: Question[] = [
  {
    text: "1. what music do you most often listen to in the morning?",
    options: [
      { text: "something calm, so as not to rush", genre: "jazz" },
      { text: "an energetic track to wake you up", genre: "rock" },
      { text: "background for reflection", genre: "indie" },
      { text: "whatever comes your way", genre: "pop" },
      { text: "hip hop to set the mood", genre: "hip-hop" },
      { text: "classical or jazz", genre: "jazz" },
      { text: "pop- easy and familiar", genre: "pop" },
    ]
  },
  {
    text: "2. How do you feel about loud and aggressive music?",
    options: [
      { text: "i love it!", genre: "metal" },
      { text: "sometimes it works", genre: "rock" },
      { text: "only if its punk or rock", genre: "rock" },
      { text: "i prefer a softer sound", genre: "r&b" },
      { text: "not my thing at all", genre: "jazz" },
    ]
  },
  {
    text: "3. what is more important to you in a song?",
    options: [
      { text: "rhythm and beat", genre: "hip-hop" },
      { text: "melody", genre: "jazz" },
      { text: "lyrics", genre: "indie" },
      { text: "atmosphere", genre: "electronic" },
      { text: "vocals", genre: "r&b" },
      { text: "energy", genre: "rock" },
      { text: "live sound", genre: "country" },
    ]
  },
  {
    text: "4. what is closer to you: live instruments or electronic sounds?",
    options: [
      { text: "only live", genre: "country" },
      { text: "i love the combination", genre: "pop" },
      { text: "electronic music is my everything", genre: "electronic" },
      { text: "the main thng is emotions, no matter what is played", genre: "r&b" },
    ]
  },
  {
    text: "5. what genr do you play at a party?",
    options: [
      { text: "pop", genre: "pop" },
      { text: "hip-hop", genre: "hip-hop" },
      { text: "electronic", genre: "electronic" },
      { text: "rock", genre: "rock" },
      { text: "dance funk/disco", genre: "r&b" },
      { text: "reggaeton", genre: "k-pop" },
      { text: "everything", genre: "indie" },
    ]
  },
  {
    text: "6. What do you feel when you hear a guitar solo?",
    options: [
      { text: "Goosebumps!", genre: "rock" },
      { text: "Excitement", genre: "metal" },
      { text: "Boring", genre: "pop" },
      { text: "Like it if short", genre: "indie" },
      { text: "For guitarists only", genre: "metal" },
      { text: "Better with bass or synth", genre: "electronic" }
    ]
  },
  {
    text: "7. Do you prefer songs with vocals or instrumental?",
    options: [
      { text: "Vocals are key", genre: "pop" },
      { text: "Love instrumentals", genre: "jazz" },
      { text: "Depends on mood", genre: "indie" },
      { text: "Genre matters", genre: "rock" }
    ]
  },
  {
    text: "8. Do you like songs with rap?",
    options: [
      { text: "Yes, it’s my style", genre: "hip-hop" },
      { text: "Sometimes", genre: "pop" },
      { text: "Only mixed with other genres", genre: "indie" },
      { text: "No, don’t like", genre: "jazz" }
    ]
  },
  {
    text: "9. Which music era do you prefer?",
    options: [
      { text: "70’s – legendary classics", genre: "rock" },
      { text: "80’s – synths and style", genre: "electronic" },
      { text: "90’s – golden era", genre: "pop" },
      { text: "2000’s – youth", genre: "hip-hop" },
      { text: "Modern tracks", genre: "k-pop" },
      { text: "Can’t decide", genre: "indie" }
    ]
  },
  {
    text: "10. What mood do you usually listen to music in?",
    options: [
      { text: "To get energized", genre: "rock" },
      { text: "To feel sad", genre: "r&b" },
      { text: "To dream", genre: "indie" },
      { text: "To work", genre: "electronic" },
      { text: "To dance", genre: "pop" },
      { text: "To feel deep emotions", genre: "jazz" }
    ]
  },
  {
    text: "11. What clothing style do you prefer?",
    options: [
      { text: "Street style", genre: "hip-hop" },
      { text: "Classic", genre: "jazz" },
      { text: "Casual / punk", genre: "metal" },
      { text: "Bright and trendy", genre: "k-pop" },
      { text: "Minimalism", genre: "indie" },
      { text: "Bohemian / vintage", genre: "country" },
      { text: "Sportswear", genre: "pop" },
      { text: "Comfort above all", genre: "r&b" }
    ]
  },
  {
    text: "12. Do you listen to music from other cultures or countries?",
    options: [
      { text: "Yes, constantly", genre: "world" },
      { text: "Sometimes, for variety", genre: "indie" },
      { text: "Only if popular", genre: "pop" },
      { text: "No, prefer local music", genre: "country" }
    ]
  },
  {
    text: "13. What do you listen to more often?",
    options: [
      { text: "Top hits", genre: "pop" },
      { text: "Old good tracks", genre: "jazz" },
      { text: "Experimental music", genre: "electronic" },
      { text: "Alternative music", genre: "indie" },
      { text: "Independent artists", genre: "indie" },
      { text: "Everything", genre: "rock" }
    ]
  },
  {
    text: "14. Do you go to concerts?",
    options: [
      { text: "Often", genre: "rock" },
      { text: "Rarely", genre: "pop" },
      { text: "Never", genre: "indie" },
      { text: "Only big festivals", genre: "metal" },
      { text: "Prefer online", genre: "electronic" }
    ]
  },
  {
    text: "15. Do you like to dance to music?",
    options: [
      { text: "Yes, very much", genre: "pop" },
      { text: "If in the mood", genre: "r&b" },
      { text: "Don’t like dancing", genre: "indie" },
      { text: "Prefer to listen and feel", genre: "jazz" }
    ]
  },
  {
    text: "16. What kind of song gives you goosebumps?",
    options: [
      { text: "Powerful vocals", genre: "r&b" },
      { text: "Beautiful melody", genre: "jazz" },
      { text: "Deep lyrics", genre: "indie" },
      { text: "Powerful climax", genre: "metal" },
      { text: "Unexpected transition", genre: "electronic" },
      { text: "All together", genre: "rock" }
    ]
  },
  {
    text: "17. Do you prefer energetic or slow music?",
    options: [
      { text: "Energetic", genre: "rock" },
      { text: "Slow", genre: "r&b" },
      { text: "Depends on mood", genre: "indie" },
      { text: "Mix is best", genre: "pop" }
    ]
  },
  {
    text: "18. Do you have a favorite musical instrument?",
    options: [
      { text: "Guitar", genre: "rock" },
      { text: "Drums", genre: "metal" },
      { text: "Bass", genre: "hip-hop" },
      { text: "Synthesizer", genre: "electronic" },
      { text: "Violin", genre: "classical" },
      { text: "Saxophone", genre: "jazz" },
      { text: "Vocals", genre: "pop" },
      { text: "No, love all", genre: "indie" }
    ]
  },
  {
    text: "19. Do you like when a song tells a story?",
    options: [
      { text: "Yes, it’s captivating", genre: "indie" },
      { text: "Sometimes", genre: "country" },
      { text: "Not necessary", genre: "electronic" },
      { text: "No, music is more important", genre: "pop" }
    ]
  },
  {
    text: "20. You want music to help you...",
    options: [
      { text: "Relax", genre: "jazz" },
      { text: "Dance", genre: "pop" },
      { text: "Get inspired", genre: "indie" },
      { text: "Cry", genre: "r&b" },
      { text: "Dream", genre: "electronic" },
      { text: "Work", genre: "classical" },
      { text: "Escape reality", genre: "metal" }
    ]
  },
  {
    text: "21. Imagine you are writing a song. What is it about?",
    options: [
      { text: "Love", genre: "r&b" },
      { text: "Life and meaning", genre: "indie" },
      { text: "Party", genre: "pop" },
      { text: "Inner conflict", genre: "metal" },
      { text: "Travel", genre: "country" },
      { text: "Social issues", genre: "hip-hop" },
      { text: "Something abstract", genre: "electronic" },
      { text: "About myself", genre: "indie" }
    ]
  }
];
// функция генерации теста
function renderQuestions() {
  const form = document.getElementById("quiz-form")!;
  questions.forEach((q, qIndex) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<h3>${q.text}</h3>`;

    q.options.forEach((option, oIndex) => {
      const id = `q${qIndex}_opt${oIndex}`;
      questionDiv.innerHTML += `
        <label for="${id}">
          <input type="radio" name="q${qIndex}" value="${option.genre}" id="${id}" />
          ${option.text}
        </label><br/>
      `;
    });

    form.appendChild(questionDiv);
  });
}

function calculateResult() {
  const genreScores: Record<string, number> = {};

  questions.forEach((_, index) => {
    const selected = document.querySelector<HTMLInputElement>(`input[name="q${index}"]:checked`);
    if (selected) {
      const genre = selected.value;
      genreScores[genre] = (genreScores[genre] || 0) + 1;
    }
  });

  let topGenre = "";
  let topScore = 0;

  for (const [genre, score] of Object.entries(genreScores)) {
    if (score > topScore) {
      topGenre = genre;
      topScore = score;
    }
  }

  const resultDiv = document.getElementById("result")!;
  if (topGenre) {
    resultDiv.innerHTML = `Youre musical genr: <strong>${topGenre.toUpperCase()}</strong>`;
  }
}

document.getElementById("submit-btn")!.addEventListener("click", calculateResult);

renderQuestions();


backhome2.onclick = function () {
  top!.location.href = "index.html";
};
