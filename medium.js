class medium {
  constructor(n, i) {
    //Refractive Index
    this.refractIndex = n
    
    //Which medium is it? 0 --> Medium 1; 1 --> Medium 2; 2 --> Medium 3
    this.order = i
  }
  
  show() {
    strokeWeight(width/400)
    stroke(0)
    
    //Drawing the first medium
    if(this.order == 0) {
      fill(225, 246, 255)
      rect(0, 0, width, height * 1/3)
    }
    
    //Drawing the second medium
    else if (this.order == 1) {
      fill(240)
      rect(0, height * 1/3, width, height * 1/3)
    }
    
    //Drawing the third medium
    else if (this.order == 2) {
      fill(225, 246, 255)
      rect(0, height * 2/3, width, height * 1/3)
    }
  }
}