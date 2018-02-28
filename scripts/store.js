/* global $ */
'use strict';
const Store = function () {
  let videos = [];
  let channels = [];
  const API_KEY = 'AIzaSyDd-ddDT0MeQ9maKwUjbmL5uSxxwCL6Erc';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const decorateResponse = function(response) {
    let videos = response.items.map(item => {
      return {
        id: item.id.videoId, 
        title:  item.snippet.title, 
        thumbnail:  item.snippet.thumbnails.high,
        channelId: item.snippet.channelId,
      };
    });
    return videos;
  };
  const getChannelThumbnail = function(response) {
    let channels = response.items.map(item => {
      return { 
        thumbnail: item.snippet.thumbnails.default
      };
    });
    return channels;
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

  const fetchChannels = function(searchTerm, callback) {
    const query = {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm,
      type: 'channel'
    };
    $.getJSON(BASE_URL, query, callback);
  };

  //const addChannelThumbnailToVidos = function(videos) {
  //this.videos = videos;
    //console.log(videos);
  // };

  const generateVideoItemHtml = function (videos, channels) {
    let videoTitle = 
    `
      <div class="js-item-element" data-item-id="${videos.id}">
        <h1>${videos.title}</h1>
        <a href="https://www.youtube.com/watch?v=${videos.id}" data-lity>
          <img src="${videos.thumbnail.url}" ></img>
        </a>
        <h2><a href="https://www.youtube.com/channel/${videos.channelId}"><img src="${channels}"></img> More from this Channel</a></h2>
      </div>`;
    return videoTitle;
  };


  function generateVideoHtml(videos) {
    let items = videos.map((item) => generateVideoItemHtml(item));
    return items.join('');

  }

  function generateChannelHtml(channels) {
    let icon = channels.map((item) => generateVideoItemHtml(item));
    return icon.join('');
  }

  function mergeArrays(videos, channels) {
    // let icon = channels.map((item) => generateVideoItemHtml(item));
    // let items = videos.map((item) => generateVideoItemHtml(item));
    // items.join(''); 
    // icon.join('');
    let icon = generateChannelHtml(channels);
    let items =  generateVideoHtml(videos);
    Array.prototype.push.apply(items, icon);
  }

  const render = function (page) {
    const output = page;
    console.log(output);
    console.log('`render` ran');
    // insert that HTML into the DOM
    $('.results').html(output);
  };

  // const renderc = function (icon) {
  //   const outputC = icon;
  //   console.log(outputC);
  //   console.log('`renderc`  ran');
  //   // insert that HTML into the DOM
  //   $('.channelthumbnail').html(outputC);
  // };

  return {
    fetchVideos, fetchChannels, decorateResponse, getChannelThumbnail, generateChannelHtml, videos, channels, generateVideoHtml, generateVideoItemHtml, mergeArrays, render, 
  };
}();