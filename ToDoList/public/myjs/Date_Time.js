// console.log(moment().format('h:mm:ss A / MMMM Do YYYY'));
// console.log(moment().format('LTS'));
// console.log(moment().subtract(10, 'days').calendar());
// console.log(moment().format('dddd'));
// console.log(moment().format('LLLL'));

let timeNow = moment().format('LLLL');

let deg = 6;
let hr = document.querySelector('#hr');
let mn = document.querySelector('#mn');
let sc = document.querySelector('#sc');
let date = document.querySelector('.date');
setInterval(() =>{
    let day = new Date();
    let hh = day.getHours()*30;
    let mm = day.getMinutes()*deg;
    let ss = day.getSeconds()*deg;
    let time = moment().format('h:mm:ss A / MMMM Do YYYY');
    hr.style.transform = `rotateZ(${hh+(mm/(12))}deg)`;
    mn.style.transform = `rotateZ(${(mm)}deg)`;
    sc.style.transform = `rotateZ(${(ss)}deg)`;
    date.innerHTML = `${time}</p>`;
})