document.addEventListener('DOMContentLoaded',()=>{
    const mainDropdown = document.getElementById('main-expenses-dropdown');
    const nestedDropdowns = {};

    mainDropdown.addEventListener('change', (event)=>{
        const selectedValue = event.target.value;
        console.log(selectedValue);
        hideNestedDropdowns();
        showNestedDropdowns(selectedValue);
    });

    document.querySelectorAll('.nested-dropdown--options')
        .forEach((nestedDropdown)=>{
        nestedDropdowns[nestedDropdown.value] = nestedDropdown;
    });

    const hideNestedDropdowns = () => {
        for(const key in nestedDropdowns) {
            nestedDropdowns[key].style.display = 'none';
        }
    }
    
    const showNestedDropdowns = (selectedOption) => {
        const nestedDropdown = nestedDropdowns[selectedOption];
        console.log(nestedDropdown);
        if (nestedDropdown) {
            nestedDropdown.style.display = 'block';
        }
    }   

   
    console.log(nestedDropdowns);
    console.log(mainDropdown.options);
    
    
});






// document.addEventListener('DOMContentLoaded', () =>{
//     const TOTAL_INCOMES_BTN = document.getElementById('total-income-btn');
//     const RESULT_DISPLAY = document.getElementById('resultDisplay');
   
//     let totalIncomes = () => {
//         let SALARY1 = parseInt(document.getElementById('salary_1').value);
//         let SALARY2 = parseInt(document.getElementById('salary_2').value);
//         let OTHER_INCOMES = parseInt(document.getElementById('otherIncomes').value);

//         if (isNaN(SALARY1) && 
//             isNaN(SALARY2) && 
//             isNaN(OTHER_INCOMES)) {
//             alert ('We need at least one value to be a number.');
//         } else {
//             return  (isNaN(SALARY1) ? 0 : SALARY1) +
//                     (isNaN(SALARY2) ? 0 : SALARY2) +
//                     (isNaN(OTHER_INCOMES) ? 0 : OTHER_INCOMES);
//         }
//     }
    
    
//     TOTAL_INCOMES_BTN.addEventListener('click', (event) => {
//         event.preventDefault();
//         console.log ('button clicked');
//         let result = totalIncomes();
//         if (result !== undefined) {
//             RESULT_DISPLAY.value = result;
//         }
//     });
// });

