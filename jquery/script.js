$(".dark-btn").click(
    function(){
    $(".box").toggleClass("dark");
    $("body").toggleClass("dark");
    $("button").toggleClass("dark");
    $(".dark-btn").toggleClass("active");
  });


$(".glow-btn").click(
    function(){
    $(".box").toggleClass("glow");
    $("body").toggleClass("glow");
    $(".glow-btn").toggleClass("active");
  });

$(".spin-btn").click(
    function(){
    $(".box").toggleClass("spin");
    $("body").toggleClass("spin");
    $(".spin-btn").toggleClass("active");
  });

$(".show-btn").click(
    function(){
    $(".pic").toggleClass("heshere");
    $(".show-btn").toggleClass("hide");
    
  });

$( function() {
    $( ".draggable" ).draggable();
  } );