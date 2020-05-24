"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();
import { sqlObj } from '../utility/sql';
import { Utils } from '../utility/utils';
let utils = new Utils()
const format = require('string-format');

export class TokenModel {
	constructor() {

	}
	//Method for save Token 
	saveToken(conn, id, token) {
		return new Promise(function (resolve, reject) {
			let sql =sqlObj.tokenManger.saveToken;
			let sqlQuery = format(sql,id, token, utils.getCurrentTimeStamp())
			conn.query(sqlQuery)
				.then((res) => {
					resolve(res);
				}, err => {
					reject(err);
				});
		});
	}

	saveLoginToken(id, token) {
		return new Promise(function (resolve, reject) {
			const timeStamp = utils.getCurrentTimeStamp()
			let sql = sqlObj.tokenManger.saveLoginToken;
			let sqlQuery = format(sql, id, token, timeStamp)
			DbInstance.doInsert(sqlQuery)
				.then((res) => {
					resolve(res);
				}, err => {

					reject(err);
				});
		});
	}

	// method for get token details
	getTokenDetails(token) {
		return new Promise(function (resolve, reject) {
			let sql = sqlObj.tokenManger.getTokenDetails;
			let sqlQuery = format(sql, token);
			DbInstance.doRead(sqlQuery)
				.then((res) => {
					resolve(res);
				}, err => {
					reject(err);
				});
		});
	}

	//Method for save logs 
	saveLog(token, request, ipAddresss, path, method) {
		return new Promise(function (resolve, reject) {
			let sql = sqlObj.tokenManger.saveLog;
			let sqlQuery = format(sql, token, request, ipAddresss, path,method,utils.getCurrentTimeStamp())
						DbInstance.doInsert(sqlQuery)
				.then((res) => {
					resolve(res);
				}, err => {
					console.log(err);
					reject(err);
				});
		});
	}
}

