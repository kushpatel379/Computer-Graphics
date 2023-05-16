//added button event listeners for algorithm selection
const dda_button = document.getElementById("DDA")       
dda_button.addEventListener("click", (event) =>{
    drawDDA()

})


const midpointLine_button = document.getElementById("MidpointLine")
midpointLine_button.addEventListener("click", (event) =>{
    drawMidpointLine()
})

const midpointCircle_button = document.getElementById("MidpointCircle")
midpointCircle_button.addEventListener("click", (event) =>{
    drawmidpointCircle()
})


const midpointEllipse_button = document.getElementById("MidpointEllipse")
midpointEllipse_button.addEventListener("click", (event) =>{
    drawmidpointEllipse()
})

const bezier_button = document.getElementById("Bezier")
bezier_button.addEventListener("click", (event) =>{
    drawbezier()
})

const hermite_button = document.getElementById("Hermite")
hermite_button.addEventListener("click", (event) =>{
    drawhermite()
})


const bspline_button = document.getElementById("B-Spline")
bspline_button.addEventListener("click", (event) =>{
    drawbspline()
})

//added a button that clears the canvas
const clear_button = document.getElementById("clear")
clear_button.addEventListener("click", (event) =>{
    clearCanvas()
})

//converted the dda.c file to js
function DDA(x0, y0, x1, y1) {
    var c = document.getElementById("myCanvas");            
    var ctx = c.getContext("2d");
    let dy = y1 - y0;
    let dx = x1 - x0;
    let m = dy / dx;
    let y = y0;

    for (let x = x0; x <= x1; x++) {
        ctx.fillRect(x, Math.round(y), 1, 1);                             //draws the line
        y = y + m;
        console.log("in for loop")
    }

    // ctx.beginPath();
    // ctx.moveTo(25, 1);                                   //uses htmal canvas to compare
    // ctx.lineTo(50, 75);
    // ctx.stroke();

}

//function that assignts the input values to DDA parameters
function drawDDA(){
    var x0 = parseInt(document.getElementById("linex1").value);          //tried without parseInt and it would only show the start and end point  
    var y0 = parseInt(document.getElementById("liney1").value);
    var x1 = parseInt(document.getElementById("linex2").value);
    var y1 = parseInt(document.getElementById("liney2").value);
    y0 = Math.abs(y0 - 300);                                             //makes the shape draw from the bottom left corner
    y1 = Math.abs(y1 - 300);


    DDA(x0, y0, x1, y1);
}



//converted midpoint.c to js
function MidpointLine(x0, y0, x1, y1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let d = 2 * dy - dx;
    let incrE = 2 * dy;
    let incrNE = 2 * (dy - dx);
    let x = x0;
    let y = y0;
  
    ctx.fillRect(x, Math.round(y), 1, 1);

    
    while (x < x1) {
      if (d <= 0) {
        d = d + incrE;
        x++;
      } else {
        d = d + incrNE;
        x++;
        y++;
      }
        ctx.fillRect(x, Math.round(y), 1, 1);


    }


    // ctx.beginPath();
    // ctx.moveTo(25/2, 1);                                   //uses htmal canvas to compare
    // ctx.lineTo(50/2, 75);
    // ctx.stroke();

}


//function that assignts the input values to midpoint parameters  
function drawMidpointLine() {
    var x0 = parseInt(document.getElementById("linex1").value);          //tried without parseInt and it would only show the start and end point  
    var y0 = parseInt(document.getElementById("liney1").value);
    var x1 = parseInt(document.getElementById("linex2").value);
    var y1 = parseInt(document.getElementById("liney2").value);
    y0 = Math.abs(y0 - 300);
    y1 = Math.abs(y1 - 300);
  
    // console.log("midpointline")
    // console.log(x0,y0,x1,y1);
    

    MidpointLine(x0, y0, x1, y1);
}

