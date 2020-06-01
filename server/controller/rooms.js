"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
import { Utils } from '../utility/utils';
import {Messages} from '../utility/message'
import { ROOMSMODEL} from '../model/rooms'
import { QUESTIONSMODEL} from '../model/questions'

let db = DbConnMgr.getInstance();
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
            response.send(ResponseHelper.buildSuccessResponse({}, 'User Doesnot have access to add Questions.', STATUS.FAILURE)); 
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
   if( rooms) {
    response.send(ResponseHelper.buildSuccessResponse(rooms,'Rooms Fetched Successfully', STATUS.SUCCESS));
   } 
   else {
    response.send(ResponseHelper.buildSuccessResponse(err,'No Rooms Found', STATUS.FAILURE));
   }
 }

  