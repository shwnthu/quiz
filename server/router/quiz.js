import {isTokenValid} from './interceptor';
import { createQuiz , getAllQuiz } from '../controller/quiz'



router.post('/service/user/createQuiz',isTokenValid,createQuiz)
router.get('/service/user/getAllQuiz',isTokenValid,getAllQuiz)



// router.post('/service/user/updateProfilePic',isTokenValid,updateProfilePic)

module.exports = router;