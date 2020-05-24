import { Utils} from '../utility/utils';
import { DbConnMgr } from '../dbconfig/dbconfig';
import {sqlObj} from '../utility/sql'


let db = DbConnMgr.getInstance();
let format = require('string-format');
const utils = new Utils();

export class OtpModel {
  constructor() { }


  saveOtp(emailOrmobile, otp, createdOn) {
    return new Promise((resolve, reject) => {
      let sql = sqlObj.otp.saveOtp;
      let sqlQuery = format(sql, emailOrmobile, otp, createdOn);

      db.doRead(sqlQuery).then(result => {
        resolve(result);
      })
        .catch(err => {
          reject(new Error(err));
        })
    })
  }


  updateOtp(otp, createdOn, emailOrmobile) {
    return new Promise((resolve, reject) => {
      let sql = sqlObj.otp.updateOtp;
      let sqlQuery = format(sql, otp, createdOn, emailOrmobile);

      db.doUpdate(sqlQuery).then(result => {
        resolve(result);
      })
        .catch(err => {
          reject(new Error(err));
        })
    })
  }


  isUnique(emailOrmobile) {
    return new Promise((resolve, reject) => {
      let sql = sqlObj.otp.isExist;
      let sqlQuery = format(sql, emailOrmobile);

      db.doRead(sqlQuery).then(result => {
        resolve(result);
      })
        .catch(err => {
          reject(new Error(err));
        })
    })
  }

  isExpired(emailOrmobile) {
    return new Promise((resolve, reject) => {
      let sql = sqlObj.otp.isExpire;
      let sqlQuery = format(sql, emailOrmobile);

      db.doRead(sqlQuery).then(result => {
        resolve(result);
      })
        .catch(err => {
          reject(new Error(err));
        })
    })
  }


  verifyOtp(updatedOn, emailOrmobile) {
    return new Promise((resolve, reject) => {
      let sql = sqlObj.otp.verifyOtp;
      let sqlQuery = format(sql, updatedOn, emailOrmobile);

      db.doRead(sqlQuery, updatedOn, emailOrmobile).then(result => {
        resolve(result);
      })
        .catch(err => {
          reject(new Error(err));
        })
    })
  }


  doExpireOtp(emailOrmobile) {
    return new Promise((resolve, reject) => {
      let sql = sqlObj.otp.doExpireOtp;
      let sqlQuery = format(sql, emailOrmobile, utils.getCurrentTimeStamp());

      db.doRead(sqlQuery).then(result => {
        resolve(result);
      })
        .catch(err => {
          reject(new Error(err));
        })
    })
  }
}