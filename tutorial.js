function tutorialBox() {
  //This entire chunk is basically the logic and the button to enter the tutorial. But this is only the case if we aren't already inside the tutorial
  if(getItem("tutorialMode") == "false") {
    //Simple button logic
    if(mouseX > width * 1/200 && mouseX < width * 19/100 && mouseY > height * 7/10 && mouseY < height * 8/10) {
      //Hovering over the button changes the colour a bit
      fill(200)
      if(mouseIsPressed == true) {
        //Think of this as assigning the variable "tutorialMode" to a "true" state
        storeItem("tutorialMode", "true")
      }
    }
  
    else {
      //Typical button colour is full white
      fill(255)
      
      //I guess this was a bit of protective behaviour when I first started using getItem() and storeItem() to prevent anything from going wrong
      if(getItem("tutorialMode") !== "true") {
        storeItem("tutorialMode", "false")
      }
    }
    
    //This is where the "start tutorial" button would always be
    rect(width * 1/200, height * 7/10, width * 1/5 - width * 2/200, height * 1/10)
  
    //4 lines of code just to format 1 line of text? The realities of this world...
    noStroke()
    fill(0)
    textAlign(CENTER)
    textSize(width * 1/50)
    
    //Literally just a text to explain to people to click on the button to run the tutorial
    text("TUTORIAL", width * 10/100, height * 7.6/10)
  }
}


function tutorialScreen() {
  //This is a "retrieval" to check the value of the status of whether the user wants to run the tutorial or not
  tutorialMode = getItem("tutorialMode")
  
  //Let's say the user wants the tutorial. Then we run all this stuff
  if(tutorialMode == "true") {
    //Drawing the entire white tutorial background
    fill(255)
    rect(0, 0, width * 8/10, height)
    
    //More simple button logic, this time for the "exit tutorial" button. I won't re-elaborate on this highly similar logic
    if(mouseX > width * 1/200 && mouseX < width * 19/100 && mouseY > height * 1/100 && mouseY < height * 11/100) {
      fill(200)
      if(mouseIsPressed == true) {
        storeItem("tutorialMode", "false")
      }
    }
    
    else {
      fill(255)
      storeItem("tutorialMode", "true")
    }
    
    //The exit button
    stroke(0)
    rect(width * 1/200, height * 1/100, width * 1/5 - width * 2/200, height * 1/10)
    
    //Again, 3 lines of code for 1 line of text
    fill(0)
    noStroke()
    textSize(width * 1/50)
    
    //"Exit tutorial". In CAPS. Surely people will not ask me how to exit?
    text("EXIT\nTUTORIAL", width * 10/100, height * 5/100)
    
    //Some text to tell people that the control panel is intuitive and people can slide the sliders
    textSize(width * 1/60)
    text("Use Panel to Control\nRefractive Index and View Info!", width * 125/200, height * 10/200)
    
    //That big arrow to point to the control panel
    textSize(width * 1/30)
    text("→", width * 155/200, height * 15/200)
    
    //Draws the top border for the actual tutorial in the middle
    stroke(0)
    line(0, height * 25/200, width * 8/10, height * 25/200)
    
    //Standardises this text size for the rest of the tutorial
    textSize(width * 1/50)
    
    //The "Refraction of Light" tutorial (on the left)
    tutorialFig1()
    
    //The "Total Internal Reflection" tutorial (on the right)
    tutorialFig2()
    
    //Brief description of Snell's Law at the bottom of the tutorial
    eqn()
  }
}


