function checkCashRegister(price, cash, cid) {
let values = [['PENNY',0.01], ['NICKEL',0.05], ['DIME',0.1], ['QUARTER',0.25], ['ONE',1], ['FIVE',5], ['TEN',10], ['TWENTY',20], ['ONE HUNDRED',100]];
//we assign the amount of the cange to a variable
let change = (cash-price).toFixed(2);
   console.clear();
//we assign the total amount of cash fro the register to a variable
let registerMoney =cid.map((val,i,a)=>{return val[1];}).reduce((acum,val)=>{return acum+val;});
  console.log(registerMoney,'Change: ',change);
//we create an array of arrays with every type of bill, its value, it's amout in the register and the number of the specific bills/coins
let billsCount = cid.map((v,i,a)=>{return [v[0],values[i][1],v[1],Math.round(v[1]/values[i][1])];});
console.log(billsCount);
//declare a variable which will hold the change (the bill/cash names and their value)
let changeCount=[];
//we assign the change to a new variable from which we will be substracting bill/and coins until it equals 0;
let changeInProgress = change;
//we check if we have enough money in the register
  if (registerMoney<change){
    console.log({status: "INSUFFICIENT_FUNDS", change: []})
    return {status: "INSUFFICIENT_FUNDS", change: []}
//we check if the amount in the register might be equal with the amount we need to return as change,(to "CLOSE" the register);
  }else if(registerMoney-change == 0){
    console.log({status: "CLOSED",change:cid});
    return {status: "CLOSED",change:cid};
  }else{
    //we itterate through each bill and its value, from 100 to 0.01
  for(let i=values.length-1;i>=0;i--){
    //check if the change can be split in the current (value[i]) bill or coin, if its<0 it means we can not substract a whole bill and we move onto the next;
    if(Math.floor(changeInProgress/billsCount[i][1])>=1){
      //if we can substract a whole bill (or coin) we assign the number of whole bills or coins we can substract to a variable(availableBills) 
      let availableBills = Math.floor(changeInProgress/billsCount[i][1]);

//we check if we have the needed bills or coins in the register;
      //if we DO:
      if(availableBills*billsCount[i][1]<=billsCount[i][2]){
        //we save the bill/coin name in a array along with the value they hold;
       changeCount.push([billsCount[i][0],availableBills*billsCount[i][1]]);
       //we substract the value of the cash from the change (which is not resetted after that!!)
       changeInProgress = changeInProgress - availableBills*billsCount[i][1];
       //we keep the value of change in progres in the frame of only 2 decimals
       changeInProgress = changeInProgress.toFixed(2);
       //if we DO NOT (have the bills in the register):
      } else if(Math.floor(changeInProgress/billsCount[i][1])*billsCount[i][1]>billsCount[1][2]){
        //we save all the bills/coins name and value they hold in the same array(changeCount);
      changeCount.push([billsCount[i][0],billsCount[i][2]]);
       //we substract all the available cash we have (we may or may not have enough)
      changeInProgress = changeInProgress - billsCount[i][2];

    } //the above section selects the exact amount of the cash (bills/coins) which is available 
 //   if we cannot substact a whole cash value from the change we move onto the nex cash value
  }else{console.log('Skip Bill');}
  }
 //we check if we have enough bills to give the change, by checking the amount of the change left unsubstracted by the above section 
if(parseFloat(changeInProgress)>0){
  console.log({status: "INSUFFICIENT_FUNDS", change: []});
  return {status: "INSUFFICIENT_FUNDS", change: []};
  // if we have enough cash in the register, the right bills we return the bills/coins and their value
}else{
 console.log(changeCount,changeInProgress);
  return {status:"OPEN", change:changeCount};
}
  }
}

checkCashRegister(3.20, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

//TEST CASES:
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.
// Passed
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
// Passed
// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
// Passed
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
// Passed
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
// Passed
// checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
