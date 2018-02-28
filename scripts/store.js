/* global $ */
'use strict';
const Store = function () {
  let videos = [];
  const API_KEY = 'AIzaSyDd-ddDT0MeQ9maKwUjbmL5uSxxwCL6Erc';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const decorateResponse = function(response) {
    let videos = response.items.map(item => {
      return {
        id: item.id.videoId, 
        title:  item.snippet.title, 
        thumbnail:  item.snippet.thumbnails.high
      };
    });
    return videos;
  };

  const fetchVideos = function(searchTerm, callback) {
    const query = {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm,
      type: 'video'
    };
    $.getJSON(BASE_URL, query, callback);
  };

  const addVideosToStore = function(videos) {
    this.videos = videos;
    console.log(videos);
  };
  // TASK:
  // 1. Create a `generateVideoItemHtml` function that receives the decorated object
  // 2. Using the object, return an HTML string containing all the expected data
  // TEST IT!
  const generateVideoItemHtml = function (videos) {
    let videoTitle = 
    `
      <div class="js-item-element" data-item-id="${videos.id}">
        <h1>${videos.title}</h1>
        <a href="https://www.youtube.com/watch?v=${videos.id}" data-lity><img src="${videos.thumbnail.url}" ></img></a>
      </div>`;
    return videoTitle;
  };


  function generateVideoHtml(videos) {
    console.log(videos);
    let items = videos.map((item) => generateVideoItemHtml(item));
    return items.join('');

  }

  // TASK:
  // 1. Create a `render` function
  // 2. Map through `store.videos`, sending each `video` through your `generateVideoItemHtml`
  // 3. Add your array of DOM elements to the appropriate DOM element
  // TEST IT!
  const render = function (html) {
    const output = html;
    console.log(output);
    console.log('`render` ran');
    // insert that HTML into the DOM
    $('.results').html(output);
  };



  return {
    fetchVideos, decorateResponse, addVideosToStore, videos, generateVideoHtml,generateVideoItemHtml,render
  };
}();