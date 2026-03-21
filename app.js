const streak = getWeeklyStreak();

document.querySelector("header p").innerText =
  `🔥 ${streak} sessions this week`;

const workouts = {
  dayA: [
    { name: "Goblet Squat", icon: "🏋️", reps: "6-8", video: "https://www.youtube.com/watch?v=MeIiIdhvXT4" },
    { name: "Romanian Deadlift", icon: "🔗", reps: "6-8", video: "https://www.youtube.com/watch?v=2SHsk9AzdjA" },
    { name: "Floor Press", icon: "💪", reps: "8-10", video: "https://www.youtube.com/watch?v=8mWJ6a6dG7k" },
    { name: "One-Arm Row", icon: "🏹", reps: "10", video: "https://www.youtube.com/watch?v=pYcpY20QaE8" },
    { name: "Suitcase Carry", icon: "🧳", reps: "30-40s", video: "https://www.youtube.com/watch?v=6H8WLfyavWk" }
  ],

  dayB: [
    { name: "Reverse Lunges", icon: "↩️", reps: "8/leg", video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U" },
    { name: "Overhead Press", icon: "📦", reps: "8", video: "https://www.youtube.com/watch?v=2yjwXTZQDDI" },
    { name: "Step-Ups", icon: "⬆️", reps: "10/leg", video: "https://www.youtube.com/watch?v=dQqApCGd5Ss" },
    { name: "Hip Thrust", icon: "🍑", reps: "10", video: "https://www.youtube.com/watch?v=LM8XHLYJoYs" },
    { name: "Low Impact Jumps", icon: "⚡", reps: "10", video: "https://www.youtube.com/watch?v=U4s4mEQ5VqU" }
  ]
};

<div class="tag">🦴 Bone Builder</div>

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
    const coach = getCoachMessage(saved.history, ex.reps);
    card.innerHTML = `
      <div class="exercise-header">
      <div class="exercise-name">${ex.icon} ${ex.name}</div>
      <div class="reps">${ex.reps}</div
      <div class="coach">${coach}</div>
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
  let existing = JSON.parse(localStorage.getItem(key)) || {};

  existing[type] = value;

  // Save history
  existing.history = existing.history || [];
  existing.history.push({
    weight: existing.weight,
    reps: existing.reps,
    date: new Date().toISOString()
  });

  localStorage.setItem(key, JSON.stringify(existing));
}

showDay("day1", document.querySelector(".tabs button"));

function getCoachMessage(history, targetReps) {
  if (!history || history.length < 2) return "Start here 💪";

  const last = history[history.length - 1];
  const prev = history[history.length - 2];

  const lastReps = parseInt(last.reps);
  const prevReps = parseInt(prev.reps);

  const maxTarget = parseInt(targetReps.split("-")[1] || targetReps);

  if (lastReps >= maxTarget && prevReps >= maxTarget) {
    return "⬆️ Increase weight (bone stimulus ↑)";
  }

  if (lastReps < prevReps) {
    return "⚠️ Hold or reduce slightly";
  }

  if (lastReps >= maxTarget - 1) {
    return "🔥 Nearly there — push next time";
  }

  return "✅ Solid work — keep building";
}

function getWeeklyStreak() {
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  let count = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if (item?.history) {
      item.history.forEach(h => {
        if (new Date(h.date) > weekAgo) count++;
      });
    }
  }

  return count;
}

