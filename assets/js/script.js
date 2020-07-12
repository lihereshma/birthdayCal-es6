/* Author: Reshma

Birthday Cal is a weekday calendar.

You've a list of people.
Process the data and place people's initials in the card according to these rules-
  - If there a box is empty, it should add the day-empty class to the box.
  - Each person must always be rendered as square.
  - Order people inside the card based on thie age(youngest to oldest).
  - Each square in a card must be of equal size and fir them in such as way that everymperson occupies maximum area.
How it Works-
  - read given year from year input box.
  - hitting update button fills in the calendar for a given data.
  - hitting “update” abutton gain should clean up and re-render the UI.
*/

const year = document.getElementById('yearInput');
const updateButton = document.getElementById('button');
const output = Array.from(document.querySelectorAll('.output'));
const number = document.querySelector('.count');
const user = document.querySelector('.userDetails');
const displayYear = document.querySelector('.year');

const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let UsersData;
let rand;

let iArray = [
  { name : "Vijaya Kambale", birthday : "1997/02/09" },
  { name : "Sahil Sawant", birthday : "1998/03/12" },
  { name : "Shraddha Shelar", birthday : "1996/03/26" }, 
  { name : "Shital Dabade", birthday : "1995/05/26" },
  { name : "Shraddha Gite", birthday : "1998/06/24" },
  { name : "Chaitanya Koli", birthday : "1997/06/27" },
  { name : "Neha Tamkhane", birthday : "1997/07/03" },
  { name : "Akshata Gaware", birthday : "1996/08/02" },  
  { name : "Priyanka Donde", birthday : "1995/08/15" },
  { name : "Shivani Dabholkar", birthday : "1997/08/23" },  
  { name : "Aniket Shrirao", birthday : "1997/09/03" }, 
  { name : "Reshma Lihe", birthday : "1997/09/06" },
  { name : "Sachin Kanojiya", birthday : "1995/09/16" },
  { name : "Iptisam Chougle", birthday : "1997/09/17" }, 
  { name : "Jagruti Bhoir", birthday : "1997/10/10" },
  { name : "Shivali Vadhavkar", birthday : "1997/10/16" },
  { name : "Aditya Sawant", birthday : "1996/11/10" },  
  { name : "Deepak Randive", birthday : "1997/11/14" },
  { name : "Priyanka Bolke", birthday : "1995/12/15" },
  { name : "Vishwanath Padwal", birthday : "1997/12/26" }  
]; 

window.onload = function() {
  iArray.sort((a, b) => a.name.localeCompare(b.name));
  var ulBox = document.createElement('ul');
  for(let i=0; i< iArray.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = `<span>${ iArray[i]['name'] }</span><span> ${ iArray[i]['birthday'] }</span>`;
    ulBox.appendChild(li);
  }
  user.appendChild(ulBox);
}

class Calendar {
  // Method to clear input box
  static clearInput() {
    yearInput.value = '';
  }

  // Method to get day
  static getWeekDay(date) {    
    var day = date.getDay();
    return weekdays[day];
  }

  // Method to get random color
  static randomColor() {
    var letters = "0123456789ABCDEF";
    var color = '#ff';
    for(let i = 0; i<4; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Method to calculate weekday according to date
  static calculate(data, yearInput) {
    if(yearInput != undefined) {
      for (const [index, obj] of Object.entries(data)) {            
        let name = obj.name;
        let birthDate = obj.birthday;
        let birthYear = birthDate.slice(0,4);
        let age = yearInput -  birthYear; 
        let currentDate = yearInput + birthDate.slice(4);
        let nameArray = name.split(' ');
        let initials = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        let currentDay = new Date(currentDate).getDay();
        
        output.forEach((element) => {
          const liBox = element.parentNode;
          if(liBox.className === weekdays[currentDay]) {
            const ulBox = document.createElement('li');
            ulBox.setAttribute('class', 'person');
            ulBox.setAttribute('age', age);
            if(age >= 0) {
              ulBox.innerHTML = initials;           
              element.appendChild(ulBox); 
            }            
          } 
        });
      }
    }
    
    const outputLi = Array.from(document.querySelectorAll('.output li'));
    outputLi.forEach((element) => {
      element.style.background = Calendar.randomColor();
    });

    // funxtion to fit person in box
    output.forEach((element) => {
      const allLi = Array.from(element.children);
      let no = element.children.length;
      if(no != 0) {
        if(no === 1) {
          element.nextElementSibling.innerHTML = `${no} birthday`;
          allLi.forEach((e) => e.classList.toggle('singleWidth'));
        } else {
          element.nextElementSibling.innerHTML = `${no} birthdays`;
          if(no >=2 && no <= 4) {
            allLi.forEach((e) => e.classList.toggle('halfWidth'));
          } else if(no >= 5 && no <= 9) {
            allLi.forEach((e) => e.classList.toggle('quarterWidth'));
          } else {
            allLi.forEach((e) => e.classList.toggle('normalWidth'));
          }
        }
      }
      else {
        element.nextElementSibling.innerHTML = "no birthdays";
      }
    });

    // sort youngest to oldest
    output.forEach((element) => {
      var newUL = element;
      var lis = [];
      for (var i = element.children.length; i--;) {
        if(element.children[i].nodeName === 'LI')
        lis.push(element.children[i]);
      }
      lis.sort((a,b) => a.getAttribute('age') - b.getAttribute('age'));
      for(var i=0; i<lis.length;i++) {
        newUL.appendChild(lis[i]);
      }
      element.parentNode.replaceChild(newUL, element);
    });
  }  
}

// Function after click on "Update" button
updateButton.addEventListener('click', (e) => {
  e.preventDefault();
  const yearInput = year.value;
  const validYear = /^[0-9]{4}$/;
  
  // Validation of year
  if(!validYear.test(yearInput)) {
    alert('Invalid input');
    Calendar.clearInput();
    output.forEach((element) =>{
      element.innerHTML = "";
      element.nextElementSibling.innerHTML = "";
    });
  } 
  else {
    // Fetching data
    output.forEach((element) => element.innerHTML = "");
    displayYear.innerHTML = `year: ${year.value}`;
    Calendar.calculate(iArray, yearInput);
    Calendar.clearInput();
  }  
});

// Function for scroll to top button
var btn = document.querySelector('footer span');
window.onscroll = function(){
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    btn.classList.add('showBtn');
  } else {
    btn.classList.remove('showBtn');
  }
}

btn.addEventListener('click',scrollTop);
function scrollTop(){
	document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}