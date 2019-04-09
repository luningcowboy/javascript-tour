let DateUtils = require('./date_utils.js');

for(let key in DateUtils) console.log(key)

console.log(DateUtils.formatTime(new Date().getTime()));

console.log(DateUtils.getSundayByTime(0, true));

console.log(DateUtils.getMondayByTime(0, true));

console.log(DateUtils.getTuesdayByTime(0, true));

console.log(DateUtils.getWednesdayByTime(0, true));

console.log(DateUtils.getThursdayByTime(0, true));

console.log(DateUtils.getFridayByTime(0, true));

console.log(DateUtils.getSaturdayByTime(0, true));

console.log(DateUtils.getWeekTagByTime(0));
console.log(DateUtils.getWeekTagsBySundayTag('2018-1-30'));
