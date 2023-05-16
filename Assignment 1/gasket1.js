"use strict";

var gl;
var points;

//var NumPoints = Math.floor(Math.random() * (5000 - 500) + 500);

// var NumPoints = random_points()
// console.log(NumPoints, "number of points")                     //shows the number of points in the console log

const arr = [6,5,4,3,2,1,2,3,4,5,6]                               //created array to create the loop feature



function init(size)
{
    var NumPoints = Math.floor(Math.random() * (5000 - 500) + 500);
    console.log(NumPoints, "number of points")                     //shows the number of points in the console log


    // var points = document.getElementById("num_points")
    // var add_points = document.createTextNode(NumPoints)        //these four lines of code is part of the extra feature i tried to implement

    // points.appendChild(add_points)
    // document.getElementById("num_points").innerHTML = ""



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


    gl.viewport(0, 0, canvas.width / size, canvas.height / size);
    // gl.viewport( 0, 0, canvas.width/Math.floor(Math.random() * (5 - 2) + 2), canvas.height/Math.floor(Math.random() * (5 - 2) + 2 )); //changes size of triangle
    //gl.viewport( 0, 0, canvas.width, canvas.height );  original code

    // randomSize()

    gl.clearColor( Math.random(), Math.random(), Math.random(), Math.random() ); //this code changes color
    //gl.clearColor( 1.0, 1.0, 1.0, 1.0 ); original code
    

    // for(var i = 0; i < 10; i++){
    //     console.log("change color")
    //     // console.log(i,"i for color")
    //     gl.clearColor( Math.random(), Math.random(), Math.random(), Math.random() );               //background color
    // }

    
    // randomColor()
      


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


// re-render the canvas every 1 second (1000ms)
// stores the value of interval
const intervalId = setInterval(() => {                                                                  
    if (arr.length === 0) {                        // if array length is 0, clear/stop the interval
      clearInterval(intervalId);
      
      return;
    }
    
    // shift over the array (pop each value of array from index 0)
    init(arr.shift());
}, 1000);


init()                 //cals init function, removed window.onload

// function render() {
//     for(let i = 0; i <= 10; i++){
//         // console.log(i ,"in render loop")
//         gl.clear( gl.COLOR_BUFFER_BIT );
//         gl.drawArrays( gl.POINTS, 0, points.length );
//         setTimeout(function() {                         //added setTimeout 
//             randomColor()

//         }, 2500 * i);
      
//     }    
// }

// function randomColor(i) {
//     setTimeout(function() {
//         for (var i = 10; i > 0; i--){
//             console.log( i, "color in function")
//             gl.clearColor( Math.random(), Math.random(), Math.random(), Math.random() );
//         }
//     }, 2 * i);
//   }

// function randomSize(){                                          ////function to randomize size 10 times
//     for (var i = 10; i > 0; i--){
//         console.log(i, "size in function")
//         gl.viewport( 0, 0, canvas.width/Math.floor(Math.random() * (5 - 2) + 2), canvas.height/Math.floor(Math.random() * (5 - 2) + 2 )); //changes size of triangle
//     }
// }
   
// function random_points(){                    //function to randomize points
//     for (let i = 0; i <= 10; i++){
//         console.log(i, "random points in function")                          //shows in console log that 
//         return Math.floor(Math.random() * (5000 - 500) + 500);        //random number of points between 500 and 5000 are generated
//     }
// }

