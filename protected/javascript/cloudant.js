var Url = "<url-de-functions>";
var UrlU = "http:/localhost:3000/protected/api/idPayload";
var UrlI = "http://localhost:3000/protected/api/inst";



const USER = {
  get(){
    return $.ajax({
      type: 'GET',
      url: `${UrlU}`,
      dataType: 'json'
    });
  },
}
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
  get() {
    return $.ajax({
      type: 'GET',
      url: `${Url}/entries`,
      dataType: 'json'
    });
  },
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
var x=0;
var i=0;
var h=0;
var eh=0;
var n=0;
(function() {

  let entriesTemplate;

  function prepareTemplates() {
    entriesTemplate = Handlebars.compile($('#entries-template').html());
  }

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
    prepareTemplates();
    loadEntries();
  });
})();
