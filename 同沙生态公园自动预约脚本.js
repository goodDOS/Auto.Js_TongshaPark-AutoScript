//*
//*  脚本信息！
//*
//*  脚本名称: 
//*  东莞市同沙生态公园公众号移动访客预约信息填写自动化执行脚本
//*
//*  脚本语言: 
//*  JavaScript
//*
//*  运行APP平台: 
//*  Auto.Js 及其衍生程序
//*
//*  版本号: 
//*  1.4 / 2022.8.5
//*
//*  代码来源: 
//*  [主体功能]模块    修改!自  NewDay_     的 <auto.js 公众号自动签到>          来源链接:  https://blog.csdn.net/NewDay_/article/details/109353414
//*  [脚本关闭]模块    修改!自  牙叔教程     的 <autojs之停止脚本的6种方法>        来源链接:  https://blog.csdn.net/snailuncle2/article/details/115090390
//*  [网络检测]模块    修改!自  zjing125    的 <auto.js_HTTP请求的响应>          来源链接:  https://blog.csdn.net/ZHOU125disorder/article/details/113853952
//*  [亮屏解锁]模块    修改!自  ProAi       的 <AutoJS解锁手机屏幕>              来源链接:  https://blog.csdn.net/ProAi/article/details/120969799
//*  [消息推送]模块    修改!自  牙叔教程     的 <autojs发微信通知>                来源链接:  https://blog.csdn.net/snailuncle2/article/details/115733421
//*  [预约时段]模块    参考!自  xgx1209     的 <autojs怎么上滑屏幕>              来源链接:  https://zhidao.baidu.com/question/1708780803142400500.html
//*  [时间戳获取]模块  提取!自  Carson Ryan 的 <每日一篇，非常齐全的网络时间戳API> 来源链接:  https://blog.csdn.net/qq_41851614/article/details/107169811
//*  [时间戳转换]模块  修改!自  咖啡掠地狮   的 <js把时间戳转换成……>              来源链接:  https://blog.csdn.net/andwey/article/details/108801985
//*  [各种Js参数]语句  学习!自  网络大神们   的 <Auto.Js教程>                    来源链接:  互联网 & 官方文档: http://doc.autoxjs.com/
//*
//*  脚本创建者: 
//*  阿叶叶 Goqoq.com
//*
//*  许可协议: 
//*  GNU GPL-v3
//*


//*
//*
//*
//*  💡用户手机屏幕解锁密码填写模块！💡
//*
//*
//*

//  用户手机屏幕解锁密码填写，需亮屏工作💡
    let UsePassword = "这里双引号内改为屏幕解锁密码";  //🟥双引号内输入手机屏幕解锁密码


//*
//*
//*
//*  💡用户消息推送Token填写模块！💡
//*
//*
//*

//  [Pushplus推送加] 模块 微信公众号推送💡
    let UseToken = "这里双引号内改为Pushplus的Token";  //🟥这里填写自己的Token，去Pushplus注册获取


//*
//*
//*
//*  💡访客预约信息填写模块！💡
//*
//*
//*

//  拜访时段设置💡
function SetSwipe(){
    day2();  //🟥day1: 明天 | day2: 后天 | day3: 大后天 | 直接改数字
}

//  姓名、手机号、随行人数 填写💡
    let Text00 = "这里双引号内改为称呼";  //🟥设置输入姓名
    let Text01 = "这里双引号内改为手机号";  //🟥设置输入电话
    let Text02 = "这里双引号内改为随行人数";  //🟥设置输入随行人数

//  车牌号 填写，最多5个💡
    let Text03 = "这里双引号内改为车牌号,如 粤-SD12345";  //🟥设置输入车牌号01
    let Text04 = "";  //🟥设置输入车牌号02
    let Text05 = "";  //🟥设置输入车牌号03
    let Text06 = "";  //🟥设置输入车牌号04
    let Text07 = "";  //🟥设置输入车牌号05






//********************************************/
//*
//*
//*  ⚠️以下是[脚本关闭]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

engines.all().map((ScriptEngine) => {
    if(engines.myEngine().toString()!==ScriptEngine.toString()){
        ScriptEngine.forceStop();
        toastLog("已关闭其它正在运行的脚本!");
    }
});

