function out_probably(len){
    var result = [];
    var nums = [];
    for(var i = 1;i <= len;i++){
        nums.push(i);
    }
    for(var i = len;i > 0;i--){
        result = result.concat(out_combine(nums,i));
    }
    return result;
}

function out_combine(source,m){
    var n = source.length;
    if(m > n){
        return [];
    }
    if(m == n){
        var ints = [];
        ints.push(source);
        return ints;
    }
    var result = [];
    var bs = [];
    for(var i = 0;i < n;i++){
        bs[i] = 0;
    }
    for(var i = 0;i < m;i++){
        bs[i] = 1;
    }
    var flag = true;
    var tempFlag = false;
    var pos,sum;
    do{
        sum = 0;
        pos = 0;
        tempFlag = true;
        result.push(out_print(bs,source));
        for(var i = 0;i < n - 1;i++){
            if(bs[i] == 1 && bs[i+1] == 0){
                bs[i] = 0;
                bs[i+1] = 1;
                pos = i;
                break;
            }
        }

        for(var i=0;i<pos;i++){
            if(bs[i] == 1){
                sum++;
            }
        }

        for(var i=0;i<pos;i++){
            if(i<sum){
                bs[i]=1;
            }else{
                bs[i]=0;
            }
        }

        for(var i= n-m;i<n;i++){
            if(bs[i]==0){
                tempFlag = false;
                break;
            }
        }

        flag = tempFlag == false;
    }while (flag)
    result.push(out_print(bs,source));
    return result;
}

function out_print(bs,source){
    var result = [];
    var pos = 0;
    for(var i = 0;i < bs.length;i++){
        if(bs[i] == 1){
            result[pos] = source[i];
            pos++;
        }
    }
    return result;
}