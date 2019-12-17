function start_problem_solving(){
	if($("#mediaplayer_parent").length == 0){
		console.log("当前页面不启动AutoGo的自动答题服务");
		return;
	}
	console.log("AutoGo自动答题服务启动...");
	var out_timer = setInterval(function(){
		//console.log("检查题目是否弹出")
		if($("#popbox_overlay").css("display") == "block"){
			console.log("题目弹出，开始自动答题，关闭轮询服务")
			clearInterval(out_timer);
			setTimeout(function(){
				var len = $("#tmDialog_iframe").contents().find(".exam_correct").length;
				if(len > 0){
					console.log("题目答案已经找到，关闭弹出框。激活自动答题服务");
					window.top.document.getElementsByClassName('popbtn_cancel')[0].click();
					start_problem_solving();
					return;
				}
				var answerOptions = $("#tmDialog_iframe").contents().find(".answerOption");
			    len = answerOptions.find("input[type='checkbox']").length;
				console.log("题目答案个数 = " + len + "个");
				if(len > 0){
					console.log("题目为多选题");
					multiple_choice_questions_handle(answerOptions,out_probably(len),0);
				}else{
					console.log("题目为单选题");
					single_choice_question_handle(answerOptions,0);
				}
			
			},1000);
		}
	},3000);
}

function single_choice_question_handle(answerOptions,index){
	var par = answerOptions.eq(index);
	var nodes = $(par).find("input[type='radio']:not(:checked)");
	if(nodes.length > 0){
		nodes.eq(0).click();
	}
	setTimeout(function(){
		len = $("#tmDialog_iframe").contents().find(".exam_correct").length;
		if(len == 0){
			single_choice_question_handle(answerOptions,++index);
		}else{
			console.log("题目答案已经找到，关闭弹出框。激活自动答题服务");
			window.top.document.getElementsByClassName('popbtn_cancel')[0].click();
			start_problem_solving();
		}
	},1000);
}
	
function multiple_choice_questions_handle(answerOptions,types,index){
	var nums = types[index];
	for(var k = 0;k < nums.length;k++){
		var nodes = answerOptions.eq((nums[k] - 1)).find("input[type='checkbox']:not(:checked)");
		if(nodes.length > 0){
			nodes.eq(0).click();
		}
	}
	setTimeout(function(){
		len = $("#tmDialog_iframe").contents().find(".exam_correct").length;
		if(len == 0){
			answerOptions.each(function(){
				var nodes = $(this).find("input[type='checkbox']:checked");
				var nodes_len = nodes.length;
				if(nodes_len > 0){
					nodes.eq(0).click();
				}
			});
			multiple_choice_questions_handle(answerOptions,types,++index);
		}else{
			console.log("题目答案已经找到，关闭弹出框。激活自动答题服务");
			window.top.document.getElementsByClassName('popbtn_cancel')[0].click();
			start_problem_solving();
		}
	},1000);
}

start_problem_solving();
