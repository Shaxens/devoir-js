document.addEventListener('DOMContentLoaded', () => {
  var xPos, yPos;
  var banner = document.querySelector('.banner'),
    c = document.querySelector('#flames'),
    ctx = c.getContext('2d'),
    cw = c.width = banner.offsetWidth,
    ch = c.height = banner.offsetHeight,
    parts = [],
    partsFull = false,    
    rand = function(min, max){
      return Math.floor( (Math.random() * (max - min + 1) ) + min);
    };

    color = {
      feu: {
        hue: [0, 60],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      eau: {
        hue: [180, 240],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      terre: {
        hue: [60, 180],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      électrik: {
        hue: [30, 60],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      psy: {
        hue: [280, 330],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      glace: {
        hue: [240, 300],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      poison: {
        hue: [240, 330],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      insecte: {
        hue: [30, 90],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      normal: {
        hue: [0, 360],
        saturation: [0, 0],
        lightness: [75, 75]
      },
      combat: {
        hue: [330, 30],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      sol: {
        hue: [30, 60],
        saturation: [0, 100],
        lightness: [30, 60]
      },
      roche: {
        hue: [0, 60],
        saturation: [0, 50],
        lightness: [30, 60]
      },
      acier: {
        hue: [0, 60],
        saturation: [0, 25],
        lightness: [50, 75]
      },
      dragon: {
        hue: [210, 270],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      fée: {
        hue: [240, 330],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      spectre: {
        hue: [240, 330],
        saturation: [0, 100],
        lightness: [20, 70]
      },
      vol: {
        hue: [210, 270],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      plante: {
        hue: [90, 150],
        saturation: [50, 100],
        lightness: [20, 70]
      },
      ténèbres: {
        hue: [330, 360],
        saturation: [0, 50],
        lightness: [10, 30]
      }
    }
    
    // Set the Pokemon type here
    pokemonType = localStorage.getItem('pokemonType');

    var Part = function(){
      this.reset();
    };
    
    Part.prototype.reset = function(){
      this.startRadius = rand(1, 25);
      this.radius = this.startRadius;
      this.x = xPos;
      this.y = yPos;
      this.vx = 1;
      this.vy = 1;
      this.hue = rand(color[pokemonType].hue[0], color[pokemonType].hue[1]);
      this.saturation = rand(color[pokemonType].saturation[0], color[pokemonType].saturation[1]);
      this.lightness = rand(color[pokemonType].lightness[0], color[pokemonType].lightness[1]);
      this.startAlpha = rand(1, 10) / 100;
      this.alpha = this.startAlpha;
      this.decayRate = 0.1;  
      this.startLife = 7;
      this.life = this.startLife;
      this.lineWidth = rand(1, 3);
    }
    
    
      
  Part.prototype.update = function(){  
    this.vx += (rand(0, 200) - 100) / 1500;
    this.vy -= this.life/100;  
    this.x += this.vx;
    this.y += this.vy;  
    this.alpha = this.startAlpha * (this.life / this.startLife);
    this.radius = this.startRadius * (this.life / this.startLife);
    this.life -= this.decayRate;  
    if(
      this.x > cw + this.radius || 
      this.x < -this.radius ||
      this.y > ch + this.radius ||
      this.y < -this.radius ||
      this.life <= this.decayRate
    ){
      this.reset();  
    }  
  };
    
  Part.prototype.render = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ctx.strokeStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
    ctx.lineWidth = this.lineWidth;
    ctx.fill();
    ctx.stroke();
  };

  var createParts = function(){
        xPos = Math.floor(Math.random() * cw);
        yPos = Math.floor(Math.random() * ch);
        parts.push(new Part(pokemonType, xPos));
  }
    
  var updateParts = function(){
    var i = parts.length;
    while(i--){
      parts[i].update();
      if (i > 100) {
        parts.shift();
    
        }
    }

  };
  
  var renderParts = function(){
    var i = parts.length;
    while(i--){
      parts[i].render();
    }   
  };
  

  
  var clear = function(){
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'hsla(0, 0%, 0%, .3)';
    ctx.fillRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = 'lighter';
  };

  var loop = function(){
    window.requestAnimFrame(loop, c);
    clear();
    createParts();
    updateParts();
    renderParts();
  };
  
  window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

  
  
  loop();

  
})