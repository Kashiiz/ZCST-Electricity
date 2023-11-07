const {getElectricity} = require('../Service/informationService') 
exports.getWater = (req,res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

exports.getElectricity = async (req,res) => {
    return await getElectricity(req.params.roomdm);
     
}

exports.bindRoom = () => {
    
}


