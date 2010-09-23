/**
  GameObject with a 2d sprite image
*/
function VisualGameObject()
{
  this.image = null;

  this.draw = function(dt, context, xScroll, yScroll)
  {
    context.drawImage(this.image, this.x - xScroll, this.y - yScroll);
  }
  
  this.startupVisualGameObject = function(image, x, y, z)
  {
    this.startupGameObject(x, y, z);
    this.image = image;
    return this;
  }
  
  this.shutdownVisualGameObject = function()
  {
    this.shutdownGameObject();
  }
}
VisualGameObject.prototype = new GameObject;