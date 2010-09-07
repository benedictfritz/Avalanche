function Powerup()
{
  // The value of the powerup
  this.value = 0;
  this.sineWavePos = 0;
  // How quickly the powerup cycles through the sine wave
  this.bounceTime = 1;
  // The speed to increment the sineWavePos value at
  this.bounceSpeed = Math.PI / this.bounceTime;
  // The height of the powerups bounce
  this.bounceHeight = 10;

  this.startupPowerup = function(value, image, x, y, z, frameCount, fps)
  {
    this.startupAnimatedGameObject(image, x, y - this.bounceHeight, z, frameCount, fps);
    this.value = value;
    return this;
  }

  this.shutdownPowerup = function()
  {
    this.shutdownAnimatedGameObject();
  }

  this.shutdown = function()
  {
    this.shutdownPowerup();
  }

  /**
  Updates the object
  @param dt The time since the last frame in seconds
  @param context The drawing context
  @param xScroll The global scrolling value of the x axis
  @param yScroll The global scrolling value of the y axis
  */
  this.update = function (dt, context, xScroll, yScroll)
  {
    var lastSineWavePos = this.sineWavePos;
    this.sineWavePos += this.bounceSpeed * dt;
    this.y += (Math.sin(this.sineWavePos) - Math.sin(lastSineWavePos)) * this.bounceHeight;

    if (this.collisionArea().intersects(g_player.collisionArea()))
    {
      this.shutdown();
      g_score += this.value;
      g_ApplicationManager.updateScore();
    }
  }
}

Powerup.prototype = new AnimatedGameObject;