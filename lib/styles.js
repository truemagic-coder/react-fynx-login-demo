'use strict';

exports.errorMessageStyle = errorMessageStyle;
function errorMessageStyle() {
  return {
    color: 'red',
    fontSize: '-4',
    fontStyle: 'italic',
    marginLeft: '15px'
  };
}

exports.infoMessage = infoMessage;
function infoMessage() {
  return {
    marginLeft: '30px'
  };
}

exports.paddingBelow = paddingBelow;
function paddingBelow() {
  return {
    marginBottom: '10px'
  };
}

exports.pageSize = pageSize;
function pageSize() {
  return {
    marginTop: '40px',
    width: '500px'
  };
}

exports.inputWidth = inputWidth;
function inputWidth() {
  return { 
    width: '350px'
  };
}

exports.paddingTop = paddingTop;
function paddingTop() {
  return {
    marginTop: '15px'
  };
}
