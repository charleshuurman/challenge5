// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html. 
//$(document).ready() that's the function. But $(function() is a shorthand version in jQuery

$(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(document).ready(function() {
    $('.saveBtn').on('click', function() {
        // Using `this`, reference the button that was clicked.
        var buttonClicked = $(this);
        
        // Move accross the DOM to find the parent time-block div of this button.
        var timeBlockDiv = buttonClicked.closest('.time-block');
        
        // Retrieves the ID of the time-block div.
        var hourId = timeBlockDiv.attr('id');
        
        // Retrieves the user's input from the textarea within this time-block div.
        var userDescription = timeBlockDiv.find('textarea.description').val();

        // Saves the user's input to local storage using the hourId as the key.
        localStorage.setItem(hourId, userDescription);
    });



  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // Get current hour using Day.js

  var currentHour = dayjs().hour();

  // Loop through each time-block
  $('.time-block').each(function() {
      var block = $(this);  // Current time-block in loop

      // Extract the hour from the ID of the time-block
      var blockHour = parseInt(block.attr('id').split('-')[1]);

      // Compare blockHour with currentHour and add/remove classes accordingly
      if (blockHour < currentHour) {
          block.addClass('past').removeClass('present future');
      } else if (blockHour === currentHour) {
          block.addClass('present').removeClass('past future');
      } else {
          block.addClass('future').removeClass('past present');
      }
  });
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
    
  // Loop through each time-block
  $('.time-block').each(function() {
      // Get the id of the current time-block
      var blockID = $(this).attr('id');
      
      // Use the id to retrieve the corresponding data from localStorage
      var savedText = localStorage.getItem(blockID);
      
      // If there's saved data for this blockID, set it to the textarea
      if (savedText) {
          $(this).find('textarea').val(savedText);
      }
  });

  //
  // TODO: Add code to display the current date in the header of the page.

$("#currentDay").text(dayjs().format('MMMM D, YYYY'));

});
});

