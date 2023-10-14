// wrapped code in Jquery
$(function () {
  const today = dayjs()
  // creates the current date
  function updateCurrentTime() {
    const today = dayjs()
    const formattedTime = today.format('h:mm:ss A');
    const currentDay = today.format('dddd, MMMM D');

    // running time 
    $('#current-time').html(formattedTime)
    $('#current-day').html(currentDay)

      
  }  
  // calls updatecurrentTime when page loads
    updateCurrentTime();
    updateColors();

  function updateColors() {
  // change colors to match time of day in accordance to it being past, present or future 
  
    var currentHour= dayjs().hour();
    console.log(currentHour);
    // compares the hour of the day

    resetColor();

    // runs through each time block to assign the designated color
    $('.time-block').each(function() {
      if ($(this).attr('id') < currentHour) {
        $(this).children('.description').addClass('past');
      } else if ($(this).attr('id') == currentHour) {
        $(this).children('.description').addClass('present');
      } else {
        $(this).children('.description').addClass('future');
      }
    })
  };

  // prevent overlapping of classes
  function resetColor() {
  $('.time-block').each(function(){
    $(this).removeClass('past','present','future');
  })
  }



  // data to input in local storage when save button is clicked
  var userData = JSON.parse(localStorage.getItem('userData')) || [
    {id: "", text: ""},
    {id: "", text: ""},
    {id: "", text: ""},
    {id: "", text: ""},
    {id: "", text: ""},
    {id: "", text: ""},
    {id: "", text: ""},
    {id: "", text: ""},
    {id: "", text: ""},
  ];


  function loadData (){
    // displays the value

    $('.time-block').each(function() {
      var thisID = $(this).attr('id');
      console.log(thisID + '//');

      // text value displays userData.text
      $(this).children('.description').val(userData[thisID -9].text)
    })
  }

  $('button').click(function(event) {

    clickedText = $(event.target).parents('div').children('.description').val()
    clickedId = $(event.target).parents('div').attr('id')
    
    userData[clickedId-9].id = clickedId
    userData[clickedId-9].text = clickedText
    console.log(userData);
    // saving information of user data

    localStorage.setItem('userData',JSON.stringify(userData));
    // store information to local storage

  })

  
  loadData()

 setInterval(updateCurrentTime,1000);
  setInterval(updateColors,60000)  
});  

