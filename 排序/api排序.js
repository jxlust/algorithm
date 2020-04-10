function nativeSort() {
    var arr = [32, 12, 34, 99, 05];
    arr.sort((a, b) => a - b);
    console.log(arr);
}
nativeSort();