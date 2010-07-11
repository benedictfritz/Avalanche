function Player()
{
  this.jumpHeight = 64;
  this.halfPI = Math.PI / 2;
  this.jumpHangTime = 0.5;
  this.jumpSinWaveSpeed = this.halfPI / this.jumpHangTime;
  this.jumpSinWavePos = 0;
  this.fallMultiplyer = 1.5;
  this.grounded = true;
  this.speed = 500;
  this.left = false;
  this.right = false;
  this.level = null;
  this.screenBorder = 100;

  this.startupPlayer = function(level)
  {
    this.startupAnimatedGameObject(g_ResourceManager.idleLeft, 300, 400 - 150, 4, 1, 20);
    this.level = level;
    return this;
  }

  this.keyDown = function(event)
  {
    var updateRequired = false;

    if (event.keyCode == 37 && !this.left)
    {
      this.left = true;
      updateRequired = true;
    }
    
    if (event.keyCode == 39 && !this.right)
    {
      this.right = true;
      updateRequired = true;
    }
    
    if (event.keyCode == 32 && this.grounded)
    {
      this.grounded = false;
      this.jumpSinWavePos = 0;
    }

    if (updateRequired)
      this.updateAnimation();
  }

  this.keyUp = function(event)
  {
    if (event.keyCode == 37)
    {
      this.left = false;
      this.setAnimation(g_ResourceManager.idleLeft, 1, 20);
    }

    if (event.keyCode == 39)
    {
      this.right = false;
      this.setAnimation(g_ResourceManager.idleRight, 1, 20);
    }

    this.updateAnimation();
  }

  this.updateAnimation = function()
  {
   if (this.right && this.left)
      this.setAnimation(g_ResourceManager.idleLeft, 1, 20);
    else if (this.right)
      this.setAnimation(g_ResourceManager.runRight, 10, 20);
    else if (this.left)
      this.setAnimation(g_ResourceManager.runLeft, 10, 20);
  }

  this.update = function (dt, context)
  {
    if (this.left && this.x >= 4)
      this.x -= this.speed * dt;
	  
	if(this.x < 0)
		this.x = 0;
      
    if (this.right && (this.x + 48) < g_GameObjectManager.canvas.width)
      this.x += this.speed * dt;
  }
}

Player.prototype = new AnimatedGameObject;