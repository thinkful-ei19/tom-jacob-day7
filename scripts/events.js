/* global Store, $ */

'use strict';

// eslint-disable-next-line no-unused-vars
const events = (function () {
  const handleFormSubmit = function () {
    $('.go').on('click', event => {
      event.preventDefault();
      let query = $('.query').val(); 
      $('.query').val(''); //not sure how the '' works in the val method
      //   console.log(query);
      Store.fetchVideos(query, function(response) {
        Store.videos = Store.decorateResponse(response);
        console.log(Store.videos);
        Store.channels = Store.getChannelThumbnail(response);
        console.log(Store.channels);
        const page = Store.mergeArrays(Store.videos, Store.channels);
        console.log(page);
        Store.render(page);
        //Store.render(html);
      });
    });
  };
  function lightBox() {
    $(document).on('lity:open', function (event, instance) {
      console.log('Lightbox opened');
    });
  }
  function bindEventListeners() {
    handleFormSubmit();
    lightBox();
  }

  // This object contains the only exposed methods from this module:
  return {
    bindEventListeners,
       
  };
}());