//tracking status
let idUser;
auth.onAuthStateChanged((user) => {
    if (user) {
        idUser = user.uid
        setUpMenu(user);
    }else{
        setUpMenu();
    }
})
// create accout
const btnSignUp = document.querySelector('.signup');
const signUp = document.querySelector('.signup-account');
const bgSignup = document.querySelector('.signup-account .bg');
const signupForm = document.querySelector('#signup-form');
const btnAddAccout = document.querySelector('btn-signup');
const getStart = document.querySelector('.create-user');

btnSignUp.addEventListener('click', () =>{
    signUp.classList.toggle('show');
})

bgSignup.addEventListener('click', () =>{
    signUp.classList.remove('show');
})
getStart.addEventListener('click', () =>{
    signUp.classList.toggle('show');
})

//sign up user
signupForm.addEventListener('submit',(event) =>{
    event.preventDefault();
    const email = signupForm['signup-email'].value;
    const name = signupForm['name'].value;
    const password = signupForm['signup-password'].value;
    const cfpassword = signupForm['signup-cfpassword'].value;
    const phoneNumber = signupForm['signup-phone'].value;
    if (cfpassword !== password ) {
        notification('Password confirm wrong ?');
        return;
    }
    if (name==='' ||email==='' || password ==='' || phoneNumber === '') {
        // resportWhenMissinfo.style.display = "block";
        // let setTime = setInterval(() => {
        //     resportWhenMissinfo.style.display = "none";
        //     clearInterval(setTime);
        // },2000);
        notification('You fill in the missing information!!!');
    }else{
        auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            db.collection(cred.user.uid).doc(cred.user.uid).set({
                name: name,
                email:email,
                pass: password,
                phonenumber: phoneNumber,
                time: timeNow
            })
            signupForm.reset();
            signUp.classList.remove('show');
        })
    }
})

//logout user

const logOut = document.querySelector('.logout');

logOut.addEventListener('click' ,event => {
    event.preventDefault();
    auth.signOut().then(() =>{
        console.log('logout succesfully');
    }).catch((err) =>{
        console.log(err);
    })
})
//show form login
const logIn = document.querySelector('.login');
const loginAccount = document.querySelector('.login-account');
const bglogin = document.querySelector('.login-account .bg');
const submitLogin = document.querySelector('.btn-login');
const formLogin = document.querySelector('#login-form');

logIn.addEventListener('click', () => {
    loginAccount.classList.toggle('show');
})
bglogin.addEventListener('click', () =>{
    loginAccount.classList.remove('show');
})
//login user
formLogin.addEventListener('submit' , (event) => {
    event.preventDefault();
    const email = formLogin['login-email'].value;
    const password = formLogin['login-password'].value;

   auth.signInWithEmailAndPassword(email,password).then((cred) =>{
        formLogin.reset();
        loginAccount.classList.remove('show');
   }).catch((error) =>{
        let errorCode = error.code;
        let errorMessage = error.message;
        //let notification = document.querySelector('.resportWhenMissinfo');
        notification(errorMessage);
   })

})

function notification (text){
    let resportWhenMissinfo = document.querySelector('.resportWhenMissinfo');
    let html = '';
        html = `
            <div class="icon"></div>
            <p data-notification = "${text}"></p>
        `;
        resportWhenMissinfo.style.display = "block";
        resportWhenMissinfo.innerHTML = html;
        let setTime = setInterval(() => {
            resportWhenMissinfo.style.display = "none";
            clearInterval(setTime);
        },3000);
}