//converted midpoint_circle.c to js
function CirclePoints(x, y) {
    var c = document.getElementById("myCanvas");            
    var ctx = c.getContext("2d");
    var ctxCanvas = c.getContext("2d");


    //let posX = c.width / 2;                                     //divide the canvas width/height by 2 to print the circle in the origin
    //let posY = c.height / 2;

    ctx.fillRect(posX + x, posY + y, 1, 1);                     //draws all the curves of the circle
    ctx.fillRect(posX + y, posY + x, 1, 1);
    ctx.fillRect(posX + y, posY - x, 1, 1);
    ctx.fillRect(posX + x, posY - y, 1, 1);
    ctx.fillRect(posX - x, posY - y, 1, 1);
    ctx.fillRect(posX - y, posY - x, 1, 1);
    ctx.fillRect(posX - y, posY + x, 1, 1);
    ctx.fillRect(posX - x, posY + y, 1, 1);

    // ctxCanvas.beginPath();
    // ctxCanvas.arc(50,45,40,0,2*Math.PI);                    //draws circle using canvas to compare
    // ctxCanvas.stroke();


}
  
// midpoint algorithm for circles; assumes center is at (0, 0);
function MidpointCircle(radius) {
    let x = 0;
    let y = radius;
    let d = 1 - radius;
    CirclePoints(x, y);
  
    while (y > x) {
      if (d < 0) {
        d = d + 2 * x + 3;
      } else {
        d = d + 2 * (x - y) + 5;
        y--;
      }
      x++;
      CirclePoints(x, y);
    }
}

//function that assignts the input values to midpoint circle parameters  
function drawmidpointCircle() {

    var radius = parseInt(document.getElementById("CircleRadius").value);          //tried without parseInt and it would only show the start and end point  
    // console.log(radius)
    MidpointCircle(radius);
}


//converted the midpoint_Ellipse.c to js
function EllipsePoints(x, y) {
    var c = document.getElementById("myCanvas");            
    var ctx = c.getContext("2d");
    var ctxCanvas = c.getContext("2d");


    //let posX = c.width / 2;                                                        //divide the canvas width/height by 2 to print the ellipse in the origin
    //let posY = c.height / 2;
    var posX = 150
    var posY = 150

    ctxCanvas.fillRect(posX + x, posY + y, 1, 1);
    ctxCanvas.fillRect(posX - x, posY + y, 1, 1);
    ctxCanvas.fillRect(posX + x, posY - y, 1, 1);
    ctxCanvas.fillRect(posX - x,posY - y, 1, 1);


    // ctxCanvas.ellipse(25, 25, 25, 25, Math.PI / 4, 0, 2 * Math.PI);            //draws ellipse using canvas to compare
}

function MidpointEllipse(a, b) {
    let d2;
    let x = 0;
    let y = b;
    let d1 = (b * b) - (a * a * b) + (0.25 * a * a);

    EllipsePoints(x, y);

    // test gradient if still in region 1
    while (((a * a) * (y - 0.5)) > ((b * b) * (x + 1))) {
        if (d1 < 0) {
            d1 = d1 + ((b * b) * (2 * x + 3));
        }
        else {
            d1 = d1 + ((b * b) * (2 * x + 3)) + ((a * a) * (-2 * y + 2));
            y--;
        }
        x++;
        EllipsePoints(x, y);
    }   // Region 1

    d2 = ((b * b) * (x + 0.5) * (x + 0.5)) + ((a * a) * (y - 1) * (y - 1)) - (a * a * b * b);
    while (y > 0) {
        if (d2 < 0) {
            d2 = d2 + ((b * b) * (2 * x + 2)) + ((a * a) * (-2 * y + 3));
            x++;
        }
        else {
            d2 = d2 + ((a * a) * (-2 * y + 3));
        }
        y--;
        EllipsePoints(x, y);
    }   // Region 2
}

