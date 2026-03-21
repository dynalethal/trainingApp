const workouts = {
  day1: [
    { name: "Squat", icon: "🏋️", reps: "6-8", video: "https://www.youtube.com/watch?v=aclHkVaku9U" },
    { name: "Squat Hold", icon: "🧱", reps: "20-40s", video: "https://www.youtube.com/watch?v=YaXPRqUwItQ" },
    { name: "Glute Bridge", icon: "🍑", reps: "10-15", video: "https://www.youtube.com/watch?v=wPM8icPu6H8" },
    { name: "Row", icon: "🚣", reps: "8-12", video: "https://www.youtube.com/watch?v=pYcpY20QaE8" },
    { name: "Heel Drops", icon: "🦶", reps: "10-15", video: "https://www.youtube.com/watch?v=YMmgqO8Jo-k" },
    { name: "Plank", icon: "🧘", reps: "20-30s", video: "https://www.youtube.com/watch?v=pSHjTRCQxIw" }
  ],
  day2: [
    { name: "Split Squat", icon: "⚖️", reps: "6-10/leg", video: "https://www.youtube.com/watch?v=2C-uNgKwPLE" },
    { name: "Floor Press", icon: "💪", reps: "8-12", video: "https://www.youtube.com/watch?v=8mWJ6a6dG7k" },
    { name: "One-Arm Row", icon: "🏹", reps: "8-12", video: "https://www.youtube.com/watch?v=pYcpY20QaE8" },
    { name: "Overhead Carry", icon: "📦", reps: "30-45s", video: "https://www.youtube.com/watch?v=6H8WLfyavWk" },
    { name: "Step Downs", icon: "⬇️", reps: "6-8/leg", video: "https://www.youtube.com/watch?v=2gZ3G1pY7Qk" },
    { name: "Dead Bug", icon: "🐞", reps: "6-10", video: "https://www.youtube.com/watch?v=g_BYB0R-4Ws" }
  ],
  day3: [
    { name: "RDL", icon: "🔗", reps: "8-12", video: "https://www.youtube.com/watch?v=2SHsk9AzdjA" },
    { name: "Single-Leg RDL", icon: "🦵", reps: "6-8/leg", video: "https://www.youtube.com/watch?v=2SHsk9AzdjA" },
    { name: "Push-Ups", icon: "🔥", reps: "6-10", video: "https://www.youtube.com/watch?v=IODxDxX7oi4" },
    { name: "Reverse Lunge", icon: "↩️", reps: "6-10/leg", video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U" },
    { name: "Side Lunges", icon: "↔️", reps: "6-10", video: "https://www.youtube.com/watch?v=rvqLVxYqEvo" },
    { name: "Side Plank", icon: "📏", reps: "20-30s", video: "https://www.youtube.com/watch?v=K2VljzCC16g" }
  ]
};

function showDay(day, btn) {
  document.querySelectorAll(".tabs button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const container = document.getElementById("workout");
  container.innerHTML = "";

  workouts[day].forEach((ex, index) => {
    const saved = JSON.parse(localStorage.getItem(day + index)) || {};

    const card = document.createElement("div");
    card.className = "exercise-card";

    card.innerHTML = `
      <div class="exercise-header">
      <div class="exercise-name">${ex.icon} ${ex.name}</div>
      <div class="reps">${ex.reps}</div>
      </div>

      <div class="inputs">
        <input placeholder="kg" value="${saved.weight || ""}" 
          onchange="save('${day}', ${index}, this.value, 'weight')">
        <input placeholder="reps" value="${saved.reps || ""}" 
          onchange="save('${day}', ${index}, this.value, 'reps')">
      </div>

      <div class="actions">
        <a href="${ex.video}" target="_blank">▶ Watch</a>
      </div>
    `;

    container.appendChild(card);
  });
}

function save(day, index, value, type) {
  const key = day + index;
  const existing = JSON.parse(localStorage.getItem(key)) || {};
  existing[type] = value;
  localStorage.setItem(key, JSON.stringify(existing));
}

showDay("day1", document.querySelector(".tabs button"));
