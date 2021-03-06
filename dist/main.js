/**
 * Constants
 */
const PROJECTS_STORAGE_KEY = "projects";
const SELECTED_PROJECT_KEY = "selected";
const DEFAULT_PROJECTS = ["Overview", "Today", "Important"];

const projectForm = document.getElementById("project-form");
const todoForm = document.getElementById("todo-form");
const links = document.querySelector(".links");
const main = document.querySelector(".main");
const todoList = document.querySelector(".todo-list");

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const overlayCloseBtn = document.querySelector(".overlay-close-btn");
const addTodoBtn = document.getElementById("addTodoBtn");
const projectBtn = document.getElementById("project-btn");

addTodoBtn.addEventListener("click", (e) => {
  modal.classList.add("open");
  overlay.classList.add("open");
});

overlayCloseBtn.addEventListener("click", (e) => {
  modal.classList.remove("open");
  overlay.classList.remove("open");
});

projectBtn.addEventListener("click", (e) => {
  projectForm.classList.add("open");
});
projectForm.addEventListener("change", (e) => {
  projectForm.classList.remove("open");
});

function Projects() {
  this.projects = [];
  this.selected = undefined;
}

Projects.prototype.addProject = function (project) {
  const newProject = new Project(project);
  this.projects.push(newProject);
  window.localStorage.setItem(
    PROJECTS_STORAGE_KEY,
    JSON.stringify({ projects: this.projects })
  );
  return newProject;
};

Projects.prototype.removeProject = function (id) {
  this.projects = this.projects.filter((project) => project.id !== id);
  window.localStorage.setItem(
    PROJECTS_STORAGE_KEY,
    JSON.stringify({ projects: this.projects })
  );
};

Projects.prototype.getProjects = function () {
  return this.projects;
};

Projects.prototype.saveProjects = function () {
  window.localStorage.setItem(
    PROJECTS_STORAGE_KEY,
    JSON.stringify({
      projects: projects
        .getProjects()
        .map((project) =>
          project.id === this.selected.id ? this.selected : project
        ),
    })
  );
};

Projects.prototype.getSelected = function () {
  return this.projects.find((project) => project.id === projects.selected);
};

Projects.prototype.select = function (id) {
  this.selected = id;
  window.localStorage.setItem(SELECTED_PROJECT_KEY, id);
};

Projects.prototype.first = function () {
  return this.projects[0];
};

const projects = new Projects();

function Project({
  title,
  id = Math.random().toString(32).slice(2),
  todos = [],
}) {
  this.title = title;
  this.id = id;
  this.todos = todos;
}

Project.prototype.addTodo = function (todo) {
  this.todos.push(todo);
  projects.saveProjects();
};

Project.prototype.removeTodo = function (id) {
  this.todos = this.todos.filter((todo) => todo.id !== id);
  projects.saveProjects();
};
console.log(Project.prototype.removeTodo);
function Todo({ title, added_date, time, priority }) {
  this.title = title;
  this.added_date = added_date;
  this.time = time;
  this.priority = priority;
}

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const title = data.get("title");
  if (!title) return;

  projects.addProject({ title });
  renderLinks();
  projectForm.reset();
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const title = data.get("title");
  const added_date = data.get("added_date");
  const time = data.get("time");
  const priority = data.get("priority");
  if (!title) return;

  projects.getSelected().addTodo({ title, added_date, time, priority });
  renderMain();
  todoForm.reset();
  modal.classList.remove("open");
  overlay.classList.remove("open");
});

function renderLinks() {
  links.innerHTML = "";
  projects.getProjects().forEach((project) => {
    const item = document.createElement("li");
    item.textContent = project.title;
    if (project.id === projects.getSelected().id) {
      item.classList.add("active");
    }

    item.addEventListener("click", (e) => {
      removeClassFromSiblings(e.target.parentElement);
      e.target.classList.add("active");
      projects.select(project.id);
      renderMain();
    });

    links.append(item);
  });
}

// function removeTask(index) {
//   todos.splice(index, 1);
//   window.localStorage.setItem(TODO_KEY, JSON.stringify(todos));
//   render();
// }

function renderMain() {
  const project = projects.getSelected();
  const heading = main.querySelector(".main-heading");
  heading.textContent = project.title;
  todoList.innerHTML = "";
  project.todos.forEach((todo) => {
    const item = document.createElement("li");
    const date = document.createElement("p");
    const time = document.createElement("p");
    const priority = document.createElement("div");
    const tools = document.createElement("div");
    const checkBtn = document.createElement("input");
    const deleteBtn = document.createElement("button");
    const checkboxLabel = document.createElement("label");

    tools.classList.add("tools");
    checkBtn.type = "checkbox";
    checkboxLabel.classList.add("check-label");
    deleteBtn.classList.add("delete-btn");
    item.classList.add("todo.priority");
    item.classList.add(todo.priority);
    item.textContent = todo.title;
    date.textContent = todo.added_date;
    time.textContent = todo.time;
    priority.textContent = todo.priority;
    checkboxLabel.innerHTML = `<i class="fa fa-solid fa-check"></i>`;
    deleteBtn.innerHTML = `<i class="fa fa-thin fa-trash"></i>`;
    checkboxLabel.append(checkBtn);
    tools.append(checkboxLabel, deleteBtn);
    item.append(date, time, priority, tools);
    todoList.append(item);

    if (priority.textContent === "High") {
      priority.classList.add("high");
    } else if (priority.textContent === "Medium") {
      priority.classList.add("medium");
    } else if (priority.textContent === "Low") {
      priority.classList.add("low");
    }

    checkBtn.addEventListener("change", (e) => {
      if (e.target.checked) {
        item.classList.add("checked");
      } else {
        item.classList.remove("checked");
      }
    });

    deleteBtn.addEventListener("click", (e) => Project.prototype.removeTodo);
  });
}

function removeClassFromSiblings(parent, className = "active") {
  [...parent.children].forEach((child) => child.classList.remove(className));
}

function init() {
  const existing = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
  const selected = window.localStorage.getItem(SELECTED_PROJECT_KEY);
  if (existing == null) {
    window.localStorage.setItem(
      PROJECTS_STORAGE_KEY,
      JSON.stringify({
        projects: DEFAULT_PROJECTS.map((title) =>
          projects.addProject({ title })
        ),
      })
    );
  } else {
    JSON.parse(existing).projects.forEach((project) =>
      projects.addProject(project)
    );
  }

  if (selected == null) {
    window.localStorage.setItem(SELECTED_PROJECT_KEY, projects.first().id);
    projects.select(projects.first().id);
  } else {
    projects.select(selected);
  }

  renderLinks();
  renderMain();
}

init();
