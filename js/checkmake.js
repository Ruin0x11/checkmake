var two = new Two({autostart:true}).appendTo(document.getElementById("canvas"));
var rect = two.makeRectangle(two.width/2, two.height/2, 50, 50)
rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
two.bind('update', function() {
    /* rect.rotation += 0.001;*/
});

var slide = document.getElementById('slide')
var sliderDiv = document.getElementById("sliderAmount");

slide.oninput = function() {
    sliderDiv.innerHTML = this.value;
    rect.rotation = this.value/1000;
};
