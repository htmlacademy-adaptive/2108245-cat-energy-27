// Let's use the 'active' variable to let us know when we're using it
let active = false;

// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
document.querySelector('.example__slider').addEventListener('mousedown',function(){
  active = true;
});

// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
document.body.addEventListener('mouseup',function(){
  active = false;
});
document.body.addEventListener('mouseleave',function(){
  active = false;
});
// Let's figure out where their mouse is at
document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  // Their mouse is here...
  let x = e.pageX;
  // but we want it relative to our wrapper
  x -= document.querySelector('.example__comparison').getBoundingClientRect().left;
  // Okay let's change our state
  scrollIt(x);
});

/*window.addEventListener('resize', function() {
    active = true;
});*/


// Let's use this function
function scrollIt(x){
    let transform = Math.max(0,(Math.min(x,document.querySelector('.example__comparison').offsetWidth)));
    let widthBefore = document.querySelector('.example__comparison').offsetWidth - transform;
    document.querySelector('.example__image-container--after').style.width = transform+"px";
    document.querySelector('.example__image-container--before').style.width = widthBefore+"px";
    document.querySelector('.example__slider').style.left = transform-20+"px";
}

// Let's set our opening state based off the width,
// we want to show a bit of both images so the user can see what's going on
scrollIt(document.querySelector('.example__comparison').offsetWidth / 2);


// Resize slider.
const myObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    const width = Math.floor(entry.contentRect.width);

    if (width > 500) {
      scrollIt(document.querySelector('.example__comparison').offsetWidth / 2);
    }}
    scrollIt(document.querySelector('.example__comparison').offsetWidth / 2);
});

  myObserver.observe(document.querySelector('.example__comparison'));

// And finally let's repeat the process for touch events
// first our middle scroller...
document.querySelector('.example__slider').addEventListener('touchstart',function(){
  active = true;
});
document.body.addEventListener('touchend',function(){
  active = false;
});
document.body.addEventListener('touchcancel',function(){
  active = false;
});
