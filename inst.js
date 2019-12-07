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
                    //console.log(result);
                    resolve(result);
                }
            })
            });
        }
/* 
    conexionB(){
        return new Promise(function (resolve, reject){
        var apiUrl2 = 'https://9ae74487-3c39-48d2-8c77-e8e08435d8f0-bluemix:f79e6d0fb071befbaafc4724041b675300b7f4738c2f1cee8c026497b4d838ef@9ae74487-3c39-48d2-8c77-e8e08435d8f0-bluemix.cloudantnosqldb.appdomain.cloud';
        var cldt = Cloudant(apiUrl2, function (er, cloudant, reply) {
            if(er){
                reject(er);
                }
            })
        data2 = cldt.db.use('teach_adv');
        resolve(data2);
        //console.log("conectado con teach_adv");
        });
    }

    getDB2(){
        return new Promise(function (resolve, reject){
            data2.find({ selector: {_id:{ $gt:"0"}},fields: ["user","institucion","hours"]}, function (error, result){
                if(error){
                    reject(error);
                   // console.log(error);
                }else{
                    //console.log(result);
                    resolve(result.docs);
                }
            });
        })
    }  */
}
module.exports = cloudbd;
    /* get() {
              return $.ajax({
              method: 'GET',
              url: `${apiUrl2}`,
              dataType: 'json'
              });
              }, 
           };*/
           /* (function() {
               let entriesTemplate;

            function prepareTem(){
                entriesTemplate = Handlebars.compile($('#entries-temp').html());
            }

           function load(){
            console.log('load institucion...');
            $('#inst').html('cargando instituciones...');
           DB.get().done(function(result){
               if(!result.entries){
                   return;
               }
            const context = {
                entries: result.entries
            }
            $('#inst').html(entriesTemplate(context));
             }).error(function(error) {
            $('#inst').html('No hay instituciones');
            console.log(error);
            });
           }

           $(document).ready(function(){
               prepareTem();
               load();
           });
})(); */