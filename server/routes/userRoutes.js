const exporess = require('express');
const verifyJWT = require('../middleware/verifiyJWT')
const router = exporess();
const {
    getAllUsers,
    createNewUser,
    updateUser,
    deliteUser,
    userPostValidator,
    isEmailused,
    getUser,
    isIdnameused
} = require('../controllers/usersController');

//const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)
router.route('/')
    .get(getAllUsers)
    .post(userPostValidator,isEmailused,isIdnameused,createNewUser)
router.route('/:id')
    .get(getUser)
    .patch(isEmailused,isIdnameused,updateUser)
    .delete(deliteUser)

module.exports = router;