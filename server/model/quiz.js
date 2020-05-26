"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
import { Utils } from '../utility/utils';
import { sqlObj } from '../utility/sql';

const db = DbConnMgr.getInstance();
let utils = new Utils();
const format = require('string-format');

export class QUIZMODEL {
	constructor() {

    }




    createQuiz(quizData,userId){
        return new Promise((resolve, reject) => {
            let sql = sqlObj.quiz.createQuiz;
			let sqlQuery = format(sql,userId,quizData.questions,quizData.start_time,quizData.end_time );
            db.doRead(sqlQuery).then(userData => {
				resolve(userData);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        })
    }
    

    getAllQuiz(){
        return new Promise((resolve, reject) => {
            let sql = sqlObj.quiz.getAllQuiz;
			
            db.doRead(sql).then(userData => {
				resolve(userData);
			}).catch(err => {
				console.log(err)
				reject(new Error(err));
			});
        })
	}
}