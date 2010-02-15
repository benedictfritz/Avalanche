function ResourceManager()
{
  this.imageProperties = null;

  this.startupResourceManager = function( images)
  {
    g_ResourceManager = this;

    // initialize internal state.
    this.imageProperties = new Array();

    for ( var i = 0; i < images.length; i++ )
    {
      // create new Image object and add to array
      var thisImage = new Image;
      this[images[i].name] = thisImage;
      this.imageProperties.push(images[i].name);

      // assign the .src property of the Image object
      thisImage.src = images[i].src;
    }
    
    return this;
  }
}