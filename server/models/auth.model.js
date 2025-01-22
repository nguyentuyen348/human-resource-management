const db = require("../config/db_connect");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const res_status = require("../config/request_status")


const auth = (auth) => {

};

async function getByCode2(username) {
    return new Promise((resolve, reject) => {
        let query_str = "SELECT * FROM users WHERE deleted_at is null and code = "+"'"+username+"'"+ " limit 1";
        db.query(query_str,function (err,results){
            if(err) return reject(err)
            resolve(results)
        });
    })
}


auth.login = async (request, response) => {
    const username = request.username;
    const password = request.password;

    let user = [];
    let check_pass = null;
    let user_password = null;
    let token = null;
    let user_data = null;
    let data = [];

    try {
        user = await getByCode2(username);
    } catch (err) {
        console.log('user not found')
    }

    let count_user = user.length;
    if (count_user >= 1){
        user_password = user[0].password;
        check_pass = (await bcrypt.compare(password,user_password));
    } else {
        data = {
            'status' : res_status.error,
            'messages' : 'Tài khoản hoặc mật khẩu không tồn tại'
        };
    }

    if (check_pass === false){
        data = {
            'status' : res_status.error,
            'messages' : 'Tài khoản hoặc mật khẩu không chính xác'
        };
    } else {
        const iss = '';
        const time_start = Date.now();
        user_data = user[0];
        token = '';
        token = jwt.sign({id: user_data.ID, user_group_id: user_data.group_id},
            process.env.JWT_KEY,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            }
        );

        data = {
            'status' : res_status.success,
            'token_type' : 'bearer',
            'token' : token,
            'messages' : 'Đăng nhập thành công'
        };

    }

    return response(data);

};

module.exports = auth;