var FPS = 30;
var SECONDS_BETWEEN_FRAMES = 1 / FPS;

// Global Variables prefixed with "g_"
var g_GameObjectManager = null;
var g_ApplicationManager = null;
var g_ResourceManager = null;
var g_score = 0;
var g_highscore = 0;
var g_player = null;

// The entry point of the application is set to the init function
window.onload = init;

function init()
{
  new GameObjectManager().startupGameObjectManager();
}