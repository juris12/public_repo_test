const db =  require('../config/dbConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const loginUser = (req, res) => {
    const {user_email, user_name, user_password} = req.body;
    let sql = '';
    if (!user_password){
      return res.status(400).json({'mesage' : "No password!"});
    } else if (user_email){
      sql = `SELECT * FROM Users WHERE user_email = '${user_email}'`;
    } else if (user_name){
      sql = `SELECT * FROM Users WHERE user_name = '${user_name}'`;
    } else {
      return res.status(400).json({'message' : "No username or email!"});
    }
    db.query(sql, asyncHandler(async (err,result) => {
      if (err) {
        res.status(500).json({"message": 'Server side error! Try again in few hours.'});
        throw err 
      };
      if(!result[0]){
        return res.status(401).json({'message' : "User not found"});
      }
      const pwd_comper = await bcrypt.compare(user_password, result[0].user_password_hash)
      if (pwd_comper) {
        const accessToken = jwt.sign(
          {"userInfo":{
              "username": result[0].user_name,
              "role": result[0].user_role
          }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s'}
        );
        
        const refreshToken = jwt.sign(
          {"username": result[0].user_name},
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d'}
        );
        const object = {
          accessToken:accessToken,
          role:result[0]?.user_role,
          id:result[0]?.id
        }
        const sql = `UPDATE Users SET refresh_token = '${refreshToken}' WHERE id='${result[0].id}';`;
        db.query(sql, (err,result) => {
        if (err) {
            res.status(500).json({"message": 'Server side error! Try again in few hours.'});
            throw err 
        };
        res.cookie('jwt',refreshToken, {
          httpOnly: true,
          sameSite: 'None',
          secure: false,
          maxAge: 24 * 60 * 60 * 1000
        });
        res.json({object});
        });
      } else {
        return res.status(401).json({'message' : "Wrong username sss password"});
      }
    }));
}

const refreshToken = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
  const refreshToken = cookies.jwt

  const sql = `SELECT * FROM Users WHERE refresh_token = "${refreshToken}"`;

  db.query(sql,asyncHandler(async (err,result) => {
    if (err) {
      res.status(500).json({"mesage": 'Server side error! Try again in few hours.'});
      throw err 
    };
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      asyncHandler(async (err, decoded) => {
          if (err) return res.status(403).json({ message: 'Forbidden' })
          if (result[0].user_name !== decoded.username) return res.status(401).json({ message: 'Unauthorized' })

          const accessToken = jwt.sign(
              {
                  "UserInfo": {
                      "username": result[0].user_name,
                      "role": result[0].user_role
                  }
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '60s' }
          )

          res.json({ accessToken })
      })
  )
  }))
}

const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}


module.exports = {
    loginUser,
    refreshToken,
    logout
}

