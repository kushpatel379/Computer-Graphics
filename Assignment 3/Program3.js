let newposX = 0;
let newposY = 0; //created new variables for rubber banding
let dragX = 0;
let dragY = 0;
let xDown = 0;
let yDown = 0;
let is_down = false;
let angle = 0;

let selectedShape = "polygon";

function initialize() {
  canvasRectangle = document.getElementById("layer1");

  is_down = false; // mouse hasn't been pressed
}

const shapeDropdown = document.getElementById("shape_selection");
shapeDropdown.addEventListener("change", (event) => {              //checks what shape was selected
  selectedShape = event.target.value;
  renderShape(selectedShape, 150, 150);                            //that shape is than sent to the renderShape function
});

function initLine(x = 0, y = 0) {                                      //starting line 
  const canvasLine = document.getElementById("layer1");
  const line = canvasLine.getContext("2d");
  line.clearRect(0, 0, canvasRectangle.width, canvasRectangle.height); //clears the previous shape

  const startX = x;
  const startY = y;
  const endX = x + 200;

  line.beginPath();
  line.moveTo(startX, startY); //position and dimension of the line
  line.lineTo(endX, startY);
  line.stroke();

  is_down = false; // mouse hasn't been pressed
}

function initCircle(x = 0, y = 0) {                                     //starting circle
  const canvasCircle = document.getElementById("layer1");
  const circle = canvasCircle.getContext("2d");
  circle.clearRect(0, 0, canvasCircle.width, canvasCircle.height); //clears the previous shape

  const startX = x;
  const startY = y;
  const radius = 70;

  circle.beginPath();
  circle.arc(startX, startY, radius, 0, 2 * Math.PI); //position and dimension of the circle
  circle.stroke();
}

function initRectangle(x = 0, y = 0) {                                //starting rectangle
  const canvasRectangle = document.getElementById("layer1");
  const rectangle = canvasTriangle.getContext("2d");
  rectangle.clearRect(0, 0, canvasRectangle.width, canvasRectangle.height);

  const rectStartX = x;
  const rectStartY = y;
  const rectWidth = 150;
  const rectHeight = 100;

  rectangle.beginPath();
  rectangle.rect(rectStartX, rectStartY, rectWidth, rectHeight); //position and dimension of the rectangle
  rectangle.stroke(); // draws the rectangle

  is_down = false; // mouse hasn't been pressed
}

function initTriangle(x = 0, y = 0) {                                 //starting triangle
  const canvasTriangle = document.getElementById("layer1");
  const triangle = canvasTriangle.getContext("2d");
  triangle.clearRect(0, 0, canvasRectangle.width, canvasRectangle.height); //clears the previous shape

  const topPointStartX = x;
  const topPointStartY = y;

  const leftPointX = x - 100;
  const leftPointY = y + 200;

  const rightPointX = x + 100;
  const rightPointY = y + 200;

  triangle.beginPath();
  triangle.moveTo(topPointStartX, topPointStartY); //position and dimension of the triangle
  triangle.lineTo(leftPointX, leftPointY);
  triangle.lineTo(rightPointX, rightPointY);
  triangle.closePath(); //draws two lines and than closes the shape with the third line
  triangle.stroke();
}

function initPolygon(x = 0, y = 0) {                                      //starting polygon
  const canvasPolygon = document.getElementById("layer1");
  const polygon = canvasPolygon.getContext("2d");
  polygon.clearRect(0, 0, canvasRectangle.width, canvasRectangle.height); //clears the previous shape

  const topX = x;
  const topY = y;

  const leftTopX = x - 100;
  const leftTopY = y + 100;

  const leftBottomX = x - 100;
  const leftBottomY = y + 200;

  const rightBottomX = x + 100;
  const rightBottomY = y + 200;

  const rightTopX = x + 100;
  const rightTopY = y + 100;

  polygon.beginPath();
  polygon.moveTo(topX, topY);
  polygon.lineTo(leftTopX, leftTopY); //position and dimension of the polygon
  polygon.lineTo(leftBottomX, leftBottomY);
  polygon.lineTo(rightBottomX, rightBottomY);
  polygon.lineTo(rightTopX, rightTopY);
  polygon.closePath(); //closes the shape
  polygon.stroke();
}

// callback for mouse down events
function mouse_down(event) {
  canvasRectangle = document.getElementById("layer1");
  canvasLine = document.getElementById("layer1");
  canvasCircle = document.getElementById("layer1");
  canvasTriangle = document.getElementById("layer1");
  canvasPolygon = document.getElementById("layer1");

  var rectangle = canvasRectangle.getContext("2d");
  var line = canvasLine.getContext("2d");
  var circle = canvasCircle.getContext("2d");
  var triangle = canvasTriangle.getContext("2d");
  var polygon = canvasPolygon.getContext("2d");

  const getCanvasTopPositionFromWindow = (canvas) => {
    const { top, left } = canvasRectangle.getBoundingClientRect();
    return { top: top + window.scrollY, left: left + window.scrollX };
  };

  xDown = event.clientX - getCanvasTopPositionFromWindow().left; //position of x and y when mouse is clicked
  yDown = event.clientY - getCanvasTopPositionFromWindow().top;

  //console.log(xDown,yDown);

  is_down = true;

  newposX = rectangle.x - xDown; //new position of x and y
  newposY = rectangle.y - yDown;
  //console.log(newposX,newposY);

  coords = "X: " + x + " Y: " + y + " is_down = " + is_down;

  document.getElementById("val1").innerHTML = coords;
}

