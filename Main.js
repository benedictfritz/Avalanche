var FPS = 30;
var SECONDS_BETWEEN_FRAMES = 1 / FPS;

// Global Variables prefixed with "g_"
var g_GameObjectManager = null;
var g_ApplicationManager = null;
var g_ResourceManager = null;
var g_score = 0;
var g_highscore = 0;
var g_hsmangle = 0x0;
var g_player = null;
var g_key = 0;
var g_mask = new Array( 
            0xDEADBEEF,
            0x000FECE5,
            0x12345678,
            0x55555555,
            0x06171989);

// The entry point of the application is set to the init function
window.onload = init;

function init()
{
  new GameObjectManager().startupGameObjectManager();
}