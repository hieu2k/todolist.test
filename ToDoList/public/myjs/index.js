const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const signupEmail = document.querySelector('#signup-email');
const signupPassword = document.querySelector('#signup-password');
const signupBio = document.querySelector('#signup-bio');
const label1 = document.querySelectorAll('.label1');
const label2 = document.querySelectorAll('.label2');


$('#login-email').on('focus', function(){
    label1[0].classList.add('effect-top');
})

$('#login-email').on('blur', function(){
    if ($(this).val() === '') {
        label1[0].classList.remove('effect-top');
    }
})
$('#login-password').on('focus', function(){
    label1[1].classList.add('effect-top');
})

$('#login-password').on('blur', function(){
    if ($(this).val() === '') {
        label1[1].classList.remove('effect-top');
    }
})

//////////////////////////////////////////////////////

$('#signup-email').on('focus', function(){
    label2[1].classList.add('effect-top');
})

$('#signup-email').on('blur', function(){
    if ($(this).val() === '') {
        label2[1].classList.remove('effect-top');
    }
})
$('#name').on('focus', function(){
    label2[0].classList.add('effect-top');
})

$('#name').on('blur', function(){
    if ($(this).val() === '') {
        label2[0].classList.remove('effect-top');
    }
})
$('#signup-password').on('focus', function(){
    label2[2].classList.add('effect-top');
})

$('#signup-password').on('blur', function(){
    if ($(this).val() === '') {
        label2[2].classList.remove('effect-top');
    }
})
$('#signup-cfpassword').on('focus', function(){
    label2[3].classList.add('effect-top');
})

$('#signup-cfpassword').on('blur', function(){
    if ($(this).val() === '') {
        label2[3].classList.remove('effect-top');
    }
})
$('#signup-phone').on('focus', function(){
    label2[4].classList.add('effect-top');
})

$('#signup-phone').on('blur', function(){
    if ($(this).val() === '') {
        label2[4].classList.remove('effect-top');
    }
})


// show menu in html
const logout = document.querySelector('.logout');
const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const setting = document.querySelector('.setting');
const userPeople = document.querySelector('.user');
const userPeopleInfo = document.querySelector('.user .info-user');
const buttonAddWorkParent = document.querySelector('.buttonAddWorkParent');
const listToDo = document.querySelector('.listToDo');
const contentLeft = document.querySelector('.contentLeft');
const languageMakeWeb = document.querySelector('.language');
const barMenu = document.querySelector('.barMenu');
const getstarted = document.querySelector('.getstarted');
const using = document.querySelector('.using');
const setUpMenu = (user) => {
    if (user) {
        logout.style.display = 'inline-block';
        buttonAddWorkParent.style.display = 'inline-block';
        userPeople.style.display = 'inline-block';
        listToDo.style.display = 'block';
        contentLeft.style.display = 'block';
        languageMakeWeb.style.display = 'none';
        barMenu.style.display = 'inline-block';
        getstarted.style.display ='none';
        using.style.display = 'none';
        let html = `
            <div class="img-user">
                <div class="img-user-child"></div>
            </div>
            <div class="email-user">
                <span>Your Email: </span>
                <p>${user.email}</p>
                <span>Times: </span>
                <h4>${timeNow}</h4>
            </div>
        `;
        userPeopleInfo.innerHTML = html;
        login.style.display = 'none';
        signup.style.display = 'none';
    }else{
        login.style.display = 'inline-block';
        signup.style.display = 'inline-block';
        logout.style.display = 'none';
        buttonAddWorkParent.style.display = 'none';
        userPeople.style.display = 'none';
        listToDo.style.display = 'none';
        contentLeft.style.display = 'none';
        languageMakeWeb.style.display = 'block';
        barMenu.style.display = 'none';
        getstarted.style.display = 'block';
        using.style.display = 'block';
    }
}
const showWorkInHTML = (docs) => {
    let InHTML = ``;
    for (let i = 0; i < docs.length; i++) {
        if (docs[i].id === idUser) {
            docs.splice(i,1);       
        }
    }
    let total = docs.length;
    for (let i = 0; i < total; i++) {
        for (let j = i+1; j < total; j++) {
            let temp = docs[i];
            if (docs[j].data().nubImportant > docs[i].data().nubImportant) {
                docs[i] = docs[j];
                docs[j] = temp;
            }
        }
    }

    for (let i = 0; i < total; i++) {
        InHTML += `
            <div class="_1work">
                <div class = "checkbox-parents">
                    <input type="checkbox" data-id="${docs[i].id}" class="checkBox" name="" id="checkBox">
                    <span class="checkmark"></span>
                </div>
                <p class="name_work">${docs[i].data().work}</p>
                <div class="important-child">
                    <div class="important" data-numberImportant="${docs[i].data().nubImportant}">
                        <div class="levels">
                            <div class="level"></div>
                            <div class="level"></div>
                            <div class="level"></div>
                            <div class="level"></div>
                            <div class="level"></div>
                        </div>
                    </div>
                </div>
            </div>    
        `;
    }
    return InHTML;
}
const showFooderInHTML = (docs) => {
    let InHTML = ``;
    InHTML = `<p class="all_Work">${docs.length-1}  task in your today!</p>`;
    return InHTML;
}

const btnInfoUser = document.querySelector('.btn-info-user');

btnInfoUser.addEventListener('click' ,() =>{
    //showFormAddWork.classList.remove("show");
    //bgBlack.classList.remove("show");
    const infoUser = document.querySelector('.info-user');
    infoUser.classList.toggle('show');
})