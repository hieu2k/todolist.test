"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clickMainRight_1 = require("./clickMainRight");
const effectCountNumber_1 = require("./effectCountNumber");
let showFormAddWork = document.querySelector(".header .parents .items .buttonAddWorkParent .form_add");
let bgBlack = document.querySelector(".header .parents .items .buttonAddWorkParent .bg");
let buttonAddWork = document.querySelector(".header .parents .items .buttonAddWorkChild");
let check = 0;

//get date-time
var MyDefine;
(function (MyDefine) {
    MyDefine.day = timeNow;
})(MyDefine || (MyDefine = {}));
var MyDefineClassHTML;
(function (MyDefineClassHTML) {
    MyDefineClassHTML.ListWork = ".list_work";
    MyDefineClassHTML.Fooder = ".fooder";
    MyDefineClassHTML.NameClassEnterHTML = ".listToDo .addWork .Write-work";
    MyDefineClassHTML.NameClassBottonHTML = ".listToDo .addWork .button-add";
    MyDefineClassHTML.NameClassBottonHTML1 = ".buttonAddWorkParent .form_add .button-add";
    MyDefineClassHTML.NameClassEnterHTML1 = ".buttonAddWorkParent .form_add .Write-work";
})(MyDefineClassHTML || (MyDefineClassHTML = {}));

//click buttton Quick add task
function clickButtonQuickAddTask() {
    buttonAddWork.addEventListener("click", function () {
        showFormAddWork.classList.toggle("show");
        bgBlack.classList.toggle("show");
    });
    bgBlack.addEventListener("click", function () {
        showFormAddWork.classList.remove("show");
        bgBlack.classList.remove("show");
    });
}
// efect basic of botton
function effectHeader() {
    showFormAddWork.classList.remove("show");
    bgBlack.classList.remove("show");
}
// select level task
let nbImportant=0;
const levels = document.querySelectorAll('.level');
const textImportant = document.getElementById('textImportant');
levels.forEach((level) =>{
    level.addEventListener('click' ,() =>{
        nbImportant = parseInt(level.getAttribute('data-important'));
        for (let i = 0; i < levels.length; i++) {
            let location = i.toString();
            let nameClass = 'draw-color' + location;
            levels[i].classList.remove(nameClass);
        }
        showImportant(levels,nbImportant);
        if (nbImportant === 1) {
            textImportant.setAttribute('data-textImportant','Not important');
        }else if (nbImportant === 2 || nbImportant === 3) {
            textImportant.setAttribute('data-textImportant','Nomal');
        }else if (nbImportant === 4) {
            textImportant.setAttribute('data-textImportant','Important');
        }else if (nbImportant === 5) {
            textImportant.setAttribute('data-textImportant','Very important');
        }
    })
})

function showImportant(array,value){
    for (let i = 0; i < value; i++) {
        let location = i.toString();
        let nameClass = 'draw-color' + location;
        array[i].classList.add(nameClass);
    }
}
// add your work
function clickButtonAddWork(name, name1) {
    $(name).click( (event) => {
        for (let i = 0; i < levels.length; i++) {
            let location = i.toString();
            let nameClass = 'draw-color' + location;
            levels[i].classList.remove(nameClass);
        }
        textImportant.setAttribute('data-textImportant','Select task level');
        event.preventDefault();
        newWork(name1);
       
        effectHeader();
        nbImportant=0;
    });
}


// Create new work
function newWork(name) {
    let work = $(name).val().toString();
    if (work === "" || work === " " || work === "   " || work === "    " || work === "     ") {
        let writeWork = document.querySelector(MyDefineClassHTML.NameClassEnterHTML);
        writeWork.classList.add('animate');
        let setTime = setInterval(()=>{
            writeWork.classList.remove('animate');    
            clearInterval(setTime);
        },1000)
        return;
    }
    if (nbImportant === 0) {
        let importantParents = document.querySelector('.listToDo .addWork .important-parents');
        importantParents.classList.add('animate');
        let setTime = setInterval(()=>{
            importantParents.classList.remove('animate');    
            clearInterval(setTime);
        },1000)
        return;
    }
    $(".Write-work").val("");
    db.collection(idUser).add({
        work: work,
        time: timeNow,
        nubImportant: nbImportant
    })
}
//show in html
function showWork() {
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(idUser).onSnapshot((snapshot) => {
                let listWork = document.querySelector(MyDefineClassHTML.ListWork);
                let fooder = document.querySelector(MyDefineClassHTML.Fooder);
                listWork.innerHTML = showWorkInHTML(snapshot.docs);
                fooder.innerHTML = showFooderInHTML(snapshot.docs);
                check = -1;
                deleteWork();
                setTimeGetdataImportant();
            })
            
            
        }else{
            console.log('Sign in'); 
        }
    })
}
//listen key enter
function enterAddWork(name) {
    let inputWork = document.querySelector(name);
    inputWork.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            newWork(name);
            $(".Write-work").val("");
            effectHeader();
        }
    });
}
// delete work 
function deleteWork(){
    auth.onAuthStateChanged((user) => {
        let checkboxs = document.querySelectorAll('._1work #checkBox'); 
        checkboxs.forEach((checkbox) => {
            checkbox.addEventListener('click',() =>{ 
                let setTime = setInterval(() => {
                    let id = checkbox.getAttribute('data-id');
                    db.collection(idUser).doc(id).delete().then(function() {
                        console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                   
                    clearInterval(setTime);
                },500)
                let reportTaskCompleted = document.querySelector('.reportTaskCompleted');
                reportTaskCompleted.style.display = 'block';
                let setTimeReport = setInterval(() => {
                    reportTaskCompleted.style.display = 'none';
                    clearInterval(setTimeReport);
                },1500)
            })
        })
    })
    
}

$(document).ready(function () {
    showWork();
    clickButtonAddWork(MyDefineClassHTML.NameClassBottonHTML, MyDefineClassHTML.NameClassEnterHTML);
    enterAddWork(MyDefineClassHTML.NameClassEnterHTML);
    clickButtonAddWork(MyDefineClassHTML.NameClassBottonHTML1, MyDefineClassHTML.NameClassEnterHTML1);
    enterAddWork(MyDefineClassHTML.NameClassEnterHTML1);
    clickButtonQuickAddTask();
    clickMainRight_1.clickMainRight();
    effectCountNumber_1.effectCountNumber();
});
function setTimeGetdataImportant(){
    let timeImportant = setInterval(() =>{
        if (check === -1) {
            let importantChild = document.querySelectorAll('.important-child .important');
            let i = 0;
            importantChild.forEach((item) =>{
                let numberImportant = parseInt(item.getAttribute('data-numberImportant'));
                let textImportant ;
                if (numberImportant === 1) {
                    textImportant = "Not important";
                }else if (numberImportant === 2 || numberImportant === 3) {
                    textImportant = "Nomal";
                }else if (numberImportant === 4) {
                    textImportant = "Important";
                }else if( numberImportant === 5){
                    textImportant = "Very important";
                }

                let html = '';
                html =`
                    <p id="textImportant" data-textImportant="${textImportant}"></p>
                `; 
            
                item.innerHTML += html;
                let levelsChild = document.querySelectorAll('.important-child .important .levels');
                
                showImportant(levelsChild[i].children,numberImportant);
                i ++;
            },500)
            clearInterval(timeImportant);
        }
    }) 
}
    
