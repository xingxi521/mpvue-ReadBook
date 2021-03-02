function createFlyIo(){
    if(mpvuePlatform === "wx"){
        var Fly = require('flyio/dist/npm/wx');
        return new Fly();
    }
    return null;
}
//错误处理
function errorHandler(err){
    console.log(err);
}
//get请求
export function get_Fly(url,params = {}){
    var fly = createFlyIo();
    if(fly){
        return new Promise((resolve,reject)=>{
            fly.get(url,params).then(res=>{
                if(res && res.status == 200 && res.data && res.data.error_code == 0){
                    resolve(res.data.data);
                }else{
                    var msg = res.data.msg || '数据请求失败';
                    mpvue.showToast({
                        title: msg,
                        icon: 'error',
                        duration: 2000
                    })
                    reject(msg);
                }
            }).catch(err=>{
                errorHandler(err);
                reject(err);
            })
        });
    }
}
//post请求
export function post_Fly(url,params = {}){
    var fly = createFlyIo();
    if(fly){
        return new Promise((resolve,reject)=>{
            fly.post(url,params).then(res=>{
                if(res && res.status == 200 && res.data && res.data.error_code == 0){
                    resolve(res.data.data);
                }else{
                    var msg = res.data.msg || '数据请求失败';
                    mpvue.showToast({
                        title: msg,
                        icon: 'error',
                        duration: 2000
                    })
                    reject(msg);
                }
            }).catch(err=>{
                errorHandler(err);
                reject(err);
            })
        });
    }
}