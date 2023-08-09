let mediumSlider1
let mediumSlider2
let mediumSlider3
let thetaSlider


function setup() {
  //Standardising upon a 16:10 aspect ratio; a mistake of aspect ratio was something I made in the visulation in WA2
  if(windowWidth > windowHeight * 16/10) {
    createCanvas(16/10 * windowHeight, windowHeight);
  }
  else if(windowWidth < windowHeight * 16/10) {
    createCanvas(windowWidth, 10/16 * windowWidth);
  }
  else {
    createCanvas(windowWidth, windowHeight);
  }
  
  slidersStyle()
  angleMode(RADIANS)
}


function draw() {
  background(200)
  
  mediumsCreate()
  sliderData()
  
  let ray = new lightRay()
  ray.ray1(thetaSlider.value())
  
  let ni_theta = ray.ray2(medium1Slider.value(), medium2Slider.value(), thetaSlider.value())
  
  if(ni_theta !== false) {
    ray.ray3(medium2Slider.value(), medium3Slider.value(), ni_theta)
  }
}