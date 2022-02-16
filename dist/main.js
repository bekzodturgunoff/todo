/**
 * Constants
 */
const PROJECTS_STORAGE_KEY = "projects";
const SELECTED_PROJECT_KEY = "selected";
const DEFAULT_PROJECTS = ["Overview", "Today", "Important"];

const projectForm = document.getElementById("pr-form");
const todoForm = document.getElementById("todo-form");
const links = document.querySelector(".links");
const main = document.querySelector(".main");
const todoList = document.querySelector(".todo-list");

function Projects() {
  this.projects = [];
  this.selected = undefined;
}

Projects.prototype.addProject = function (project) {
  this.projects.push(new Project(project));
  //   window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify({ projects: this.projects }));
};

Projects.prototype.removeProject = function (id) {
  this.projects = this.projects.filter((project) => project.id !== id);
  window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify({ projects: this.projects }));
};

Projects.prototype.getProjects = function () {
  return this.projects;
};

Projects.prototype.getSelected = function () {
  return this.selected;
};

Projects.prototype.select = function (project) {
  this.selected = project;
  window.localStorage.setItem(SELECTED_PROJECT_KEY, JSON.stringify(this.selected));
};

const projects = new Projects();

function Project({ title }) {
  this.title = title;
  this.id = Math.random().toString(32).slice(2);
  this.todos = [];
}

Project.prototype.addTodo = function (todo) {
  this.todos.push(todo);
};

Project.prototype.removeTodo = function (id) {
  this.todos = this.todos.filter((todo) => todo.id !== id);
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
  if (!title) return;

  projects.getSelected().addTodo({ title });
  renderMain();
  todoForm.reset();
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
      projects.select(project);
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
    item.textContent = todo.title;
    todoList.append(item);
  });
}

function removeClassFromSiblings(parent, className = "active") {
  [...parent.children].forEach((child) => child.classList.remove(className));
}

window.addEventListener("load", () => {
  const existing = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
  const selected = window.localStorage.getItem(SELECTED_PROJECT_KEY);
  if (existing) {
    const savedProjects = JSON.parse(existing).projects;
    savedProjects.forEach((project) => projects.addProject(project));
  } else {
    window.localStorage.setItem(
      PROJECTS_STORAGE_KEY,
      JSON.stringify({ projects: DEFAULT_PROJECTS.map((title) => new Project({ title })) })
    );
  }

  renderLinks();
  renderMain();
});
