

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
        let sqlQuery = format(sql,reqData.room_type,reqData.entry_token,reqData.player_limit,reqData.time_limit,reqData.prize_token,userId,reqData.created_on);
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

  }