function ApplicationManager()
{
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    this.startupApplicationManager = function(canvasWidth, canvasHeight)
    {
        g_ApplicationManager = this;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.openMainMenu();

        return this;
    }

    this.startLevel = function()
    {
        g_GameObjectManager.shutdownAll();
		this.level = new Level().startupLevel(this.canvasWidth, this.canvasHeight);
		g_Level = this.level;
        this.background = new RepeatingGameObject().startupRepeatingGameObject(g_ResourceManager.background0, 0, 0, 1, 600, 400-48-48, 0.25);
        g_player = new Player().startupPlayer(this.level);
        this.updateScore();
    }

    this.openMainMenu = function()
    {
        g_GameObjectManager.shutdownAll();
        g_GameObjectManager.xScroll = 0;
        g_GameObjectManager.yScroll = 0;
		if(g_highscore <= g_score)
			g_highscore = g_score;
        g_score = 0;
        this.mainMenu = new MainMenu().startupMainMenu();
    }

	this.openDeath = function()
    {
        g_GameObjectManager.shutdownAll();
        g_GameObjectManager.xScroll = 0;
        g_GameObjectManager.yScroll = 0;
		if(g_highscore <= g_score)
			g_highscore = g_score;
        g_score = 0;
        this.death = new Death().startupDeath();
    }
	
    this.updateScore = function()
    {
        var score = document.getElementById("Score");
	var highscore = document.getElementById("HighScore");
        score.innerHTML = String(g_score);
	highscore.innerHTML = String(g_highscore);
    }
}