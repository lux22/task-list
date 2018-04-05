let selectors = '';
let datavalues;
let res;
//
let value = document.getElementsByClassName('list-group-item');

value = Array.from(value);

// console.log(value);

// value[0].style.background = "blue";
// value[1].style.padding = "20px";
// selectors = document.querySelectorAll('.list-group-item');
// selectors[0].className += " dummy class";

// selectors = document.querySelector('.list-group-item:last-child');
// selectors.style.background = "blue";


selectors = document.querySelector('a.list-group-item');
console.log(selectors);
res = selectors.childNodes;

//getting children 
// res = selectors.children[0].children[0].children[2];
// res.textContent = "wow great";

//getting parent
res = selectors.parentNode;
res = selectors.parentElement;


//get siblings;
res = selectors.nextSibling;
res = selectors.nextElementSibling.nextElementSibling;

//get previous siblings
res = selectors.previousSibling;
res = res = selectors.nextElementSibling.nextElementSibling.previousElementSibling;
// console.log(datavalues);
// value.forEach(function(data){
//     console.log(data);
// })

// value = selectors[0].children[0].text
// console.log(value);


//Creating elements 
// let elem = document.createElement('a');
// elem.id ="main";
// elem.className = "mainclass";
// elem.append(document.createTextNode('Wow this is great'));
// selectors.append(elem);
// console.log(res)


//Removig elements 

let elem_remove = document.querySelectorAll('.list-group-item');
elem_remove[2].remove();

//replace elements;
let new_elem = document.createElement('h4');
new_elem.id = "new_elem";
new_elem.className = "list-group-item-heading";
new_elem.appendChild(document.createTextNode('hello world'));

let elem_replace = elem_remove[0].children[0].children[0].children;
let replaced_elem = elem_replace[1];
let replace_parent = elem_replace[1].parentElement;

// console.log(replace_parent)
// replace_parent.replaceChild(new_elem,replaced_elem);
// console.log(replaced_elem);


//Events 
const clickevnt = document.querySelector('.list-group-item');
const delet_ele = document.querySelector('.icon-color');
const color_change = document.querySelector('.list-group');

// const elem_h5 = document.createElement('h2');
// elem_h5.id='dummy_id';
// elem_h5.className = 'xy';
// elem_h5.textContent = 'X:0 and Y:0';
// color_change.prepend(elem_h5);

// const dummy_elem = document.getElementById('dummy_id');


// clickevnt.addEventListener('click',function(e){
//     console.log(`its a ${e.type}`);
// });

//funciton expression
let fneventTrigger = function (event) {
    // console.log(`Event is ${event.type}`);
}

let fnchangeColor = function (e) {
    // this.style.background = `rgb(${e.offsetX},${e.offsetY},45)`;    
    dummy_elem.textContent = `X:${e.offsetX} and Y:${e.offsetY}`;
}

// delet_ele.addEventListener('click',fneventTrigger);
// color_change.addEventListener('mousemove', fnchangeColor);

//Event Bubling and Delegations;

const list_ = document.querySelector('.list-group');
const list_item = document.querySelector('.list-group-item');
const list_panel = document.querySelector('.panel-body');
const dele_list = document.querySelector('.list-group').getElementsByClassName('list-group-item');

// console.log(dele_list);
// console.log(dele_list.length);

const elem_h5 = document.createElement('h2');
elem_h5.id = 'dummy_id';
elem_h5.className = 'xy';
elem_h5.style.textAlign = 'center';
elem_h5.textContent = 'No List Added';

// list_.addEventListener('click',function(){
//     console.log('list');
// })

// list_item.addEventListener('click',function(){
//     console.log('list_item');
// });

// list_panel.addEventListener('click',function(){
//     console.log('list_panel');
// });

const add = document.querySelector('.btn-block');

let fndeleteitems = function (e) {
    if (e.target.parentElement.className === 'btn btn-primary pull-right delete') {
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
        if (dele_list.length == 0)
            list_.append(elem_h5);
    }
}

let fnadditems = function (e) {
    let task;
    const tasks = document.getElementById('txtvalue').value;
    console.log(tasks);
    if (localStorage.getItem('main') === null) {
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('main'));
    }
    task.push(tasks);
    localStorage.setItem('main', JSON.stringify(task));
}

document.body.addEventListener('click', fndeleteitems);
add.addEventListener('click', fnadditems)