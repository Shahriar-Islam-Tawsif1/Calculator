class Calculator{
    constructor(p,c){
        this.prevOpE=p;
        this.currentOpE=c;
        this.clear();
    }

clear(){
    this.currentOperand='';
    this.prevOperand='';
    this.operation=undefined;
}

delete(){
    this.currentOperand=this.currentOperand.toString().slice(0,-1);

}
appendNumber(number){
    if(number==='.' && this.currentOperand.includes('.')) return;
    this.currentOperand=this.currentOperand.toString() + number.toString();
}
chooseOperation(operation){
    if(this.currentOperand==='') return;
    if(this.currentOperand!==''){
        this.compute();
    }
    this.operation=operation;
    this.prevOperand=this.currentOperand;
    this.currentOperand=''
}
compute(){
    let computation;
    const prev = parseFloat(this.prevOperand)
    const current =parseFloat(this.currentOperand)
    if(isNaN(prev ) || isNaN(current)) return;
    switch(this.operation){
        case '+' : 
        computation=prev + current;
        break;
        case '-':
        computation=prev - current;
        break;
        case '×':
        computation=prev * current;
        break;
        case '÷':
        computation=prev / current;
        break;
        default:
            return;
    }
    this.currentOperand=computation;
    this.operation=undefined;
    this.prevOperand='';

}
getDisplayNumber(number){
    const stringNumber=number.toString();
    const[integerDigits,decimalDigits]=stringNumber.split('.');
    let integerDisplay;
    const integerDigitsNum=parseFloat(integerDigits);
    if(isNaN(integerDigitsNum)){
        integerDisplay='';
    }
    else{
        integerDisplay =integerDigitsNum.toLocaleString('en',{
            maximumFractionDigits:2,
        });
    }
    if(decimalDigits !=null){
        return `${integerDisplay}.${decimalDigits}`;
    }
    else{
        return integerDisplay;
    }

}




updateDisplay(){
    this.currentOpE.innerText=this.getDisplayNumber(this.currentOperand);
    if(this.operation != null){
        this.prevOpE.innerText=`${this.prevOperand} ${this.operation} `;

    }
    else{
        this.prevOpE.innerText='';
    }
}

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-all-clear]')
const prevOperand=document.querySelector('[data-previous-operand]')
const currentOperand=document.querySelector('[data-current-operand]')
const calculator=new Calculator(prevOperand,currentOperand);
numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
       calculator.appendNumber(button.innerText); 
       calculator.updateDisplay();
    })
})
operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
}) 
allClearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
}) 
deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
}) 