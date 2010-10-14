/**
    Removes a number of objects from the array
    @param from The first object to remove (int)
    @param to (Optional) The last object to remove (int)
*/
Array.prototype.remove = function( from, to)
{
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/**
    Removes a specific object from the array
    @param object The object to remove (int)
*/
Array.prototype.removeObject = function(object)
{
  for (var i = 0; i < this.length; ++i)
  {
    if (this[i] === object)
    {
      this.remove(i);
      break;
    }
  }
}

function RoR(x, n)
{
  y = ((x >>> n) | (x << (32-n)));
  return y;
}

function RoL(x,n)
{
  y = ((x << n) | (x >>> (32-n)));
  return y;
}

function mangle()
{
  g_key = RoR(g_key, (g_score%7));
  g_key = g_key ^ g_mask[g_score%5];
}

function initScore()
{
  g_score = 0;
  g_key = 0x00C0FFEE;
}