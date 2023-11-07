const { post } = require("../request");
const store = require("./storageService");
const BASE_URL = "https://diankong.zcst.edu.cn/App/DBGetPost.ashx";

exports.status = async() => {

}
exports.left = async(roomdm,ASPXAUTH) => {
    let result = await post(
        BASE_URL,
      {
        request_type: "query_type",
        roomdm: roomdm,
      },
      ASPXAUTH
    )

    if(!result.toString().includes("<!DOCTYPE html>") && !result.toString().includes("查询数据异常")) return JSON.parse(result);
    if(result.toString().includes("查询数据异常")) return JSON.parse(`{"code":1,"msg":"查询数据异常"}`)//ASPXAUTH未过期

    this.left();

}
exports.history = async(roomdm,ASPXAUTH) => {
    let history = store.get("elecricityHistory")  //cache
    if(history) return history;

    let result = await post(
        BASE_URL,
        {
          request_type: "query_using",
          roomdm: roomdm,
          start_date:"",
        },
        ASPXAUTH
      )

      if(!result.toString().includes("<!DOCTYPE html>") && !result.toString().includes("查询数据异常")) {
        result = JSON.parse(result);
        storeHistory(result.data);
        return result;
    }
      if(result.toString().includes("查询数据异常")) return JSON.parse(`{"code":1,"msg":"查询数据异常"}`)//ASPXAUTH未过期
    

    this.history();
}


const storeHistory = (data) =>{
    store.set("elecricityHistory",data)
}