"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
import { Utils } from '../utility/utils';
import { sqlObj } from '../utility/sql';

const db = DbConnMgr.getInstance();
let utils = new Utils();
const format = require('string-format');

export class QUESTIONSMODEL { 
    constructor() {

    }


    
    getRole(userId){
        return new Promise((resolve, reject) => {
			let sql = sqlObj.questions.getRole;
			let sqlQuery = format(sql, userId);
            db.doRead(sqlQuery).then(role => {
				resolve(role);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        })
    }

    getAllQuestions(userId) {
        return new Promise((resolve, reject) => {
            let sql = sqlObj.questions.getAllQuestions;
			let sqlQuery = format(sql, userId);
            db.doRead(sqlQuery).then(res => {
				resolve(res);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        }) 
    }
    
    createQuestion(question,userId,answer) {
        return new Promise((resolve, reject) => {
            let sql = sqlObj.questions.createQuestion;
            console.log(question);
			let sqlQuery = format(sql, userId,question.question,question.options[0],question.options[1],question.options[2],question.options[3],question.answer);
            db.doRead(sqlQuery).then(res => {
				resolve(res);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        }) 
    }

}