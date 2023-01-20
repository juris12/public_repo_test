const asyncHandler = require('express-async-handler');
const ROLS_LIST = require('../config/profilConfig')
const bcrypt = require('bcrypt');
const db =  require('../config/dbConfig')


const getAllUsers = async (req,res) => {
    const sql = `SELECT * FROM Users `;
    db.query(sql,asyncHandler(async (err,result) => {
        if (err) throw err;
        if(!result?.length){
            return res.status(400).json({message: 'No users found'});
        }
        const newarr = []
        for(let i = 0;i<result.length;i++){
            const {user_password_hash,...restresult} = result[i]
            newarr.push(restresult)
        }
        res.send(newarr)
    }));  
};
const getUser = (req,res) => {
    const sql = `SELECT * FROM Users WHERE id="${req.params.id}"`;
    db.query(sql,asyncHandler(async (err,result) => {
        if (err) throw err;
        if(!result?.length){
            return res.status(400).json({message: 'No users found'});
        }
        res.send(result)
    })); 
}
const isEmailused = (req, res, next) => {
    if(!req.body.user_email){next()}
    console.log(req.body)
    const sql3 = `Select * FROM Users WHERE user_email="${req.body.user_email}"`
    db.query(sql3, asyncHandler(async (err,result) => {
      if (err) res.json({error: err});
      if (result.length != 0) {
        res.status(409).json({message: 'email alredy in use!'});
      } else{
        next()
      } 
      }    
      ));
    
  }
const isIdnameused = (req, res, next) => {
    if(!req.body.user_name){next()}
    const sql3 = `Select * FROM Users WHERE user_name="${req.body.user_name}"`
    db.query(sql3,asyncHandler(async(err,result) => {
      if (err) res.json({error: err});
      if (result.length != 0) {
        res.status(409).json({message:'name alredy in use!'});
      } else{
        next()
      } 
      }    
      ));
    
  }
const userPostValidator = (req, res, next) => {
    const data = {
        ...req.body
      }
    if (!data.user_email || !data.user_name || !data.user_password ){
        res.status(400).json({message: 'All fields are required'});
    }   else{
        next()
    }
}
const createNewUser =  asyncHandler(async (req, res)=> {
    const data = {
        ...req.body
      }
    try {
        const password = await bcrypt.hash(data.user_password,10)
        const sql = `INSERT INTO Users (user_email, user_name, user_bio, user_password_hash, user_img, user_role)
        VALUES 
        ("${data.user_email}",
         "${data.user_name}",
         "${data.user_bio ? data.user_bio : null}",
         "${password}",
         "${data.user_img ? data.user_img : null}",
         "${data.role ? data.role : ROLS_LIST.User}")
        ;`;
        db.query(sql, asyncHandler(async(err,result) => {
            if (err) {
                res.status(500).json({message: 'Server side error! Try again in few hours.'});
                throw err 
            };
            res.status(201).json({message: `New user ${data.user_name} created`});
        }));
    } catch (err) {
        res.status(500).json({message: 'Server side error! Try again in few hours.'});
    }
})


const updateUser = asyncHandler(async (req,res) => {
    const data = {
        ...req.body
      }
    try {
        let password = undefined
        if(data.password&&data.newpassword){
            const pwd_comper = await bcrypt.compare(user_password, result[0].user_password_hash)
            if(pwd_comper){password = await bcrypt.hash(data.user_newpassword,10)}
        }
        const sql = `UPDATE Users SET 
            ${data.user_email?`user_email="${data.user_email}"`:''}
            ${data.user_name?`,user_name="${data.user_name}"`:''}
            ${data.user_bio?`,user_bio="${data.user_bio}"`:''}
            ${password?`,user_password_hash="${password}"`:''}
            ${data.user_img?`,user_img="${data.user_img}"`:''}
            ${data.role?`,user_role="${data.role}" `:''}
        WHERE id="${req.params.id}"`;
        
        db.query(sql, asyncHandler(async(err,result) => {
            if (err) {
                res.status(500).json({message: 'Server side error! Try again in few hours.'});
                throw err 
            };
            res.status(201).json({message: `User ${data.user_name} updated`});
        }));
    } catch (err) {
        res.status(500).json({message: 'Server side error! Try again in few hours.'});
    }
});

const deliteUser = asyncHandler(async (req,res) => {
    const id = req.params.id
    if (!id||typeof id !== 'number'&&id%1!==0) {
        return res.status(400).json({ message: 'User ID Required' })
    }
    const sql = `DELETE FROM Users WHERE id="${id}"`
    db.query(sql,asyncHandler(async (err,result) => {
        if (err) throw err;
        if(result?.affectedRows === 0){
            return res.status(400).json({message: 'No users found'});
        }
        res.json({message: `User with id ${id} delited`});
    })); 
    

    
});

module.exports = {
    getAllUsers,
    userPostValidator,
    getUser,
    isEmailused,
    isIdnameused,
    createNewUser,
    updateUser,
    deliteUser
}