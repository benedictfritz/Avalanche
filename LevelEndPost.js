function LevelEndPost()
{
  this.startupLevelEndPost = function(image, x, y, z)
  {
    this.startupAnimatedGameObject(image, x, y, z, 4, 10);
    return this;
  }

  this.shutdown = function()
  {
    this.shutdownLevelEndPost();
  }

  this.shutdownLevelEndPost = function()
  {
    this.shutdownAnimatedGameObject();
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
    if (this.collisionArea().intersects(g_player.collisionArea()))
    {
      g_ApplicationManager.openMainMenu();
      if (g_highscore > g_score)
        g_highscore = g_score;
      this.shutdown();            
    }
  }
}
LevelEndPost.prototype = new AnimatedGameObject;