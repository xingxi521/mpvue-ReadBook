
export default{
    //获取wx小程序用户授权过的权限
    getSetting(type,hasAuth,noAuth){
        mpvue.getSetting({
            success (res) {
                if(res.authSetting[`scope.${type}`]){//已经授权过
                    hasAuth(res.authSetting)
                }else{//没授权过
                    noAuth()
                }
            },
            fail(err){
                console.log(err);//抛出异常（wx服务器的错误）
            }
        })
    },
    //获取用户信息(需要先授权，否则会进入fail)
    getUserInfo(success,fail){
        mpvue.getUserInfo({
            success(res){
                success(res.userInfo);
            },
            fail(res){//
                fail(res);
            }
        })
    },
    //wx小程序的同步存储数据
    setStorageSync(key,value){
        mpvue.setStorageSync(key, value);
    },
    //wx小程序的同步读取数据
    getStorageSync(key){
        return mpvue.getStorageSync(key);
    },
    //获取微信登陆凭证Code
    wxLogin(success,fail){
        mpvue.login({
            success(res){
                if(res.code){
                    success(res.code);
                }else{
                    fail();//获取成功，但没获取到code码
                }
            },
            fail(){//
                fail();//获取失败了
            }
        });
    },
    //微信loading 提示框显示
    showLoading(text){
        mpvue.showLoading({
            title: text,
            mask:true
        })
    },
    //微信loading 提示框隐藏
    hideLoading(){
        mpvue.hideLoading()
    },
    //微信showToast
    showToast(title){
        mpvue.showToast({
            title,
            icon: 'error',
            duration: 2000
        })
    },
    //wx模态框
    showModal(title,content,sure,cancel){
        mpvue.showModal({
            title,
            content,
            success (res) {
                if (res.confirm) {
                    sure();
                } else if (res.cancel) {
                    cancel();
                }
            }
        })
    },
    //wx动态设置当前页面的标题
    setNavigationBarTitle(title){
        mpvue.setNavigationBarTitle({
            title
        })
    }
}