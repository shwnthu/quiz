

"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
import { Utils } from '../utility/utils';
import { sqlObj } from '../utility/sql';

const db = DbConnMgr.getInstance();
let utils = new Utils();
const format = require('string-format');

export class ROOMSMODEL {
	constructor() {

    }


    createRoom(reqData,userId) {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.createRoom;
        let sqlQuery = format(sql,reqData.room_type,reqData.entry_token,reqData.player_limit,reqData.time_limit,reqData.prize_token,userId,reqData.created_on,reqData.room_name);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          })
    }


    cutBal(userId,tokenBal,cashBal,totalBal) {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.cutBal;
        let sqlQuery = format(sql,tokenBal,cashBal,totalBal,userId);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          })
    }

    getRooms() {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.getRooms;
        let sqlQuery = format(sql);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          })
    }


    getUserTokenBalance(userId) {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.getUserTokenBal;
        let sqlQuery = format(sql,userId);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          }) 
    }



    cutTokenBal(userId,tokenBal) {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.cuttokenBal;
        let sqlQuery = format(sql,tokenBal,userId);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          })
    }



    existingRoom(userId,room_id) {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.existingRoomDetails;
        let sqlQuery = format(sql,userId,room_id);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          })
    }


    joinRoom(userId,room_id,timestamp) {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.joinRoom;
        let sqlQuery = format(sql,userId,room_id,timestamp);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          })
    }

    cutCashBal(userId,cashBal) {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.cutcashBal;
        let sqlQuery = format(sql,cashBal,userId);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          })  
    }


    getRoomDetails(room_id) {
      return new Promise((resolve, reject) => {
        let sql = sqlObj.rooms.getRoomDetails;
        let sqlQuery = format(sql,room_id);
              db.doRead(sqlQuery).then(room => {
          resolve(room);
        }).catch(err => {
          console.log(err)
          reject(new Error(err));
        });
          }) 
    }


  }