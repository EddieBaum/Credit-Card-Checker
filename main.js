// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8,];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:




//This function uses the Luhn Algorithm to check if a credit card number is valid or not 
const validateCred = (ccNum) => {
  let toBeSummed = 0;
  
  if (ccNum.length === 16 && ccNum.every(element => {return typeof element === 'number'; })) { // If entered number is 16 digits long AND only numbers the number enters the code block
    for (let i = ccNum.length - 1; i >= 0; i--) {
      let currVal = ccNum[i]; 
      if (i === ccNum.length - 1) { //this represents the check digit
        currVal = ccNum[i];
      } else {
        if (i % 2 === 0 && ccNum[i] * 2 < 10) { // this represents even index positions with numbers less than 5
          currVal = ccNum[i] * 2;
        } else {
          if (i % 2 === 0 && ccNum[i] * 2 >= 10) { // this represents even index positions with numbers equal to or greater than 5 
            currVal = ccNum[i] * 2 - 9;
          } else {
            if (i % 2 === 1) { // this represents odd numbered index positions 
              currVal = ccNum[i];
            }
          }
        }
      } toBeSummed += currVal; 
    }
  } return toBeSummed % 10 === 0;
};
//TEST Validate Credit Card Luhn Algorithm
//console.log(validateCred(valid1));




//This fuction iterates through a batch to of credit card numbers and returns an array of not valid credit card numbers
const findInvalidCards = (cardBatch) => {
  let invalidCardNumbers = [];
  for (let i = 0; i <= cardBatch.length - 1; i++) {
    if(!validateCred(cardBatch[i])) {
      invalidCardNumbers.push(cardBatch[i]); 
    } 
  } return invalidCardNumbers;
}; 
//Test to find invalid cards in a batch
//console.log(findInvalidCards(batch));
//console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5]));




//This function identifies credit card companies associated with invalid card numbers by identifying via first digit 
const idInvalidCardCompanies = (badBatch) => {
  let ccCompanyList = [];

  for (let i = 0; i < badBatch.length; i++) {
      switch (badBatch[i][0]) {
        case 3: 
          if (ccCompanyList.indexOf('AMEX') === -1) {
            ccCompanyList.push('AMEX'); 
          }
          break 
        case 4: 
          if (ccCompanyList.indexOf('VISA') === -1) {
            ccCompanyList.push('VISA');
          }
          break
        case 5: 
          if (ccCompanyList.indexOf('MASTERCARD') === -1) {
            ccCompanyList.push('MASTERCARD'); 
          }
          break
        case 6: 
          if(ccCompanyList.indexOf('DISCOVER') === -1) {
            ccCompanyList.push('DISCOVER');
          }
          break
        default: 
          console.log('No credit card company found.'); 
      }
    } return ccCompanyList; 
  };
// Test to find companies associated with invalid cards
//console.log(idInvalidCardCompanies([invalid1, invalid2, invalid3, invalid4, invalid5]));