// function that assignsthe input values to midpoint ellipse parameters  
function drawmidpointEllipse() {
    var x0 = parseInt(document.getElementById("CircleX").value);          //tried without parseInt and it would only show the start and end point  
    var y0 = parseInt(document.getElementById("CircleY").value);
    MidpointEllipse(x0,y0);
}

// function that return the x and y values to return coordinates as separate values
function point(x,y){
    return {x: x, y: y};
}

function PRINT_XY(x, y) {
    console.log("x=" + x + " y=" + y);
}
  
// Define the PRINT_TXY function
function PRINT_TXY(t, x, y) {
    console.log("t=" + t + " x=" + x + " y=" + y);
    var c = document.getElementById("myCanvas");            
    var ctx = c.getContext("2d");
    ctx.fillRect(x, y, 1, 1);

    // ctx.beginPath();                               //using html canvas to compare and its the same
    // ctx.moveTo(10,10);
    // ctx.bezierCurveTo(20, 75, 50, 25, 200, 10);   //not sure how to use html canvas to do hermite and bspline
    // ctx.stroke();

}
  
// Define the PRINT_POINT function
function PRINT_POINT(p) {
    console.log("x=" + p.x + " y=" + p.y);
}

//converted hermite function from c to js
function hermite(n, p1, p4, r1, r4) {
    let x; 
    let y; 
    let delta; 
    let t;
    console.log("hi")
    delta = 1.0 / n;
    t = 0.0;
  
    console.log("HERMITE: ");
    console.log("p1: ");
    PRINT_POINT(p1);
    console.log("p4: ");
    PRINT_POINT(p4);
    console.log("r1: ");
    PRINT_POINT(r1);
    console.log("r4: ");
    PRINT_POINT(r4);
    console.log("");
  
    x = p1.x;
    y = p1.y;
    PRINT_TXY(t, x, y);
    for (let i = 0; i < n; i++) {
      t += delta;
      let t2 = t * t;
      let t3 = t2 * t;
  
      x =
        (2 * t3 - 3 * t2 + 1) * p1.x +
        (-2 * t3 + 3 * t2) * p4.x +
        (t3 - 2 * t2 + t) * r1.x +
        (t3 - t2) * r4.x;
      y =
        (2 * t3 - 3 * t2 + 1) * p1.y +
        (-2 * t3 + 3 * t2) * p4.y +
        (t3 - 2 * t2 + t) * r1.y +
        (t3 - t2) * r4.y;
      PRINT_TXY(t, x, y);
    }
    console.log("\n\n");
}

function drawhermite(){

    var x0 = parseInt(document.getElementById("curvex1").value);          //tried without parseInt and it would only show the start and end point  
    var y0 = parseInt(document.getElementById("curvey1").value);
    var x1 = parseInt(document.getElementById("curvex2").value);
    var y1 = parseInt(document.getElementById("curvey2").value);
    var x2 = parseInt(document.getElementById("curvex3").value);          //tried without parseInt and it would only show the start and end point  
    var y2 = parseInt(document.getElementById("curvey3").value);
    var x3 = parseInt(document.getElementById("curvex4").value);
    var y3 = parseInt(document.getElementById("curvey4").value);

    var p1h = point(x0,y0);                                                  //combining the inputted values into coordinate points
    var p4h = point(x1,y1);
    var r1h = point(x2,y2);
    var r4h = point(x3,y3);

    // console.log("hermite")

    hermite(50, p1h, p4h, r1h, r4h)
    // console.log(x0)
}

