// -------------------------------------------------
// create a pixel drawing tool of with a variable
// sized canvas
// -------------------------------------------------
// declare two variables in global scope
// agpColorSelected stores the colour selected
// blnMouseDown is a flag showing the mousedown state
// in the form
var agpColorSelected;
let blnMouseDown=false;
// -------------------------------------------------
// agpMakeGrid function
// Objective :  create a table cell based matrix to act as the
//              canvas for the art work
// Parameters:  evt is the event passed from the listener function
// -------------------------------------------------
function agpMakeGrid(evt) {
  // turn off the default event processing for the submit event
  evt.preventDefault();
  // reset the default canvas color to white as the default
  document.getElementById("colorPicker").value = "#ffffff";
  // remove any existing art work
  let agpPixelCanvas=document.getElementById('pixelCanvas');
  while (agpPixelCanvas.hasChildNodes()) {
      agpPixelCanvas.removeChild(agpPixelCanvas.firstChild);
  }
  // retrieve the grid heoght and width
  let agpGridHeight=document.getElementById('inputHeight').value;
  let agpGridWidth=document.getElementById('inputWidth').value;

  // create the row elements and within those, the individual table cells
  for (var j=0;j<agpGridHeight;j++){
    let tr=document.createElement('tr');
    agpPixelCanvas.appendChild(tr);
    for (var i=0;i<agpGridWidth;i++){
      // append a table cell to the row in question
      let td=document.createElement('td');
      tr.appendChild(td);
    }
  }
}
// -------------------------------------------------
// agpColorInCanvas function
// Objective :  change the background color of the cell whether
//              a singe click or a drag with the mouse down
// Parameters:  evt is the event passed from the listener function
// -------------------------------------------------
function agpColorInCanvas(evt) {
  // the blnMouseDown flag detects whether the mouse down event is triggered
  // this will be true whether activated for a single click or continuous processing
  if (blnMouseDown===true){
    console.log(agpColorSelected);
    evt.target.style.backgroundColor = agpColorSelected;
  }
}
// -------------------------------------------------
// ensure the various listeners only respond when the
// document is ready
// -------------------------------------------------
document.addEventListener('DOMContentLoaded',(function() {
  // initialise the color picker to white, otherwise it will
  // be whatever colour was left behind after the last page
  // refresh
  document.getElementById("colorPicker").value = "#ffffff";
  // -----------------------------------------------
  // listen for a change to the color picker and
  // capture the color value selected
  // -----------------------------------------------
  let agpColorPicker=document.querySelector('#colorPicker');
  agpColorPicker.addEventListener('change',function(){
    agpColorSelected = agpColorPicker.value;
  })
  // -----------------------------------------------
  // listen for a mousedown event in the canvas area and
  // toggle the background color of the cell to the selected colour
  // -----------------------------------------------
  let agpPixelCanvas=document.querySelector('#pixelCanvas')
  agpPixelCanvas.addEventListener('mousedown',function(){
    blnMouseDown=true;
    agpColorInCanvas(event);
  });
  // -----------------------------------------------
  // if the mouse has been released anywhere in the
  // window area then set the mousedown flag to false
  // to stop painting
  // -----------------------------------------------
  window.addEventListener('mouseup',function(){
    blnMouseDown=false;
  });
  //------------------------------------------------
  // if the mouse is being moved then try to paint
  // the canvas
  //------------------------------------------------
  agpPixelCanvas.addEventListener('mousemove',function(){
    agpColorInCanvas(event);
  });
  // -----------------------------------------------
  // listen for the form submit event
  // and draw a new canvas to be colored
  // -----------------------------------------------
  let agpSizePicker=document.querySelector('#submitButton');
  agpSizePicker.addEventListener('click',agpMakeGrid);
}));
