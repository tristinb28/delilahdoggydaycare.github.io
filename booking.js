/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?
const costFullDay = 50;
const costHalfDay = 30;
let selectedDays = [];
const monday = document.getElementById('monday');
const tuesday = document.getElementById('tuesday');
const wednesday = document.getElementById('wednesday');
const thursday = document.getElementById('thursday');
const friday = document.getElementById('friday');
const fullDayButton = document.getElementById('full');
const halfDayButton = document.getElementById('half');
const clearButton = document.getElementById('clear-button');
const calculatedCost = document.getElementById('calculated-cost');


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function handleDayClick(dayElement) {
    if (!dayElement.classList.contains('clicked')) {
      dayElement.classList.add('clicked');
      selectedDays.push(dayElement.id);
      calculateTotalCost();
    }
  }
  
  monday.addEventListener('click', function () {
    handleDayClick(monday);
  });
  tuesday.addEventListener('click', function () {
    handleDayClick(tuesday);
  });
  wednesday.addEventListener('click', function () {
    handleDayClick(wednesday);
  });
  thursday.addEventListener('click', function () {
    handleDayClick(thursday);
  });
  friday.addEventListener('click', function () {
    handleDayClick(friday);
  });



/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

function clearSelectedDays() {
    selectedDays = [];
    [monday, tuesday, wednesday, thursday, friday].forEach(function (day) {
      day.classList.remove('clicked');
    });
    calculatedCost.textContent = '0';
  }
  
  clearButton.addEventListener('click', function () {
    clearSelectedDays();
  });




/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

halfDayButton.addEventListener('click', function () {
    costPerFullDay = costHalfDay; 
    halfDayButton.classList.add('clicked'); 
    fullDayButton.classList.remove('clicked'); 
    calculateTotalCost();
  });


// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

fullDayButton.addEventListener('click', function () {
    costPerFullDay = costFullDay; // Set daily rate back to $50
    fullDayButton.classList.add('clicked'); // Add 'clicked' class to 'full' element
    halfDayButton.classList.remove('clicked'); // Remove 'clicked' class from 'half' element
    calculateTotalCost(); // Recalculate total cost
  });



/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateTotalCost() {
    let dayCounter = {};
    let totalCost = 0;
  
    selectedDays.forEach(function (day) {
      dayCounter[day] = (dayCounter[day] || 0) + 1;
    });

    for (const day in dayCounter) {
      const count = dayCounter[day];
      if (count % 2 === 1) {
        totalCost += count * costPerFullDay;
      } else {
        totalCost += count * costPerHalfDay;
      }
    }

    calculatedCost.textContent = totalCost;
  }
