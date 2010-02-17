function GameObjectManager()
{
    this.gameObjects = new Array();
    this.addedGameObjects = new Array();
    this.removedGameObjects = new Array();
    this.lastFrame = new Date().getTime();
    this.xScroll = 0;
    this.yScroll = 0;
    this.canvas = null;
    this.context2D = null;
    this.backBuffer = null;
    this.backBufferContext2D = null;
    this.canvasSupported = false;
    this.resourcesLoaded = false;
    this.loadingScreenCol = 0;
    this.loadingScreenColDirection = 1;
    this.loadingScreenColSpeed = 255;

    this.startupGameObjectManager = function()
	{
        // set the global pointer to reference this object
        g_GameObjectManager = this;

        // watch for keyboard events
        document.onkeydown = function(event){g_GameObjectManager.keyDown(event);}
        document.onkeyup = function(event){g_GameObjectManager.keyUp(event);}

        // get references to the canvas elements and their 2D contexts
        this.canvas = document.getElementById('canvas');

        // if the this.canvas.getContext function does not exist it is a safe bet that
        // the current browser does not support the canvas element.
        // in this case we don't go any further, which will save some debuggers (like
        // the IE8 debugger) from throwing up a lot of errors.
        if (this.canvas.getContext)
        {
            this.canvasSupported = true;
            this.context2D = this.canvas.getContext('2d');
            this.backBuffer = document.createElement('canvas');
            this.backBuffer.width = this.canvas.width;
            this.backBuffer.height = this.canvas.height;
            this.backBufferContext2D = this.backBuffer.getContext('2d');
        }

        // create a new ResourceManager
        new ResourceManager().startupResourceManager(
            [{name: 'runLeft', src: 'resources/run_left.png'},
            {name: 'runRight', src: 'resources/run_right.png'},
            {name: 'idleLeft', src: 'resources/idle_left.png'},
            {name: 'idleRight', src: 'resources/idle_right.png'},
            {name: 'background0', src: 'resources/jsplatformer4_b0.png'},
            {name: 'background1', src: 'resources/jsplatformer4_b1.png'},
            {name: 'background2', src: 'resources/jsplatformer4_b2.png'},
            {name: 'block', src: 'resources/BlockA0.png'},
            {name: 'gem', src: 'resources/Gem.png'},
            {name: 'mainmenu', src: 'resources/mainmenu.png'},
            {name: 'portal', src: 'resources/portal.png'}]);

        // use setInterval to call the draw function
        setInterval(function(){g_GameObjectManager.draw();}, SECONDS_BETWEEN_FRAMES);
        
        return this;        
    }
    
    // The render loop
    this.draw = function ()
    {
        // calculate the time since the last frame
        var thisFrame = new Date().getTime();
        var dt = (thisFrame - this.lastFrame)/1000;
        this.lastFrame = thisFrame;

        if (!this.resourcesLoaded)
        {
            var numLoaded = 0;
            for (i = 0; i < g_ResourceManager.imageProperties.length; ++i)
            {
                if (g_ResourceManager[g_ResourceManager.imageProperties[i]].complete)
                {
                    ++numLoaded;
                }
            }
            if ( numLoaded == g_ResourceManager.imageProperties.length )
            {
                // create a new ApplicationManager
                new ApplicationManager().startupApplicationManager(this.canvas.width, this.canvas.height);
                this.resourcesLoaded = true;
            }
            else
            {
                this.loadingScreenCol += this.loadingScreenColDirection * this.loadingScreenColSpeed * dt;
                if (this.loadingScreenCol > 255)
                {
                    this.loadingScreenCol = 255;
                    this.loadingScreenColDirection = -1;
                }
                else if (this.loadingScreenCol < 0)
                {
                    this.loadingScreenCol = 0;
                    this.loadingScreenColDirection = 1;
                }
                this.context2D.fillStyle = "rgb(" + parseInt(this.loadingScreenCol) + "," 
		    + parseInt(this.loadingScreenCol) + "," + parseInt(this.loadingScreenCol) + ")";
                
		this.context2D.fillRect (0, 0, this.canvas.width, this.canvas.height);
            }
        }
        
        // clear the drawing contexts
        if (this.canvasSupported && this.resourcesLoaded)
        {
            this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);

            this.addNewGameObjects();
            this.removeOldGameObjects();
        
            // first update all the game objects
            for (var x = 0; x < this.gameObjects.length; ++x)
            {
                if (this.gameObjects[x].update)
                {
                    this.gameObjects[x].update(dt, this.backBufferContext2D);
                }
            }

            // then draw the game objects
            for (var x = 0; x < this.gameObjects.length; ++x)
            {
                if (this.gameObjects[x].draw)
                {
                    this.gameObjects[x].draw(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
                }
            }

            // copy the back buffer to the displayed canvas
            this.context2D.drawImage(this.backBuffer, 0, 0);
        }        
    };

    this.shutdownAll = function()
    {
        for (var x = 0; x < this.gameObjects.length; ++x)
        {
            if (this.gameObjects[x].shutdown)
            {
                this.gameObjects[x].shutdown();
            }
        }

        this.removeOldGameObjects();
    }
    
    /**
        Adds a new GameObject to the gameObjects collection
        @param gameObject The object to add
    */
    this.addGameObject = function(gameObject)
    {
        this.addedGameObjects.push(gameObject);
    };

    this.addNewGameObjects = function()
    {
        if (this.addedGameObjects.length != 0)
        {
            for (var x = 0; x < this.addedGameObjects.length; ++x)
            {
                this.gameObjects.push(this.addedGameObjects[x]);
            }

            this.addedGameObjects.clear();
            this.gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;});
        }
    }
    
    this.removeGameObject = function(gameObject)
    {
	this.removedGameObjects.push(gameObject);
    }

    this.removeOldGameObjects = function()
    {
        if (this.removedGameObjects.length != 0)
        {
            for (var x = 0; x < this.removedGameObjects.length; ++x)
            {
                this.gameObjects.removeObject(this.removedGameObjects[x]);
            }
            this.removedGameObjects.clear();
        }
    }

    this.keyDown = function(event)
    {
	if(event.keyCode == 83)
	    music();

        for (var x = 0; x < this.gameObjects.length; ++x)
        {
            if (this.gameObjects[x].keyDown)
            {
                this.gameObjects[x].keyDown(event);
            }
        }
    }

    this.keyUp = function(event)
    {
        for (var x = 0; x < this.gameObjects.length; ++x)
        {
            if (this.gameObjects[x].keyUp)
            {
                this.gameObjects[x].keyUp(event);
            }
        }
    }
}