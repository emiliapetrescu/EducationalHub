document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded');

    const incomeTableBody = document.getElementById('income-table-body');
    const expenseTableBody = document.getElementById('expense-table-body');
    const mainDropdown = document.getElementById('main-expenses-dropdown');
    const nestedDropdown = document.getElementById('nested-expenses-dropdown');
    const initialOptions = Array.from(nestedDropdown.options);
    const TOTAL_INCOMES_BTN = document.getElementById('total-income-btn');
    const RESULT_DISPLAY = document.getElementById('resultDisplay');

    const inputLabels = {
        'income-type': 'Income Type',
        'income-frequency': 'Income Frequency',
        'income-amount': 'Income Amount',
        'income-date': 'Income Date',
        'expense-type': 'Expense Type',
        'expense-category': 'Select category',
        'expense-frequency': 'Expense Frequency',
        'expense-amount': 'Expense Amount',
        'expense-date': 'Expense Date',
    };

    const combineHandler = () => {
        nestedDropdown.innerHTML = '';
        const selectedValue = mainDropdown.value;
        console.log(selectedValue);

        initialOptions.forEach(initialOption => {
            if (
                initialOption.value.startsWith(selectedValue) ||
                initialOption.value === 'Select category:'
            ) {
                const newOption = initialOption.cloneNode(true);
                nestedDropdown.add(newOption);
            }
        });
    };

    const addRecordHandler = (inputIds, tableBody, containerId) => {
        let userInput = true;
        const newRow = tableBody.insertRow();
    
        inputIds.forEach((inputId, index) => {
            const inputElement = document.getElementById(inputId);
    
            if (!inputElement) {
                console.error(`Element with ID ${inputId} not found.`);
                userInput = false;
                return;
            }
    
            if (inputId !== 'expense-amount' && inputId !== 'expenses-date') {
                const cell = newRow.insertCell(index);
                cell.textContent = inputElement.value;
            }
        });
    
        // Handle 'expense-amount' separately
        const expenseAmount = document.getElementById('expense-amount').value;
        const amountCell = newRow.insertCell(-1);
        amountCell.textContent = expenseAmount;
    
        // Handle 'expenses-date' separately
        const expensesDate = document.getElementById('expenses-date').value;
        const dateCell = newRow.insertCell(-1);
        dateCell.textContent = expensesDate;
    
        if (userInput) {
            document.getElementById(containerId).style.display = 'block';
        }
        console.log(document.documentElement.outerHTML);
    };
    
    
    const addIncomeRecord = () => {
        const inputIds = ['income-type', 'income-frequency', 'income-amount', 'income-date'];
        addRecordHandler(inputIds, incomeTableBody, 'income-table-container');
    };

   

    const addExpenseRecord = () => {
        const inputIds = ['main-expenses-dropdown', 'nested-expenses-dropdown', 'expense-frequency', 'expense-amount', 'expenses-date'];//aici trebuie schimbat
        
        const isElementsPresent = inputIds.every(inputId => {
            const inputElement = document.getElementById(inputId);
            if (!inputElement) {
                console.error(`Element with ID ${inputId} not found.`);
                return false;
            }
            return true;
        });
    
        if (!isElementsPresent) {
            console.error('Some required elements are missing.');
            return;
        }
        
        addRecordHandler(inputIds, expenseTableBody, 'expense-table-container');
    }

    combineHandler();

    

    mainDropdown.addEventListener('change', combineHandler);
    document.getElementById('add-income-btn').addEventListener('click', addIncomeRecord);
    document.getElementById('add-expenses-btn').addEventListener('click', addExpenseRecord);

    
   
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