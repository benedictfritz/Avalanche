function Rectangle()
{
  this.left = 0;
  this.top = 0;
  this.width = 0;
  this.height = 0;

  this.startupRectangle = function(left, top, width, height)
  {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    return this;
  }

  this.intersects = function(other)
  {
    var give = 5;

    if (this.left + this.width < other.left + give)
      return false;
    if (this.top + this.height < other.top + give)
      return false;
    if (this.left > other.left + other.width - give)
      return false;
    if (this.top > other.top + other.height - give)
      return false;

    return true;
}
}