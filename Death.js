function Death()
{
  this.startupDeath = function()
  {
    this.startupVisualGameObject(g_ResourceManager.death, 0, 0, 1);
	g_ApplicationManager.updateScore();
    return this;
  }

  this.keyDown = function(event)
  {
    if (event.keyCode == 13)
    {
      initScore();
      g_ApplicationManager.startLevel();
    }
  }
}
Death.prototype = new VisualGameObject;