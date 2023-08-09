function mediumsCreate() {
  //Creating 3 mediums for the simulation (refer to medium.js for the object base code)
  let mediums = []
  //Air (Refractive Index is extremely close to 1)
  mediums.push(new medium(1, 0))
  //Glass
  mediums.push(new medium(1.49, 1))
  //More Air
  mediums.push(new medium(1, 2))
  
  for(let i = 0; i < 3; i++) {
    mediums[i].show()
  }
}


function slidersStyle() {
  medium1Slider = createSlider(1, 5, 1, 0.01)
  medium1Slider.position(width * 8.1/10, height * 1.25/6)
  medium1Slider.style('width', width * 1.8/10 + "px")
  
  medium2Slider = createSlider(1, 5, 1.5, 0.01)
  medium2Slider.position(width * 8.1/10, height * 3/6)
  medium2Slider.style('width', width * 1.8/10 + "px")
  
  medium3Slider = createSlider(1, 5, 1, 0.01)
  medium3Slider.position(width * 8.1/10, height * 5/6)
  medium3Slider.style('width', width * 1.8/10 + "px")
  
  thetaSlider = createSlider(0, PI/2, PI/4, PI/9423)
  thetaSlider.position(width * 8.1/10, height * 0.2/6)
  thetaSlider.style('width', width * 1.8/10 + "px")
}


function sliderData() {
  let refractIndex1 = medium1Slider.value().toFixed(2)
  let refractIndex2 = medium2Slider.value().toFixed(2)
  let refractIndex3 = medium3Slider.value().toFixed(2)
  let theta = thetaSlider.value()
  
  fill(0)
  noStroke()
  textAlign(CENTER)
  
  text("Refractive Index: " + refractIndex1, width * 9/10, height * 1.75/6)
  text("Refractive Index: " + refractIndex2, width * 9/10, height * 3.5/6)
  text("Refractive Index: " + refractIndex3, width * 9/10, height * 5.5/6)
  text("Initial \nIncidence \nAngle: " + (theta * 360/(2 * PI)).toFixed(2) + "°", width * 9/10, height * 0.7/6)
  
  stroke(0)
  line(width * 8/10, 0, width * 8/10, height)
}