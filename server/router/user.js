import {isTokenValid} from './interceptor';
import { registerUser , verifyOtp } from '../controller/signUp'
import { loginUser , resendOtp , updateProfilePic } from '../controller/login'


router.post('/service/user/registration',isTokenValid,registerUser)
router.post('/service/user/veriyOtp',verifyOtp)
router.post('/service/user/login',loginUser)
router.post('/service/user/resendOtp',resendOtp)
router.post('/service/user/updateProfilePic',isTokenValid,updateProfilePic)

module.exports = router;