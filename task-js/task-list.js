 //DOM caching 
 let fninputevnt = (function () {

     const _DOMcaching = {
         addEvent: '.btn-add',
         deleteEvent: '.btn-delete',
         inputValue: '.task-input',
         filterValue: '.filter-value',
         listgroup: '.list-group',
         listgrouptitem: '.list-group-item',
         clear: '.btn-clear'
     };

     return {
         //DOM Caching
         getDOMselector: {
             lists: document.querySelector(_DOMcaching.listgroup),
             addBtn: document.querySelector(_DOMcaching.addEvent),
             clearAll: document.querySelector(_DOMcaching.clear),
             filter: document.querySelector(_DOMcaching.filterValue)
         },
         
         dom: _DOMcaching
     }

 })();

 //Task UI Controller
 let fntaskUI = (function (fninputevnt) {

     //Input data 
     let _data;
     

     //Get current time and date of task.
     let getTimeDate = function () {
         taskAddedDate = new Date();
         taskCurrentDate = taskAddedDate.toLocaleDateString();
         taskAddedHour = taskAddedDate.getHours();
         taskAddedMinute = taskAddedDate.getMinutes();
         taskAddedSeconds = taskAddedDate.getSeconds();
         return {
             taskCurrentDate,
             taskAddedHour,
             taskAddedMinute,
             taskAddedSeconds
         }
     };

     // Tasklist templating
     let listItem = function () {
         let taskContainer = document.createElement('a');
         taskContainer.setAttribute('task-id', _taskindex);
         taskContainer.className = 'list-group-item';
         taskContainer.href = '#';
         taskContainer.innerHTML = `<div class="row">
       <div class="col-sm-6 col-xs-12">
         <i class="fas fa-2x fa-user pull-left"></i>
         <h4 class="list-group-item-heading">${_data}</h4>
         <p class="list-group-item-text">${taskCurrentDate}</p>
       </div>
       <div class="col-sm-3 col-xs-12">
           <i class="fas fa-2x fa-calendar-alt pull-left"></i>
         <p class="list-group-item-text">${taskAddedHour}:${taskAddedMinute}:${taskAddedSeconds}</p>
       </div>
       <div class="col-sm-3 col-xs-12">
         <button class="btn btn-primary pull-right btn-delete">
           <i class="fas fa-times no-margin icon-color"></i>
         </button>
       </div>
     </div>`;

         fninputevnt.getDOMselector.lists.appendChild(taskContainer);
     };

     setInterval(getTimeDate, '1000');

     return {
         taskTime: {
             taskdate: getTimeDate().taskCurrentDate,
             taskHour: getTimeDate().taskAddedHour,
             taskMin: getTimeDate().taskAddedMinute,
             taskSecond: getTimeDate().taskAddedSeconds
         },
         renderTask: function (data, index) {
             _data = data;
             _taskindex = index;
             listItem();
         }
     }

 })(fninputevnt);

 //Adding task data to LocalStorage 
 let fntaskLocalStorage = (function () {

     let _taskLocal;
     let _taskData;
     let _localtaskdelete; 
     let _taskindex;

     //Checking tasks in localstorage
     let checklocalstorage = function () {
         if (localStorage.getItem('tasks') === null)
             _taskLocal = [];
         else
             _taskLocal = JSON.parse(localStorage.getItem('tasks'));
     }

     //Getting task data from localstorage.
     var taskLoaded = function () {
         checklocalstorage();
         _taskLocal.forEach(function (data) {
             let taskContainer = document.createElement('a');
              taskContainer.setAttribute('task-id',data.taskID);
             taskContainer.className = 'list-group-item';
             taskContainer.href = '#';
             taskContainer.innerHTML = `<div class="row">
          <div class="col-sm-6 col-xs-12">
            <i class="fas fa-2x fa-user pull-left"></i>
            <h4 class="list-group-item-heading">${data.task}</h4>
            <p class="list-group-item-text">${data.taskDate}</p>
          </div>
          <div class="col-sm-3 col-xs-12">
              <i class="fas fa-2x fa-calendar-alt pull-left"></i>
            <p class="list-group-item-text">${data.taskHour}:${data.taskMin}:${data.taskSec}</p>
          </div>
          <div class="col-sm-3 col-xs-12">
            <button class="btn btn-primary pull-right btn-delete">
              <i class="fas fa-times no-margin icon-color"></i>
            </button>
          </div>
        </div>`;

             fninputevnt.getDOMselector.lists.appendChild(taskContainer);
         })

     }

     //Storing task data in localstorage.
     var taskStorage = function (data) {
         checklocalstorage();
         _taskindex = data;
         let taskObject = {
             "taskID":Number(_taskindex),
             "task": _taskData,
             "taskDate": fntaskUI.taskTime.taskdate,
             "taskHour": fntaskUI.taskTime.taskHour,
             "taskMin": fntaskUI.taskTime.taskMin,
             "taskSec": fntaskUI.taskTime.taskSecond
         };
         _taskLocal.push(taskObject);

         localStorage.setItem('tasks', JSON.stringify(_taskLocal));
     };

     //Deleting task data from localstorage.
     let deletlocaltask = function () {
         checklocalstorage();
         _taskLocal.forEach(function (task, index) {
             if(_localtaskdelete === task['taskID'])
             {
                _taskLocal.splice(index,1);
             }
         })
         localStorage.setItem('tasks', JSON.stringify(_taskLocal));
     };

     //Clearing task data in localstorage.
     let clearlocaltask = function(){
          checklocalstorage();
          localStorage.clear();
     }


     return {
         
         taskLocalStorage: function (data,index) {
             if (data != null) {
                 _taskData = data;
                 taskStorage(index);
             } else {
                 console.log('Cannot Insert to LocalStorage without data');
             }
         },

         deletelocaltask: function (data) {
             _localtaskdelete = data;
             deletlocaltask();
         },

         clearlocaltasklist:function(){
            clearlocaltask();
         },

         gettask: function () {
             taskLoaded();
         }
     }

 })();


 //Task Controller
 let fntaskController = (function (UIrender, taskstorage) {

     let _addtask = fninputevnt.getDOMselector.addBtn;
     let _deletetask = fninputevnt.getDOMselector.lists;
     let _cleartask = fninputevnt.getDOMselector.clearAll;
     let _deleteClass = fninputevnt.dom.deleteEvent;
     let _filter = fninputevnt.getDOMselector.filter;
     let _taskid;

     //setupeventlistner
     let eventListnerInit = function () {
          document.addEventListener('DOMContentLoaded', taskstorage.gettask);
         _addtask.addEventListener('click', getitems);
         _deletetask.addEventListener('click', deleteItems);
         _cleartask.addEventListener('click', clearAllList);
         _filter.addEventListener('keyup', filterTask);
     }

     //Getting task input 
     let getitems = function () {
         let _task_items = document.querySelector(fninputevnt.dom.inputValue).value;
         document.querySelector(fninputevnt.dom.inputValue).value = '';
         if (_task_items != '') {

             _listgroup = document.querySelectorAll(fninputevnt.dom.listgrouptitem);
             if (_listgroup.length > -1) {
                 _taskindex = _listgroup.length;
                 UIrender.renderTask(_task_items, _taskindex); //Rendering task data to HTML //   
                 taskstorage.taskLocalStorage(_task_items,_taskindex); // Adding task to localstorage.//
             }
             
         } else {
             alert('Plese add a task ');
         }

     }

     //Removeing task from tasklist
     let deleteItems = function (e) {
         if (e.target.parentElement.className.includes('btn-delete')) {
             e.target.parentElement.parentElement.parentElement.parentElement.remove();
             _taskid = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('task-id');
         }
         fntaskLocalStorage.deletelocaltask(Number(_taskid));
     }

     //Clear all tasklist
     let clearAllList = function () {
         while (_deletetask.firstChild) {
             _deletetask.removeChild(_deletetask.firstChild);
         }
         fntaskLocalStorage.clearlocaltasklist();
     }

     //Search tasks in tasklist
     let filterTask = function (e) {
         let _listgroup = document.querySelectorAll(fninputevnt.dom.listgrouptitem);
         let keyword = e.target.value.toLowerCase();
         _listgroup.forEach(function (listdata) {
             if (listdata.firstChild.textContent.toLowerCase().indexOf(keyword) != -1)
                 listdata.style.display = 'block'
             else
                 listdata.style.display = 'none';
         });

     }

     return {
         taskGetItems: function () {
             getitems();
         },
         init: function () {
             eventListnerInit();
         }
     }

 })(fntaskUI, fntaskLocalStorage);

 //Eventlistner initilization
 fntaskController.init();