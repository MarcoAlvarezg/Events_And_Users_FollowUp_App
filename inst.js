var Cloudant = require ('cloudant');
var mydb;
var data2;

class cloudbd {
        conexion(){
            return new Promise(function (resolve, reject){
            var apiUrl2 = 'https://9ae74487-3c39-48d2-8c77-e8e08435d8f0-bluemix:f79e6d0fb071befbaafc4724041b675300b7f4738c2f1cee8c026497b4d838ef@9ae74487-3c39-48d2-8c77-e8e08435d8f0-bluemix.cloudantnosqldb.appdomain.cloud';
            var clodant = Cloudant(apiUrl2, function (er, cloudant, reply) {
                if(er){
                    reject(er);
                    }
                })
            mydb = clodant.db.use('institucion');
            resolve(mydb);
            });
        }
        getDB(){
            return new Promise(function (resolve, reject){
            mydb.find({ selector: { _id: { $gt: "0"}}}, function(error, result){
                if(error){
                    reject(error);
                }
                else{
                    resolve(result);
                }
            })
            });
        }
}
module.exports = cloudbd;
    