import {isTokenValid} from './interceptor';
import { authenticateUser , verifyOtp } from '../controller/signUp'
import {  resendOtp , updateProfile,getAllUsers } from '../controller/login'


router.post('/service/user/authenticateUser',authenticateUser)
router.post('/service/user/verifyOtp',verifyOtp)
router.post('/service/user/resendOtp',resendOtp)
router.post('/service/user/updateProfile',isTokenValid,updateProfile)
router.get('/service/user/getAllUsers',isTokenValid,getAllUsers)

// router.post('/service/user/updateProfilePic',isTokenValid,updateProfilePic)

module.exports = router;