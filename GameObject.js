function GameObject()
{
  /* Display depth order. A smaller zOrder means the element is rendered first, and therefor */
  this.zOrder = 0;
  this.x = 0;
  this.y = 0;
  
  this.startupGameObject = function(x, y, z)
  {
    this.zOrder = z;
    this.x = x;
    this.y = y;
    g_GameObjectManager.addGameObject(this);
    return this;
  }
  
  this.shutdownGameObject = function()
  {
    g_GameObjectManager.removeGameObject(this);
  }

  this.shutdown = function()
  {
    this.shutdownGameObject();
  }
}