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

    checkUniqueId( mobile) {
        return new Promise((resolve, reject) => {
			let sql = sqlObj.signUp.checkUniqueId;
			
			let sqlQuery = format(sql, mobile);
			console.log(sqlQuery)
            db.doRead(sqlQuery).then(userData => {
				console.log(userData);
				resolve(userData);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        })
    }

    createUser(conn, mobile, roleId, isActive, createdOn) {
		return new Promise((resolve, reject) => {
			let sql = sqlObj.signUp.createUser;
			console.log(9)
            let sqlQuery = format(sql,mobile, roleId, isActive, createdOn);
			conn.query(sqlQuery).then(res => {
				resolve(res);
			}).catch(err => {
				reject(new Error(err));
			});
		})
	}

	insertDeviceInfo(deviceInfo,userId){
		return new Promise((resolve, reject) => {
			let sql = sqlObj.signUp.storeDeviceInfo;

			let sqlQuery = format(sql, userId,deviceInfo.device_type, deviceInfo.device_name, deviceInfo.device_model,deviceInfo.os_version,deviceInfo.device_token,deviceInfo.ip_address,deviceInfo.app_version,deviceInfo.created_on);
	  
			db.doRead(sqlQuery).then(result => {
			  resolve(result);
			})
			  .catch(err => {
				reject(new Error(err));
			  })
		  })
	}

	getUserDetails(mobile){
		let userDetails = {
			'first_name':'',
			'last_name': '',
			'email': '',
			'mobile': '',
			'account_type': '',
			'device_type':'',
			'device_name':'',
			'device_model':'',
			'os_version':'',
			'x-auth-token' : '',
			'ip_address' :'',
			'app_version':''
		}
		return new Promise((resolve, reject) => {
			let sql = sqlObj.signUp.getUserDetails;
			let deviceSql = sqlObj.signUp.getDeviceDetails;
			let sqlQuery = format(sql, mobile);
			
			db.doRead(sqlQuery).then(result => {
			  if(result){
				userDetails.first_name = result[0].fname
				userDetails.last_name = result[0].lname
				userDetails.email = result[0].email
				userDetails.mobile = result[0].mobile
				userDetails.account_type = result[0].role_id
				let getDeviceDetailsQuery = format(deviceSql,result[0].userId)
				db.doRead(getDeviceDetailsQuery).then(deviceInfo=>{
				
					userDetails.device_type = deviceInfo[0].device_type
					userDetails.device_name= deviceInfo[0].device_name
					userDetails.device_model= deviceInfo[0].model
					userDetails.os_version= deviceInfo[0].os_version
					userDetails['x-auth-token'] = deviceInfo[0].device_token
					userDetails.ip_address= deviceInfo[0].ip
					userDetails.app_version= deviceInfo[0].app_version
					resolve(userDetails);
				})
			  }
			  else{
				  reject('Error while fetching userDetails')
			  }
			})
			  .catch(err => {
				reject(new Error(err));
			  })
		  })
	}


	activeAccount(mobile){
		return new Promise((resolve, reject) => {
			let sql = sqlObj.signUp.activeAccount;
			let sqlQuery = format(sql, 1 , mobile);
			console.log(sqlQuery)
            db.doUpdate(sqlQuery).then(userData => {
				resolve(userData);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        })
	}

}
