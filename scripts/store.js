/* global $ */
'use strict';
const Store = function () {
  let videos = [];
  const API_KEY = 'AIzaSyDd-ddDT0MeQ9maKwUjbmL5uSxxwCL6Erc';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const decorateResponse = function(response) {
    let videos = response.items.map(item => {
      return {
        id:item.id.videoId, 
        title:item.snippet.title, 
        thumbnail:item.snippet.thumbnails.high
      };
    });
    return videos;
  };

  const fetchVideos = function(searchTerm, callback) {
    const query = {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm,
      type: 'videos'
    };
    $.getJSON(BASE_URL, query, callback);
  };

  const addVideosToStore = function(videos) {
    this.videos = videos;
  };
  return {
    fetchVideos, decorateResponse, addVideosToStore, videos
  };
}();