"use strict";
import { TokenModel } from '../model/tokenManager';

const validateToken = new TokenModel();

let requestKeysFilter = ['password'];
var requestIp = require('request-ip');

const STATUS = {
    SUCCESS: 0,
    FAILURE: 1,
    INVALIDTOKEN: 2
  }


  class Token {
    constructor(req) {
      this.token = req.headers["x-auth-token"] ? req.headers["x-auth-token"] : '';
      this.newToken = uuidv1() + Math.floor(new Date() / 1000);
      this.req = req
    }
  }



  // here we are checking router
let _isRouteValid = (request) => {
    if (_.includes(request.originalUrl, 'user/registration') ) {
      return true;
    }
    return false
  };


  //create a object for saving in audit log
let _createObject = (request) => {
    let data = request.body;
    Object.keys(data).forEach(key => {
      //console.log(`key=${key} value=${data[key]}`)
      if (requestKeysFilter.includes(`${key}`)) {
        //data[key] = "XXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    }
    );
  
    return JSON.stringify({
      // body: data,
      body: request.body,
      headers: request.headers,
      originalUrl: request.originalUrl,
      params: request.params,
      rawHeaders: request.rawHeaders,
      route: request.route,
      path: request.route.path,
      method: request.route.stack[0].method,
      ip: request.ip
    })
  }



  // here we are storing logs Info 
let _saveAuditLog = (token, request) => {
    return new Promise(function (resolve, reject) {
      let host = requestIp.getClientIp(request)
      let ipAddresss = host.split(':')
      let path = request.path;
      let method = request.method;
      validateToken.saveLog(token, _createObject(request), ipAddresss.length > 1 ? ipAddresss[ipAddresss.length - 1] : '', path, method).then(auditLogInfo => {
        if (auditLogInfo.affectedRows > 0) {
    
          resolve(auditLogInfo)
        }
        else {
       
          reject(err);
        }
  
      }, (err) => {
     
        reject(err);
      });
    });
  }




  // check token is expire or not 
let _isTokenExpire = (tokenInfo, request, response, next) => {
    if (tokenInfo.length == 0) {
      
      return response.send(ResponseHelper.buildSuccessResponse({
        "message": {
          "message": 'Token Expired', "status": STATUS.SUCCESS
        }
      }, 'Invalid Token', STATUS.INVALIDTOKEN));
    } else {
      
      var date = new Date()
      if (new Date(tokenInfo[0].created_on).getTime() + process.env.TOKEN_EXP_TIME * 60000 > date.getTime()) {
        
        request.params["userId"] = tokenInfo[0].userId;
        next();
      } else {
        
        return response.send(ResponseHelper.buildSuccessResponse({
          "message": {
            "message": 'Token Expired logout and logIn again', "status": STATUS.SUCCESS
          }
        }, 'Invalid Token', STATUS.INVALIDTOKEN));
      }
    }
  }


  // check token is valid or not 
let isTokenValid = (request, response, next) => {
   
    var token = new Token(request);
    _saveAuditLog(token.token, token.req).then(auditInfo => {
     
      if (_isRouteValid(request)) {
       
        next();
      } else {
        if (token.token == '' || token.token == 'undefined') {
          return response.send(ResponseHelper.buildSuccessResponse({},'Please provide valid token', STATUS.FAILURE))
        }
        validateToken.getTokenDetails(token.token).then(tokenInfo => {
          
          return _isTokenExpire(tokenInfo, request, response, next)
        }, err => {
  
          return response.send(ResponseHelper.buildFailureResponse(new Error('Fail while geting token getTokenDetails()')));
        })
      }
    }, err => {
      
      return response.send(ResponseHelper.buildFailureResponse(new Error('Fail while geting token getTokenDetails()')));
    })
  }




  
let refreshToken = (request, response, next) => {
    var token = new Token(request)
    validateToken.getTokenDetails(token.token)
      .then(tokenInfo => {
        if (tokenInfo.length == 0) {
         
          // response.send({ message: 'token is expire', status: STATUS.FAILURE })
          return response.send(ResponseHelper.buildSuccessResponse({}, 'token is expire', STATUS.FAILURE));
        } else {
         
          validateToken.saveToken(tokenInfo[0].userId, token.newToken)
            .then(tokenInfo => {
                      return response.send(ResponseHelper.buildSuccessResponse({ 'x-auth-token': token.newToken }, 'Please Provide Valid Token', STATUS.FAILURE))
            }, err => {
              
              return response.send(ResponseHelper.buildFailureResponse(new Error(err)));
            })
        }
      }, err => {
       
        return response.send(ResponseHelper.buildFailureResponse(new Error(err)));
      })
  }

  export {
    isTokenValid,
    refreshToken
  }