// callback for mouse move events
function mouse_move(event) {
  canvasRectangle = document.getElementById("layer1");
  canvasLine = document.getElementById("layer1");
  canvasCircle = document.getElementById("layer1");
  canvasTriangle = document.getElementById("layer1");
  canvasPolygon = document.getElementById("layer1");

  var rectangle = canvasRectangle.getContext("2d");
  var line = canvasLine.getContext("2d");
  var circle = canvasCircle.getContext("2d");
  var triangle = canvasTriangle.getContext("2d");
  var polygon = canvasPolygon.getContext("2d");

  x = event.clientX;
  y = event.clientY;
  //console.log(x,y);

  if (is_down) {
    //goes to the if statement based on the shape selected

    var newX = x + newposX;
    var newY = y + newposY;
    var newWidth = Math.abs(x - xDown); //new width and height of the shape based on the mouse
    var newHeight = Math.abs(y - yDown);
    const newRotateX = event.clientX - is_down.x;
    angle += newRotateX; //angle of the rotation
    //console.log(x,y);
    console.log(newWidth, newHeight);

    const shapeDropdown = document.getElementById("shape_selection");
    shapeDropdown.addEventListener("change", (event) => {
      const shapeValue = event.target.value;
      if (event.target.value == "line") {
        initLine(); //calls the function based on selection that prints the line in its orginal postion and without transformations
        line.beginPath();
        line.moveTo(newX, newY); //position and dimension of the line
        line.lineTo(x, y);
        line.stroke();
      }

      if (event.target.value == "circle") {
        initCircle(); //calls the function based on selection that prints the circle in its orginal postion and without transformations
        circle.beginPath();
        circle.arc(newX + newWidth / 2, newY + newHeight / 2, newWidth / 2, 0, 2 * Math.PI); //position and dimension of the circle
        circle.stroke();
      }

      if (event.target.value == "rectangle") {
        initRectangle(); //calls the function based on selection that prints the rectangle in its orginal postion and without transformations
        rectangle.beginPath();
        rectangle.rect(newX, newY, newWidth, newHeight); //position and dimension of the rectangle
        rectangle.stroke();
        console.log("rec");
      }

      if (event.target.value == "triangle") {
        initTriangle(); //calls the function based on selection that prints the triangle in its orginal postion and without transformations
        triangle.moveTo(newX, newY); //position and dimension of the triangle
        triangle.stroke(newX, newY, newWidth, newHeight);
      }

      if (event.target.value == "polygon") {
        initPolygon(); //calls the function based on selection that prints the polygon in its orginal postion and without transformations
        polygon.moveTo(newX, newY);
        polygon.stroke(newX, newY, newWidth, newHeight);
      }
    });

    return;
  }

  coords = "X: " + x + " Y: " + y + " is_down = " + is_down;
  document.getElementById("val2").innerHTML = coords;
}

// callback for mouse up events
function mouse_up(event) {
  is_down = false;

  const canvasRectangle = document.getElementById("layer1");

  const xDown = event.clientX - canvasRectangle.offsetLeft;          //finds the coordinates of the mouse when the mouse is up AFTER clicking
  const yDown = event.clientY - canvasRectangle.offsetTop;

  renderShape(selectedShape, xDown, yDown);                           //the new coordinates are sent into the renderShape function

  coords = "X: " + xDown + " Y: " + yDown + " is_down = " + is_down;

  document.getElementById("val3").innerHTML = coords;
}

function renderShape(selectedShape = "line", xDown = 0, yDown = 0) {           //based on what shape is selected, it calls the starting shape, and translate the shape if the mouse is clicked
  switch (true) {
    case selectedShape === "line":
      initLine(xDown, yDown);
      break;

    case selectedShape === "circle":
      initCircle(xDown, yDown);
      break;

    case selectedShape === "rectangle":
      initRectangle(xDown, yDown);
      break;

    case selectedShape === "triangle":
      initTriangle(xDown, yDown);
      break;

    case selectedShape === "polygon":
      initPolygon(xDown, yDown);
      break;

    default:
      initRectangle(xDown, yDown);
      break;
  }
}




//I have the following code commented out because it has the code where i tried to translate, scale, and rotate, but could not get scale and rotate to work
//
// var newposX = 0;
//     var newposY = 0;                                           //created new variables for rubber banding
//     var dragX, dragY = 0;
//     var xDown, yDown, is_down = false;
//     var angle = 0;
                                    
