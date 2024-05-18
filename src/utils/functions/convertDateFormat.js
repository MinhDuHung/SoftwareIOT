const moment = require('moment-timezone');

function convertToVietnamTime(inputDate) {
    const vietnamTime = moment(inputDate).tz('Asia/Ho_Chi_Minh');
    const formattedTime = vietnamTime.format('DD/MM/YYYY HH:mm:ss');
    return formattedTime;
  }
  
export default convertToVietnamTime
