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


isValidRoomRequest(roomRequest) {
  return new Promise((resolve, reject) => {
    let result = {
      msg: '',
      status: 1
    };

    if (roomRequest.rooms.room_type == 'undefined' || roomRequest.rooms.room_type == '') {
      result.msg = 'Key value of Room Type can not be empty.';
      reject(result);
    }
    else if (roomRequest.rooms.entry_token == 'undefined' || roomRequest.rooms.entry_token == '') {
      result.msg = 'Key value of Entry Token can not be empty.';
      reject(result);
    }
    else if (roomRequest.rooms.player_limit == 'undefined' || roomRequest.rooms.player_limit == '') {
      result.msg = 'Key value of Player Limit can not be empty.';
      reject(result);
    }
    else if (roomRequest.rooms.time_limit == 'undefined') {
      result.msg = 'Key value of Time Limit can not be empty.';
      reject(result);
    }
    else if (roomRequest.rooms.prize_token == 'undefined' || roomRequest.rooms.prize_token == '') {
      result.msg = 'Key value of Prize Token can not be empty.';
      reject(result);
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


