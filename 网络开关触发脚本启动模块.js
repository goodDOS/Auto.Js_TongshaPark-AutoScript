engines.all().map((ScriptEngine) => {
    if(engines.myEngine().toString()!==ScriptEngine.toString()){
        ScriptEngine.forceStop();
        toastLog("已关闭其它正在运行的脚本!");
    }
});
function JsLaunch(){
    try{
        var scriptsPath = "/sdcard/脚本/";
        if(!files.exists(scriptsPath)){
            scriptsPath = "/sdcard/Scripts/";
        }
        var scriptFiles = "同沙生态公园自动预约脚本.js";
        var path = scriptsPath + scriptFiles;
        engines.execScriptFile(path);
        toastLog("启动脚本!");
    }
    catch(err){
        log("**(此条文件报错已省略)**");
        if(err!==null){
            toastLog("找不到目标脚本!");
        }
    }
}
for(var i=0;i<4;i++){
    try{
        let StatusCode_Get = http.get("https://open.weixin.qq.com");
        let StatusCode_Output = "状态码: " + StatusCode_Get.statusCode + " " + StatusCode_Get.statusMessage;
        let StatusCode_Err01 = "微信开放平台可访问,网络稳定, ";
        let StatusCode_Err02 = "微信开放平台不可访问,网络异常,将在5分钟后重试!重试次数: (" + i + "/3) ";
        if(StatusCode_Get.statusCode >= 200 && StatusCode_Get.statusCode < 300){
            toastLog(StatusCode_Err01 + StatusCode_Output);
            sleep(1000);
            JsLaunch();
            break;
        }else{
            toastLog(StatusCode_Err02 + StatusCode_Output);
        }
    }
    catch(err){
        log("**(此条网络报错已省略)**");
        if(err!==null){
            toastLog("微信开放平台不可访问,网络异常,将在5分钟后重试!重试次数: (" + i + "/3) ");
        }
	}
    sleep(300000);
}
exit();