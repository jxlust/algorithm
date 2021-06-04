class MinStack {
  constructor(size) {
    this.minV = undefined;
    this.stack = [];
    this.size = size;
  }
  push(v) {
    const { stack } = this;
    if (stack.length) {
      let diff = v - this.minV;
      stack.push(diff);
      if (diff < 0) {
        this.minV = v;
      }
    } else {
      //   stack.push(v);
      stack.push(0);
      this.minV = v;
    }
  }
  pop() {
    const { stack } = this;
    let top = stack.pop();
    let value = undefined;
    if (top >= 0) {
      value = top + this.minV;
      if (stack.length === 0) {
        this.minV = -1;
      }
    } else {
      value = this.minV;
      this.minV = this.minV - top;
    }
    return value;
  }
  top() {
    const { stack } = this;
    if (stack.length) {
      let v = stack[stack.length - 1];
      if (v < 0) {
        return this.minV;
      } else {
        return this.minV + v;
      }
    } else {
      return null;
    }
  }
  getMin() {
    return this.minV;
  }
}

//4 3 1 5 2
//0 -1 -2 4 1
//4 3  1 1 1

//-2 0 -3
//0 2 -1

let min = new MinStack(10);
min.push(-2);
min.push(0);
min.push(-3);

console.log(min);

console.log(min.getMin());
console.log(min.pop());
console.log(min.top());
console.log(min.getMin());
console.log(min);
