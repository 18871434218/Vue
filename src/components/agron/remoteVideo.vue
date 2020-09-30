<template>
    <div id="video">
       <el-row>
           <el-col :span="12">
               <div id="localVideo" style="height:800px; width: 600px;"></div>
           </el-col> 
      <!--  <div id="localVideo" style="height:800px; width: 600px;"></div>
       <div id="RemoteVideo" style="height:800px; width: 600px;"></div> -->
           <el-col :span="12">
               <div id="RemoteVideo" style="height:800px; width: 600px;"></div>
           </el-col>
       </el-row> 
    </div>
</template>

<script>
import "../../libery/AgoraRTCSDK-3.1.1";

export default {
   methods: {
       startvideo(){
           var rtc = {
               client: null,
               localStream: null,
               params: {}
           };

           var options = {
               appID: "d8dc577dfb654283b70e61599932811a",
               channel: "test",
               uid: null
           };

           //创建Client对象
           rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264"});

           //初始化Client对象
           rtc.client.init(
               options.appID,
               function () {
                   console.log("AgoraRTC client 初始化成功");

                   //加入频道
                   rtc.client.join(
                       options.appID,
                       options.channel,
                       null,
                       function(uid){
                           console.log("用户id: " + uid + "加入频道成功");

                           rtc.params.id = uid;
                           
                           //创建音视频流
                           rtc.localStream = AgoraRTC.createStream({                //这段测试发现音频流设备ID为空，视频流设备能获取到ID
                               streamID: rtc.params.uid,
                               audio: false,                                   //台式机容易发错  NotFoundError: 找不到指定的媒体流。检查你的麦克风和摄像头是否正常工作，（没有找到设备）
                               video: true, 
                               screen: false
                           });
                           
                           //初始化本地的音视频流
                           rtc.localStream.init(function(){
                               console.log("获取用户媒体成功");
                               rtc.localStream.play("localVideo");     //显示本地的视频播放<div>标签id名

                               //发布本地音视频流
                               rtc.client.publish(rtc.localStream, function (err) {
                                   console.log("发布本地音视频流失败: " + err);
                               });

                               rtc.client.on("stream-published", function(evt) {
                                    console.log("发布本地音视频流成功");
                               });
                           }, function(err){
                               console.log("获取用户媒体失败：", err);
                           });

                           //订阅远程视频
                           //监听到新的视频
                           rtc.client.on("stream-added", function(evt){
                               var stream = evt.stream;
                               console.log("有新的音视频流：" + stream.getId());

                               rtc.client.subscribe(stream, function(err){
                                   console.log("订阅音视频流失败", err);
                               });
                           });

                           //订阅远端视频
                           rtc.client.on("stream-subscribed", function(evt){
                               var remoteStream = evt.stream;
                               console.log("订阅远程音视频流成功：", remoteStream.getId());
                               remoteStream.play("RemoteVideo");
                           });
                       }, function (err){
                           console.log("AgoraRTC client 初始化失败", err);
                    });
                 }, (err) => {
                   console.log(err);
              });
        },
   },

   mounted(){
       this.startvideo();
   },
}
</script>

<style>

</style>