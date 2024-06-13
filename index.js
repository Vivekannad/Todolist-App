const taskInput = document.getElementById('task-input');
const taskAdd = document.getElementById('btn-add');
const form = document.getElementById('form');
const section = document.querySelector('.add-section');

let taskArray = [];
let anotherArray = [];


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task === '') {
    alert('Please fill the field');
    return;
  }
  taskArray.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  generateToDO(taskArray);
  taskInput.value = '';
});

const generateToDO = (taskArr) => {
  section.innerHTML = '';
  taskArr.forEach((val, index) => {
    section.innerHTML += `
      <div class="row mt-5 align-items-center">
        <div class="col-8 d-flex justify-content-end">
          <div class="w-75">
            <input class="border-dark bg-success text-white form-control task-display" id="task-display" value="${val}" readonly>
          </div>
          <button class="btn btn-dark text-white border-2 border-dark position-absolute edit-button" onclick="editButton(${index})">Edit</button>
        </div>
        <div class="col-3">
          <button class="btn btn-danger border-2 border-dark" id="button" onclick="deleteTodo(${index})">Delete</button>
        </div>
      </div>
    `;
  });
};

const deleteTodo = (index) => {
  taskArray.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  generateToDO(taskArray);
};

const editButton = (index) => {
  const edit = document.querySelectorAll('.edit-button');
  const inPa = document.querySelectorAll('.task-display');
  if (edit[index].innerText === 'Edit') {
    inPa[index].focus();
    inPa[index].setSelectionRange(inPa[index].value.length, inPa[index].value.length);
    edit[index].innerText = 'Save';
    inPa[index].removeAttribute('readonly');
  } else {
    if (!(inPa[index].value.trim())) {
      inPa[index].value = taskArray[index];
    }
    taskArray[index] = inPa[index].value;
    edit[index].innerText = 'Edit';
    inPa[index].setAttribute('readonly', 'readonly');
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    generateToDO(taskArray);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const reloadTasks = JSON.parse(localStorage.getItem('tasks'));
  taskArray = reloadTasks;
  generateToDO(taskArray);
});