//********************************************/
//*
//*
//*  ⚠️以下是[网络检测]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

for(var i=0;i<17;i++){
    try{
        let StatusCode_Get = http.get("https://open.weixin.qq.com");
        let StatusCode_Output = "状态码: " + StatusCode_Get.statusCode + " " + StatusCode_Get.statusMessage;
        let StatusCode_Err01 = "微信开放平台可访问,网络稳定, ";
        let StatusCode_Err02 = "微信开放平台不可访问,网络异常,将在5分钟后重试!重试次数: (" + i + "/16) ";
        if(StatusCode_Get.statusCode >= 200 && StatusCode_Get.statusCode < 300){
            toastLog(StatusCode_Err01 + StatusCode_Output);
            break;
        }else{
            toastLog(StatusCode_Err02 + StatusCode_Output);
        }
    }
    catch(err){
        log("**(此条网络报错已省略)**");
        if(err!==null){
            toastLog("微信开放平台不可访问,网络异常,将在5分钟后重试!重试次数: (" + i + "/16) ");
        }
	}
    sleep(300000);
}

//********************************************/
//*
//*
//*  ⚠️以下是[核心代码]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

//  亮屏解锁模块
    function password_input(){
        try{
            var password = UsePassword;// 输入密码
            for(var i = 0; i < password.length; i++){
                var p = text(password[i].toString()).findOne(500).bounds();
                click(p.centerX(), p.centerY());
                sleep(100);
            }
        }
        catch(err){
            log("**(此条解锁报错已省略)**");
        }
    }
    function unlock(){// 解锁屏幕
        try{
            if(!device.isScreenOn()){
                device.wakeUp();
                device.keepScreenOn(120000);
                sleep(500);
                swipe(500,2000,500,1000,210);
                password_input();
            }
        }
        catch(err){
            log("**(此条解锁报错已省略)**");
        }
    }
unlock();
device.vibrate(100);//震动100ms
sleep(1000);

//********************************************/
//*
//*
//*  ⚠️以下是[消息推送]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

//  消息推送标题类型声明区
    var ErrType01 = "🟥预约中断🚨";
    var ErrType02 = "🔶预约阻塞🚧";
    var ErrType03 = "❌预约失败💀";
    var ErrType04 = "🟡预约已满🤡";
    var ErrType05 = "🟨预约重复😅";
    var ErrType06 = "🟢预约成功🎉";
    var ErrType07 = "i页面异常,自动回退重进";

//  [Pushplus推送加] 模块 微信公众号推送
function Pushplus(ErrType, ErrMsg){
    log("↓-/-/-/-/推送内容/-/-/-/-↓");
    try{
        let token = UseToken;
        let url = "https://www.pushplus.plus/send";
        let r = http.postJson(url, {
        token: token,
        title: "[同沙] " + ErrType,
        content: ErrMsg + "<br/><br/>" + AppPageGet() + "<br/><br/>----------------------------------------<br/><br/>设备型号: " + device.brand + " " + device.product + "<br/>设备电量: " + device.getBattery() + "%<br/>内存剩余: " + getMemoryUsage() + "%<br/>发送时间: " + TrsTime() + "<br/><br/>东莞市同沙生态公园公众号<br/>移动访客预约信息填写<br/>自动化执行脚本<br/>消息推送🤖",
        });
        log(r.body.string());
    }
    catch(err){
        log("**(此条推送报错已省略)**");
        if(err!==null){
            toastLog("消息推送链接无法访问,发信失败!");
        }
    }
    log("↑-/-/-/-/推送内容/-/-/-/-↑");
}

//********************************************/
//*
//*
//*  ⚠️以下是[预约时段]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

