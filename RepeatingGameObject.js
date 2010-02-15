function RepeatingGameObject()
{
	this.width = 0;
  this.height = 0;
	//How much of the scrollX and scrollY to apply when drawing
  this.scrollFactor = 1;
	
  this.startupRepeatingGameObject = function(image, x, y, z, width, height, scrollFactor)
  {
    this.startupVisualGameObject(image, x, y, z);
    this.width = width;
    this.height = height;
    this.scrollFactor = scrollFactor;
    return this;
  }
	
  this.shutdownstartupRepeatingGameObject = function()
  {
      this.shutdownVisualGameObject();
  }
  
  // Draws this element to the back buffer 
  this.draw = function(dt, canvas, xScroll, yScroll)
  {
    var areaDrawn = [0, 0];
    
    for (var y = 0; y < this.height; y += areaDrawn[1])
    {
      for (var x = 0; x < this.width; x += areaDrawn[0])
      {
        // the top left corner to start drawing the next tile from
        var newPosition = [this.x + x, this.y + y];
        // the amount of space left in which to draw
        var newFillArea = [this.width - x, this.height - y];
        // the first time around you have to start drawing from the middle of the image
        // subsequent tiles alwyas get drawn from the top or left
        var newScrollPosition = [0, 0];
        if (x==0) newScrollPosition[0] = xScroll * this.scrollFactor;
        if (y==0) newScrollPosition[1] = yScroll * this.scrollFactor;
        areaDrawn = this.drawRepeat(canvas, newPosition, newFillArea, newScrollPosition);
      }
    }
  }
  
  this.drawRepeat = function(canvas, newPosition, newFillArea, newScrollPosition)
  {
    // find where in our repeating texture to start drawing (the top left corner)
    var xOffset = Math.abs(newScrollPosition[0]) % this.image.width;
    var yOffset = Math.abs(newScrollPosition[1]) % this.image.height;
    var left = newScrollPosition[0]<0?this.image.width-xOffset:xOffset;
    var top = newScrollPosition[1]<0?this.image.height-yOffset:yOffset;
    var width = newFillArea[0] < this.image.width-left?newFillArea[0]:this.image.width-left;
    var height = newFillArea[1] < this.image.height-top?newFillArea[1]:this.image.height-top;
    
    // draw the image
    canvas.drawImage(this.image, left, top, width, height, newPosition[0], newPosition[1], width, height);
    
    return [width, height];
  }
}
RepeatingGameObject.prototype = new VisualGameObject();