function mat() {
  this.matrix = [[0, 0, 0, 1, 0, 0, 0, 0],
                 [0, 1, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 1, 0, 1, 0],
                 [0, 0, 0, 1, 0, 0, 0, 0],
                 [0, 1, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 1],
                 [0, 0, 0, 1, 0, 0, 0, 0],
                 [0, 1, 0, 0, 0, 0, 0, 0]];
  this.minenum = 9;
}

module.exports = mat;

mat.prototype.pos_get = function pos_get(x, y, callback) {
  var cnt = 0;
  for(var i = Math.max(0, x - 1); i <= Math.min(7, x + 1); ++ i) {
    for(var j = Math.max(0, y - 1); j <= Math.min(7,  y + 1); ++ j) {
      if(this.matrix[i][j] == 1) {
        cnt += 1;
      }
    }    
  }
  return callback(cnt, this.matrix[x][y]);
}

