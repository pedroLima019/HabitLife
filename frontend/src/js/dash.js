import { updateChart } from "../js/chart.js";
import {
  initCalendar,
  addHabitCalendar,
  removeHabitCalendar,
} from "./calendar.js";

document.addEventListener("DOMContentLoaded", () => {
  initCalendar();
});

const btnAddHabit = document.getElementById("btnAdd");
const modal = document.getElementById("modal");
const btnClose = document.getElementById("close-modal");
const habitList = document.getElementById("habitList");
const form = document.getElementById("Habit-form");

let editingCard = null;

btnAddHabit.addEventListener("click", () => modal.classList.remove("hidden"));
btnClose.addEventListener("click", () => closeModal());

function closeModal() {
  modal.classList.add("hidden");
  form.reset();
  editingCard = null;
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function updateStatusColor(select) {
  select.classList.remove("pendente", "emandamento", "concluido");

  const status = select.value
    .toLowerCase()
    .replace(" ", "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  select.classList.add(status);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.querySelector("input[type='text']").value;
  const date = form.querySelector("input[type='date']").value;
  const difficulty = form.querySelector("select").value;
  const category = document.querySelectorAll("input[type='text']")[1].value;

  if (editingCard) {
    updateCard(editingCard, { name, date, difficulty, category });
    updateHabitPainels();
  } else {
    const newCard = createCard({ name, date, difficulty, category });
    habitList.appendChild(newCard);
    updateHabitPainels();
  }

  closeModal();
});

function updateCard(card, { name, date, difficulty, category }) {
  card.querySelector("h3").textContent = name;
  card.querySelector(".date-text").textContent = formatDate(date);
  const tags = card.querySelectorAll(".tag-card");
  tags[0].textContent = difficulty;
  tags[0].className = `tag-card ${difficulty.toLowerCase()}`;
  tags[1].textContent = category;

  const id = card.dataset.eventId;
  const startTimeInput = card.querySelector("Input[type= 'time']");
  const startTime = startTimeInput ? startTimeInput.value : "00:00";

  removeHabitCalendar(id);
  addHabitCalendar({ name, date, category, startTime, id });
}

function updateHabitPainels() {
  const selects = document.querySelectorAll(".status-select");

  let completed = 0;
  let pending = 0;
  let inProgress = 0;

  selects.forEach((select) => {
    const value = select.value;

    if (value === "Concluído") {
      completed++;
    } else if (value === "Pendente") {
      pending++;
    } else if (value === "Em andamento") {
      inProgress++;
    }
  });

  document.getElementById("completed-count").textContent = completed;
  document.getElementById("pending-count").textContent = pending;
  document.getElementById("inprogress-count").textContent = inProgress;

  updateChart(completed, pending, inProgress);
}

function createCard({ name, date, difficulty, category, startTime, endTime }) {
  startTime = startTime || "00:00";
  endTime = endTime || "00:00";

  const card = document.createElement("div");
  card.classList.add("habit-card");

  const id = `habit-${Date.now()}`;
  card.dataset.eventId = id;

  addHabitCalendar({ name, date, category, startTime, id });
  
  card.innerHTML = `
    <div class="card-header">
      <h3>${name}</h3>
      <div class="menu-container">
        <button class="habit-config">
          <span class="material-symbols-outlined">more_horiz</span>
        </button>
        <ul class="habit-menu hidden">
          <li class="edit-habit">Editar</li>
          <li class="delete-habit">Excluir</li>
        </ul>
      </div>
    </div>

    <div class="tags">
      <span class="tag-card ${difficulty.toLowerCase()}">${difficulty}</span>
      <span class="tag-card categoria">${category}</span>

      <select class="status-select">
        <option value="Pendente" selected>Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluído">Concluído</option>
      </select>
    </div>

    <div class="date">
      <span class="material-symbols-outlined">calendar_month</span>
      <span class="date-text">${formatDate(date)}</span>
    </div>

    <div class="time">
      <label for="start-time-${name}">Início:</label>
      <input type="time" id="start-time-${name}" value="${startTime}">
      
      <label for="end-time-${name}">Término:</label>
      <input type="time" id="end-time-${name}" value="${endTime}">
    </div>
  `;

  addCardEvents(card);
  return card;
}

function addCardEvents(card) {
  const statusSelect = card.querySelector(".status-select");
  updateStatusColor(statusSelect);

  statusSelect.addEventListener("change", function () {
    updateStatusColor(this);
    updateHabitPainels();
  });

  const configBtn = card.querySelector(".habit-config");
  const menu = card.querySelector(".habit-menu");
  const deleteBtn = card.querySelector(".delete-habit");
  const editBtn = card.querySelector(".edit-habit");

  configBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    menu.classList.add("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    card.remove();
    updateHabitPainels();
  });

  editBtn.addEventListener("click", () => {
    const nameInput = form.querySelector("input[type='text']");
    const dateInput = form.querySelector("input[type='date']");
    const categoryInput = document.querySelectorAll("input[type='text']")[1];
    const difficultySelect = form.querySelector("select");

    nameInput.value = card.querySelector("h3").textContent;
    dateInput.value = card
      .querySelector(".date-text")
      .textContent.split("/")
      .reverse()
      .join("-");
    categoryInput.value = card.querySelectorAll(".tag-card")[1].textContent;
    difficultySelect.value = card.querySelectorAll(".tag-card")[0].textContent;

    editingCard = card;
    modal.classList.remove("hidden");
  });
}
