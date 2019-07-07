/**
 * Web application
 */
const apiUrl = 'https://service.us-east.apiconnect.ibmcloud.com/gws/apigateway/api/1dbe2b0e9520266b9a2bc03584352db5d4977b7cde6507f374f59e94236d5e6d/7fdb8107-a76d-4275-830d-019450118c56/teacherAdvocates';
const guestbook = {
  // retrieve the existing guestbook entries
  //leer los comentarios existentes
  //inicia
  get() {
    return $.ajax({
      type: 'GET',
      url: `${apiUrl}/entries`,
      dataType: 'json'
    });
  },
  //termina

  // add a single guestbook entry
  //agregar un comentario nuevo
  //inicia
  add(name, email, comment) {
    console.log('Sending', name, email, comment)
    return $.ajax({
      type: 'POST',
      url: `${apiUrl}/entries`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        name,
        email,
        comment,
      }),
      dataType: 'json',
    });
  }
  //termina
};

(function() {

  let entriesTemplate;

  function prepareTemplates() {
    entriesTemplate = Handlebars.compile($('#entries-template').html());
  }

  // retrieve entries and update the UI
  function loadEntries() {
    console.log('Loading entries...');
    $('#entries').html('Loading entries...');
    guestbook.get().done(function(result) {
      if (!result.entries) {
        return;
      }

      const context = {
        entries: result.entries
      }
      $('#entries').html(entriesTemplate(context));
    }).error(function(error) {
      $('#entries').html('No entries');
      console.log(error);
    });
  }

  // intercept the click on the submit button, add the guestbook entry and
  // reload entries on success
  $(document).on('submit', '#addEntry', function(e) {
    e.preventDefault();

    guestbook.add(
      $('#name').val().trim(),
      $('#email').val().trim(),
      $('#comment').val().trim()
    ).done(function(result) {
      // reload entries
      loadEntries();
    }).error(function(error) {
      console.log(error);
    });
  });

  $(document).ready(function() {
    prepareTemplates();
    loadEntries();
  });
})();
