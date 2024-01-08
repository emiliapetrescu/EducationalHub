document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded');

    document.getElementById('add-income-btn').addEventListener('click', ()=>{
        const incomeType = document.getElementById('income-type').value;
        const incomeFrequency = document.getElementById('income-frequency').value;
        const incomeAmount = document.getElementById('income-amount').value;
        const incomeDate = document.getElementById('income-date').value;

        if(incomeAmount === '' ||
            incomeType === 'Income Type' ||
            incomeFrequency === '' ||
            incomeDate === 'mm/dd/yyyy') {
                alert('Please insert values in all fields');
                return;
            };

        const tableBody = document.getElementById('income-table-body');
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        
        cell1.textContent = incomeType;
        cell2.textContent = incomeFrequency;
        cell3.textContent = incomeAmount;
        cell4.textContent = incomeDate;

        document.getElementById('income-table-container').style.display = 'block';
    });

    const mainDropdown = document.getElementById('main-expenses-dropdown');
    const nestedDropdown = document.getElementById('nested-expenses-dropdown');
    const initialOptions = Array.from(nestedDropdown.options);

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

    mainDropdown.addEventListener('change', combineHandler);

});   

document.addEventListener('DOMContentLoaded', () =>{
    const TOTAL_INCOMES_BTN = document.getElementById('total-income-btn');
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

