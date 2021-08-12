const sumDigitProd =(...numbers) =>{
const add = (a) => a.length ===1 ? a[0] : a.reduce((acc, val) => acc+val);
const produce = (n,p=1) => {
if(n){
    return produce(Math.floor(n/10),p*(n%10));
    };
    return p;
};
const res = produce(add(numbers));
if(res>9) {
    return sumDigitProd(res);
}
return res;
};

console.log(sumDigitProd(16,28));
console.log(sumDigitProd(1,2,3,4,5,6));