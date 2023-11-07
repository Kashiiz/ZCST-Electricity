const electricityService = require("./electricityService");
const store = require("./storageService");
const { login } = require("./puppeteer");

exports.getWater = async () => {
  post("", data, token);
};

exports.getElectricity = async (roomdm) => {
  try {
    let electricityCurrent,electricityHistory;
    let ASPXAUTH =  await getASPXAUTH();

    let electricity = await Promise.all(composeElectricityRequest(roomdm,ASPXAUTH))
    electricity[0].msg == '查询数据异常' ? electricityCurrent = '查询数据异常' :electricityCurrent = {left:electricity[0].data[0].SYL,used:(electricity[1].data[0].zye - electricity[0].data[0].SYL).toFixed(2)};
    electricity[1].msg == '查询数据异常' ? electricityHistory = '查询数据异常' : electricityHistory =electricity[1].data;
    return {
        electricityCurrent:electricityCurrent,
        electricityHistory:electricityHistory
      };
  } catch (error) {
    console.log(error)
  }
  
};

const composeElectricityRequest =  (roomdm,ASPXAUTH) => {
    return [
    electricityService.left(roomdm,ASPXAUTH),
    electricityService.history(roomdm,ASPXAUTH),
  ];
};



const getASPXAUTH =  async() => {
    let ASPXAUTH = store.get("ASPXAUTH");
    if(!ASPXAUTH) {
        let newASPXAUTH = await login();  //Gen NEW ASPXAUTH
        storeASPXAUTH(newASPXAUTH);
        return newASPXAUTH; 
    }
    return ASPXAUTH.data;
};

const storeASPXAUTH =  (ASPXAUTH) => {
    if(ASPXAUTH) {
        store.set('ASPXAUTH',ASPXAUTH)
    }
}