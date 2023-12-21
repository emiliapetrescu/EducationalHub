document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded');

    const mainDropdown = document.getElementById('main-expenses-dropdown');
    const nestedDropdown = document.getElementById('nested-expenses-dropdown');
    const originalOptions = Array.from(nestedDropdown.options);

    const combineHandler = () => {
        nestedDropdown.innerHTML = '';
        const selectedValue = mainDropdown.value;
        console.log(selectedValue);

        originalOptions.forEach(originalOption => {
            if(
                originalOption.value.startsWith(selectedValue) ||
                originalOption.value === 'Select category:') {
                    const newOption = originalOption.cloneNode(true);
                    nestedDropdown.add(newOption);  
                }
        });
    };

    mainDropdown.addEventListener('change', combineHandler);

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

