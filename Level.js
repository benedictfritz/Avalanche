function Level()
{
  this.numHazards = 6;
  this.hazards = new Array();

  this.startupLevel = function(width, height)
  {
    for(var x = 0; x < this.numHazards; x++) 
    {
      new HazardGameObject().startupHazard(g_ResourceManager.gem,
                                          Math.floor(Math.random()*(width - 50)),
                                          0 - Math.floor(Math.random() * height * 2),
                                          2);
    }
    return this;
  }
  
  this.addHazard = function()
  {
      this.numHazards++;
      new HazardGameObject().startupHazard(g_ResourceManager.gem,
					   Math.floor(Math.random()*550),
					   0 - Math.floor(Math.random() * 1200 ),
					   2);
  }
}