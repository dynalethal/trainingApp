const workouts = {
  day1: [
    { name: "Squat", icon: "🏋️", reps: "6-8" },
    { name: "Squat Hold", icon: "🧱", reps: "20-40s" },
    { name: "Glute Bridge", icon: "🍑", reps: "10-15" },
    { name: "Row", icon: "🚣", reps: "8-12" },
    { name: "Heel Drops", icon: "🦶", reps: "10-15" },
    { name: "Plank", icon: "🧘", reps: "20-30s" }
  ],
  day2: [
    { name: "Split Squat", icon: "⚖️", reps: "6-10/leg" },
    { name: "Floor Press", icon: "💪", reps: "8-12" },
    { name: "One-Arm Row", icon: "🏹", reps: "8-12" },
    { name: "Overhead Carry", icon: "📦", reps: "30-45s" },
    { name: "Step Downs", icon: "⬇️", reps: "6-8/leg" },
    { name: "Dead Bug", icon: "🐞", reps: "6-10" }
  ],
  day3: [
    { name: "RDL", icon: "🔗", reps: "8-12" },
    { name: "Single-Leg RDL", icon: "🦵", reps: "6-8/leg" },
    { name: "Push-Ups", icon: "🔥", reps: "6-10" },
    { name: "Reverse Lunge", icon: "↩️", reps: "6-10/leg" },
    { name: "Side Lunges", icon: "↔️", reps: "6-10" },
    { name: "Side Plank", icon: "📏", reps: "20-30s" }
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
