"use strict";

var canvas;
var gl;

var numVertices  = 36;               //change to 54?, was 36

var pointsArray = [];
var colorsArray = [];

var vertices = [                              //scaled the given vertices from the pdf to between -1 and 1

    vec4( -1, -1,  0.11, 1.0 ),
    vec4( -0.41,  -1,  0.11, 1.0 ),
    vec4( -0.41,  -0.63,  0.11, 1.0 ),
    vec4( -0.70, -0.41,  0.11, 1.0 ),
    vec4( -1, -0.63, 0.11, 1.0 ),
    vec4( -1,  -1, 1, 1.0 ),
    vec4( -0.41,  -1, 1, 1.0 ),
    vec4( -0.41, -0.63, 1, 1.0 ),
    vec4( -0.70, -0.41, 1, 1.0 ),
    vec4( -1, -0.63, 1, 1.0 ),
    

    ];

var vertexColors = [                 //new updated colors
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange*
        vec4( 1.0, 0.0, 0.1, 0.1 ),  // pinkish*
        vec4( 0.0, 0.5, 0.5, 0.5 ),  // sky blue*
        vec4( 0.3, 0.2, 0.0, 1.0 ),  // brown*
        vec4( 0.5, 0.3, 1.0, 1.0 ),  // purple*
        vec4( 0.3, 1.0, 0.0, 1.0 ),   // light green*
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red*
        vec4( 0.7, 0.2, 1.0, 0.0 ),  // added two new colors for the added surfaces but can't verify because i can view the bottom and top
        vec4( 1.0, 0.6, 0.2, 0.0 ),  // 


    ];

var near = -1;
var far = 1;
var radius = 1;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var left = -1.0;
var right = 1.0;
var ytop = 1.0;
var bottom = -1.0;


var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

function quad(a, b, c, d) {
     pointsArray.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[b]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[d]);
     colorsArray.push(vertexColors[a]);
}


function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);


    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    colorCube();

    var cBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

// sliders for viewing parameters

    document.getElementById("depthSlider").onchange = function(event) {
        far = event.target.value/2;
        near = -event.target.value/2;
    };

    document.getElementById("radiusSlider").onchange = function(event) {
       radius = event.target.value;
    };
    document.getElementById("thetaSlider").onchange = function(event) {
        theta = event.target.value* Math.PI/180.0;
    };
    document.getElementById("phiSlider").onchange = function(event) {
        phi = event.target.value* Math.PI/180.0;
    };
    document.getElementById("heightSlider").onchange = function(event) {
        ytop = event.target.value/2;
        bottom = -event.target.value/2;
    };
    document.getElementById("widthSlider").onchange = function(event) {
        right = event.target.value/2;
        left = -event.target.value/2;
    };

    render();
}


var render = function() {
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        eye = vec3(radius*Math.sin(phi), radius*Math.sin(theta),
             radius*Math.cos(phi));

        modelViewMatrix = lookAt(eye, at , up);
        projectionMatrix = ortho(left, right, bottom, ytop, near, far);

        gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

        gl.drawArrays( gl.TRIANGLES, 0, numVertices );
        requestAnimFrame(render);
    }


// Parametric equation for circle 
//Not sure how to use it
// var parC_x, parC_y, parC_z
// parC_x = r * cos(t)
// parC_y = r * sin(t)


// Parametric equation for line 
//Not sure how to use it
// var parL_x, parL_y, parL_z
// parL_x = r * cos(t)
// parL_y = r * sin(t)


//event listener for animate button
const animateLine_button = document.getElementById("animateLine")
animateLine_button.addEventListener("click", (event) =>{
    animateLine()
})


const animateCircle_button = document.getElementById("animateCircle")
animateCircle_button.addEventListener("click", (event) =>{
    animateCircle()
})

//Animate function for line
function animateLine(){

    // console.log(linex1.value)
    // console.log(liney1.value)
    // console.log(linez1.value)
    // console.log(linex2.value)
    // console.log(liney2.value)
    // console.log(linez2.value)


    var lx1 = document.getElementById("linex1")            //gets the id from the html and assigns them new variables
    var ly1 = document.getElementById("liney1")
    var lz1 = document.getElementById("linez1")

    var lx2 = document.getElementById("linex2")
    var ly2 = document.getElementById("liney2")
    var lz2 = document.getElementById("linez2")

    var cx1 = document.getElementById("CircleX")
    var cy1 = document.getElementById("CircleY")
    var cz1 = document.getElementById("CircleZ")
    var cr = document.getElementById("CircleRadius")


    // console.log(lx1.value)
    // console.log(ly1.value)
    // console.log(lz1.value)
    // console.log(lx2.value)
    // console.log(ly2.value)
    // console.log(lz2.value)

    // console.log(cx1.value)
    // console.log(cy1.value)
    // console.log(cz1.value)
    //console.log(cr.value)



    var startx = [lx1.value, ly1.value, lz1.value]                          //assigns the new variables to the arrays
    var endx = [lx2.value, ly2.value, lz2.value]

    console.log(startx)
    console.log(endx)

    var intervalId = setInterval(function(){
        
        console.log(startx)
        
        var cameraEye = vec3(startx);                       //position of the camera
        var cameraAt = vec3(endx);                         //position of where the camera is looking at
        var cameraUp = vec3(1,1,1);                        //vector
        
        var cameraAnimate = lookAt(cameraEye, cameraAt, cameraUp);

        gl.uniformMatrix4fv(cameraAnimate, false, flatten(cameraAnimate));           //calling the function from the render, but using cameraAnimate
        startx++;                                                                    //update the position each second

    }, 1000);
}



//function to animate circle
function animateCircle(){

    var cx1 = document.getElementById("CircleX")
    var cy1 = document.getElementById("CircleY")
    var cz1 = document.getElementById("CircleZ")
    var cr = document.getElementById("CircleRadius")

    // console.log(cx1.value)
    // console.log(cy1.value)
    // console.log(cz1.value)
    //console.log(cr.value)



    var startx = [cx1.value, cy1.value, cz1.value]                          //assigns the new variables to the arrays

    console.log(startx)
    //console.log(endx)

    var intervalId = setInterval(function(){
        
        console.log(startx)
        
        var cameraEye = vec3(startx);                       //position of the camera
        var cameraAt = vec3(endx);                         //position of where the camera is looking at
        var cameraUp = vec3(1,1,1);                        //vector
        
        var cameraAnimate = lookAt(cameraEye, cameraAt, cameraUp);

        gl.uniformMatrix4fv(cameraAnimate, false, flatten(cameraAnimate));           //calling the function from the render, but using cameraAnimate
        startx++;                                                                    //update the position each second

    }, 1000);
}
