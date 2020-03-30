function nativeSort() {
    var arr = [32, 12, 34, 99, 05];
    arr.sort(function (a, b) {
        return a - b;
    });
    console.log(arr);
}
nativeSort();
