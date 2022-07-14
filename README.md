# [Auto.Js] TongshaPark-AutoScript
[Auto.Js] 东莞市同沙生态公园公众号移动访客预约信息填写自动化执行脚本

脚本语言: JavaScript<br/>
运行APP平台: Auto.Js 及其衍生程序<br/>
版本号: 1.1 / 2022.7.14<br/>
<br/>
<br/>
# 脚本下载 (右键另存为)
主体脚本
<br/>
[同沙生态公园自动预约脚本.js](https://github.com/goodDOS/Auto.Js_TongshaPark-AutoScript/blob/main/%E5%90%8C%E6%B2%99%E7%94%9F%E6%80%81%E5%85%AC%E5%9B%AD%E8%87%AA%E5%8A%A8%E9%A2%84%E7%BA%A6%E8%84%9A%E6%9C%AC.js)
<br/>
<br/>
辅助脚本 (非必选)
<br/>
[网络开关触发脚本启动模块.js](https://github.com/goodDOS/Auto.Js_TongshaPark-AutoScript/blob/main/%E7%BD%91%E7%BB%9C%E5%BC%80%E5%85%B3%E8%A7%A6%E5%8F%91%E8%84%9A%E6%9C%AC%E5%90%AF%E5%8A%A8%E6%A8%A1%E5%9D%97.js)
<br/>
<br/>
辅助脚本作用原理：<br/>
设置 网络变动就触发 "网络开关触发脚本启动模块.js"<br/>
↓<br/>
APP检测到网络变动<br/>
↓<br/>
触发 "网络开关触发脚本启动模块.js"<br/>
↓<br/>
脚本 判断是否能打开open.weixin.com<br/>
↓<br/>
能 则启动 "同沙生态公园自动预约脚本.js" / 否 则终止脚本运行<br/>
避免不管联网还是断网都触发主体脚本运行的情况<br/>
<br/>
<br/>
# 使用方法
建议在闲置手机上使用，避免脚本运行时造成不必要的阻碍
1. 下载 [AutoX.Js (app-dev-arm64-v8a-release-unsigned-signed.apk) (仅限安卓)](https://github.com/kkevsekk1/AutoX/releases) 安装到手机上<br/>
2. 下载自动化脚本，放进 "手机储存 / 脚本" 文件夹里<br/>
3. 去注册 [Pushplus推送加](https://www.pushplus.plus/) 获取Token🐎，用于获取脚本消息的微信公众号推送<br/>
4. 打开AutoX.Js，编辑 "同沙生态公园自动预约脚本.js" 文件，在文件前部配置好7项参数：<br/>屏幕解锁密码、Pushplus的Token、拜访时段、访客姓名、手机号、人数、车牌号<br/>
5. 配置脚本自动运行触发条件<br/>
![微信截图_20220713123131](https://user-images.githubusercontent.com/16776856/178651158-1dc94d2b-5356-4f64-a784-37f9834d6385.png)<br/>
<br/>
<br/>
# 更新日志
2022/7/14 Version 1.1 [同沙生态公园自动预约脚本.js] 修复了获取屏幕宽高参数错误就摆烂的问题（208-235行）
<br/>
<br/>
2022/7/12 Version 1.0 [网络开关触发脚本启动模块.js] 脚本发布<br/>
2022/7/12 Version 1.0 [同沙生态公园自动预约脚本.js] 脚本发布