function tutorialFig1() {
  //This line imitates the border between 2 mediums
  stroke(0)
  line(width * 1/200, height * 1/2, width * 51/200, height * 1/2)
  
  //The normal; bottom chunk of code is modified from "lightRay.js/normalShow()"
  for(let i = -3; i < 3; i++) {
    let yOffSet = height * 1/2 + (i * height/20)
    push()
      translate(0, width/50)
      line(width * 25/200, yOffSet, width * 25/200, yOffSet + height/50)
    pop()
  }
  
  //Much easier to imagine a light ray given its length and angle
  let magnitude = width * 1/10
  
  //This theta is the angle of incidence
  let theta = PI/6
  
  //Converting the human-understandable polar coordinates to cartesian coordinates
  let x = magnitude * cos(theta)
  let y = magnitude * sin(theta)
  
  //This is the first part of the light ray
  stroke(255, 0, 0)
  line(width * 25/200 - x, height * 1/2 - y, width * 25/200, height * 1/2)
  
  //Now let's say the angle of refraction becomes PI/3; I am reusing theta as the angle of refraction now
  theta = PI/3
  
  //More cartesian coordinates
  x = magnitude * cos(theta)
  y = magnitude * sin(theta)
  
  //The second part of the light ray
  line(width * 25/200, height * 1/2, width * 25/200 + x, height * 1/2 + y)
  
  //The orange colour that the angle markings have
  noFill()
  stroke(255, 128, 0)
  
  //Angle of incidence marking
  arc(width * 25/200, height * 1/2, width/10, width/10, PI + PI/6, PI * 3/2)
  //Angle of refraction marking
  arc(width * 25/200, height * 1/2, width/10, width/10, PI/3, PI/2)
  
  
  //Text formatting
  noStroke()
  fill(0)
  
  //All the markings telling the user which angle is incidence, refraction; and how to differentiate the mediums
  text("Refraction of Light", width * 25/200, height * 3/10)
  text("n₁", width * 45/200, height * 4/10)
  text("n₂", width * 45/200, height * 6/10)
  text("θᵢ", width * 17/200, height * 4/10)
  text("θᵣ", width * 29/200, height * 6.3/10)
  
  //Examples because that's what teachers always do
  text("Examples:", width * 25/200, height * 7/10)
  text("Mirages\nSpectacle Lenses", width * 25/200, height * 7.5/10)
}


function tutorialFig2() {
  //The border between 2 mediums
  stroke(0)
  line(width * 101/200, height * 1/2, width * 151/200, height * 1/2)
  
  //The same chunk of code for the normal
  for(let i = -3; i < 3; i++) {
    let yOffSet = height * 1/2 + (i * height/20)
    push()
      translate(0, width/50)
      line(width * 125/200, yOffSet, width * 125/200, yOffSet + height/50)
    pop()
  }
  
  //Creating human-friendly light ray variables, then converting them into the evil cartesian coordinates
  let magnitude = width * 1/10
  let theta = PI/6
  let x = magnitude * cos(theta)
  let y = magnitude * sin(theta)
  
  //Notice how there isn't an angle of refraction? This is total internal reflection, so the angle of incidence = the angle of reflection
  stroke(255, 0, 0)
  line(width * 125/200 - x, height * 1/2 - y, width * 125/200, height * 1/2)
  line(width * 125/200, height * 1/2, width * 125/200 + x, height * 1/2 - y)
  
  //Formatting for the angle indicators
  noFill()
  stroke(255, 128, 0)
  
  //Angle indicator for angle of incidence
  arc(width * 125/200, height * 1/2, width/10, width/10, PI + PI/6, PI * 3/2)
  //Angle indicator for angle of reflection
  arc(width * 125/200, height * 1/2, width/15, width/15, PI * 3/2, -PI/6)
  
  
  //Text formatting
  noStroke()
  fill(0)
  
  //I tried to give a little more in-depth explanation of when total internal reflection occurs, but I ran out of space fast. Also quite funny that I introduced critical angle without ever discussing it before. Anyways, I'll leave this to Year 1 science teachers
  text("Total Internal Reflection: θᵢ = θᵣ", width * 125/200, height * 2/10)
  text("Occurs when θᵢ > θ꜀\nθ꜀ = sin₋₁(n₂ / n₁)", width * 125/200, height * 2.5/10)
  
  //All the indicators showing what is what angle, what medium is which
  text("n₁", width * 150/200, height * 4/10)
  text("n₂", width * 150/200, height * 6/10)
  text("θᵢ", width * 117/200, height * 4/10)
  text("θᵣ", width * 131/200, height * 4.3/10)
  
  //As much as I love examples, I can't think of more than 1 good one
  text("Examples:", width * 125/200, height * 7/10)
  text("Fiber-Optic Cables", width * 125/200, height * 7.5/10)
}


function eqn() {
  //The bottom border of the tutorial
  stroke(0)
  line(0, height * 8.5/10, width * 8/10, height * 8.5/10)
  
  //I can't believe how many lines are spent on formatting
  fill(0)
  noStroke()
  textSize(width/50)
  
  //Snell's Law in text. Finding all these subscript terms was tedious
  text("Snell's Law:\nn₁ sin(θᵢ) = n₂ sin(θᵣ)", width * 1.5/10, height * 9/10)
  
  //The fine print that looks professional when it explains what each symbol represents
  textSize(width/70)
  text("n₁ → Refractive Index of Medium 1", width * 4/10, height * 9/10)
  text("n₂ → Refractive Index of Medium 2", width * 4/10, height * 9.5/10)
  text("θᵢ → Angle of Incidence", width * 6.5/10, height * 9/10)
  text("θᵣ → Angle of Refraction", width * 6.5/10, height * 9.5/10)
}