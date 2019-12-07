/*
 * Web application
 */
var Url = "https://86c1ea06.us-south.apiconnect.appdomain.cloud/guestbook";
var UrlU = "https://developerchain.mybluemix.net/protected/api/idPayload";
/* "http://localhost:3000/protected/api/idPayload"; */
var UrlI = "https://developerchain.mybluemix.net/protected/api/inst";
/* "http://localhost:3000/protected/api/inst"; */
//fs file open


const USER = {
  get(){
    return $.ajax({
      type: 'GET',
      url: `${UrlU}`,
      dataType: 'json'
    });
  },
}
// crear variables de ambiente que almacenas el HOST_BACKEND
// y la consumes con processs.env.HOST_BACKEND
// puedes usar IBMcloudenv o el https://www.npmjs.com/package/dotenv
//retrieve the existing universities entries
const INST = {
  get(){
    return $.ajax({
      type: 'GET',
      url: `${UrlI}`,
      dataType: 'json'
    });
  },
}

const cloudantConnection = {
  // retrieve the existing activitis entries
  get() {
    return $.ajax({
      type: 'GET',
      url: `${Url}/entries`,
      dataType: 'json'
    });
  },
  // add a single activity entry
  add(user, actType, hours, loc, students, ins, raiting, comment) {
    
    console.log('Sending', user, actType, hours, loc, students, ins, raiting, comment)
    return fetch(`${Url}/entries`,{
        method: "POST",
        body: JSON.stringify({
            user,
            actType,
            hours,
            loc,
            students,
            ins,
            rating: raiting,
            comment
          }),
          headers: {
            'Content-Type': 'application/json'
          }
     })
  }
};
var x;
var i;
var h=0;
var eh;
var n=0;
(function() {

  let entriesTemplate;

  function prepareTemplates() {
    entriesTemplate = Handlebars.compile($('#entries-template').html());
  }

  // retrieve entries and update the UI
  function loadEntries() {
    USER.get().done(function(rest){
      if(!rest){
        return
      }
      x = rest.email;
      });
    INST.get().done(function(res){
      if(!res){
        return;
      }
      i = res.docs;
    });
    cloudantConnection.get().done(function(result) {
      if (!result.entries) {
        return;
      }
      var arr = result.entries;
      
      $.each(arr, function(key, entry){
        function checkU(entry){
          return entry.name==x;
        }
        h = arr.filter(checkU);
        })
        var totalH = h.reduce((sum, value) => (typeof value.hours == "number" ? sum + value.hours : sum), 0);
        $("#horasReg").html(totalH);
        $.each(i, function(key, entry){
          $.each(arr, function(k,e){
            function checkI(e){
              return e.institucion==entry.nombre;
            }
            eh = arr.filter(checkI);
          })
        var totalEH = eh.reduce((sum, value) => (typeof value.hours == "number" ? sum + value.hours : sum), 0);
        $("#"+entry._id).html(totalEH+" / 100");   
        
        var k =document.getElementById(entry._rev);
        n=(totalEH/40)*180;
        k.style.background="linear-gradient("+n+"deg, rgb(0, 0, 255) 50%, rgba(0, 0, 0, 0.2) 50%)";
        })
      }
      );
    }

  // intercept the click on the submit button, add the guestbook entry and
  // reload entries on success
  $(document).on('submit', '#addActivity', function(e) {
    e.preventDefault();
    cloudantConnection.add(
      $('#user').val().trim(),
      $('#actType').val().trim(),
      $('#hours').val(),
      $('#loc').val().trim(),
      $('#students').val().trim(),
      $('#ins').val().trim(),
      $('#rat').val().trim(),
      $('#comment').val().trim()
    ).then(function(result) {
      // reload entries
      document.getElementById("addActivity").reset();
      alert("Actividad registrada correctamente");
      prepareTemplates();
      loadEntries();
    }).catch(function(error) {
      alert("Verifique sus datos ingresados");
      console.log(error);
    });
  });

  $(document).ready(function() {
    //prepareTemplates();
    loadEntries();
  });
})();
