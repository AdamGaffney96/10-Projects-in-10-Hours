const calculateDay = (targetDate) => {
    const today = new Date();
    const diffInSeconds = (targetDate - today) / 1000;
    let days = Math.floor((diffInSeconds / 3600) / 24);
    let hours = Math.floor((diffInSeconds / 3600) % 24);
    let seconds = Math.floor((diffInSeconds / 60) % 60);
    let minutes = Math.floor(diffInSeconds % 60);
    return [days, hours, seconds, minutes];
}

const setCountdown = (days, hours, minutes, seconds) => {
    const daysElement = document.querySelector(".days");
    const hoursElement = document.querySelector(".hours");
    const secondsElement = document.querySelector(".seconds");
    const minutesElement = document.querySelector(".minutes");

    daysElement.innerHTML = days;
    hoursElement.innerHTML = hours;
    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = seconds;
}

const main = (newDate) => {
    let timer = calculateDay(new Date(newDate));
    setCountdown(timer[0], timer[1], timer[2], timer[3]);
}

const selector = document.querySelector(".timer-selector");

selector.addEventListener("change", () => {
            let date;
            today = new Date();
            switch (selector.value) {
                case "newyearsday":
                    date = `${today > new Date(`${today.getFullYear()}-01-01`) ? today.getFullYear() + 1 : today.getFullYear()}-01-01`;
            main(new Date(date));
            clearInterval(interval);
            interval = setInterval(() => { main(new Date(date)) }, 1000);
            break;
        case "christmas":
            date = `${today > new Date(`${today.getFullYear()}-12-25`) ? today.getFullYear() + 1 : today.getFullYear()}-12-25`;
            main(new Date(date));
            clearInterval(interval);
            interval = setInterval(() => { main(new Date(date)) }, 1000);
            break;
        case "summer":
            date = `${today > new Date(`${today.getFullYear()}-06-01`) ? today.getFullYear() + 1 : today.getFullYear()}-06-01`;
            main(new Date(date));
            clearInterval(interval);
            interval = setInterval(() => { main(new Date(date)) }, 1000);
            break;
        default:
            console.log("Error, invalid counter selected.");
            break;
    }
})

console.log(new Date() > new Date("2022-01-01"));

main(new Date("2023-01-01"));
let interval = setInterval(() => { main(new Date("2023-01-01")) }, 1000);