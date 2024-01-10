document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded');

    const getElement = (id) => document.getElementById(id);

    const incomeTableBody = getElement('income-table-body');
    const expenseTableBody = getElement('expense-table-body');
    const mainDropdown = getElement('main-expenses-dropdown');
    const nestedDropdown = getElement('nested-expenses-dropdown');
    const initialOptions = Array.from(nestedDropdown.options);
    const TOTAL_INCOMES_BTN = getElement('total-income-btn');
    const RESULT_DISPLAY = getElement('resultDisplay');

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
            const inputElement = getElement(inputId);
    
            const cell = newRow.insertCell(index);
    
            if (inputElement.tagName === 'SELECT') {
                cell.textContent = inputElement.options[inputElement.selectedIndex].text;
                } else {
                    cell.textContent = inputElement.value;
                }
        });
    
            if (userInput) {
                getElement(containerId).style.display = 'block';
            }
    };
    
    const addIncomeRecord = () => {
        const inputIds = ['income-type', 'income-frequency', 'income-amount', 'income-date'];
        addRecordHandler(inputIds, incomeTableBody, 'income-table-container');
    };

    const addExpenseRecord = () => {
        const inputIds = ['main-expenses-dropdown', 'nested-expenses-dropdown', 'expense-frequency', 'expense-amount', 'expenses-date'];
    
        addRecordHandler(inputIds, expenseTableBody, 'expense-table-container');
    };
    
    mainDropdown.addEventListener('change', combineHandler);
    getElement('add-income-btn').addEventListener('click', addIncomeRecord);
    getElement('add-expenses-btn').addEventListener('click', addExpenseRecord);

    const totalIncomes = () => {
        const getValue = (id) => {
            const value = parseInt(getElement(id).value);
            return isNaN(value) ? 0 : value;
        };

        const SALARY1 = getValue('salary_1');
        const SALARY2 = getValue('salary_2');
        const OTHER_INCOMES = getValue('otherIncomes');

        if (SALARY1 === 0 && SALARY2 === 0 && OTHER_INCOMES === 0) {
            alert('We need at least one value to be a number.');
        } else {
            return SALARY1 + SALARY2 + OTHER_INCOMES;
        }
    };

    TOTAL_INCOMES_BTN.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('button clicked');
        const result = totalIncomes();
        if (result !== undefined) {
            RESULT_DISPLAY.value = result;
        }
    });
});