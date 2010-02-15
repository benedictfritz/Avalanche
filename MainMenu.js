function MainMenu()
{
  this.startupMainMenu = function()
  {
    this.startupVisualGameObject(g_ResourceManager.mainmenu, 0, 0, 1);
    return this;
  }

  this.keyDown = function(event)
  {
    g_ApplicationManager.startLevel();
  }
}
MainMenu.prototype = new VisualGameObject;