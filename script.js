let cancel_color_palette = document.querySelector("#cancel_color_palette");
let cancel_brush_palette = document.querySelector("#cancel_brush_palette");
let color_selector = document.querySelector(".color_selector");
let colorSelectBnt = document.querySelector("#colorSelectBnt");
let brush_sizes = document.querySelector(".brush_sizes");
let brushSelectorBtn = document.querySelector("#brushSelectorBtn");
let DrawnImage = document.querySelector("#DrawnImage");

let Drew = false;

var canvas = document.querySelector('#canvas');
var context = canvas.getContext("2d"); 
var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var color = "black",
    y = 2;

function init() {
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        FindPosition('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        FindPosition('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        FindPosition('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        FindPosition('out', e)
    }, false);
}

// change brush color
function ChangeColor(obj) {
    switch (obj.id) {
        case "green":
        color = "green";
            break;
        case "blue":
        color = "blue";
            break;
        case "red":
        color = "red";
            break;
        case "yellow":
        color = "yellow";
            break;
        case "orange":
        color = "orange";
            break;
        case "black":
        color = "black";
            break;
        case "white":
        color = "white";
            break;
    }
    colorSelectBnt.style.background = obj.id;
    if (color == "white") y = 14;
    else y = 2;

}

// change brush size
function ChangeBrushSize(size){
    y = size.id;
}

// draw
function draw() {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = color;
    context.lineWidth = y;
    context.stroke();
    context.closePath();
    Drew = true;
}

// erase color
function erase() {
    var m = confirm("Do you want to clear");
    if (m) {
        context.clearRect(0, 0, w, h);
    }
}

// find cursor position
function FindPosition(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        flag = true;
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}


resize();
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}


window.addEventListener('resize', resize, false); resize();
function render() { // draw to screen
}

let colorPaletteOpen = false,brushSizeOpen=false;


// hide color palette
cancel_color_palette.addEventListener("click", function(){
    color_selector.style.transform = "translateX(20em)";
});

// hide brush palette
cancel_brush_palette.addEventListener("click", function(){
    brush_sizes.style.transform = "translateX(20em)";
});


// color selector
colorSelectBnt.addEventListener("click", function(){
    if(colorPaletteOpen==true){
        color_selector.style.transform = "translateX(20em)";
        colorPaletteOpen = false;
    }else{
        color_selector.style.transform = "translateX(0px)";
        colorPaletteOpen = true;
    }

});


// Brush Size Selector
brushSelectorBtn.addEventListener("click", function(){
    if(brushSizeOpen==true){
        brush_sizes.style.transform = "translateX(20em)";
        brushSizeOpen = false;
    }else{
        brush_sizes.style.transform = "translateX(0px)";
        brushSizeOpen = true;
    }

});


// save image
function saveImage(){

    if(Drew==true){
        File_Name="draw";
        var jpegUrl = canvas.toDataURL("image/jpg");
    
        const link = document.createElement("a");
          document.body.appendChild(link);
    
          link.setAttribute("href",jpegUrl);
          link.setAttribute("download",File_Name);
          link.click();
          document.body.removeChild(link);
    }else{
        alert("Draw first !");
    }


} 	  
