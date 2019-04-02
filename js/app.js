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

    //totalExpense method
    totalExpense(){
        let total = 400;
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
    })

    //expense form click listening
    expenseList.addEventListener('click', function(){

    })
}

//waiting for content to load
document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})