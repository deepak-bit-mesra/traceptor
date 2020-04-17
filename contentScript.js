console.log("Running............ Content Script");
window.alert("See  console of this page");
debugger;
var txt = document.getElementsByTagName("div")[0].innerText;
console.log("txt = =", txt);