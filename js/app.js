//decalring class
class UI{
    constructor(){
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balace = document.getElementById("balance");
        this.balaceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;
    }
    //submitBudget method
    submitBudgetForm(){
        //getting the value of the entered amount
        const value = this.budgetInput.value;

        //check if value is empty or zero
        if(value === "" || value < 0){
            //add notification about the error
            this.budgetFeedback.classList.add('showItem');
            this.budgetFeedback.innerHTML = `<p>Budget value entered needs to be a positive number </p>`;

            //changin global to local window targeting
            const self = this;
            //hiding notification after 4000ms
            setTimeout(function(){
                self.budgetFeedback.classList.remove('showItem');
            }, 4000);
        }
        //if not zero or emplty do this
        else{
            //getting the value from the form input
            this.budgetAmount.textContent = value;

            //removing the number from the form input
            this.budgetInput.value = "";
            
            //calling showBalance fn
            this.showBalance();
        }
    }

    //showBalance method
    showBalance(){
        //running the method in this variable
        const expense = this.totalExpense();
        
        //getting the int value of the txt and doing subtraction on it
        const total = parseInt(this.budgetAmount.textContent) - expense;
        
        //getting the text content and feeding it to total variable
        this.balaceAmount.textContent = total;

        if(total < 0){
            this.balace.classList.remove('text-success', 'text-muted');
            this.balace.classList.add('text-danger');
        }
        else if(total > 0){
            this.balace.classList.remove('text-danger', 'text-muted');
            this.balace.classList.add('text-success');
        }
        else if(total === 0){
            this.balace.classList.remove('text-success', 'text-danger');
            this.balace.classList.add('text-muted');
        }
    }

    //submitBudget method for the entire form
    submitExpenseForm(){
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;

        if(expenseValue === "" || amountValue === "" || amountValue < 0){
            this.expenseFeedback.classList.add("showItem");
            this.expenseFeedback.innerHTML = `<p>Expense value entered needs to be a positive number </p>`;

            //reassigning 'this' to fit scope
            const self = this;
            setTimeout(function(){
                //self.expenseFeedback.classList.remove('showItem');
            }, 4000);
        }
        else{
            let amount = parseInt(amountValue);
            this.expenseInput.value = '';
            this.amountInput.value = '';

            //creating object expense
            let expense = {
                //adding array itemID from UI constructor
                id:this.itemID,
                title:expenseValue,
                amount:amount,
            }
            this.itemID++;
            //putting data into the list
            this.itemList.push(expense);
            this.addExpense(expense);

            //show balance mothod being called to add expense subtraction
            this.showBalance();
        }
    }

    //addExpense method
    addExpense(expense){
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
            <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
            <h5 class="expense-amount mb-0 list-item">$ ${expense.amount}</h5>
        <div class="expense-icons list-item">
            <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                <i data-feather="edit-3" class="expense-icon far fa-edit"></i>
            </a>
            <a href="#" class="delete-icon" data-id="${expense.id}">
                <i data-feather="trash-2" class="expense-icon far fa-trash-alt text-danger"></i>
            </a>
        </div> 
        </div>
        `;
        this.expenseList.appendChild(div);
    }

    //totalExpense method
    totalExpense() {
        let total = 0;
        if (this.itemList.length > 0) {
        //adding logic to add together expenses
        //reduce fn taking two parameters => accumulated value and current value
          total = this.itemList.reduce(function(acc, curr) {
            acc += curr.amount;
            return acc;
          }, 0);
        }
        this.expenseAmount.textContent = total;
        return total;
      }
}

//creating event listener 
function eventListeners(){
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    //new instance of class UI
    const ui = new UI()

    //budget form submition
    budgetForm.addEventListener('submit', function(event){
        //allows to block form submission
        event.preventDefault();
        ui.submitBudgetForm();
    })

    //expense form submition
    expenseForm.addEventListener('submit', function(event){
        //allows to block form submission
        event.preventDefault();
        ui.submitExpenseForm();
    })

    //expense form click listening
    expenseList.addEventListener('click', function(){

    })
}

//waiting for content to load
document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})