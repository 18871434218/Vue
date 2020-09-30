<template>
    <div id="getDevice">
         <div>{{ device }}</div>
    </div>
</template>

<script>
import "../../libery/AgoraRTCSDK-3.1.1";
export default {
    data(){
        return {
            device: null
        }
    },

    methods:{
       /*  getRemoteDE(){
            AgoraRTC.getDevice(function(devices){
                console.log("获取的设备：", devices);   

                var devCount = devices.length;
                console.log("device01: ", devCount) 
                var id = devices[0].deviceId;
                console.log("设备ID: ", id);
                this.device = devices;
            }, function(errStr){
                console.log("Failed to getDevice", erStr);
            });
        }, */

       getmedia(){
         AgoraRTC.getDevices(devices => {
          var audioDevices =  devices.filter(function(device) {
            return device.kind === "audioinput"
          });
          
          /* this.device = audioDevices; */
           window.videoDevices = audioDevices;
          console.log("测试电脑音频流：", window.videoDevices)

          var videoDevices =  devices.filter(function(device) {
            return device.kind === "videoinput";
          });

          window.videoDevices = videoDevices;
          console.log("pppp");
          console.log(window.videoDevices);                              
            });
          }, 
        },


    mounted(){
        this.getmedia();
    }
}
</script>
<style>

</style>