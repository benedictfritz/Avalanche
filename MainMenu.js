/**
  Opening screen displaying instructions
*/
function MainMenu()
{
  this.startupMainMenu = function()
  {
    this.startupVisualGameObject(g_ResourceManager.mainmenu, 0, 0, 1);
    return this;
  }

  this.keyDown = function(event)
  {
    if (event.keyCode == 13) {
		g_ApplicationManager.startLevel();
	}
  }
}
MainMenu.prototype = new VisualGameObject;