"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
import { Utils } from '../utility/utils';
import {Messages} from '../utility/message'
import { ROOMSMODEL} from '../model/rooms'
import { QUESTIONSMODEL} from '../model/questions'

let db = DbConnMgr.getInstance();
let moment = require('moment')
let util = new Utils();
let roomsModel = new ROOMSMODEL();
let questionsModel = new QUESTIONSMODEL();

const STATUS = {
    SUCCESS: 0,
    FAILURE: 1
  }

  export class ROOMS {
    constructor(roomdata) {

      this.rooms = {
        'room_type' : roomdata.room_type,
        'entry_token' : roomdata.entry_token,
        'player_limit' : roomdata.player_limit,
        'time_limit' : roomdata.time_limit,
        'prize_token' : roomdata.prize_token,
        'created_on' :  util.getCurrentTimeStamp()
      }
      this.created_on = util.getCurrentTimeStamp();
      this.selectedRoom = {};
    }
  }



  export const createRoom = (request, response) => {
    __createRoom(request, response).then(roomRes => {
      return roomRes;
    })
  };


  export const getRooms = (request, response) => {
    __getRooms(request, response).then(roomRes => {
      return roomRes;
    })
  };


  export const joinRoom = (request, response) => {
    __joinRoom(request, response).then(roomRes => {
      return roomRes;
    })
  };
  
  
  const __joinRoom = async (request,response) =>{
    try {
    let roomData = new ROOMS(request.body);
    let userId = request.params.userId;
    let roomId = request.params.room_id;
    let roomsList = await __getRoomsData(request,response);
 if(roomsList == []) {
  response.send(ResponseHelper.buildSuccessResponse({}, 'Something went Wrong,Please try again later.', STATUS.FAILURE)); 
 }
 else {
  for(let room = 0 ; room <roomsList.length;room++) {
    if(roomsList[room].room_id == roomId) {
      roomData.selectedRoom = roomsList[room]; 
    }
  }
  let userTokenBalance = await roomsModel.getUserTokenBalance(userId);
  if(userTokenBalance[0].total_balance>= roomData.selectedRoom.entry_token) {
    if(userTokenBalance[0].token_balance >= roomData.selectedRoom.entry_token) {
        let getRoomDetails = await roomsModel.getRoomDetails(roomData.selectedRoom.room_id);
        if(getRoomDetails.length< roomData.selectedRoom.player_limit) {
          let existingRoomDetails = await roomsModel.existingRoom(userId,roomData.selectedRoom.room_id)
          if(existingRoomDetails.length<1) {
            let tokenBal = userTokenBalance[0].token_balance - roomData.selectedRoom.entry_token;
            let cutBal = await roomsModel.cutTokenBal(userId,tokenBal);
            if(cutBal) {            
            let joinRoom = await roomsModel.joinRoom(userId,roomData.selectedRoom.room_id,util.getCurrentTimeStamp());
            if(joinRoom) {
              response.send(ResponseHelper.buildSuccessResponse({}, 'Joined Room Successfully', STATUS.SUCCESS))
            }
            else {
              response.send(ResponseHelper.buildSuccessResponse({}, 'Something went wrong', STATUS.FAILURE))
            }

          }
          else {
            response.send(ResponseHelper.buildSuccessResponse({}, 'Something went Wrong,Please try again later.', STATUS.FAILURE)); 
          }
          }
          else {
             response.send(ResponseHelper.buildSuccessResponse({}, 'Player already joined in the room', STATUS.FAILURE));
          }
        }
        else {
          response.send(ResponseHelper.buildSuccessResponse({}, 'Player Limit exceeded in this Room,Try joining another room', STATUS.FAILURE)); 
        }

      
    }
    else if(userTokenBalance[0].cash_balance >= roomData.selectedRoom.entry_token) {
      
        let getRoomDetails = await roomsModel.getRoomDetails(roomData.selectedRoom.room_id);
        if(getRoomDetails.length< roomData.selectedRoom.player_limit) {
          let existingRoomDetails = await roomsModel.existingRoom(userId,roomData.selectedRoom.room_id)
          if(existingRoomDetails.length<1) {
            let cashBal = userTokenBalance[0].cash_balance - roomData.selectedRoom.entry_token;
      let cutBal = await roomsModel.cutCashBal(userId,cashBal);
      if(cutBal) {
            let joinRoom = await roomsModel.joinRoom(userId,roomData.selectedRoom.room_id,util.getCurrentTimeStamp());
            if(joinRoom) {
              response.send(ResponseHelper.buildSuccessResponse({}, 'Joined Room Successfully', STATUS.SUCCESS))
            }
            else {
              response.send(ResponseHelper.buildSuccessResponse({}, 'Something went wrong', STATUS.FAILURE))
            }
          }
          else {
            response.send(ResponseHelper.buildSuccessResponse({}, 'Something went Wrong,Please try again later.', STATUS.FAILURE)); 
          }
          }
          else {
             response.send(ResponseHelper.buildSuccessResponse({}, 'Player already joined in the room', STATUS.FAILURE));
          }
        }
        else {
          response.send(ResponseHelper.buildSuccessResponse({}, 'Player Limit exceeded in this Room,Try joining another room', STATUS.FAILURE)); 
        }

     
    }
    else {
      
        let getRoomDetails = await roomsModel.getRoomDetails(roomData.selectedRoom.room_id);
        if(getRoomDetails.length< roomData.selectedRoom.player_limit) {
          let existingRoomDetails = await roomsModel.existingRoom(userId,roomData.selectedRoom.room_id)
          if(existingRoomDetails.length<1) {
            let cutBal = await roomsModel.cutBal(userId,0,0);
      if(cutBal) {
            let joinRoom = await roomsModel.joinRoom(userId,roomData.selectedRoom.room_id,util.getCurrentTimeStamp());
            if(joinRoom) {
              response.send(ResponseHelper.buildSuccessResponse({}, 'Joined Room Successfully', STATUS.SUCCESS))
            }
            else {
              response.send(ResponseHelper.buildSuccessResponse({}, 'Something went wrong', STATUS.FAILURE))
            }
          }
          else {
            response.send(ResponseHelper.buildSuccessResponse({}, 'Something went Wrong,Please try again later.', STATUS.FAILURE)); 
          }
          }
          else {
             response.send(ResponseHelper.buildSuccessResponse({}, 'Player already joined in the room', STATUS.FAILURE));
          }
        }
        else {
          response.send(ResponseHelper.buildSuccessResponse({}, 'Player Limit exceeded in this Room,Try joining another room', STATUS.FAILURE)); 
        }

      
    }

  }
  else {
    response.send(ResponseHelper.buildSuccessResponse({}, 'User Doesnot have enough balance to join the room', STATUS.FAILURE));
  }
 }
}
catch(err) {
  response.send(ResponseHelper.buildFailureResponse(err, '', STATUS.FAILURE));
}
  }


  const __createRoom = async (request,response) =>{
    try {
    let reqData = new ROOMS(request.body);
    let userId = request.params.userId;
    let isValidRoomReq = await util.isValidRoomRequest(reqData);
  
      if(isValidRoomReq.status==0) {
        let role = await questionsModel.getRole(userId);
        if(role) {
          if(role[0].role_id == 1) {
            let createRoom = await roomsModel.createRoom(reqData.rooms,userId);
            if(createRoom) {
              response.send(ResponseHelper.buildSuccessResponse({}, 'Room Created Successfully', STATUS.SUCCESS));
            }
            else {
              response.send(ResponseHelper.buildSuccessResponse({}, 'Something went Wrong. Please try again later.', STATUS.FAILURE));
            }
          }
          else {
            response.send(ResponseHelper.buildSuccessResponse({}, 'User Doesnot have access to create Rooms.', STATUS.FAILURE)); 
          }
        }
        else {
          response.send(ResponseHelper.buildSuccessResponse({}, 'Something went wrong', STATUS.FAILURE));
        }
      }
      else {
        response.send(ResponseHelper.buildSuccessResponse(isValidRoomReq, Messages.signUp.validationError, STATUS.FAILURE));
      }
    }
    catch(err) {
      response.send(ResponseHelper.buildSuccessResponse(err,'Something went wrong', STATUS.FAILURE));
    }
    

  }

  

 const  __getRooms = async (request,response) => {
   let userId = request.params.userId;
   let rooms = await roomsModel.getRooms();
   let roomsList = [];
   if( rooms) {
     for(let room = 0 ; room < rooms.length; room++) {
       if(rooms[room].time_limit == 0 ) {
        roomsList.push(rooms[room]);
       }
       else {
        let minDiff = calculateMin(rooms[room].created_on,util.getCurrentTimeStamp())
        if(minDiff<=rooms[room].time_limit) {
          roomsList.push(rooms[room]);
        }
       }
       

     }
    response.send(ResponseHelper.buildSuccessResponse(roomsList,'Rooms Fetched Successfully', STATUS.SUCCESS));
   } 
   else {
    response.send(ResponseHelper.buildSuccessResponse(err,'No Rooms Found', STATUS.FAILURE));
   }
 }



 const  __getRoomsData = async (request,response) => {
  let userId = request.params.userId;
  let rooms = await roomsModel.getRooms();
  let roomsList = [];
  if( rooms) {
    for(let room = 0 ; room < rooms.length; room++) {
      if(rooms[room].time_limit == 0 ) {
       roomsList.push(rooms[room]);
      }
      else {
       let minDiff = calculateMin(rooms[room].created_on,util.getCurrentTimeStamp())
       if(minDiff<=rooms[room].time_limit) {
         roomsList.push(rooms[room]);
       }
      }
      

    }
  return roomsList
  } 
  else {
   return [];
  }
}


 const  calculateMin = (startDate,endDate)=>
 {
    var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
    var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
    var duration = moment.duration(end_date.diff(start_date));
    var mins = duration.asMinutes()       
    return mins;
 }

  