//     // callback for mouse down events
//     function mouse_down(event) {
//         canvasRectangle = document.getElementById("layer1");
//         canvasLine = document.getElementById("layer1");
//         canvasCircle = document.getElementById("layer1");
//         canvasTriangle = document.getElementById("layer1");
//         canvasPolygon = document.getElementById("layer1");

//         var rectangle = canvasRectangle.getContext("2d");
//         var line = canvasLine.getContext("2d");
//         var circle = canvasCircle.getContext("2d");
//         var triangle = canvasTriangle.getContext("2d");
//         var polygon = canvasPolygon.getContext("2d");
    
//         xDown = event.clientX;              //position of x and y when mouse is clicked
//         yDown = event.clientY;
        
        
//         //console.log(xDown,yDown);
    
//         is_down = true;
        
        
    
//         newposX = rectangle.x - xDown;                     //new position of x and y
//         newposY = rectangle.y - yDown;
//         //console.log(newposX,newposY);
    
//         coords = "X: "+ x + " Y: " + y + " is_down = " + is_down;
    
//         document.getElementById("val1").innerHTML = coords;
//     }
    
//     // callback for mouse move events
//     function mouse_move(event) {
//         canvasRectangle = document.getElementById("layer1");
//         canvasLine = document.getElementById("layer1");
//         canvasCircle = document.getElementById("layer1");
//         canvasTriangle = document.getElementById("layer1");
//         canvasPolygon = document.getElementById("layer1");


//         var rectangle = canvasRectangle.getContext("2d");
//         var line = canvasLine.getContext("2d");
//         var circle = canvasCircle.getContext("2d");
//         var triangle = canvasTriangle.getContext("2d");
//         var polygon = canvasPolygon.getContext("2d");

//         x = event.clientX;
//         y = event.clientY;
//         //console.log(x,y);
    
//         if(is_down)	{                                               //goes to the if statement based on the shape selected
    
//             var newX = x + newposX;
//             var newY = y + newposY;
//             var newWidth = Math.abs(x-xDown);                    //new width and height of the shape based on the mouse
//             var newHeight = Math.abs(y-yDown);
//             const newRotateX = event.clientX - is_down.x;
//             angle += newRotateX;                                  //angle of the rotation
//             //console.log(x,y);
//             console.log(newWidth,newHeight);


//             const shapeDropdown = document.getElementById("shape_selection");
//             shapeDropdown.addEventListener('change', (event) => {


//                 const shapeValue = event.target.value;
//                 if(event.target.value == "line"){
//                     initLine();                        //calls the function based on selection that prints the line in its orginal postion and without transformations
//                     line.beginPath()
//                     line.moveTo(newX,newY);         //position and dimension of the line
//                     line.lineTo(x,y);
//                     line.stroke();
//                 }
    
//                 if(event.target.value == "circle"){
//                     initCircle();                        //calls the function based on selection that prints the circle in its orginal postion and without transformations
//                     circle.beginPath();
//                     circle.arc(newX + (newWidth / 2),newY + (newHeight / 2), newWidth / 2, 0 , 2 * Math.PI);         //position and dimension of the circle
//                     circle.stroke();
//                 }
    
//                 if(event.target.value == "rectangle"){
//                     initRectangle();                        //calls the function based on selection that prints the rectangle in its orginal postion and without transformations
//                     rectangle.beginPath();
//                     rectangle.rect(newX,newY,newWidth,newHeight);         //position and dimension of the rectangle
//                     rectangle.stroke();
//                     console.log("rec");
//                 }
    
//                 if(event.target.value == "triangle"){
//                     initTriangle();                        //calls the function based on selection that prints the triangle in its orginal postion and without transformations
//                     triangle.moveTo(newX,newY);                         //position and dimension of the triangle
//                     triangle.stroke(newX, newY, newWidth, newHeight);


//                 }
    
//                 if(event.target.value == "polygon"){
//                     initPolygon();                        //calls the function based on selection that prints the polygon in its orginal postion and without transformations
//                     polygon.moveTo(newX,newY);
//                     polygon.stroke(newX, newY, newWidth, newHeight);
                    
//                 }
    
//             })
//             // ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
//             // // elastic band
//             // ctx2.strokeStyle = "yellow";
//             // ctx2.strokeRect(xDown,yDown, x-xDown, y-yDown);
//             return
//         }
    
//         coords = "X: "+ x + " Y: " + y +" is_down = " + is_down;	
//         document.getElementById("val2").innerHTML = coords;
//     }
    
    
//     // callback for mouse up events
//     function mouse_up(event) {
    
//         xUp = event.clientX;
//         yUp = event.clientY;
    
//         is_down = false;
        
    
//         //ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
//         coords = "X: "+ xUp + " Y: " + yUp +" is_down = " + is_down;
    
//         document.getElementById("val3").innerHTML = coords;
//     }

