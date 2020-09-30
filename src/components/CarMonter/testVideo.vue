<template>
    <div id="testVideo">
		<div>车端实时监控</div>
        <object type="application/x-vlc-plugin" id='vlc' events='True'
		  classid='clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921' codebase="http://downloads.videolan.org/pub/videolan/vlc/latest/win32/axvlc.cab" width="1200" height="800">
			<param name='mrl' value='rtsp://admin:wangdong2014@10.0.12.252:554/h264/ch1/main/av_stream' />
			<param name='volume' value='50' />
			<param name='autoplay' value='true' />
			<param name='loop' value='false' />
			<param name='fullscreen' value='false' />
		</object>
		
		<!-- <object type='application/x-vlc-plugin' id='vlc' events='True' width="720" height="540" pluginspage="http://www.videolan.org" 
		        codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz" >
			<param name='mrl' value='rtsp://admin:wangdong2014@10.0.12.252:554/h264/ch1/main/av_stream' />
			<param name='volume' value='50'/>
			<param name='autoplay' value='true' />
			<param name='loop' value='false' />
			<param name='fullscreen' value='false' />
		</object> -->
    </div>
</template>
<script>
export default {
    
}
</script>

<style>

</style>