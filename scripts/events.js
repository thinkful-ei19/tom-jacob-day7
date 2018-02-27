/* global store, Item */

'use strict';
// TASK:
// 1. Create a `handleFormSubmit` function that adds an event listener to the form
// 2. The listener should:
//   a) Prevent default event
//   b) Retrieve the search input from the DOM
//   c) Clear the search input field
//   d) Invoke the `fetchVideos` function, sending in the search value
//   e) Inside the callback, send the API response through the `decorateResponse` function
//   f) Inside the callback, add the decorated response into your store using the `addVideosToStore` function
//   g) Inside the callback, run the `render` function 
// TEST IT!

// eslint-disable-next-line no-unused-vars
const events = (function () {
  const handleFormSubmit = function () {
    $('.go').on('click', event => {
      event.preventDefault();
      let query = $('.query').val(); 
      $('.query').val(''); //not sure how the '' works in the val method
      console.log(query);
      fetchVideos(query, decorateResponse()); //start after lunch here
      //render();
    });
  };

  function bindEventListeners() {
    handleFormSubmit();
  }

  // This object contains the only exposed methods from this module:
  return {
    bindEventListeners,
       
  };
}());