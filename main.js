var Airtable = require("airtable");
console.log(Airtable);

Airtable.configure({
  apiKey: 'keyjvY2X7mfBlj7p9',
  endpointUrl: 'https://api.airtable.com'
});
// Replace with the ID of the base you are using (the Elastic Collection). You can use
// Airtable's interactive API documentation for help finding this ID.
var base = Airtable.base('appYzEntWDNqkNlX4');

base('books').select({
  // Specify the max number of records you want returned at once
  maxRecords: 200,
  view: 'Grid view'
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  var bookContainer = document.querySelector('#book-container');

  ///////////////////////////////////////////////////////////////////////////////////////
  // Most of the code you write will probably take place around here
  // As you loop through the records returned from Airtable, you'll do something
  // with the data stored in the `fields` object.
  ///////////////////////////////////////////////////////////////////////////////////////
  records.forEach(function(record) {
    console.log('Retrieved', record.get('title'), record.fields);
    // Use the data in record.fields of your record object to insert the data from your
    var book = document.createElement('div');
    var label = document.createElement('div');
    var coverImageUrl = record.fields.cover_image[0].url;
    var description = document.createElement('div');
      

    label.classList.add('book__label');
    description.classList.add('description');
    label.innerHTML = record.fields.title;
    description.innerHTML = record.fields.description;

    book.classList.add('book');
    book.style.backgroundImage = 'url(' + coverImageUrl + ')';

    // Append the new content to your document
    book.append(label);
    book.append(description);
    bookContainer.append(book);



  });


  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }
});
