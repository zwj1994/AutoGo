function next_video_handler(out_next_video_timer){
	var jd = $(".passTime").css("width");
	//console.log("进度 => " + jd);
	if(jd != '100%'){
		return;
	}
	console.log("视频准备结束处理 => " + jd);
	clearInterval(out_next_video_timer);
	var next = $(".current_play").nextAll().filter(".video");
	if(next.length == 0){
		console.log("恭喜您视频学习已经完毕，服务停止");
		return;
	}
	next.click();
	var out_loop_start_timer = setInterval(function(){
		jd = $(".passTime").css("width");
		if(jd != '100%'){
			//开启轮询，关闭检查
			console.log("开启新检查视频线程 => " + jd);
			clearInterval(out_loop_start_timer);
			start_switching_videos();
		}else{
			console.log("还未出现进度，无法开启视频结束检查线程");
		}
	},2000);
}


function start_switching_videos(){
	if($(".current_play .learningPercentage-span").length == 0){
		console.log("当前页面不启动AutoGo的切换视频服务");
		return;
	}
	console.log("AutoGo切换视频服务启动...");
	var out_next_video_timer = setInterval(function(){
		//console.log("检查视频是否结束");
		next_video_handler(out_next_video_timer);
	},3000);
}

start_switching_videos();