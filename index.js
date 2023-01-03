let counter = 0; // To provide id to <li> tag and <trash>
let alarmList = [];

setInterval(() => {
    // display Time
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById("currentTime").innerText = currentTime;

    // alert for alarm
    if (alarmList.length > 0) {
        for (let item = 0; item < alarmList.length; item++) {
            const alarmTime = alarmList[item].timeInputVal
            if (alarmTime === currentTime) {
                alert(`Wake up and be Awsome \n${alarmList[item].textInputVal}`)
                alarmList = alarmList.filter((item) => { return item.timeInputVal !== currentTime })
                render();
            }
        }
    }
}, 1000);

const form = document.getElementById('enterTime');
const hourInput = document.getElementById('hourInput');
const minInput = document.getElementById('minInput');
const secInput = document.getElementById('secInput');

const selectInput = document.getElementsByName('selectInput')[0]; // selecting am/pm
const textInput = document.getElementById('textInput'); // alertMsg

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const hourInputVal = hourInput.value;
    const minInputVal = minInput.value;
    const secInputVal = secInput.value;
    const selectInputVal = selectInput.value;
    const textInputVal = textInput.value;
    const timeInputVal = `${hourInputVal}:${minInputVal}:${secInputVal} ${selectInputVal}`;
    ++counter

    alarmList.push({ timeInputVal, textInputVal, id: `li_${counter}` });

    hourInput.value = "";
    minInput.value = "";
    secInput.value = "";
    textInput.value = "";

    render();
})

function render() {

    // clear all alarm list
    document.getElementById('alarmList').innerHTML = "";

    // Display all alarm list
    for (let item = 0; item < alarmList.length; item++) {
        const li = document.createElement("li");
        li.innerHTML = `
        <div>
        <span> <i class="fa-solid fa-bell bell"></i> ${alarmList[item].timeInputVal}</span>
        <span>${alarmList[item].textInputVal}</span>
        <i id=${alarmList[item].id} class="fa-solid fa-trash trash"></i>
        </div>
        `;
        li.className = "li";
        li.id = `${alarmList[item].id}`
        document.getElementById("alarmList").appendChild(li);

        document.getElementsByClassName('trash')[item].addEventListener("click", (event) => {
            let alarmId = event.target.id;
            // filtering the alarm list
            alarmList = alarmList.filter((alarm) => { return alarm.id !== alarmId })
            render();
        })
    }
}

const clearAll = document.getElementById("clearAll").addEventListener('click',()=>{
    alarmList = [];
    render();
})