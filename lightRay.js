class lightRay {
  constructor() {
    
  }
  
  
  ray1(thetaI) {
    let magnitude = (height * 1/3) / cos(thetaI)
    this.rayShow(1, thetaI, magnitude)
  }
  
  
  ray2(n1, n2, thetaI) {
    let theta = asin(n1 * sin(thetaI) / n2)
    
    let magnitude
    if(isNaN(cos(theta))) {
      magnitude = (height * 1/3) / cos(thetaI)
    }
    else {
      magnitude = (height * 1/3) / cos(theta)
    }
    
    this.rayShow(2, thetaI, magnitude, theta)
    
    if(isNaN(theta)) {
      return false
    }
    else {
      return theta
    }
  }
  
  
  ray3(n2, n3, ni_thetaI) {
    let theta = asin(n2 * sin(ni_thetaI) / n3)
    
    let magnitude
    if(isNaN(cos(theta))) {
      magnitude = (height * 1/3) / cos(ni_thetaI)
    }
    else {
      magnitude = (height * 1/3) / cos(theta)
    }
    
    let ni_magnitude = height * 1/3 / cos(ni_thetaI)
    
    this.rayShow(3, ni_thetaI, magnitude, theta, ni_magnitude)
  }
  
  
  rayShow(n, thetaI, magnitude, theta, ni_magnitude) {
    let x = sin(theta) * magnitude
    let y = cos(theta) * magnitude
    
    if(isNaN(theta)) {
      x = sin(thetaI) * magnitude 
      y = - cos(thetaI) * magnitude 
    }
    
    
    let xOffSet
    let yOffSet
    
    
    if(n == 1) {
      xOffSet = 0
      yOffSet = 0
    }
    else if(n == 2) {
      xOffSet = width * 1/5
      yOffSet = height * 1/3
    }
    else if(n == 3) {
      xOffSet = width * 1/5 + sin(thetaI) * ni_magnitude 
      yOffSet = height * 2/3
    }
    
    this.normalShow(xOffSet, yOffSet, thetaI, theta, n)

    
    push()
      stroke(255, 0, 0)
      if(n == 1) {
        translate(width * 1/5, height * 1/3)
        line(0, 0, -x, y)
      }
    
      else {
        translate(xOffSet, yOffSet)
        line(0, 0, x, y)
      }
    pop()
  }
  
  
  normalShow(x, y, thetaI, theta, n) {
    for(let i = -3; i < 3; i++) {
      let yOffSet = y + (i * width/20)
      push()
        translate(0, width/50)
        line(x, yOffSet, x, yOffSet + width/50)
      pop()
    }
    
    
    noStroke()
    textAlign(CENTER)
    
    if(n == 2) {
      fill(0, 139, 139)
      text("Angle of Incidence: " + (thetaI * 180/PI).toFixed(2) + "°", width * 9/10, height * 2.5/6)
      
      if(isNaN(theta) == false) {
        text("Angle of Refraction: " + (theta * 180/PI).toFixed(2) + "°", width * 9/10, height * 2.75/6)
      }
      
      else {
        text("Angle of Reflection: " + (thetaI * 180/PI).toFixed(2) + "°", width * 9/10, height * 2.75/6)
      }
      
      //The stroke colour for the first arcs (angles depicting first refractions)
      stroke(0, 139, 139)
    }
    
    
    else if(n == 3) {
      fill(119, 0, 200)
      text("Angle of Incidence: " + (thetaI * 180/PI).toFixed(2) + "°", width * 9/10, height * 4.5/6)
      
      if(isNaN(theta) == false) {
        text("Angle of Refraction: " + (theta * 180/PI).toFixed(2) + "°", width * 9/10, height * 4.75/6)
      }
      
      else {
        text("Angle of Reflection: " + (thetaI * 180/PI).toFixed(2) + "°", width * 9/10, height * 4.75/6)
      }
      
      //The stroke colour for the second arcs (angles depicting second refractions)
      stroke(119, 0, 200)
    }
    
    
    
    noFill()
    
    strokeWeight(width/300)
    
    if(thetaI !== 0) {
      
      arc(x, y, width/10, width/10, 3/2 * PI - thetaI, -(PI/2))
    }
    
    if(isNaN(theta) == false) {
      arc(x, y, width/10, width/10, PI/2 - theta, PI/2)
    }
    else {
      arc(x, y, width/15, width/15, 3/2 * PI, 3/2 * PI + thetaI)
    }
    
    stroke(0)
  }
}