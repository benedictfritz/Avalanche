function HazardGameObject()
{
  this.rampRate = 0;
  var fallSpeed = 300;
  var MAX_DEATH = 35;
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
      pausecomp(500);
      g_ApplicationManager.openDeath();
      this.shutdown();
    }
    
    if(this.y > 300)
    {
      this.y = -Math.floor(Math.random()*900);
      this.x = Math.floor(Math.random()*550);
      g_score++;
      mangle();
      g_ApplicationManager.updateScore();
      if(g_Level.numHazards < MAX_DEATH){
        this.rampRate++;
        if((this.rampRate % 2 == 0))
	      g_Level.addHazard();
      }
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

function pausecomp(millis) 
{
  var date = new Date();
  var curDate = null;
  
  do { curDate = new Date(); } 
  while(curDate-date < millis);
} 

HazardGameObject.prototype = new GameObject;