export const sqlObj = {
    signUp:{
        checkUniqueId      : `select email,userId, mobile from user where  mobile = '{0}'`,
        createUser    :  `insert into user ( mobile, role_id, isActive, created_on) values ('{0}','{1}' ,'{2}', '{3}')`,
        storeDeviceInfo: `insert into device_info (userId,device_type, device_name, model,os_version,device_token,ip,app_version,created_on) values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}')`,
        getUserDetails      : `select userId,fname,lname,mobile,city,state,gender,email,isActive,role_id from user where mobile = '{0}'`,
        getDeviceDetails      : `select device_type,device_name,model,os_version,device_token,ip,app_version from device_info where userId = '{0}' ORDER BY id DESC;`,
        activeAccount: `update user set isActive = '{0}' where mobile = '{1}'`,
        insertBalance : `insert into balance (userId,token_balance,cash_balance) values('{0}','{1}','{2}')`


    },
    login :{
      isUserExists      : `select fname,lname,city,state,gender,email, mobile,userId from user where mobile = '{0}'`,
      updateProfile  : `update user set fname = '{0}',lname = '{1}',city = '{2}',state = '{3}',gender = '{4}', email = '{5}' where userId = '{6}'`,
      getUserFromUserId : `select userId,fname,lname,mobile,city,state,gender,email,isActive,role_id from user where userId = '{0}'`,
      getAllUsers :`select userId,fname,lname,profile_pic,mobile,city,state,gender,email from user where role_id=2`
     
    },
    quiz :{
      createQuiz :`insert into quiz (created_by,questions,start_time,end_time) values ('{0}','{1}' ,'{2}', '{3}')`,
      getAllQuiz :`select quiz_id,questions,start_time,end_time from quiz`
    },
    questions :{
      createQuestion :`insert into questions(userId,question,option1,option2,option3,option4,answer) VALUES('{0}','{1}','{2}','{3}','{4}','{5}','{6}')`,
      getRole : `select userId,role_id from user where userId = '{0}'`,
      getAllQuestions :`select question_id,question,option1,option2,option3,option4 from questions where userId = '{0}'`
     
    },
    rooms:{
      createRoom : `insert into rooms(room_type,entry_token,player_limit,time_limit,prize_token,created_by,created_on,room_name) values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}')`,
      getRooms : `select room_id,room_name,room_type,entry_token,player_limit,time_limit,prize_token,created_by,created_on from rooms`,
      getUserTokenBal : `select cash_balance,token_balance,total_balance from balance where userId = '{0}'`,
      cuttokenBal : ` update balance set token_balance = '{0}' where userId = '{1}' `,
      existingRoomDetails :`select userId,room_id from joined_rooms where userId = '{0}' and room_id = '{1}'`,
      joinRoom : `insert into joined_rooms (userId,room_id,created_on) values ('{0}','{1}','{2}')`,
      cutcashBal : ` update balance set cash_balance = '{0}' where userId = '{1}' `,
      cutBal : `  update balance set token_balance = '{0}',cash_balance = '{1}'  where userId = '{2}'`,
      getRoomDetails : `select userId,room_id from joined_rooms where  room_id = '{0}'`
    },
    tokenManger: {
        saveLoginToken: `insert into token(userId, token, created_on) VALUES('{0}','{1}','{2}')`,
        saveToken: `insert into token(userId, token, created_on) VALUES('{0}','{1}','{2}')`,
        getTokenDetails: `select created_on, token, userId from token where token = '{0}' ORDER BY created_on desc`,
        saveLog: `insert into audit_log (token, request ,ip,request_path , requested_method,created_on) VALUES('{0}','{1}','{2}','{3}','{4}','{5}')`,
    
      },
      otp: {
        saveOtp: `insert into OTPValidator (emailOrMobile, otp, created_on) values ('{0}','{1}','{2}')`,
        updateOtp: `update OTPValidator set otp = '{0}', isVerified = 0 , created_on = '{1}' where emailOrMobile = '{2}'`,
        isExist: `select id from OTPValidator where emailOrMobile = '{0}'`,
        isExpire: `select otp, isVerified, created_on from OTPValidator where emailOrMobile = '{0}' ORDER BY created_on desc `,
        verifyOtp: `update OTPValidator set isVerified = 1, isExpired = 0, updated_on = '{0}' where emailOrMobile = '{1}'`,
        doExpireOtp: `update OTPValidator set isExpired = 1 ,updated_on = '{1}' where emailOrMobile = '{0}'`
      }
}