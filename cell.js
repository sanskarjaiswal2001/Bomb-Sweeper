//color palette
var bombColor = '#CA3E47'
var selectBox = '#171717'
var textCol = '#EDEDED'
function Cell(i, j, w){
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.bomb = false;
    this.revealed = false;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed){
        if(this.bomb){
            fill(bombColor);
            rect(this.x, this.y, this.w, this.w);
        }
        else {
            fill(selectBox);
            rect(this.x, this.y, this.w, this.w);
            if(this.neighborCount > 0){
                textAlign(CENTER);
                fill(textCol);
                textSize(32);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 25);
            }
        }
    }
}

Cell.prototype.countBombs = function(){
    if (this.bomb){
        this.neighborCount = -1;
        return;
    }
    var total = 0;
    for (var xoff = -1; xoff <= +1; xoff++){
        for (var yoff = -1; yoff <= +1; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows){
                var neighbor = grid[i][j];
                if(neighbor.bomb) {
                 total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.contains = function(x, y){
    return (x > this.x && x< this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function(){
    this.revealed = true;
    if (this.neighborCount == 0){
        this.floodFill();
    }
}

Cell.prototype.floodFill = function(){
    for (var xoff = -1; xoff <= +1; xoff++){
        for (var yoff = -1; yoff <= +1; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows){
                var neighbor = grid[i][j];
                if(!neighbor.bomb && !neighbor.revealed) {
                    neighbor.reveal();
                }
            }
        }
    }
}