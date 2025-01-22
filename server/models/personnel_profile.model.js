const db = require("../config/db_connect");
const {response} = require("express");

const personnelProfileModel = (personnel_profile) => {

};

personnelProfileModel.getById = (id, callback) => {
    try {
        const sqlStr = "Select * FROM personnels WHERE ID = ? ";
        db.query(sqlStr, id, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(result);
        });
    }catch (e){
        return callback(e);
    }
};

personnelProfileModel.getAllPaginate = (query,callback) => {
    const limit_num = parseInt(query.limit) ?? 20;
    const offset = parseInt(query.limit)*parseInt(query.page-1) ?? 1;

    const orderBy = query.orderBy ?? 'updated_at';
    const sortOrder = query.sortOrder ?? 'DESC';

    // Lấy tổng số bản ghi
    const total = "Select count(*) FROM personnels where deleted_at is null";

    const sqlStr1 = "Select * FROM personnels";
    const sqlStr2 =  " order by "+orderBy+" "+ sortOrder;
    const sqlStr3 =  " limit "+limit_num+" offset "+offset;

    let sqlStr = "";

    if (orderBy || sortOrder){
        sqlStr = sqlStr1 + sqlStr2 + sqlStr3;
    } else {
        sqlStr = sqlStr1 + sqlStr3;
    }

    try {
        db.query(sqlStr, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(result);
        });
    }catch (e){
        return callback(e);
    }

};

// [C] Tạo nhân sự mới
personnelProfileModel.create_profile = (request, response) => {
    try {
        const data_request = request.body;

        return response(data_request);

        db.query(sqlStr, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(result);
        });

    } catch (e) {
        return callback(e);
    }
};





module.exports = personnelProfileModel;