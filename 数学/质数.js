function isPrime(n) {
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function countPrimesV1(n) {
    const list = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime(i)) {
            list.push(i);
        }
    }
    console.log(list);
    return list;
}

function countPrimes(n) {
    const isPrime = new Array(n + 1).fill(true);
    // 0 1 都不是质数
    // 从2开始，一直到sqrt(n)
    isPrime[0] = false;
    isPrime[1] = false;
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const list = [];
    for (let i = 2; i < n + 1; i++) {
        if (isPrime[i]) {
            list.push(i);
        }
    }
    console.log(list);
    return list;
}
const v1 = countPrimesV1(3)
const v2 = countPrimes(3)

console.log(v1.length === v2.length, 'v1和v2的长度应该相等');
console.log(v1.join('') === v2.join(''), 'v1和v2的元素应该相等')