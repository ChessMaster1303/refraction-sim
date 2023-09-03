class lightRay {
  //thetaI is the (first) angle of incidence (that the angle, with respect to the normal, that strikes the boundary of Medium 1 and Medium 2)
  ray1(thetaI) {
    //Essentially, this magnitude (i.e. length) will be from the top-left side-corner of the canvas to that fixed incidence point between Medium 1 and Medium 2
    let magnitude = (height * 1/3) / cos(thetaI)
    
    //This inputs the parameters into another class function in the lightRay object
    this.rayShow(1, thetaI, magnitude)
  }
  
  
  //n1 is the refractive index of Medium 1
  //n2 is the refractive index of Medium 2
  //thetaI is the (first) angle of incidence
  ray2(n1, n2, thetaI) {
    //Calculate the angle of refraction from Medium 1 into Medium 2
    let theta = asin(n1 * sin(thetaI) / n2)
    
    //This will be the magnitude variable of the section of the second part of the light ray
    let magnitude
    
    //In the case that there is no angle of refraction, total internal reflection will be computed instead
    if(isNaN(cos(theta))) {
      //Total-Internal-Reflection light ray in Medium 1
      magnitude = (height * 1/3) / cos(thetaI)
    }
    
    else {
      //Normal magnitude of the refracted light ray in Medium 2
      magnitude = (height * 1/3) / cos(theta)
    }
    
    //Gives all information needed to calculate both the Total-Internal-Reflection light ray, and the refracted light ray. The function will be smart enough to use the required info (basically if theta is a NaN value) to calculate the refracted light ray, else if it isn't possible, then it'll calculate the Total-Internal-Reflection light ray
    this.rayShow(2, thetaI, magnitude, theta)
    
    //In the event that there is Total Internal Reflection, there will be no light ray in Medium 2. Consequently, there will be no third part of the light ray. If "false" is returned, the third part of the light ray will not be drawn. 
    if(isNaN(theta)) {
      return false
    }
    
    //By the principle of alternate angles, and how both normals are parallel, the angle of refraction from Medium 1 into Medium 2 is also the angle of incidence from Medium 2 into Medium 3. When this function returns its angle of refraction, it will be inputted as the third part of ray's angle of incidence value
    else {
      return theta
    }
  }
  
  
  //n2 is the refractive index of Medium 2
  //n3 is the refractive index of Medium 3
  //ni_thetaI literally translates to Second thetaI ("ni" in Japanese means 2). This will be the angle of incidence for this third part ray. Note that this ni_thetaI is the same as the angle of refraction for the second part ray.
  ray3(n2, n3, ni_thetaI) {
    //Again, following Snell's Law to calculate the angle of refraction
    let theta = asin(n2 * sin(ni_thetaI) / n3)
    
    //Same as always, initialising the magnitude variable
    let magnitude
    
    //In the case where there is total internal reflection occurs...
    if(isNaN(cos(theta))) {
      //This magnitude is for the reflected ray back into Medium 2
      magnitude = (height * 1/3) / cos(ni_thetaI)
    }
    else {
      //The normal situation where the ray continues into the third medium
      magnitude = (height * 1/3) / cos(theta)
    }
    
    //The magnitude of the second part of the ray (in Medium 2)
    let ni_magnitude = height * 1/3 / cos(ni_thetaI)
    
    //Sends all these info into the rayShow() function to be drawn
    this.rayShow(3, ni_thetaI, magnitude, theta, ni_magnitude)
  }
  
  
  rayShow(n, thetaI, magnitude, theta, ni_magnitude) {
    //This converts polar coordinates to cartesian coordinates
    let x = sin(theta) * magnitude
    let y = cos(theta) * magnitude
    
    //Essentially, if total internal reflection happens, the ray will "move forward" in the x-direction but it goes back up (negative y-direction)
    if(isNaN(theta)) {
      x = sin(thetaI) * magnitude 
      y = - cos(thetaI) * magnitude 
    }
    
    //These offsets is the start of that part of the ray
    let xOffSet
    let yOffSet
    
    //All the calculations for ray offsets
    if(n == 1) {
      //Special case for the offset; will be discussed in Line 113
      xOffSet = 0
      yOffSet = 0
    }
    else if(n == 2) {
      //Notice how no matter the initial angle of incidence, it will hit a point on the border of the first and second mediums? That's the point the second ray starts
      xOffSet = width * 1/5
      yOffSet = height * 1/3
    }
    else if(n == 3) {
      //Now this offset calculation is a bit more complicated, because it also depends on the angle of refraction going from the first medium into the second medium
      xOffSet = width * 1/5 + sin(thetaI) * ni_magnitude 
      yOffSet = height * 2/3
    }
    
    //Reference to a function in lightRay.js, draws the normal (dotted lines)
    this.normalShow(xOffSet, yOffSet, thetaI, theta, n)

    
    push()
      stroke(255, 0, 0)
      if(n == 1) {
        //What's the point of an offset then? Perhaps just for consistency, so that I don't confuse myself in the future. Why translate here? It's because I imagined the first part of the ray extending from this point
        translate(width * 1/5, height * 1/3)
        
        //The line isn't supposed to go forward, but backwards (in the x-direction). As for why y is still positive, I won't lie. I have absolutely no idea what I was cooking. But it works, so perhaps I just saw the line was in the wrong direction and just removed a negative and it worked.
        line(0, 0, -x, y)
      }
    
      else {
        //Much simpler case, essentially translates to the point to start drawing, then starts drawing
        translate(xOffSet, yOffSet)
        line(0, 0, x, y)
      }
    pop()
  }
  
  
  //This function will draw the normal, which is the line of reference that you can read the angles of incidence and refraction
  normalShow(x, y, thetaI, theta, n) {
    //i goes from -3 to 3 so that there will be lines both above and below the point
    for(let i = -3; i < 3; i++) {
      let yOffSet = y + (i * width/20)
      push()
        translate(0, width/50)
        line(x, yOffSet, x, yOffSet + width/50)
      pop()
    }
    
    //It's a convenient thing that this function has the information regarding the angles of incidence and refraction. In a previous version, the text functions were put here. They were moved in Version 1.2.1 for a reason that is inside my reflections.
    if(n == 2) {
      storeItem("n2Incidence", thetaI)
      
      //In essence, if there is no total internal reflection, theta is still the angle of refraction
      if(isNaN(theta) == false) {
        storeItem("n2Refraction", theta) 
      }
      
      else {
        //In the case total internal reflection occurs, it makes sure to update all the information so that the program will understand its total internal reflection, not refraction, and display the information correctly
        storeItem("n2Reflection", thetaI)
        storeItem("n2Refraction", NaN)
        
        //This is to completely remove the text of the second pair of angles (third medium), since these will not exist when total internal reflection happens in the first medium 
        storeItem("n3Incidence", "nonexistent")
      }
      
      //The stroke colour for the first arcs (angles depicting first refractions). These arcs are drawn after all these conditionals.
      stroke(0, 139, 139)
    }
    
    //The third medium
    else if(n == 3) {
      //Third medium's angle of incidence (i.e. second pair)
      storeItem("n3Incidence", thetaI)
      
      if(isNaN(theta) == false) {
        //The angle of refraction in the case of no total internal reflection in Medium 2
        storeItem("n3Refraction", theta) 
      }
      
      else {
        //Otherwise when there is total internal reflection, make sure to display "angle of reflection", not "angle of refraction"
        storeItem("n3Reflection", thetaI)
        storeItem("n3Refraction", NaN)
      }
      
      //The stroke colour for the second arcs (angles depicting second refractions)
      stroke(119, 0, 200)
    }
    
    //Formatting for the angle drawings
    noFill()
    strokeWeight(width/300)
    
    if(thetaI !== 0) {
      //As long as the angle of incidence is not zero, there will be an angle of incidence to draw
      arc(x, y, width/10, width/10, 3/2 * PI - thetaI, -(PI/2))
    }
    
    if(isNaN(theta) == false) {
      //Drawing of angle of refraction
      arc(x, y, width/10, width/10, PI/2 - theta, PI/2)
    }
    else {
      //This is the drawing of the angle of reflection
      arc(x, y, width/15, width/15, 3/2 * PI, 3/2 * PI + thetaI)
    }
    
    //Revert it back to the standard black colour
    stroke(0)
  }
  
  
  //This is the new function introduced in Version 1.2.1. It contains all the original text functions that were originally in normalShow(). This functions allows the drawing of a revamped control panel that has no protrusion of light ray, will still being able to write in the angles of incidence and refraction
  angleDisplay() {
    //The updated control panel (visualised by the white rectangle)
    fill(255)
    rect(width * 8/10, 0, width * 2/10, height)
    line(width * 8/10, height * 1/3, width, height * 1/3)
    line(width * 8/10, height * 2/3, width, height * 2/3)
    
    //Text formatting
    noStroke()
    textAlign(CENTER)
    textSize(width * 1/70)
    
    //Colour of the first pair of angles (looks like teal to me)
    fill(0, 139, 139)
    //Using the super-cool getItem() function
    let n2thetaI = getItem("n2Incidence")
    //Angle of incidence for the first pair of angles will ALWAYS exist in this simulation
    text("Angle of Incidence: " + (n2thetaI * 180/PI).toFixed(2) + "°", width * 9/10, height * 2.5/6)
    
    let n2theta = getItem("n2Refraction")
    //Refraction may or may not occur; this case covers the may
    if(isNaN(n2theta) == false) {
      text("Angle of Refraction: " + (n2theta * 180/PI).toFixed(2) + "°", width * 9/10, height * 2.75/6)  
    }
    //And this case covers the not; in which case its total internal reflection
    else if(isNaN(n2theta) == true) {
      n2theta = getItem("n2Reflection")
      text("Angle of Reflection: " + (n2thetaI * 180/PI).toFixed(2) + "°", width * 9/10, height * 2.75/6)  
    }
    
    
    //Colour for the second pair of angles (purple)
    fill(119, 0, 200)
    //I seriously love getItem() and storeItem(). Best functions ever made 100%
    let n3thetaI = getItem("n3Incidence")
    
    //This conditional is that there must not be total internal reflection in the first medium
    if(n3thetaI !== "nonexistent") {
      text("Angle of Incidence: " + (n3thetaI * 180/PI).toFixed(2) + "°", width * 9/10, height * 4.5/6)
      
      let n3theta = getItem("n3Refraction")
    
    //This will be false if normal refraction occurs
    if(isNaN(n3theta) == false) {
        text("Angle of Refraction: " + (n3theta * 180/PI).toFixed(2) + "°", width * 9/10, height * 4.75/6)
      }
    //In the case of total internal reflection, then the word "reflection" will replace "refraction"
    else if(isNaN(n3theta) == true) {
        n3theta = getItem("n3Reflection")
        text("Angle of Reflection: " + (n3theta * 180/PI).toFixed(2) + "°", width * 9/10, height * 4.75/6)      
      }
    }
  }
}