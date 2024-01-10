document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded');

    const getElement = (id) => document.getElementById(id);

    const incomeTableBody = getElement('income-table-body');
    const expenseTableBody = getElement('expense-table-body');
    const mainDropdown = getElement('main-expenses-dropdown');
    const nestedDropdown = getElement('nested-expenses-dropdown');
    const initialOptions = Array.from(nestedDropdown.options);
    const totalIncomes = getElement('total-incomes');
    const totalExpenses = getElement('total-expenses');
    const balanceResult = getElement('balance');

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
        updateMonthlyBudget();
    };

    const addExpenseRecord = () => {
        const inputIds = ['main-expenses-dropdown', 'nested-expenses-dropdown', 'expense-frequency', 'expense-amount', 'expenses-date'];

        addRecordHandler(inputIds, expenseTableBody, 'expense-table-container');
        updateMonthlyBudget();
    };

    const updateMonthlyBudget = () => {
        const totalIncomesValue = calculateTotalIncomes();
        const totalExpensesValue = calculateTotalExpenses();

        totalIncomes.value = totalIncomesValue;
        totalExpenses.value = totalExpensesValue;

        const balanceValue = totalIncomesValue - totalExpensesValue;
        balanceResult.value = balanceValue;
    };

    const calculateTotalIncomes = () => {
        const incomeRows = Array.from(incomeTableBody.getElementsByTagName('tr'));

        const totalIncomes = incomeRows.reduce((sum, row) => {
            const incomeAmountCell = row.cells[2]; //modify for dynamic values
            const incomeAmount = parseFloat(incomeAmountCell.textContent) || 0;
            return sum + incomeAmount;
        }, 0);

        return totalIncomes;
    };

    const calculateTotalExpenses = () => {
        const expenseRows = Array.from(expenseTableBody.getElementsByTagName('tr'));

        const totalExpenses = expenseRows.reduce((sum, row) => {
            const expenseAmountCell = row.cells[3]; //modify for dynamic values
            const expenseAmount = parseFloat(expenseAmountCell.textContent) || 0;
            return sum + expenseAmount;
        }, 0);

        return totalExpenses;
    };

    mainDropdown.addEventListener('change', combineHandler);
    getElement('add-income-btn').addEventListener('click', addIncomeRecord);
    getElement('add-expenses-btn').addEventListener('click', addExpenseRecord);
    updateMonthlyBudget();
});
