<template>
    <div id="CarMintor">
        <video-player class="video-player vjs-custom-skin" 
              ref="videoPlayer" 
              :playsinline="true"
              :options="playerOptions">
        </video-player>
    </div>
</template>

<script>
export default {
    name: 'CarMintor',
    data(){
        return {
            playerOptions : {
                  playbackRates:[0.7, 1.0, 1.5, 2.0],                          //播放速度
                  autoplay: true,      
                  muted: false,
                  loop: false,
                  preload: 'auto',
                  language: 'zh-CN',
                  aspectRatio: '16:9',
                  fluid: true,
                  sources:[{
                      type:"video/rtsp",                                     //视频流协议，如果时hls,需要后端开启跨域
                      src: "rtsp://admin:wangdong2014@10.0.12.252:554/h264/ch1/main/av_stream",     //需要后端把摄像头视频流转换为对应的src地址进行实时监控
                  }],
                  poster: "",
                  notSupportedMessage:'此视频无法播放',
                  controlBar:{
                      timeDivider: true,
                      durationDisplayer: true,
                      remainingTimeDisplay: false,
                      fullscreenToggle: true  
                  }
            }
        }
    }
}
</script>
<style scoped>
.video-js .vjs-icon-placeholder{
    width: 100%;
    height: 100%;
    display: block;
}
</style>