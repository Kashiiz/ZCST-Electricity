const {getWater,getElectricity,bindRoom} = require('../controllers/information')
const BASE_URL = '/api';
module.exports =  [
    {
        method:'POST',
        url:BASE_URL + "/info/getWaterInfo/",
        handler:getWater,
    },
    {
        method:'GET',
        url:BASE_URL + "/info/getElectricityInfo/:roomdm",
        handler:getElectricity,
    },
    {
        method:'POST',
        url:BASE_URL + "/info/bindRoom/",
        handler:bindRoom,
    },
]