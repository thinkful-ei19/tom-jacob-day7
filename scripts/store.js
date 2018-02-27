/* global $ */
'use strict';
const Store = function () {
  const API_KEY = 'AIzaSyDd-ddDT0MeQ9maKwUjbmL5uSxxwCL6Erc';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  // TASK:
  // 1. Create a `decorateResponse` function that receives the Youtube API response
  // 2. Map through the response object's `items` array
  // 3. Return an array of objects, where each object contains the keys `id`, `title`, 
  // `thumbnail` which each hold the appropriate values from the API item object. You 
  // WILL have to dig into several nested properties!
  // TEST IT! Grab an example API response and send it into the function - make sure
  // you get back the object you want.
  const decorateResponse = function(response) {
    let videos = response.items.map(item => {return {id:item.id.videoId, title:item.snippet.title, thumbnail:item.snippet.thumbnails.high};});
    return videos;
  };

  // TASK:
  // 1. Create a `fetchVideos` function that receives a `searchTerm` and `callback`
  // 2. Use `searchTerm` to construct the right query object based on the Youtube API docs
  // 3. Make a getJSON call using the query object and sending the provided callback in as the last argument
  // TEST IT! Execute this function and console log the results inside the callback.
  const fetchVideos = function(searchTerm, callback) {
    const query = {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm,
      type: videos
    };
    $.getJSON(BASE_URL, query, callback);
  };
  let videos = {videos: []};
  return {
    fetchVideos, decorateResponse
  };
}();