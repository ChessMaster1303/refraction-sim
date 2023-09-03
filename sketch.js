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
  
  //Nested in objCreate.js
  //Sets the sliders to have the correct position, length etc.
  slidersStyle()
  
  //For the purpose of consistency
  angleMode(RADIANS)
  
  //The 4 different sliders on the extreme right of the canvas
  let mediumSlider1
  let mediumSlider2
  let mediumSlider3
  let thetaSlider
  
  //This is in a way, "initialising" the tutorialMode variable to be false so that your tutorial screen doesn't immediately pop up. Except that instead of being a global variable, its stored in this function.
  storeItem("tutorialMode", "false")
}


function draw() {
  //Nested in objCreate.js
  //Creates the 3 different mediums that the light ray passes through
  mediumsCreate()
  
  //Object Reference: lightRay.js
  //The entire light ray in the simulation is 1 object
  let ray = new lightRay()
  
  //The part of the light ray in the first medium
  ray.ray1(thetaSlider.value())
  
  //The part of the light ray in the second medium
  let ni_theta = ray.ray2(medium1Slider.value(), medium2Slider.value(), thetaSlider.value())
  
  //Condition: If there is no light ray in medium 2 (i.e. Total Internal Reflection in medium 1), then there will be no light ray in the third medium
  if(ni_theta !== false) {
    ray.ray3(medium2Slider.value(), medium3Slider.value(), ni_theta)
  }

  //Function reference under object in lightRay.js
  //Displays, in numerical form, the angles of incidence, refraction or reflection
  ray.angleDisplay()
  
  //Reference to a function in objCreate.js
  //Main function is to display the refractive indexes of the 3 mediums
  dataDisplay(medium1Slider.value(), medium2Slider.value(), medium3Slider.value(), thetaSlider.value())

  //Reference to a function in tutorial.js
  //Function: Is the button that toggles tutorial mode
  tutorialBox()
  
  //Reference to a function in tutorial.js
  //Function: Brings up the tutorial screen if tutorial mode is toggled
  tutorialScreen()
}