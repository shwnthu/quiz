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
}