//converted bezier.c to js
function bezier(n, p1, p2, p3, p4) {
    let points = [];
    const delta = 1.0 / n;
  
    console.log("BEZIER:");
    console.log("p1: ", p1);
    console.log("p2: ", p2);
    console.log("p3: ", p3);
    console.log("p4: ", p4);
  
    let x = p1.x;
    let y = p1.y;
    let t = 0.0;
    PRINT_TXY(t,x,y);
    for (let i = 0; i < n; i++) {
      t += delta;
      let t2 = t * t;
      let t3 = t2 * t;
             
      let q1 = (1 - t);
      let q2 = q1 * q1;
      let q3 = q2 * q1;
      x = q3 * p1.x + 3 * t * q2 * p2.x + 3 * t2 * q1 * p3.x + t3 * p4.x;
      y = q3 * p1.y + 3 * t * q2 * p2.y + 3 * t2 * q1 * p3.y + t3 * p4.y;
      PRINT_TXY(t,x,y);

    }
  
    console.log(points);
}

function drawbezier(){
    var x0 = parseInt(document.getElementById("curvex1").value);          //tried without parseInt and it would only show the start and end point  
    var y0 = parseInt(document.getElementById("curvey1").value);
    var x1 = parseInt(document.getElementById("curvex2").value);
    var y1 = parseInt(document.getElementById("curvey2").value);
    var x2 = parseInt(document.getElementById("curvex3").value);          //tried without parseInt and it would only show the start and end point  
    var y2 = parseInt(document.getElementById("curvey3").value);
    var x3 = parseInt(document.getElementById("curvex4").value);
    var y3 = parseInt(document.getElementById("curvey4").value);

    var p1h = point(x0,y0);                                                 //assigning the points into parameters for hermite
    var p4h = point(x1,y1);
    var r1h = point(x2,y2);
    var r4h = point(x3,y3);

    // console.log("bezier")

    bezier(50, p1h, p4h, r1h, r4h);
}
  
//converted spline function to js
function spline(n, p1, p2, p3, p4) {
    let x, y, delta, t;
    delta = 1.0 / n;
    t = 0.0;

    console.log("SPLINE: ");
    console.log("p1: ");
    PRINT_POINT(p1);
    console.log("p4: ");
    PRINT_POINT(p2);
    console.log("r1: ");
    PRINT_POINT(p3);
    console.log("r4: ");
    PRINT_POINT(p4);
    console.log("");

    x = p1.x;
    y = p1.y;
    PRINT_TXY(t, x, y);

    for (let i = 0; i < n; i++) {
        t += delta;
        let t2 = t * t;
        let t3 = t2 * t;

        x =
            ((1 - t3) / 6) * p1.x +
            ((3 * t3 - 6 * t2 + 4) / 6) * p2.x +
            ((-3 * t3 + 3 * t2 + 3 * t + 1) / 6) * p3.x +
            (t3 / 6) * p4.x;
        y =
            ((1 - t3) / 6) * p1.y +
            ((3 * t3 - 6 * t2 + 4) / 6) * p3.y +
            ((-3 * t3 + 3 * t2 + 3 * t + 1) / 6) * p3.y +
            (t3 / 6) * p4.y;

        PRINT_TXY(t, x, y);
    }
    console.log("\n\n");

}

function drawbspline(){
    var x0 = parseInt(document.getElementById("curvex1").value);          //tried without parseInt and it would only show the start and end point  
    var y0 = parseInt(document.getElementById("curvey1").value);
    var x1 = parseInt(document.getElementById("curvex2").value);
    var y1 = parseInt(document.getElementById("curvey2").value);
    var x2 = parseInt(document.getElementById("curvex3").value);          //tried without parseInt and it would only show the start and end point  
    var y2 = parseInt(document.getElementById("curvey3").value);
    var x3 = parseInt(document.getElementById("curvex4").value);
    var y3 = parseInt(document.getElementById("curvey4").value);

    var p1h = point(x0,y0);                                                 //assigning the points into parameters for hermite
    var p4h = point(x1,y1);
    var r1h = point(x2,y2);
    var r4h = point(x3,y3);

    // console.log("bezier")

    spline(50, p1h, p4h, r1h, r4h);
}

//function that clears the canvas
function clearCanvas(){
    var c = document.getElementById("myCanvas");            
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);                   //clears the canvas
}