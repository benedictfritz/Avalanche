/**
  VisualGameObject with an image containing multiple frames to 
  be displayed at a given rate
*/
function AnimatedGameObject()
{
  this.currentFrame = 0;
  this.timeBetweenFrames = 0;
  this.timeSinceLastFrame = 0;
  this.frameWidth = 0;

  this.startupAnimatedGameObject = function(image, x, y, z, frameCount, fps)
  {
    if (frameCount <= 0) throw "framecount can not be <= 0";
    if (fps <= 0) throw "fps can not be <= 0"

    this.startupVisualGameObject(image, x, y, z);
    this.currentFrame = 0;
    this.frameCount = frameCount;
    this.timeBetweenFrames = 1/fps;
    this.timeSinceLastFrame = this.timeBetweenFrames;
    this.frameWidth = this.image.width / this.frameCount;

    return this;
  }

  this.setAnimation = function(image, frameCount, fps)
  {
    if (frameCount <= 0) throw "framecount can not be <= 0";
    if (fps <= 0) throw "fps can not be <= 0"

    this.image = image;
    this.currentFrame = 0;
    this.frameCount = frameCount;
    this.timeBetweenFrames = 1/fps;
    this.timeSinceLastFrame = this.timeBetweenFrames;
    this.frameWidth = this.image.width / this.frameCount;
  }

  this.draw = function(dt, context, xScroll, yScroll)
  {
    var sourceX = this.frameWidth * this.currentFrame;
    context.drawImage(this.image, sourceX, 0, this.frameWidth, this.image.height, this.x - xScroll, this.y - yScroll, this.frameWidth, this.image.height);

    this.timeSinceLastFrame -= dt;
    if (this.timeSinceLastFrame <= 0)
    {
      this.timeSinceLastFrame = this.timeBetweenFrames;
      ++this.currentFrame;
      this.currentFrame %= this.frameCount;
    }
  }

  this.shutdownAnimatedGameObject = function()
  {
    this.shutdownVisualGameObject();
  }

  this.shutdown = function()
  {
    this.shutdownAnimatedGameObject();
  }

  this.collisionArea = function()
  {
    return new Rectangle().startupRectangle(this.x, this.y, this.frameWidth, this.image.height);
  }
}
AnimatedGameObject.prototype = new VisualGameObject;