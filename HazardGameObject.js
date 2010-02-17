function HazardGameObject()
{
  this.rampRate = 0;
  var fallSpeed = 300;
  this.image = null;

  this.collisionArea = function()
  {
    return  new Rectangle().startupRectangle(this.x,
                                            this.y,
                                            this.image.width,
                                            this.image.height);
  }

  this.draw = function(dt, context)
  {
    context.drawImage(this.image, this.x, this.y);
  }
  
  this.update = function(dt, context)
  {
    this.y += fallSpeed * dt;

    if( this.collisionArea().intersects(g_player.collisionArea()))
    {	   
      g_ApplicationManager.openMainMenu();
      this.shutdown();
    }
    
    if(this.y > 300)
    {
      this.y = -Math.floor(Math.random()*900);
      this.x = Math.floor(Math.random()*550);
      g_score++;
      g_ApplicationManager.updateScore();
      this.rampRate++;
      if((this.rampRate % 2) == 0)
        g_Level.addHazard();
    }
  }

  this.startupHazard = function(image, x, y, z)
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

HazardGameObject.prototype = new GameObject;