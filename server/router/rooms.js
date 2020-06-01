import {isTokenValid} from './interceptor';
import { createRoom , getRooms } from '../controller/rooms'
 


router.post('/service/user/createRoom',isTokenValid,createRoom)
router.get('/service/user/getRooms',isTokenValid,getRooms)


module.exports = router;