const toDoList = [];

const form = document.querySelector("form");
const ul = document.querySelector("ul");
const taskNumber = document.querySelector("h2 span");
const input = document.querySelector("input");
const inputSearch = document.querySelector("input.search");
const bell = document.querySelector(".bell");
const bellIcon = document.querySelector(".bell i");

const removeTask = (e) => {
  const index = e.target.parentNode.dataset.key;
  toDoList.splice(index, 1);
  taskNumber.textContent = toDoList.length;
  renderList();

  //bell deactivation
  if (Number(taskNumber.textContent) === 0) bellIcon.classList.remove("active");

  bell.classList.remove("remove");
  bellIcon.classList.remove("remove");
};

const addTask = (e) => {
  e.preventDefault();
  const titleTask = input.value;
  if (titleTask === "") return;
  const task = document.createElement("li");
  task.className = "task";
  task.innerHTML =
    '<i class="fas fa-thumbtack"></i>' + titleTask + "<button>remove</button>";
  toDoList.push(task);
  renderList();
  input.value = "";
  taskNumber.textContent = toDoList.length;

  //bell activation
  if (Number(taskNumber.textContent) > 0) bellIcon.classList.add("active");

  const btnRemove = task.querySelector("button");
  btnRemove.addEventListener("click", removeTask);

  btnRemove.addEventListener("mouseover", () => {
    bell.classList.add("remove");
    bellIcon.classList.add("remove");
  });
  btnRemove.addEventListener("mouseleave", () => {
    bell.classList.remove("remove");
    bellIcon.classList.remove("remove");
  });
};

const renderList = () => {
  ul.textContent = "";
  toDoList.forEach((toDoElement, key) => {
    toDoElement.dataset.key = key;
    ul.appendChild(toDoElement);
    if (inputSearch.value) inputSearch.value = "";
  });
};

const searchTask = (e) => {
  const searchText = e.target.value.toLowerCase();
  let tasks = toDoList.filter((li) =>
    li.textContent.toLowerCase().includes(searchText)
  );
  ul.textContent = "";
  tasks.forEach((li) => ul.appendChild(li));
};

form.addEventListener("submit", addTask);
inputSearch.addEventListener("input", searchTask);
