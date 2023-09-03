function mediumsCreate() {
  //Stores the 3 mediums (objects) in an array
  let mediums = []
  
  //Object Reference: medium.js
  //First medium (modelled after air)
  mediums.push(new medium(1, 0))
  //Second medium (modelled after glass)
  mediums.push(new medium(1.5, 1))
  //Third medium (modelled after air)
  mediums.push(new medium(1, 2))
  
  //Loops through the array to display all 3 mediums
  for(let i = 0; i < 3; i++) {
    mediums[i].show()
  }
}


function slidersStyle() {
  //Creates all 4 sliders to change the various values that will influence how the simulation runs.
  
  //Changes the refractive index of the first medium
  medium1Slider = createSlider(1, 5, 1, 0.01)
  medium1Slider.position(width * 8.1/10, height * 1.25/6)
  medium1Slider.style('width', width * 1.8/10 + "px")
  
  //Changes the refractive index of the second medium
  medium2Slider = createSlider(1, 5, 1.5, 0.01)
  medium2Slider.position(width * 8.1/10, height * 3/6)
  medium2Slider.style('width', width * 1.8/10 + "px")
  
  //Changes the refractive index of the third medium
  medium3Slider = createSlider(1, 5, 1, 0.01)
  medium3Slider.position(width * 8.1/10, height * 5/6)
  medium3Slider.style('width', width * 1.8/10 + "px")
  
  //Changes the initial angle of incidence (i.e. the angle of incidence in the first medium)
  thetaSlider = createSlider(0, PI/2, PI/4, PI/9423)
  thetaSlider.position(width * 8.1/10, height * 0.2/6)
  thetaSlider.style('width', width * 1.8/10 + "px")
}


function dataDisplay(n1, n2, n3, theta) {
  //Text formatting
  fill(0)
  noStroke()
  textAlign(CENTER)
  textSize(width/70)
  
  //Displays the refractive indexes of the 3 mediums, along with the initial angle of incidence
  text("Refractive Index: " + n1, width * 9/10, height * 1.75/6)
  text("Refractive Index: " + n2, width * 9/10, height * 3.5/6)
  text("Refractive Index: " + n3, width * 9/10, height * 5.5/6)
  text("Initial \nIncidence \nAngle: " + (theta * 360/(2 * PI)).toFixed(2) + "°", width * 9/10, height * 0.7/6)
  
  //The line that separates the control panel from the simulation area
  stroke(0)
  line(width * 8/10, 0, width * 8/10, height)
}