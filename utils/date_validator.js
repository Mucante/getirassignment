// check first if the dateString is {4 digit}-{2 digit}-{2 digit}
// check if js can parse this string as an actual date and getTime() out of it.
function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
  }

  exports.isValidDate = isValidDate;