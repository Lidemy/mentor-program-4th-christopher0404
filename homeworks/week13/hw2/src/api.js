import $ from 'jquery';

export function getComments(apiUrl, siteKey, before, callback) {
  let url = `${apiUrl}api_comments.php?site_key=${siteKey}`;
  if (before) { url += `&before=${before}`; }

  $.ajax({
    url,
  }).done((data) => {
    callback(data);
  }).fail((err) => {
    console.log(err);
  });
}

export function addComments(apiUrl, data, callback) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}api_add_comments.php`,
    data,
  }).done((postData) => {
    callback(postData);
  }).fail((err) => {
    console.log(err);
  });
}
