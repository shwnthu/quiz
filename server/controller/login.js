"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
import { TokenModel } from '../model/tokenManager';
import { Utils } from '../utility/utils';
import {Messages} from '../utility/message'
import {UserModel} from '../model/login'
import { OtpModel } from '../model/otp';
import { UserModel as RegisterModel} from '../model/signUp';
import { QUESTIONSMODEL} from '../model/questions';

const tokenModel = new TokenModel();
let db = DbConnMgr.getInstance();
let util = new Utils();
let loginModel = new UserModel();
let registerModel = new RegisterModel();
let questionsModel = new QUESTIONSMODEL();
let authKey = 'aa1413af-9cb2-11ea-9fa5-0200cd936042'
const TwoFactor = new (require('2factor'))(authKey);
let otpModel = new OtpModel();
let token = uuidv1() + Math.floor(new Date() / 1000);
const STATUS = {
    SUCCESS: 0,
    FAILURE: 1
  }

  export class USERLOGIN {
    constructor(userdata) {
  this.mobile = userdata.mobile;
    this.deviceInfo={
        'device_type':userdata.device_type,
        'device_name':userdata.device_name,
        'device_model':userdata.device_model,
        'os_version':userdata.os_version,
        'device_token':'',
        'ip_address':userdata.ip_address,
        'app_version':userdata.app_version,
        'created_on' : util.getCurrentTimeStamp()
    }
    this.userInfo = {
      'fname':'',
      'lname' : '',
      'city' : '',
      'state' : '',
      'gender' : '',
      'email' :''
    }
    this.created_on= util.getCurrentTimeStamp();
   
    }
  }


export const updateProfile = (request,response)=>{
  __updateProfile(request, response).then(Res => {
    return Res;
  })
}


export const getAllUsers = (request,response)=>{
  __getAllUsers(request, response).then(Res => {
    return Res;
  })
}

const __getAllUsers = async (request,response) =>{
  let userId = request.params.userId;
  const role = await questionsModel.getRole(userId)
  if(role){
if(role[0].role_id == 1){

  let userDetails = await loginModel.getAllUsers() 
  if(userDetails) {
    response.send(ResponseHelper.buildSuccessResponse(userDetails, 'Users Fetched Successfully', STATUS.FAILURE)); 
  }
  else {
    response.send(ResponseHelper.buildSuccessResponse({}, 'No Users Found', STATUS.FAILURE)); 
  }

}
else {
  response.send(ResponseHelper.buildSuccessResponse({}, 'User Doesnot have access .', STATUS.FAILURE)); 
}
  }
  else {
    response.send(ResponseHelper.buildSuccessResponse({}, 'Something went Wrong', STATUS.FAILURE));
  }
}

const __updateProfile = async(request,response)=>{
  let userId = request.params.userId;
  let userReq = request.body;
  let userData = new USERLOGIN(request.body);
  let userDetails = await loginModel.getUserDetails(userId);
  console.log(userDetails)
  if(userDetails) {
    if(userReq.fname) {
      userData.userInfo.fname = userReq.fname;
    }
    else {
      userData.userInfo.fname = userDetails[0].fname;
    }
    if(userReq.lname) {
      userData.userInfo.lname = userReq.lname;
    }
    else {
      userData.userInfo.lname = userDetails[0].lname;
    }
    if(userReq.city) {
      userData.userInfo.city = userReq.city;
    }
    else {
      userData.userInfo.city = userDetails[0].city;
    }if(userReq.state) {
      userData.userInfo.state = userReq.state;
    }
    else {
      userData.userInfo.state = userDetails[0].state;
    }
    if(userReq.gender) {
      userData.userInfo.gender = userReq.gender;
    }
    else {
      userData.userInfo.gender = userDetails[0].gender;
    }
    if(userReq.email) {
      userData.userInfo.email = userReq.email;
    }
    else {
      userData.userInfo.email = userDetails[0].email;
    }

   let updateProfileInfo =  await loginModel.updateProfile(userData.userInfo,userId)
   if(updateProfileInfo) {
    response.send(ResponseHelper.buildSuccessResponse({}, 'Profile Updated Successfully', STATUS.SUCCESS));
   }
   else {
    response.send(ResponseHelper.buildSuccessResponse({}, 'Profile Updation failure', STATUS.FAILURE));
   }
  }
  else {
    response.send(ResponseHelper.buildSuccessResponse({}, 'Something went wrong', STATUS.FAILURE));
  }
}







  export const resendOtp = (request,response)=>{
    __resendOtp(request, response).then(loginRes => {
        return loginRes;
      })
  }


  const __resendOtp = async (request,response)=>{
      
      let loginData = new USERLOGIN(request.body);
    let isUserExists = await loginModel.isUserExists(loginData.mobile)
    console.log(isUserExists)
    if(isUserExists[0]){
        let otp = await __getOtp();
        let userId = isUserExists[0].userId;
        const otpRes=await TwoFactor.sendOTP(loginData.mobile, {otp: otp, template: 'otp'}).then((res) => {
        
         return STATUS.SUCCESS;
         }, (err) => {
           return err
         })
         await otpModel.updateOtp(otp, loginData.created_on, loginData.mobile)
         if(otpRes==STATUS.SUCCESS){
            let saveToken = await tokenModel.saveLoginToken(userId, token);
            loginData.deviceInfo.device_token=token;
            await registerModel.insertDeviceInfo(loginData.deviceInfo,userId);
            response.send(ResponseHelper.buildSuccessResponse({},'Please Verify OTP Sent to registered Mobile Number.', STATUS.SUCCESS));
         }
         else{
            response.send(ResponseHelper.buildSuccessResponse(otpRes,'Error sending OTP.', STATUS.FAILURE));  
         }
    }
    else{
        response.send(ResponseHelper.buildSuccessResponse({}, Messages.login.UserNotExists, STATUS.FAILURE));
    }
  }


  const  __getOtp = () => {
    let digit = '0123456789';
    let otp = '';
  
    for (let i = 0; i < 6; i++) {
      otp += digit[Math.floor(Math.random() * 10)];
    }
    return otp;
  }


  export const updateProfilePic = (request,response)=>{
    __updateProfilePic(request, response).then(loginRes => {
        return loginRes;
      })
  }

  const __updateProfilePic = async (request,response)=>{
    let userId = request.params.userId;
    if(request.files){
      let profile_pic = request.files.profile_pic;
      let file_name = profile_pic.name;
      if(profile_pic.mimetype == "image/jpeg" ||profile_pic.mimetype == "image/png"||profile_pic.mimetype == "image/gif"){

        file.mv('public/images/upload_images/'+file.name, function(err) {              
          if (err) {
            response.send(ResponseHelper.buildSuccessResponse({},'Error while uploading Image.', STATUS.FAILURE));
          }
          else {
            // await loginModel.getUserDetails(userId);
         
            // var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";
            // var query = db.query(sql, function(err, result) {
            //    res.redirect('profile/'+result.insertId);
            // });
          }
            return res.status(500).send(err);
        
       });

      }
      else {
        response.send(ResponseHelper.buildSuccessResponse({},'This format is not allowed,Please upload file with .png, .gif , .jpg', STATUS.FAILURE));
      }
    }
    else {
      response.send(ResponseHelper.buildSuccessResponse({},'No image uploaded', STATUS.FAILURE));
    }
  }