var wW = device.width;//设备分辨率: 宽度
var hH = device.height;//设备分辨率: 高度
setScreenMetrics(wW, hH);
function day1(){
    null;
}
function day2(){
    try{
        swipe(128, hH - 256, 128, hH - 336, 500);
    }
    catch(err){
        log("**(此条滑动报错已省略)**");
        if(err!==null){
            var ErrType = "错误: 屏幕宽高参数获取错误";
            var ErrMsg = "屏幕宽高参数获取错误,故 '拜访时段' 列表无法滑动选择日期,只能预约为: 明天";
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
        }
    }
}
function day3(){
    try{
        swipe(128, hH - 256, 128, hH - 512, 500);
    }
    catch(err){
        log("**(此条滑动报错已省略)**");
        if(err!==null){
            var ErrType = "错误: 屏幕宽高参数获取错误";
            var ErrMsg = "屏幕宽高参数获取错误,故 '拜访时段' 列表无法滑动选择日期,只能预约为: 明天";
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
        }
    }
}

//********************************************/
//*
//*
//*  ⚠️以下是[时间获取]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

function TrsTime(){
    try{
        var GetTaobaoDate = http.get("https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
        var TaobaoDate = GetTaobaoDate.body.json();
        console.info("淘宝时间戳为:" + TaobaoDate.data.t);
        var TaobaoDateOutput = TaobaoDate.data.t;
        //时间戳转换    date:时间戳数字
        var date = new Date(Number(TaobaoDateOutput));
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YYMMDDhhmmss = YY + MM + DD +" "+hh + mm + ss;
    }
    catch(err){
        log("**(此条时间报错已省略)**");
        if(err!==null){
            toastLog("无法获取网络时间!");
        }
    }
}

//********************************************/
//*
//*
//*  ⚠️以下是[内存使用]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

function getMemoryUsage(){
    var usage = (100 * device.getAvailMem() / device.getTotalMem());
    //保留一位小数
    return  Math.round(usage * 10) / 10;
}

//********************************************/
//*
//*
//*  ⚠️以下是[脚本终止]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

//  取消屏幕常亮、询问是否锁屏、终止脚本
function JsExit(){
    device.cancelKeepingAwake();
    toastLog(">终止脚本并锁屏");
    AppPageGet();
    sleep(5000);
    home();//模拟按下Home键/按下Home键
    lockScreen();
    exit();
}

//********************************************/
//*
//*
//*  ⚠️以下是[页面获取]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

function AppPageGet(){
    if(className("android.widget.RelativeLayout").desc("搜索").findOne(100)!==null){
        var AppPage_2 = "---微信首页---";
        log(AppPage_2);
        return AppPage_2;
    }else if(className("android.widget.TextView").desc("取消按钮").text("取消").findOne(100)!==null){
        var AppPage_3 = "---微信搜索页---";
        log(AppPage_3);
        return AppPage_3;
    }else if(className("android.widget.Button").text("预约入园 .").findOne(100)!==null){
        var AppPage_4 = "---微信搜索结果页---";
        log(AppPage_4);
        return AppPage_4;
    }else if(className("android.widget.Button").text("预约").findOne(100)!==null){
        var AppPage_5 = "---同沙生态公园预约首页---";
        log(AppPage_5);
        return AppPage_5;
    }else if(className("android.view.View").text("拜访时段").findOne(100)!==null){
        var AppPage_6 = "---同沙生态公园日期选择页---";
        log(AppPage_6);
        return AppPage_6;
    }else if(className("android.view.View").text("访客信息").findOne(100)!==null){
        var AppPage_7 = "---同沙生态公园访客信息填写页---";
        log(AppPage_7);
        return AppPage_7;
    }else if(className("android.view.View").text("暂无历史记录").findOne(100)!==null){
        var AppPage_8 = "---同沙生态公园访客信息填写历史记录页---";
        log(AppPage_8);
        return AppPage_8;
    }else if(className("android.widget.Button").text("查看记录").findOne(100)!==null){
        var AppPage_9 = "---同沙生态公园预约结果页---";
        log(AppPage_9);
        return AppPage_9;
    }else if(className("android.widget.TextView").text("详细").findOne(100)!==null){
        var AppPage_10 = "---同沙生态公园拜访记录页---";
        log(AppPage_10);
        return AppPage_10;
    }else if(className("android.view.View").textContains("*").textContains("手机号").findOne(100)!==null){
        var AppPage_11 = "---同沙生态公园拜访记录详情页---";
        log(AppPage_11);
        return AppPage_11;
    }else{
        var AppPage_12 = "---未知页---";
        log(AppPage_12);
        return AppPage_12;
    }
}

//********************************************/
//*
//*
//*  ⚠️以下是[自动预约]运行模块，请勿乱改！⚠️  */
//*
//*
//********************************************/

auto.waitFor();//开启无障碍服务
toastLog(">关闭-重启微信");
sleep(5000);
for(var i=0;i<6;i++){
    var packageName  = "com.tencent.mm";//得到微信的包名
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到 '微信' 应用,请确认已安装 [Step -1]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(packageName!==null){
        openAppSetting(packageName);//打开微信的设置页用于关闭微信
        break;
    }
}
sleep(5000);
for(var i=0;i<6;i++){
    var close01 = className("android.widget.Button").textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne(500);//通过控件找到强行停止，并点击 [鸿蒙系统、类原生安卓系统]
    if (close01!==null){
        click(close01.bounds().centerX(),close01.bounds().centerY());
        break;
    }
}
sleep(500);
for(var i=0;i<6;i++){
    var close02 = className("android.widget.Button").textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*|.*确.*|.*定.*)/).findOne(500);//通过控件找到强行停止，并点击 [鸿蒙系统、类原生安卓系统]
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "无法重启微信,找不到: 微信 强行停止的 '确定' 按钮 [Step 0.1]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if (close02!==null){
        click(close02.bounds().centerX(),close02.bounds().centerY());
        break;
    }
}
sleep(500);
toastLog(">启动微信");
launch("com.tencent.mm");//打开微信
sleep(5000)
function FindSearch_1(){
    for(var i=0;i<6;i++){
        var FindSearch = className("android.widget.RelativeLayout").desc("搜索").findOne(5001);//找到搜索
        if(i==5){
            var ErrType = ErrType01;
            var ErrMsg = "找不到: 微信主界面 '搜索按钮' [Step 1]";
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
            JsExit();
        }else if(FindSearch!==null){
            AppPageGet();
            toastLog(">点击搜索按钮");
            while(!click(FindSearch.bounds().centerX(),FindSearch.bounds().centerY()));//点击搜索
            break;
        }
    }
}
FindSearch_1();
sleep(5000);//停止5秒
for(var i=0;i<6;i++){
    var FindSearch_Check = className("android.widget.TextView").desc("取消按钮").text("取消").findOne(5000);
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到: 微信搜索界面 '搜索框' [Step 1.1]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(FindSearch_Check!==null){
        AppPageGet();
        toastLog(">填充搜索词");
        setText("东莞市同沙生态公园公众号");//设置输入搜索文字
        break;
    }else{
        FindSearch_1();
    }
    sleep(500);
}
sleep(5000);
for(var i=0;i<6;i++){
    var ClickSearchResults = className("android.widget.TextView").desc("东莞市同沙生态公园公众号按钮").textContains("东莞市同沙生态公园公众号").findOne(5001);//判断搜索结果
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到: '东莞市同沙生态公园公众号' 搜索结果关键词[Step 2]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(ClickSearchResults!==null){//找不到直接退出
        toastLog(">点击搜索结果");
        click(ClickSearchResults.bounds().centerX(),ClickSearchResults.bounds().centerY());//点击搜索结果
        break;
    }
}
sleep(5000);//停止5秒，等待页面加载完成
function FindTarget01_1(){
    for(var i=0;i<6;i++){
        var FindTarget01 = className("android.widget.Button").text("预约入园 .").findOne(5000);//找到预约入园，5秒后点击
        if(i==5){
            var ErrType = ErrType01;
            var ErrMsg = "找不到: '预约入园' 按钮 [Step 3]";
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
            JsExit();
        }else if(FindTarget01!==null){//找不到退出
            AppPageGet();
            toastLog(">点击 '预约入园'");
            click(FindTarget01.bounds().centerX(),FindTarget01.bounds().centerY());//点击预约入园
            break;
        }
        sleep(1000);
    }
}
FindTarget01_1();
sleep(5000);
function FindTarget02_forLoop(){
    for(var i=0;i<6;i++){
        var FindTarget02 = className("android.widget.Button").text("预约").findOne(5000);//找到预约
        if(i==5){
            var ErrType = ErrType01;
            var ErrMsg = "找不到: '预约' 按钮 [Step 4]";
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
            JsExit();
        }else if(FindTarget02!==null){//找不到退出
            AppPageGet();
            toastLog(">点击 '预约'");
            click(FindTarget02.bounds().centerX(),FindTarget02.bounds().centerY());//点击预约
            break;
        }else{
            toastLog(ErrType07);
            back();
            sleep(1000);
            FindTarget01_1();
        }
        sleep(5000);
    }
}
FindTarget02_forLoop();
sleep(5000);
for(var i=0;i<6;i++){
    var FindTarget03 = className("android.view.View").text("拜访时段").findOne(5000);
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到: '拜访时段' 按钮 [Step 5]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(FindTarget03!==null){//找不到退出
        AppPageGet();
        toastLog(">点击 '拜访时段'");
        click(FindTarget03.bounds().centerX(),FindTarget03.bounds().centerY());//点击拜访时段
        break;
    }else{
        toastLog(ErrType07);
        back();
        sleep(1000);
        FindTarget02_forLoop();
    }
    sleep(5000);
}
sleep(3000);
for(var i=0;i<6;i++){
    var FindTarget04 = className("android.view.View").text("确定").findOne(5001);//找到日期选择框的[确定]
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到: '日期选择' 面板 [Step 6]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(FindTarget04!==null){//找不到退出
        toastLog(">滑动日期列表,并确定");
        SetSwipe();
        break;
    }
}
sleep(5000);
while(!click(FindTarget04.bounds().centerX(),FindTarget04.bounds().centerY()));//点击日期选择[确定]
sleep(500);
var FindTarget05 = className("android.view.View").text("当前时间段预约已满,请重新调整时间").findOne(500);//找到预约已满
if(FindTarget05!==null){//找不到退出
    var ErrType = ErrType04;
    var ErrMsg = "请确认是否 '预约已满' [Step 7]";
    Pushplus(ErrType,ErrMsg);
    toastLog(ErrType + ErrMsg);
    JsExit();
}else{
    log("i可预约");
}
sleep(500);
for(var i=0;i<6;i++){
    var FindTarget06 = className("android.widget.Button").text("游玩").findOne(500);//找到游玩
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到: '游玩' 选项 [Step 8]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(FindTarget06!==null){//找不到退出
        toastLog(">点击 '游玩'");
        click(FindTarget06.bounds().centerX(),FindTarget06.bounds().centerY());//点击游玩
        break;
    }
}
sleep(500);
for(var i=0;i<6;i++){
    var FindTarget07 = className("android.widget.Button").text("下一步").findOne(500);//找到下一步
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到: '下一步' 按钮 [Step 9]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(FindTarget07!==null){//找不到退出
        toastLog(">点击 '下一步'");
        click(FindTarget07.bounds().centerX(),FindTarget07.bounds().centerY());//点击下一步
        break;
    }
}
sleep(5000);
for(var i=0;i<6;i++){
    var FindTarget08 = className("android.view.View").text("访客信息").findOne(5001);//找到访客信息，判断能否顺利加载
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "无法进入访客信息填写页面 [找不到: 访客信息 关键字] [Step 10]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(FindTarget08!==null){//找不到退出
        break;
    }
}
function AddCarPlate_Cancel_1(){
    var AddCarPlate_Cancel = className("android.widget.Button").text("取消").findOne(500);//找到车牌输入框取消按钮
    if(AddCarPlate_Cancel!==null){//找到取消按钮就点击
        toastLog(">点击车牌输入框 '取消' 按钮");
        click(AddCarPlate_Cancel.bounds().centerX(),AddCarPlate_Cancel.bounds().centerY());//点击车牌输入框取消按钮
        var ErrType = ErrType02;
        var ErrMsg = "遭到车牌输入键盘阻塞,无法继续增加车牌输入框,第3个车牌后的将无法输入! [找不到: 车牌输入键盘 取消 按钮] [Step 12]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
    }
}
function AddCarPlate_Loop(){
    AppPageGet();
    toastLog(">点击 '继续添加车牌'");
    for(var i=0;i<2;i++){
        var AddCarPlate = className("android.widget.TextView").text("继续添加车牌").findOne(500);//找到继续添加车牌
        if(AddCarPlate!==null){
            click(AddCarPlate.bounds().centerX(),AddCarPlate.bounds().centerY());//点击继续添加车牌
            sleep(500);
            AddCarPlate_Cancel_1();
        }else{//找到就点击，否则推送消息
            var ErrType = ErrType02;
            var ErrMsg = "找不到: '继续添加车牌' 按钮,添加车牌数量受限 [Step 11]";
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
            break;
        }
        sleep(500);
    }
    //toastLog(i);
}
AddCarPlate_Loop();
AddCarPlate_Cancel_1();
sleep(500);
var FindTarget09 = className("android.view.View").text("历史记录").findOne(500);//找到历史记录
if(FindTarget09!==null){//找不到退出
    toastLog(">点击 '历史记录'");
    click(FindTarget09.bounds().centerX(),FindTarget09.bounds().centerY());//点击历史记录
    sleep(500);
    AppPageGet();
    back();
    toastLog("i因页面有BUG,继续添加车牌号输入框就必须转跳页面!");
}else{
    var ErrType = ErrType02;
    var ErrMsg = "[找不到: 历史记录 按钮] 因页面有BUG,继续添加车牌号输入框就必须转跳页面,否则将会遭到车牌输入键盘阻塞,无法继续增加车牌输入框,第3个车牌后的将无法输入! [Step 13]";
    Pushplus(ErrType,ErrMsg);
    toastLog(ErrType + ErrMsg);
}
sleep(1000);
AddCarPlate_Loop();
sleep(500);
for(var i=0;i<6;i++){
    var TextInput = className("android.widget.EditText").findOne(500);//找到输入框
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到: '访客信息' 输入框 [Step 14]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(TextInput!==null){//找不到退出
        toastLog(">填充访客信息");
    //  姓名、手机号、随行人数 填写
        setText(0,Text00);
        setText(1,Text01);
        setText(2,Text02);
    //  车牌号 填写，最多5个
        setText(3,Text03);
        setText(4,Text04);
        setText(5,Text05);
        setText(6,Text06);
        setText(7,Text07);
        break;
    }
}
sleep(500);
for(var i=0;i<6;i++){
    var FindTarget10 = className("android.widget.Button").text("提交").enabled(true).focusable(true).findOne(500);//找到提交
    if(i==5){
        var ErrType = ErrType01;
        var ErrMsg = "找不到: 访客信息 '提交' 按钮,或信息填写有误 [Step 15]";
        Pushplus(ErrType,ErrMsg);
        toastLog(ErrType + ErrMsg);
        JsExit();
    }else if(FindTarget10!==null){//找不到退出
        toastLog(">点击 '提交'");
        click(FindTarget10.bounds().centerX(),FindTarget10.bounds().centerY());//点击提交
        break;
    }
}
sleep(500);
var FindTarget11 = className("android.view.View").text("拜访时间重叠,请检查后重试!").findOne(500);//找到拜访时间重叠
if(FindTarget11!==null){//找到就给提示
    var ErrType = ErrType05;
    var ErrMsg = "拜访时间重叠,可能预约过此时段了哦! [Step 16]";
    Pushplus(ErrType,ErrMsg);
    toastLog(ErrType + ErrMsg);
    JsExit();
}
sleep(5000);
function FindTarget12_1(){
    for(var i=0;i<6;i++){
        var FindTarget12 = className("android.widget.Button").text("查看记录").findOne(5001);//找到查看记录
        if(i==5){
            var ErrType = ErrType03;
            var ErrMsg = "'预约成功' 页面载入失败,可能预约失败,将无法获取访客预约信息 [找不到: 查看记录 关键字] [Step 17]";
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
            JsExit();
        }else if(FindTarget12!==null){//推送消息或退出
            AppPageGet();
            toastLog(">点击 '查看记录'");
            click(FindTarget12.bounds().centerX(),FindTarget12.bounds().centerY());
            var ErrType = ErrType06;
            var ErrMsg = "预约成功!";
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
            break;
        }
    }
}
FindTarget12_1();
sleep(5000);
function ClickListButton_forLoop(){
    for(var i=0;i<6;i++){
        AppPageGet();
        toastLog(">上滑");
        for(var i=0;i<10;i++){
            className("android.view.View").scrollUp();
            sleep(500);
        }
        var ClickListButton = className("android.widget.TextView").text("详细").findOne(5000);
        if(i==5){
            var ErrType = "找不到: 拜访记录页面 '详细' 按钮,可能无法打开页面,将无法获取访客预约信息";
            var ErrMsg = ErrType;
            Pushplus(ErrType,ErrMsg);
            toastLog(ErrType + ErrMsg);
            JsExit();
        }else if(ClickListButton!==null){
            toastLog(">点击 '详细'");
            click(ClickListButton.bounds().centerX(),ClickListButton.bounds().centerY());
            break;
        }else{
            toastLog(ErrType07);
            back();
            sleep(1000);
            FindTarget12_1();
        }
        sleep(5000);
    }
}
ClickListButton_forLoop();
sleep(5000);
for(var i=0;i<6;i++){
    AppPageGet();
    toastLog(">获取-发送 '访客信息'");
    var PhoneTake = className("android.view.View").textContains("*").textContains("手机号").findOne(500);
    if(i==5){
        var OutputMsg02 = "找不到: 拜访记录页面 '访客手机号'";
        toastLog(OutputMsg02);
        break;
    }else if(PhoneTake!==null){
        var OutputMsg02 = PhoneTake.getText();
        toastLog(OutputMsg02);
        break;
    }else{
        toastLog(ErrType07);
        back();
        sleep(1000);
        var FindTarget12 = className("android.widget.Button").text("查看记录").findOne(5001);
        if(FindTarget12!==null){
            FindTarget12_1();
            sleep(5000);
            ClickListButton_forLoop();
        }else{
            var ClickListButton = className("android.widget.TextView").text("详细").findOne(5000);
            if(ClickListButton!==null){
                ClickListButton_forLoop();
            }
        }
    }
    sleep(5000);
}
var UseNameTake = className("android.view.View").textContains(Text00).findOne(500);
if(UseNameTake!==null){
    var OutputMsg01 = "访客姓名 " + UseNameTake.getText();
    toastLog(OutputMsg01);
}else{
    var OutputMsg01 = "找不到: 拜访记录页面 '访客姓名'";
    toastLog(OutputMsg01);
}
var GoTimeTake = className("android.view.View").textContains("拜访时间").findOne(500);
if(GoTimeTake!==null){
    var OutputMsg03 = GoTimeTake.getText();
    toastLog(OutputMsg03);
}else{
    var OutputMsg03 = "找不到: 拜访记录页面 '拜访时间'";
    toastLog(OutputMsg03);
}
var PlayerNumber = className("android.view.View").textContains("随行人员").findOne(500);
if(PlayerNumber!==null){
    OutputMsg04 = PlayerNumber.getText();
    toastLog(OutputMsg04);
}else{
    OutputMsg04 = "找不到: 拜访记录页面 '随行人员'";
    toastLog(OutputMsg04);
}
var CarNumber01 = className("android.widget.TextView").textContains("-").findOne(500);
var CarNumber02 = className("android.view.View").textContains("访客车辆").findOne(500);
if(CarNumber01!==null){
    var OutputMsg05 = "访客车辆 " + CarNumber01.getText();
    toastLog(OutputMsg05);
}else if(CarNumber02!==null){
    click(CarNumber02.bounds().centerX(),CarNumber02.bounds().centerY());
    sleep(500);
    var CarNumber03 = className("android.view.View").textContains("、").textContains("-").findOne(5001);
    var OutputMsg05 = "访客车辆 " + CarNumber03.getText();
    toastLog(OutputMsg05);
}else{
    var OutputMsg05 = "找不到: 拜访记录页面 '访客车辆' ,无法获取车牌信息";
    toastLog(OutputMsg05);
}

var ErrType = "🌄访客预约信息📃";
var ErrMsg = OutputMsg01 + "<br/><br/>" + OutputMsg02 + "<br/><br/>" + OutputMsg03 + "<br/><br/>" + OutputMsg04 + "<br/><br/>" + OutputMsg05 + "<br/><br/>";
Pushplus(ErrType,ErrMsg);
toastLog(ErrType + ErrMsg);

sleep(13000);
toastLog(">完成! 返回桌面并终止脚本");

JsExit();