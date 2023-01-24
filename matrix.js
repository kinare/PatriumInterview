let res = generate([
    [1, 2, 3],
    [4, 5, 6],

]);

console.log(res);

function generate(arr) {
    let result = [];

    for (let i = 0; i < arr[0].length; i++) {
        for (let j = 0; j < arr[1].length; j++) {
            result.push(arr[0][i] + " " + arr[1][j]);
        }
    }

    return result;
}



