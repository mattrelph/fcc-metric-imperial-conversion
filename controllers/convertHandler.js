/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    //console.log("getNum: " + input);
    var nonNumRegex = /[^0-9|\.|\/]/g; //Looking for the first character that isn't a number, decimal point, or forward slash
    var foundNonNum = input.match(nonNumRegex);
    
    var processed ='';
    if (foundNonNum != null)
    {
      processed = input.slice(0, input.indexOf(foundNonNum[0]));
    }
    
   
    if (processed.length ==0)
    {
      return 1; //No valid number submitted
    }
    
    var numRegex = /^\d*\.?\d*\/?\d*\.?\d*$/g;  //Regular expression finds numbers of forms 12, 12.2, 12.2/3, 12.3/3.4 at the beginning of the input
    var numFound = processed.match(numRegex);  //Look for a number of the sort we want
    if (numFound != null)
    {
      //Check for divide by zero fractions
      var processed = numFound[0].split('/');
      if (processed.length == 2)    //Check if we have a fraction 
      {
          //If the denominator equals zero, we have an invalid number
        if (processed[1]==0)
        {
          return 'invalid number';
        }
        else
        {
          return (Number(processed[0]/processed[1]));    //We shall return it in decimal format for easier processing
        }
      }
      else if (processed.length ==1)
      {
        return Number(processed[0]);
      }
      
    }
    else
    {
      return 'invalid number';
    }
    

 
  };
  
  this.getUnit = function(input) {
    //console.log("getUnit: " + input);
    var nonNumRegex = /[^0-9|\.|\/]/g; //Looking for the first character that isn't a number, decimal point, or forward slash
    var foundNonNum = input.match(nonNumRegex);
    //console.log("foundNonNum: " + foundNonNum);
    var processed ='';
    if (foundNonNum != null)
    {
      processed = input.slice(input.indexOf(foundNonNum[0]));
    }
    else
    {
      processed = input.slice();
    }
    processed = processed.toLowerCase();
    //console.log("processed: " + processed);
    var unitRegex = /^gal$|^l$|^lbs$|^kg$|^mi$|^km$/g;    //Look for units of measurement at the end of the input string. The rest should be the number
    var unitFound = processed.match(unitRegex);
    //console.log("unitFound: " + unitFound);
    if (unitFound == null)
    {
      return "invalid unit"; //Got this far and still had nothing
    }
    if (unitFound.length == 1 )    //Should have found at least one unit of measurement at the end of the input string
    {
      if (unitFound[0] == 'l')    //Liters are a special case, where the abbreviation is capitalized
      {
        return 'L';
      }
      else
      {
         return unitFound[0];
      }
    }    
    else
    {
      return "invalid unit";  //Error - we either did not find any of the desired units at the end of the input or there was some extra characters at the beginning
    }
    
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit)
    {
        case'kg':
        {
          return 'lbs';
          break;
        }
        case'lbs':
        {
          return 'kg';
          break;
        }
        case'L':
        {
          return 'gal';
          break;
        }
        case'gal':
        {
          return 'L';
          break;
        }
        case'mi':
        {
          return 'km';
          break;
        }
        case'km':
        {
          return 'mi';
          break;
        }    
        default:
        {
          return 'invalid unit';          
        }
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit)
    {        
      case'kg':
        {
          return 'kilograms';
          break;
        }
        case'lbs':
        {
          return 'pounds';
          break;
        }
        case'L':
        {          
          return 'liters';          
          break;
        }
        case'gal':
        {
          return 'gallons';
          break;
        }
        case'mi':
        {
          return 'miles';
          break;
        }
        case'km':
        {
          return 'kilometers';
          break;
        }    
        default:
        {
          return 'invalid unit';          
        }
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result = 0;

    switch (initUnit)
    {
        case'kg':
        {
          result = parseFloat(initNum / lbsToKg).toFixed(5);
          break;
        }
        case'lbs':
        {
          result = parseFloat(initNum * lbsToKg).toFixed(5);
          break;
        }
        case'L':
        {
          result = parseFloat(initNum / galToL).toFixed(5);
          break;
        }
        case'gal':
        {
          result = parseFloat(initNum * galToL).toFixed(5);
          break;
        }
        case'mi':
        {
          result = parseFloat(initNum * miToKm).toFixed(5);
          break;
        }
        case'km':
        {
          result = parseFloat(initNum / miToKm).toFixed(5);
          break;
        }    
    }
    return Number(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = initNum + " ";
    result = result + this.spellOutUnit(initUnit) + " converts to " + returnNum + " ";
    result = result + this.spellOutUnit(returnUnit);
    return result;
  };
  
}


module.exports = ConvertHandler;
