//Setting up the variables
let theInput = document.querySelector('.add-task input'),
theAddButton = document.querySelector(".add-task .plus"),
tasksContainer = document.querySelector(".tasks-content"),
taskCount = document.querySelector(".tasks-count span"),
tasksCompleted = document.querySelector(".tasks-completed span"),
TryAgain = 0,
i,
inputList = [],
oldDiv = document.querySelector('.oldDiv'),
elements = document.getElementsByClassName('task-box');

//Create delete all btn
let deleteAll = document.createElement('span'),
deleteAllText = document.createTextNode('Delete All');
deleteAll.className = 'delAll';
deleteAll.appendChild(deleteAllText);
document.querySelector('.task-state').appendChild(deleteAll);

//Delete all when clicked
deleteAll.onclick = function () {
  'use strict';

  inputList = [];
  while (elements.length > 0) {if (window.CP.shouldStopExecution(0)) break;
    elements[0].parentNode.removeChild(elements[0]);
  }window.CP.exitedLoop(0);

  createNoTasks();
};



//Create finish all btn
let finishAll = document.createElement('span'),
finishAllText = document.createTextNode('Finish All');

finishAll.className = 'finAll';
finishAll.appendChild(finishAllText);
document.querySelector('.task-state').appendChild(finishAll);

//finish all when clicked
finishAll.onclick = function () {
  'use strict';
  var fin = document.querySelectorAll('.task-box');

  for (var i = 0; i < fin.length; i++) {if (window.CP.shouldStopExecution(1)) break;
    fin[i].classList.add('finished');
  }window.CP.exitedLoop(1);
};
//Fouces on input field
window.onload = function () {
  'use strict';
  theInput.focus();
};

//Adding the task
theAddButton.onclick = function () {
  //if input is empty
  if (theInput.value === '') {
    console.log('Empty ');
    swal('Hey , it should not be empty');
  } else {

    noTasksMsg = document.querySelector(".no-tasks-message");
    //Check if span with no tasks message is exit
    if (document.body.contains(document.querySelector('.no-tasks-message'))) {
      //remove no Task message
      noTasksMsg.remove();
    }
    //Add input text to array 
    inputList.push(theInput.value);

    //Check if there is a deplicate value 
    dupArray(inputList);
    localStorage.setItem(theInput.value, 'InputValue');

    //Add if there is no deplicate value 
    if (TryAgain === 0) {


      //Create main span Element
      let mainSpan = document.createElement('span');

      //Create delete span
      let deleteElement = document.createElement('span');

      //create main span text
      let text = document.createTextNode(theInput.value);

      //create the delete span text
      let deleteText = document.createTextNode('Delete');

      //add text to main span
      mainSpan.appendChild(text);
      //add class to main span
      mainSpan.className = 'task-box';

      //add text to delete span
      deleteElement.appendChild(deleteText);

      //add class to delete span
      deleteElement.className = 'delete';

      //Add delete button to main span
      mainSpan.appendChild(deleteElement);

      //add the task to the container
      tasksContainer.appendChild(mainSpan);

      //Empty the input text
      theInput.value = '';
      theInput.focus();

    }
  }
  calculateTasks();
};

//Check if there is a deplicate item
function dupArray(arr) {
  for (i = 0; i < arr.length; i++) {if (window.CP.shouldStopExecution(2)) break;
    if (arr.indexOf(arr[i]) != i && arr.indexOf(arr[i]) != -1) {
      swal('u already have this input !', arr[i]);
      arr.pop();
      TryAgain = 1;
      console.log(arr);
    } else {
      TryAgain = 0;
    }

  }window.CP.exitedLoop(2);
}

//Finsh and delete Task
document.addEventListener('click', function (e) {
  'use strict';

  //Delete  Task
  if (e.target.className == 'delete') {
    //Remove current node

    //('Lara<span class="delete">Delete</span>').slice(0,-34) =>Lara
    localStorage.removeItem(e.target.parentNode.innerHTML.slice(0, -34));

    e.target.parentNode.remove();
    //Check number of task inside the container
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
  }

  //Finish task
  if (e.target.classList.contains('task-box')) {

    //Toggle task
    e.target.classList.toggle('finished');

  }
  calculateTasks();
});

//Function to create no taske no tasks message
function createNoTasks() {
  //create message no span element
  let msgSpan = document.createElement('span');
  //Create the text message
  let msgText = document.createTextNode('No Task To show');
  //add text to message span elemnt
  msgSpan.appendChild(msgText);
  //add class to message span
  msgSpan.className = 'no-tasks-message';
  //append the message span elemnt to the task container
  tasksContainer.appendChild(msgSpan);
}

//Calculate tasks
function calculateTasks() {
  //Calculate  all  tasts
  taskCount.textContent = document.querySelectorAll('.tasks-content .task-box').length;
  // calculate completed tasks
  tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
}


//Create span to show all task that deleted
let localStorageSpan = document.createElement('span'),
localStorageSpanText = document.createTextNode('Show Old Cards');
localStorageSpan.className = 'oldCard';

localStorageSpan.appendChild(localStorageSpanText);
document.querySelector('.task-state').appendChild(localStorageSpan);


//Create delet all task elemnt
let deleteAllbtn = document.createElement('span'),
deleteAllbtnTxt = document.createTextNode('Delete Old Cards');
deleteAllbtn.className = 'deleteOldCard';

deleteAllbtn.appendChild(deleteAllbtnTxt);
document.querySelector('.task-state').appendChild(deleteAllbtn);

deleteAllbtn.onclick = function () {
  'use strict';

  if (localStorage.length) {
    for (let [key] of Object.entries(localStorage)) {
      localStorage.removeItem(key);
      oldDiv.innerHTML = '';
    }

  } else {
    swal('Local Storage is Empty');
  }
};



//Show Old Task
localStorageSpan.onclick = function () {
  'use strict';
  oldDiv.style.display = 'block';
  oldDiv.innerHTML = '';
  if (localStorage.length) {
    for (let [key] of Object.entries(localStorage)) {
      oldDiv.innerHTML += ` Task Name : ${key}  `;
      oldDiv.innerHTML += "<br>";

    }
  } else {
    swal('Local Storage is Empty');
  }
};