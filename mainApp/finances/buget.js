document.addEventListener('DOMContentLoaded', () => {
	console.log('dom loaded');

	const getElement = id => document.getElementById(id);
	const addIncomeBtn = getElement('add-income-btn');
	const addExpenseBtn = getElement('add-expenses-btn');
	const combinedTableContainer = getElement('combined-table-container');
	const combinedTableBody = getElement('combined-list');
	const mainDropdown = getElement('main-expenses-dropdown');
	const nestedDropdown = getElement('nested-expenses-dropdown');
	const initialOptions = Array.from(nestedDropdown.options);
	const totalIncomes = getElement('total-incomes');
	const totalExpenses = getElement('total-expenses');
	const balanceResult = getElement('balance');

	const incomesReportBtn = getElement('incomes-report-btn');
	const expensesReportBtn = getElement('expenses-report-btn');
	const budgetReportBtn = getElement('budget-report-btn');
	const reportStartDate = getElement('report-start-date');
	const reportEndDate = getElement('report-end-date');
	const reportOutput = getElement('report-output-container');

	const showReportOutput = () => {
		reportOutput.style.display = 'block';
	}

	const hideReportOutput = () => {
		reportOutput.style.display = 'none';
	}

	const combineHandler = () => {
		nestedDropdown.innerHTML = '';
		const selectedValue = mainDropdown.value;
		console.log(selectedValue);

		initialOptions.forEach(initialOption => {
			if (
				initialOption.value === selectedValue
                || initialOption.value === 'Select category:'
			) {
				const newOption = initialOption.cloneNode(true);
				nestedDropdown.add(newOption);
			}
		});
	};

	const addCombinedRecordHandler = (inputIds, isIncome) => {
		const newRow = combinedTableBody.insertRow();
		const inputElements = inputIds.map(id => getElement(id));

		inputElements.forEach((inputElement, index) => {
			const cell = newRow.insertCell(index);

			if (index === 0) {
				cell.textContent = inputElement.value;
			} else if (index === 1) {
				cell.textContent = isIncome ? '-' : inputElement.value;
			} else if (index === 2) {
				cell.textContent = isIncome ? inputElements[2].value : inputElement.value;
			} else {
				cell.textContent = inputElement.tagName === 'SELECT'
					? inputElement.options[inputElement.selectedIndex].text
					: inputElement.value;
			}

			cell.classList.add(isIncome ? 'income-cell' : 'expense-cell');

			if (index === 3) {
				cell.classList.add(isIncome ? 'income-amount' : 'expense-amount');
			}
		});

		newRow.className = isIncome ? 'income' : 'expense';
		updateMonthlyBudget();

		// Console.log('Table content:', Array.from(combinedTableBody.getElementsByTagName('tr')).map(row => Array.from(row.cells).map(cell => cell.textContent)));
	};

	const addIncomeRecord = () => {
		const inputIds = [
			'income-type',
			'expense-category',
			'income-frequency',
			'income-amount',
			'income-date',
		];

		addCombinedRecordHandler(inputIds, true);
		updateMonthlyBudget();

		combinedTableContainer.style.display = 'block';
	};

	const addExpenseRecord = () => {
		const inputIds = [
			'main-expenses-dropdown',
			'nested-expenses-dropdown',
			'expense-frequency',
			'expense-amount',
			'expenses-date',
		];

		addCombinedRecordHandler(inputIds, false);
		updateMonthlyBudget();

		combinedTableContainer.style.display = 'block';
	};

	const updateMonthlyBudget = () => {
		const totalIncomesValue = globalBudget('income');
		const totalExpensesValue = globalBudget('expense');

		totalIncomes.value = totalIncomesValue;
		totalExpenses.value = totalExpensesValue;

		const balanceValue = totalIncomesValue - totalExpensesValue;
		balanceResult.value = balanceValue;
		console.log(totalExpensesValue, totalIncomesValue);
	};

	const globalBudget = (recordType) => {
        const rows = Array.from(combinedTableBody.getElementsByTagName('tr'));
    
        const total = rows.reduce((sum, row) => {
            const cells = Array.from(row.cells);

            const incomeInput = row.classList.contains('income');
            const expenseInput = row.classList.contains('expense');

            if (incomeInput && recordType === 'income') {
                const amount = parseFloat(cells[3].textContent) || 0;
                return sum + amount;   
            } else if (expenseInput && recordType === 'expense') {
                const amount = parseFloat(cells[3].textContent) || 0;
                return sum + amount;   
            }

            return sum;
        }, 0);
    
        console.log(`Total ${recordType}s:`, total);
        return total;
    };

	const isMatchingDate = (currentDate, startDate, endDate) => {
		return currentDate >= startDate && currentDate <= endDate;
	};


const reportBudget = (startDate, endDate) => {
	const rows = Array.from(combinedTableBody.getElementsByTagName('tr'));

	const incomeTotal = rows
		.filter((row) => row.classList.contains('income'))
		.filter((row) => {
			const cells = Array.from(row.cells);
			const currentDate = new Date(cells[4].textContent);
			return isMatchingDate(currentDate, startDate, endDate);
		})
		.reduce((sum, row) => {
			const cells = Array.from(row.cells);
			const amount = parseFloat(cells[3].textContent) || 0;
			return sum + amount;
		}, 0);
		
		const expenseTotal = rows
		.filter((row) => row.classList.contains('expense'))
		.filter((row) => {
			const cells = Array.from(row.cells);
			const currentDate = new Date(cells[4].textContent);
			return isMatchingDate(currentDate, startDate, endDate);
		})
		.reduce((sum, row) => {
			const cells = Array.from(row.cells);
			const amount = parseFloat(cells[3].textContent) || 0;
			return sum + amount;
		}, 0);

		const budget = incomeTotal - expenseTotal;

		console.log(`Total Income for the selected dates is:`, incomeTotal);
		console.log(`Total Expense for the selected dates is:`, expenseTotal);
		console.log(`Budget (Income - Expense) for the selected dates is:`, budget);
	
		return budget;
	};

	
	budgetReportBtn.addEventListener('click', () => {
		const startDateValue = reportStartDate.value;
		const endDateValue = reportEndDate.value;
	
		const startDate = new Date(startDateValue);
		const endDate = new Date(endDateValue);
	
		const totalBudget = reportBudget(startDate, endDate);
		reportOutput.innerHTML = `<p>Budget for the selected dates is: ${totalBudget}</p>`;
	});

	mainDropdown.addEventListener('change', combineHandler);
	addIncomeBtn.addEventListener('click', addIncomeRecord);
	addExpenseBtn.addEventListener('click', addExpenseRecord);
	incomesReportBtn.addEventListener('click', () => generateReport('income'));
	expensesReportBtn.addEventListener('click', () => generateReport('expense'));
	
});
