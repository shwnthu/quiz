"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
import { Utils } from '../utility/utils';
import { sqlObj } from '../utility/sql';

const db = DbConnMgr.getInstance();
let utils = new Utils();
const format = require('string-format');

export class UserModel {
	constructor() {

    }

    isUserExists(mobile){
        return new Promise((resolve, reject) => {
			let sql = sqlObj.login.isUserExists;
			let sqlQuery = format(sql, mobile);
            db.doRead(sqlQuery).then(userData => {
				resolve(userData);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        })
	}
	
	// updateProfilePic(){

	// }

	getUserDetails(userId){
		return new Promise((resolve, reject) => {
			let sql = sqlObj.login.getUserFromUserId;
			let sqlQuery = format(sql, userId);
            db.doRead(sqlQuery).then(userData => {
				resolve(userData);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        })
	}


	updateProfile(userInfo,userId) {
		return new Promise((resolve, reject) => {
			let sql = sqlObj.login.updateProfile;
			let sqlQuery = format(sql,userInfo.fname,userInfo.lname,userInfo.city,userInfo.state,userInfo.gender,userInfo.email,userId);
            db.doRead(sqlQuery).then(userData => {
				resolve(userData);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        })
	}
}