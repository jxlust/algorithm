//算法思路：
// 1.先假设迷宫中所有的通路都是完全封闭的，白色的格子表示可以通过，黑色的表示墙壁，表示无法通过。
// 2.随机选择一个白色的格子作为当前正在访问的格子，同时，把该格子放进一个表示已经访问的列表。
// 3.循环以下操作直到所有的格子都被访问。
// 得到当前访问格子四周（上、下、左、右）的格子，在这些格子中随机选择一个没有在访问列表中的格子，如果找到，则把该格子和当前访问格子中间的墙"打通"置0，把该格子作为当前访问的格子，并放入访问列表。
// 如果周围所有的格子都已访问过，则从已访问列表中随机选取一个作为当前访问的格子。
// 通过以上的迷宫生成算法，可以生成一个自然随机的迷宫。
//生成方式1：把所有白点连通，即可生成一棵树，不能是环，可以用kruskal算法，并查集判断


//首先，迷宫初始化用二维矩阵表示
//0表示通路，1表示墙
//需要初始化一些通路点，来随机生成一条生成树
//现在假定入口和出口固定，左上角和右下角都为0


//取区域随机数x>=min && x<max
function randInt(min, max) {
    max = max || 0;
    min = min || 0;
    var step = Math.abs(max - min);
    var st = (arguments.length < 2) ? 0 : min; //参数只有一个的时候，st = 0;
    var result;
    // result = st + (Math.ceil(Math.random() * step)) - 1;
    result = st + ((Math.random() * step) | 0);
    return result;
}
class Maze {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        //每个点可以看成一棵树，整个是森林
        //实际的点设置为奇数，因为边是墙的原因
        this.mRow = 2 * row + 1;
        this.mCol = 2 * row + 1;
        this.matrix = [];

        this.createMatrix();
        this.createMaze();

    }
    createMatrix() {
        let {
            matrix
        } = this;
        //每个点可以看成一棵树，整个是森林
        //实际的点设置为奇数，因为边是墙的原因
        let r = this.mRow;
        let c = this.mCol;

        for (let i = 0; i < r; i++) {
            matrix[i] = new Array(c);
            for (let j = 0; j < c; j++) {
                if (i % 2 === 1 && j % 2 === 1) {
                    matrix[i][j] = 0;
                } else {
                    matrix[i][j] = 1;
                }
            }
        }
        return matrix;
    }


    createMaze() {
        let {
            row,
            col,
            matrix
        } = this;
        let count = row * col; //需要连通的树的个数
        let mR = this.mRow;
        let mC = this.mCol;

        //初始化用于判断是否访问过的点集合，减少时间复杂度
        let pointsStatus = [];
        for (let i = 0; i < count; i++) {
            pointsStatus[i] = 0; //0未访问过
        }
        let visited = [];
        //随机取一个点,开始生成树
        let point = (Math.random() * count) | 0;
        visited.push(point);
        pointsStatus[point] = 1;

        while (visited.length < count) {
            //解析成坐标
            let px = (point / col) | 0;
            let py = point % col;

            //四个方向 (x+1,y) (x-1,y) (x,y-1) (x,y+1),随机选择
            //分别对四个方向得分析一下，从满足条件且没有访问的节点随机取一个点继续合并树
            let nextPointObj = this.getCheckPoints(px,py,row,col,pointsStatus);

            if(nextPointObj){

                //point newpoint之间需要设置为0连通起来
                let originX = px * 2 + 1 + nextPointObj.x;
                let originY = py * 2 + 1 + nextPointObj.y;
                matrix[originX][originY] = 0;

                point = nextPointObj.newp;
                pointsStatus[point] = 1;
                visited.push(point);

            }else{
                //四个方向都不符合要求了，再随机取一个点
                point = (Math.random() * count) | 0;
                // while(pointsStatus[point] !== 0){
                //     point = (Math.random() * count) | 0;
                // }
                // let notVisitePoints = pointsStatus.map((item,index) => {
                //     if(item === 0){
                //         return index;
                //     }
                // })
                // let notIndex = randInt(0,notVisitePoints.length);
                // console.log(1,pointsStatus);
                // console.log(2,notVisitePoints);
                // point = notVisitePoints[notIndex];
            }


        }

    }

    getCheckPoints(px, py, row, col, pointsStatus) {
        let direct = [{
            x: 1,
            y: 0
        }, {
            x: -1,
            y: 0
        }, {
            x: 0,
            y: -1,
        }, {
            x: 0,
            y: 1,
        }]
        let p = [];
        for (let {
                x,
                y
            } of direct) {
            let newx = px + x;
            let newy = py + y;
            let newp = newx * col + newy;

            if (newx >= 0 && newx < row && newy >= 0 && newy < col && pointsStatus[newp] === 0) {
                p.push({newp,x,y})
            }
        }
        if (p.length) {
            let index = randInt(0, p.length);
            console.log('index;',index);
            return p[index];
        } else {
            return null;
        }
    }

    getMatrix() {
        return this.matrix;
    }

}





let mz = new Maze(4,4);
console.log(mz.getMatrix());