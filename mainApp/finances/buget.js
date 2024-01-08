document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded');
//monthly budget vreau sa preia income types si sa faca totalul veniturilor dintr o luna
// cumva trebuie preluate si cheltuielile tot in monthly

const tableBody = document.getElementById('income-table-body');
const mainDropdown = document.getElementById('main-expenses-dropdown');
const nestedDropdown = document.getElementById('nested-expenses-dropdown');
const initialOptions = Array.from(nestedDropdown.options);
const TOTAL_INCOMES_BTN = document.getElementById('total-income-btn');
const RESULT_DISPLAY = document.getElementById('resultDisplay');

const incomeInputLabels = {
    'income-type': 'Income Type',
    'income-frequency': 'Income Frequency',
    'income-amount': 'Income Amount',
    'income-date': 'Income Date',
};

const addIncomeHandler = ()=> {
    const inputIds = ['income-type', 'income-frequency', 'income-amount', 'income-date' ];
        
    const newRow = tableBody.insertRow();
    let userInput = true;

    inputIds.forEach((inputId, index) => {
        const inputValue = document.getElementById(inputId).value;

        if (
            inputValue === '' ||
            (index < 2 && inputValue === incomeInputLabels[inputId])) {
            alert (`Please provide a valid value for ${incomeInputLabels[inputId]}`);
            userInput = false;
            return;
            }
        });

        if(userInput) {
            const newRow = tableBody.insertRow();

            inputIds.forEach((inputId, index) => {
                const inputValue = document.getElementById(inputId).value;
                const cell = newRow.insertCell(index);
                cell.textContent = inputValue;
            });

        document.getElementById('income-table-container').style.display = 'block';
        
        } 
    };
    
    const combineHandler = () => {
        nestedDropdown.innerHTML = '';
        const selectedValue = mainDropdown.value;
        console.log(selectedValue);

        initialOptions.forEach(initialOption => {
            if(
                initialOption.value.startsWith(selectedValue) ||
                initialOption.value === 'Select category:') {
                    const newOption = initialOption.cloneNode(true);
                    nestedDropdown.add(newOption);  
                }
        });
    };


    document.getElementById('add-income-btn').addEventListener('click', addIncomeHandler);
    mainDropdown.addEventListener('change', combineHandler);
   
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