

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
export function formatDate(date: Date) {
  var year = '' + date.getFullYear();
  var month = '' + (date.getMonth() + 1);
  var day = '' + date.getDate();
  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  return [year, month, day].join('/')
}