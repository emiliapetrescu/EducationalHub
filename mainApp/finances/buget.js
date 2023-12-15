document.addEventListener('DOMContentLoaded', () =>{
    const TOTAL_INCOMES_BTN = document.getElementById('totalIncomeBtn');
    const RESULT_DISPLAY = document.getElementById('resultDisplay');
   
    let totalIncomes = () => {
        let SALARY1 = parseInt(document.getElementById('salary_1').value);
        let SALARY2 = parseInt(document.getElementById('salary_2').value);
        let OTHER_INCOMES = parseInt(document.getElementById('otherIncomes').value);

        if (isNaN(SALARY1) && 
            isNaN(SALARY2) && 
            isNaN(OTHER_INCOMES)) {
            alert ('We need at least one value to be a number.');
        } else {
            return  (isNaN(SALARY1) ? 0 : SALARY1) +
                    (isNaN(SALARY2) ? 0 : SALARY2) +
                    (isNaN(OTHER_INCOMES) ? 0 : OTHER_INCOMES);
        }
    }
    
    TOTAL_INCOMES_BTN.addEventListener('click', (event) => {
        event.preventDefault();
        console.log ('button clicked');
        let result = totalIncomes();
        if (result !== undefined) {
            RESULT_DISPLAY.value = result;
        }
    });
});
