export class Utils {




isValidRegRequest(regRequest) {
    return new Promise((resolve, reject) => {
      let result = {
        msg: '',
        status: 1
      };

      if (regRequest.user.mobile == 'undefined' || regRequest.user.mobile == '') {
        result.msg = 'Key value of Mobile Number can not be empty.';
        resolve(result);
      }
      else {
        result.msg = 'Valid request object',
        result.status = 0
        resolve(result);
      }

  })
}







  
getCurrentTimeStamp() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let timeStamp = date + ' ' + time;
    //let GMTimeStamp = dateFormat(timeStamp,' : yyyy:mm:dd hh:MM:ss');
    return timeStamp;
  }

}


