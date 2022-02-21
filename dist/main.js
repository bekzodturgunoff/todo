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

function Todo({ title, added_date, priority }) {
  this.title = title;
  this.added_date = added_date;
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
  const priority = data.get("priority");
  if (!title) return;
  if (priority === "high") {
    console.log(`It's high`);
  } else if (priority === "medium") {
    console.log(`It's medium`);
  } else if (priority === "low") {
    console.log(`It's low`);
  }
  projects.getSelected().addTodo({ title, added_date, priority });
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

function renderMain() {
  const project = projects.getSelected();
  const heading = main.querySelector(".main-heading");
  heading.textContent = project.title;
  todoList.innerHTML = "";
  project.todos.forEach((todo) => {
    const item = document.createElement("li");
    const date = document.createElement("p");
    const priority = document.createElement("p");
    const tools = document.createElement("div");
    const checkBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    tools.classList.add("tools");
    item.textContent = todo.title;
    date.textContent = todo.added_date;
    priority.textContent = todo.priority;
    checkBtn.textContent = "check";
    deleteBtn.textContent = "delete";
    tools.append(checkBtn, deleteBtn);
    item.append(date, priority, tools);
    todoList.append(item);
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
