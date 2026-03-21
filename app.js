const workouts = {
  day1: [
    { name: "Squat", reps: "6-8" },
    { name: "Weighted Squat Hold", reps: "20-40s" },
    { name: "Glute Bridge", reps: "10-15" },
    { name: "Row", reps: "8-12" },
    { name: "Heel Drops", reps: "10-15" },
    { name: "Plank", reps: "20-30s" }
  ],
  day2: [
    { name: "Split Squat", reps: "6-10/leg" },
    { name: "Floor Press", reps: "8-12" },
    { name: "One-Arm Row", reps: "8-12" },
    { name: "Overhead Carry", reps: "30-45s" },
    { name: "Step Downs", reps: "6-8/leg" },
    { name: "Dead Bug", reps: "6-10" }
  ],
  day3: [
    { name: "Romanian Deadlift", reps: "8-12" },
    { name: "Single-Leg RDL", reps: "6-8/leg" },
    { name: "Push-Ups", reps: "6-10" },
    { name: "Reverse Lunge", reps: "6-10/leg" },
    { name: "Side Lunges", reps: "6-10" },
    { name: "Side Plank", reps: "20-30s" }
  ]
};

function showDay(day) {
  const container = document.getElementById("workout");
  container.innerHTML = "";

  workouts[day].forEach((ex, index) => {
    const saved = JSON.parse(localStorage.getItem(day + index)) || {};

    const div = document.createElement("div");
    div.className = "exercise";

    div.innerHTML = `
      <strong>${ex.name}</strong> (${ex.reps})<br>
      Weight: <input value="${saved.weight || ""}" onchange="save('${day}', ${index}, this.value, 'weight')">
      Reps: <input value="${saved.reps || ""}" onchange="save('${day}', ${index}, this.value, 'reps')">
    `;

    container.appendChild(div);
  });
}

function save(day, index, value, type) {
  const key = day + index;
  const existing = JSON.parse(localStorage.getItem(key)) || {};
  existing[type] = value;
  localStorage.setItem(key, JSON.stringify(existing));
}

// Load Day 1 by default
showDay("day1");
