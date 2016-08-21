var firebaseReference = new Firebase ("https://resplendent-torch-5949.firebaseIO.com/tasks/");
//setstasksarray equalto firebase repsoneand update view -
//this is what the function below is doing - could be the name of the function
//which currently does not have a name
var tasks = [];
firebaseReference.on("value", function(value){
  tasks = value.val();
  updateView();
});



function addTask(newTask) {
  //adds new task to tasks array
  tasks.push({title: newTask, completed: false});
  //clears out input box
  document.getElementById("newTask").value="";
  //tell firebase about new item -
  //replacing old task array in firebase with our
  //new tasks array in todo app
  firebaseReference.set(tasks);
  updateView();
}

function addEnter(inputField, keyPressed) {
  if (keyPressed.charCode ===13) {
    addTask(inputField.value)
  }
}


function toggleTaskCompleted(el) {
  var taskIndex = $(el).attr('taskID');
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  //set looks at root - which is tasks b/c of ulr above
  firebaseReference.set(tasks);
  updateView();
}

function deleteTask(el) {
  var taskIndex = $(el).attr('taskID');
  tasks.splice(taskIndex, 1);
  firebaseReference.set(tasks);
  updateView();
}


function updateView() {
  //reference the "ul" element in our HTML
  var taskListDiv = document.getElementById("tasksList");
  taskListDiv.innerHTML = "";


//for each task, I need to create a "li" element
//in each "li" element, I want to display the task
//then, I want to add the task to the task list
  tasks.forEach(function(task, index) {
    var individualTask = document.createElement("li");
    individualTask.innerHTML = task.title;
    individualTask.setAttribute('completed', task.completed);
    individualTask.setAttribute('taskId', index);
    individualTask.setAttribute('onclick', "toggleTaskCompleted(this)");
    individualTask.setAttribute('ondblclick', "deleteTask(this)");
    taskListDiv.appendChild(individualTask);
  });
}


updateView();
