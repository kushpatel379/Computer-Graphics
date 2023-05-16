"use strict";

var gl;
var points;

let color = "#000000"
let speed = 1000;
const rgba = convertHexToRGB(color);
var R,G,B;
var id;
var k = 1;
var vertices;

//const arr = [6,5,4,3,2,1,2,3,4,5,6]                               //created array to create the loop feature
let arrValues = [6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6];
let arr = [...arrValues];
let intervalId = interval(speed, color)

function init(size)
{

    const status_change = document.getElementById("status");

    const points_slider = document.getElementById("points");
    points_slider.addEventListener('input', () => {
        var NumPoints = parseInt(points_slider.value);
        status_change.textContent = "Status: Changing Number of points"
        //status_change.append("Status: Changing Number of points")

        console.log(NumPoints)
    })

    var NumPoints = points_slider.value;                             //WORKS
    //console.log(NumPoints, "number of points")                     //shows the number of points in the console log

    const speed_slider = document.getElementById("speed");
    console.log(speed_slider.value, "speed")
    speed_slider.addEventListener("change", (event) =>{
       
        speed = event.target.value;
        console.log(NumPoints, "points slider")
        status_change.textContent = "Status: Changing Speed"
        clearInterval(intervalId);
        intervalId = interval(speed, color)
    })

    const size_slider = document.getElementById("size");            //WORKS
    size_slider.addEventListener('input' ,() => {
        const update_size = parseInt(size_slider.value);
        canvas.width = update_size;
        canvas.height = update_size;
        status_change.textContent = "Status: Changing Size"
    })

    // const color_picker = document.getElementById("colorPicker")                #another way i tried to change the color
    // color_picker.addEventListener('input', (event) =>{
    //     color = event.target.value
    //     status_change.textContent = "Changing Color"
    //     clearInterval(intervalId);
    //     intervalId = interval(speed, color)
    //     console.log(color)
    //     gl.clearColor(color, color, color, color ); //this code changes color

    // })

    var color_picker = document.getElementById("colorPicker").value;
    var newColor = color_picker.replace('#',"");                                         //this attempt, i changed the color picker values to the webgl, clear color values
    R = Math.round(parseInt(newColor.slice(1, 3), 16) / 255);                                                                             //converts RGB values to clearColor values
    G = Math.round(parseInt(newColor.slice(3, 5), 16) / 255);
    B = Math.round(parseInt(newColor.slice(5, 7), 16) / 255);
	
    color = [R/255, G/255, B/255, 1.0];
    console.log(color);
    
    const printButton = document.getElementById("print")              //this prints the values of points, speed, and size
    printButton.addEventListener('click', () =>{
     
      
      const pointsLabel = document.getElementById("points_label");
      pointsLabel.innerHTML = "Points: " + NumPoints;

      const speedLabel = document.getElementById("speed_label");
      speedLabel.innerHTML = "Speed: " + speed;
      
      const sizeLabel = document.getElementById("size_label");
      sizeLabel.innerHTML = "Size: " + canvas.height + "," + canvas.width;


      console.log("print")
    });
    

    const restart_button = document.getElementById("restart");          //code that restarts the animation
    restart_button.addEventListener("click", () => {
        arr = [...arrValues];                                          //this makes the array go back the start

        clearInterval(intervalId);
        intervalId = interval(speed, color);
        console.log("values cleared", arr);
        status_change.textContent = "Status: "
        
    });

    // const vertex_button = document.getElementById("vertex");          //code that lessens the number of animations
    // vertex_button.addEventListener("click", () => {

    //     let arrValues = [4, 3, 2, 1, 2, 3, 4];
    //     let arr = [...arrValues];
    //     let intervalId = interval(speed, color)
    //     clearInterval(intervalId);
    //     intervalId = interval(speed, color)
    //     status_change.textContent = "Status: Changing Vertices"
        
    // });



    var canvas = document.getElementById( "gl-canvas" );


    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.

    var vertices = [                 
        vec2( -1, -1 ),
        vec2(  0,  1 ),
        vec2(  1, -1 )
    ];

    // Specify a starting point p for our iterations
    // p must lie inside any set of three vertices

    var u = add( vertices[0], vertices[1] );
    var v = add( vertices[0], vertices[2] );
    var p = scale( 0.25, add( u, v ) );

    // And, add our initial point into our array of points

    points = [ p ];

    // Compute new points
    // Each new point is located midway between
    // last point and a randomly chosen vertex

    for ( var i = 0; points.length < NumPoints; ++i ) {
        var j = Math.floor(Math.random() * 3);
        p = add( points[i], vertices[j] );
        p = scale( 0.5, p );
        points.push( p );
    }

    //
    //  Configure WebGL
    //


    gl.viewport(0, 0, canvas.width / size, canvas.height / size);           //not sure whether to keep '/ size'
    



    //gl.clearColor( newColor, newColor, newColor, newColor ); //this code changes color
    //gl.clearColor(color, color, color, color ); //this code changes color, but doesnt update the triangle right now
    gl.clearColor(rgba.red, rgba.green, rgba.blue, rgba.alpha);
      


    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    
    render();   
}


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, points.length );
}



// const speed_slider = document.getElementById("speed");

// re-render the canvas every 1 second (1000ms)
// stores the value of interval
function interval(speed, color) {                                     //this functions mostly stayed the same from the previous homework, other than adding color as another parameter
    return setInterval(() => {
      if (arr.length === 0) {
        // if array length is 0, clear/stop the interval
        clearInterval(intervalId);
  
        return;
      }
  
      // shift over the array (pop each value of array from index 0)
      init(arr.shift(), color);convert
    }, speed);
}                                  //to change speed



function convertHexToRGB(hex) {                            //function to convert color values 
    
    let newColor = hex.replace("#", "");                   // removes the # from the hex
                                                           // eg. #ffffff -> ffffff
    return {   
      R: parseInt(newColor.slice(1, 3), 16) / 255,              // takes the first 2 values of ffffff eg, ff and converts it to decimal                                                             
      G: parseInt(newColor.slice(3, 5), 16) / 255,              // takes the first 2 values of ffffff eg, ff and converts it to decimal
      B: parseInt(newColor.slice(5, 7), 16) / 255,                // then divides by 255 to get the 0-1 range
      alpha: 1, // opacity                                      // uses Math.round to round the value to the nearest integer
    };
}

init()                 //cals init function, removed window.onload



