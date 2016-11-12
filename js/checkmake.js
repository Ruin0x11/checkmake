var canvas = document.getElementById('canvas');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
var params = { width: canvasWidth, height: canvasHeight }
var two = new Two(params).appendTo(document.getElementById("canvas"));
/* var rect = two.makeRectangle(two.width/2, two.height/2, 50, 50)
 * rect.fill = 'rgb(0, 200, 255)';
 * rect.opacity = 0.75;*/
two.bind('update', function() {
    /* rect.rotation += 0.001;*/
});

var lineWidth = 50;
var lineHeight = 50;
var lineSpaceX = 50;
var lineSpaceY = 50;
var lineTransX = 0;
var lineTransY = 0;
var lineRot = 0;
var lineOpacity = 0.50;

var checkRot = 0;

var bgcolor = 'rgb(255, 255, 200)'

canvas.style.backgroundColor = bgcolor;

function makeGrid() {
    var w = lineWidth + lineSpaceX;
    var h = lineHeight + lineSpaceY;
    var numHoriz = (canvasWidth / w) * 2
    var numVert = (canvasHeight / h) * 2

    var horizGroup = new Two.Group();
    var vertGroup = new Two.Group();
    /* horizGroup.translation.set(canvasWidth/2, canvasHeight/2)
     * vertGroup.translation.set(canvasWidth/2, canvasHeight/2)
     */
    for (var i = -(numHoriz/2); i < numHoriz/2; i++) {
        var x = (i * w) + lineTransX + (lineWidth/2);
        var line = two.makeRectangle(x, canvasHeight/2, lineWidth, canvasHeight*4)
        line.fill = 'rgb(0, 200, 255)';
        line.opacity = lineOpacity;
        line.linewidth = 0;
        horizGroup.add(line);
    }

    for (var i = -(numVert/2); i < numVert/2; i++) {
        var y = (i * h) + lineTransY + (lineHeight/2);
        var line = two.makeRectangle(canvasWidth/2, y, canvasWidth*4, lineHeight)
        line.fill = 'rgb(255, 0, 200)';
        line.opacity = lineOpacity;
        line.linewidth = 0;
        vertGroup.add(line);
    }
    horizGroup.rotation = (lineRot*Math.PI)/180;
    vertGroup.rotation = -(lineRot*Math.PI)/180;
    var group = new Two.Group();
    group.translation.set(canvasWidth/2, canvasHeight/2)
    group.add(horizGroup);
    group.add(vertGroup);
    group.rotation = (checkRot*Math.PI)/180;
    return group;
}

var grid = makeGrid();


var slide = document.getElementById('slide')
var slideWidth = document.getElementById('slideWidth')
var slideHeight = document.getElementById('slideHeight')
var slideTransX = document.getElementById('slideTransX')
var slideTransY = document.getElementById('slideTransY')
var slideRot = document.getElementById('slideRot')
var slideCheckRot = document.getElementById('slideCheckRot')

function updateCheck() {
    var sliderDiv = document.getElementById("sliderAmount");

    sliderDiv.innerHTML = slide.value;
    two.remove(grid);
    grid = makeGrid();
    two.add(grid);
    two.update();
}

function translateGrid() {
    grid.translation.set(lineTransX, lineTransY);
    console.log(lineTransX)
    two.update();
}

slide.oninput = updateCheck;
slideWidth.oninput = function() { lineWidth = parseInt(this.value); updateCheck() }
slideHeight.oninput = function() { lineHeight = parseInt(this.value); updateCheck() }
slideTransX.oninput = function() { lineTransX = parseInt(this.value); updateCheck() }
slideTransY.oninput = function() { lineTransY = parseInt(this.value); updateCheck() }
slideRot.oninput = function() { lineRot = parseInt(this.value); updateCheck() }
slideCheckRot.oninput = function() { checkRot = parseInt(this.value); updateCheck() }

two.add(grid);

two.update();
