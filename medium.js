class medium {
  constructor(n, i) {
    this.refractIndex = n
    this.order = i
  }
  
  show() {
    strokeWeight(width/400)
    stroke(0)
    if(this.order == 0) {
      fill(225, 246, 255)
      rect(0, 0, width, height * 1/3)
    }
    
    else if (this.order == 1) {
      fill(240)
      rect(0, height * 1/3, width, height * 1/3)
    }
    
    else if (this.order == 2) {
      fill(225, 246, 255)
      rect(0, height * 2/3, width, height * 1/3)
    }
  }
}