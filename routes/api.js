/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){

      var convertString = {};
      var input = req.query.input;
      convertString.initNum = convertHandler.getNum(input);
      convertString.initUnit = convertHandler.getUnit(input);
      if ((convertString.initNum == 'invalid number')&&(convertString.initUnit == 'invalid unit'))
      {
        convertString.string = 'invalid number and unit'; 
        res.send('invalid number and unit');
        //console.log('input: ' + input + ' initNum: ' + convertString.initNum + ' initUnit: ' + convertString.initUnit);
      }
      else if (convertString.initNum == 'invalid number')
      {
        res.send('invalid number');
        //console.log('input: ' + input + ' initNum: ' + convertString.initNum + ' initUnit: ' + convertString.initUnit);
      }
      else if (convertString.initUnit == 'invalid unit')
      {
        res.send('invalid unit');
        //console.log('input: ' + input + ' initNum: ' + convertString.initNum + ' initUnit: ' + convertString.initUnit);
      }
      else
      {      
        convertString.returnNum = convertHandler.convert(convertString.initNum, convertString.initUnit);
        convertString.returnUnit = convertHandler.getReturnUnit(convertString.initUnit);
        convertString.string = convertHandler.getString(convertString.initNum, convertString.initUnit, convertString.returnNum, convertString.returnUnit); 
        //console.log('input: ' + input + ' initNum: ' + convertString.initNum + ' initUnit: ' + convertString.initUnit);
        res.json(convertString);
      }
      res.json(convertString);
//      console.log(convertString);

    });
    
};
