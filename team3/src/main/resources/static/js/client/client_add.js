
$(function(){
	
	//반려견 등록 버튼 숨기기
	$('#plus-btn').hide();
	
	$(".owner-tr").off().click(function(){
			
		$(this).css("background-color", "#f4f4f4");

		$("#client-table tr").not(this).each(function() {
					$(this).css('background-color', '');
				});

		$('#plus-btn').show();
		
		//보호자 행 한번 클릭시 동작
		let clientNo = $(this).attr("value");
		let clientName = $("#client-name").attr("value");
		let detailNo = $(this).attr("value");
			
		//보호자 정보 삭제하기(그 아래의 반려견도 모두 삭제)
		 $(".clientDelete").off().click(function(){
			 alert("클릭한 부분의 clientNo : " + clientNo);
			 if(confirm("삭제하시겠습니까?")){
 				location.href="clientDelete?clientNo="+clientNo;
 			}
		 });
		
		//보호자 정보 수정하기
		$(".clientUpdate").off().click(function(){
			//alert(clientNo);
			
			//$("#updateClientName").val($("#viewModalLabel").text()); // 제목란에 원래 가지고 있던 title을 가져온다.
			
			$.post({
				url : "/clientDetailAjax",
				cache : false,
				data : {"detailNo" : detailNo},
				dataType : "json"
			}).done(function(data){
				
				let result = data.result
				let result2 = data.result2
				if(result2.length == 0){
					alert("반려견을 추가해 주세요.");
					return false;
				}
				alert(result[0].owner_name);
				
				
				var owner_name = result[0].owner_name
				var owner_addr = result[0].owner_addr
				var owner_tel = result[0].owner_tel
				var owner_email = result[0].owner_email
				var owner_sms= result[0].owner_sms
				var owner_memo= result[0].owner_memo

				
				$("#updateClientName").val(owner_name);
				$("#updateClientEmail").val(owner_email);
				$("#updateClientTel").val(owner_tel);
				$("#updateClientAddr").val(owner_addr);
				/* $("#updateClientName").val(result[0].owner_name); */
				if(owner_sms =='Y'){
					$("#updateSmsAgree").prop('checked',true);
				}
				if(owner_sms == 'N'){
					$("#updateSmsDisagree").prop('checked',true);
				}
				$("#updateClientComments").val(owner_memo);

				$("#clientUpdateModal").modal("show");
				
			}).fail(function(xhr, status,errorThrown){
				alert("문제가 발생했습니다.");
			});
			
			//보호자 수정 정보 저장하기
			$("#clientUpdateSave").off().click(function(){
				//alert(clientNo);
				//정규식 검사(email형식이 맞는지)
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				//특수문자 검사 정규식(전화번호에 - 들어가는 거 방지)
				var RegExp = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
				 
				if($("#updateClientName").val() == "" || $("#updateClientName").val().length < 1){
					alert("이름은 1글자 이상 입력해주세요");
					$("#updateClientName").focus();
					return false;
				}
				
				if(! (filter.test($("#updateClientEmail").val()) )){
					alert("올바른 email형식을 입력하세요.");
					$("#updateClientEmail").focus();
					return false;
				}
				
				if($("#updateClientTel").val() == "" || $("#updateClientTel").val().length > 11 || 
					RegExp.test($("#updateClientTel").val())	){
					alert("전화번호는 숫자만 입력해 주세요.");
					$("#updateClientTel").focus();
					return false;
				}
				
				if($("#updateClientAddr").val() == "" || $("#updateClientAddr").val().length < 1){
					alert("올바른 주소를 입력해 주세요.");
					$("#updateClientAddr").focus();
					return false;
				}
				
				
				
				if(confirm("수정 정보를 저장하시겠습니까?")){
				let updateOwnerName = $("#updateClientName").val();
				let updateOwnerEmail = $("#updateClientEmail").val();
				let updateOwnerTel = $("#updateClientTel").val();
				let updateOwnerAddr = $("#updateClientAddr").val();
				if($("#updateSmsAgree").is(":checked") == true){
				var updateOwnerSms = "Y";			
				}
				else if($("#updateSmsDisagree").is(":checked") == true){
				var updateOwnerSms = "N";				
				}
				let updateOwnerMemo = $("#updateClientComments").val();
				
				//alert("SMS : " + owner_sms);
				
				//백으로 보내서 수정하게 하기,
    			$.post({
    				url : "/clientUpdate",
    				data : {"clientNo" : clientNo,
    						"updateOwnerName" : updateOwnerName,
	    					"updateOwnerEmail" : updateOwnerEmail,
	    					"updateOwnerTel" : updateOwnerTel,
	    					"updateOwnerAddr" : updateOwnerAddr,
	    					"updateOwnerSms" : updateOwnerSms,
	    					"updateOwnerMemo" : updateOwnerMemo
    						},
    				dataType : "json"
    			}).done(function(data){
    				//alert("정상소통" + data.result);
    				if(data.result == 1){
    					alert("수정이 완료되었습니다.");
    					location.href = "/client";
    						
    				 } else {
    					alert("문제가 발생했습니다. \n다시 시도해주세요.");
    				}
    			}).fail(function(){
    				alert("문제가 발생했습니다.");
    			});
			}
				
			});
			
		});

		//반려견 추가 Modal
		$("#plus-btn").off().click(function(){
			alert(clientNo);
			$("#owner_noPAdd").val(clientNo);
			var now = new Date();
			var now_year = now.getFullYear();
			
			$("#petBirthYear").append("<option value=''>생년</option>");
			
			// 올해로 부터 -30년 까지
			for(var i = now_year; i >= (now_year - 30); i--){
			$("#petBirthYear").append("<option value='"+ i +"'>"+ i +"</option>");
			}
			
			$("#petBirthMonth").append("<option value=''>월</option>");
			// 월 (1~12월)
			for (var i = 1; i < 13; i++) {
            $('#petBirthMonth').append('<option value="' + i + '">' + i + '</option>');
       		 }
			
			$("#petBirthDay").append("<option value=''>일</option>");
			// 일 (1~31)
			 for (var i = 1; i < 32; i++) {
             $('#petBirthDay').append('<option value="' + i + '">' + i + '</option>');
       		 }
			
			
			
			$("#petAddModal").modal("show");
		});
		
		//몸무게 문자 제한 + 반려견 추가 정보 보내기
		$("#petAddSave").off().click(function(){
			//숫자와 .만 체크하는 정규식
			var NumberExp = /[^0123456789.]/g;
			$("#owner_noPAdd").val(clientNo);
			if($("#petAddName").val() == "" || $("#petAddName").val().length < 1){
				alert("이름을 1글자 이상 입력해주세요.");
				$("#petAddName").focus();
				return false; 
			}
			
			if((NumberExp.test($("#petAddWeight").val())) || $("#petAddWeight").val() == "" ||
				$("#petAddWeight").val().length < 1){
				alert("몸무게는 숫자와 소수점(.)만 입력 가능합니다.");
				$("#petAddWeight").focus();
				return false; 
			}
			
			
			if($("select[name=petAddType]").val() == "견종을 선택하세요"){
				alert("견종을 선택해 주세요.");
				$("#petAddType").focus();
				return false; 
			}
			
			if($("select[name=petSex]").val() == "성별을 선택하세요"){
				alert("성별을 선택해 주세요.");
				$("#petSex").focus();
				return false; 
			}
			
			if($("select[name=petBirthYear]").val() == ""){
				alert("생년을 선택해 주세요.");
				$("#petBirthYear").focus();
				return false; 
			}
			if($("select[name=petBirthMonth]").val() == ""){
				alert("생월을 선택해 주세요.");
				$("#petBirthMonth").focus();
				return false; 
			}
			if($("select[name=petBirthDay]").val() == ""){
				alert("생일을 선택해 주세요.");
				$("#petBirthDay").focus();
				return false; 
			}
			
			if(confirm("반려견을 등록 하시겠습니까?")){
				petAdd.submit();			
			}
			
		});
				
		
		$('#petAddModal').on('hidden.bs.modal', function(e) {

		    // 텍스트 인풋 초기화
		    if($(this).find('form').length >0){
		    	$(this).find('form')[0].reset();
		   		var inputValue = $(this).find('select:eq(0) option:eq(0)');
		    }

			$("#petProfileImg").attr("src","../img/logoda.png");

		    // 셀렉트 초기화
		    //$('.select2').val(0).trigger('change.select2');
		});
		
		 
	});
	
	//보호자 수정 모달 close 누르면 입력했던 정보 초기화
	$('#clientUpdateModal').on('hidden.bs.modal', function(e) {

	    // 텍스트 인풋 초기화
	    if($(this).find('form').length >0){
	    	$(this).find('form')[0].reset();
	   		var inputValue = $(this).find('select:eq(0) option:eq(0)');
	    }

	    // 셀렉트 초기화
	    //$('.select2').val(0).trigger('change.select2');
	});
	
	$(document).on("dblclick",".owner-tr",function(){ 
	//$(".owner-tr").dblclick (function (){
		//보호자 행 더블 클릭시 해당 보호자의 반려견 띄우기
		let clientNno = $(this).attr("value");
		
		 $.post({
			url : "/profileMap",
			cache : false,
			data : {"clientNno" : clientNno},
			dataType : "json"
		}).done(function(data){
			//alert("성공했습니다.");
			let result = data.result;
			//alert(result.length); //클릭한 부분의 값의 길이
			
			var table = "";
			$('.petList').hide();
			for(let i = 0; result.length > i; i++){
				var pet_no = result[i].pet_no;
				var pet_name = result[i].pet_name;
				var type_name = result[i].type_name
				var pet_gender = result[i].pet_gender;
				var pet_birth = result[i].pet_birth;
				var pet_memo = "";
				if(result[i].pet_memo != undefined){
					pet_memo = result[i].pet_memo;
				}
				table += "<tr class='petList' value="+pet_no+">";
				table += "<td>"+pet_no+"</td>";
				table += "<td>"+pet_name+"</td>";
				table += "<td>"+type_name+"</td>";
				table += "<td>"+pet_gender+"</td>";
				table += "<td>"+pet_birth+"</td>";
				table += "<td>"+pet_memo+"</td>";
				table += "<td>"+"<button type='submit' id='petdetail-btn' class='btn btn-outline-primary btn-sm petdetail-btn' name="+pet_no+" value="+pet_no+">상세보기</button>"+"</td>";
			}
			
			$("#ajaxTable").append(table);
			$("#ajaxTable").show();
			
			//반려견 상세보기 기능
			$(".petdetail-btn").click(function() {
				let petNo = $(this).attr("value");
				//alert(petNo);
				location.href = "petinfo?petNo=" + petNo;
			});
			
			
			$(this).css("background-color", "#f4f4f4");
			
		}).fail(function(xhr, status,errorThrown){
			alert("문제가 발생했습니다.");
			
		});
		
		
	});
	
	$(document).off("click",".petList").on("click",".petList",function(){
	//$(".petList").off().click(function(){
		//반려견 테이블 행 클릭시 동작
		var petNo = $(this).attr("value");
		//alert("petNo : " + petNo);		
		
		$(this).css("background-color", "#f4f4f4");

		$(".petList").not(this).each(function() {
					$(this).css('background-color', '');
				});
		
		//alert("petNo : " + petNo);
		$(document).off("click",".petDelete").on("click",".petDelete",function(){
		//$(".petDelete").off().click(function(){
			//반려견 행 클릭 후 삭제 버튼 누를 경우 삭제되게
			//alert(petNo);
			 if(confirm("삭제하시겠습니까?")){
	 				location.href="petDelete?petNo="+petNo;
	 			}
			
		});
		
		//반려견 수정 Modal 띄우기
		$(document).off("click",".petUpdate").on("click",".petUpdate",function(){
			//alert(petNo);
			
		

			$.post({
				url : "/petUpdateAjax",
				cache : false,
				data : {"petNo" : petNo},
				dataType : "json"
			}).done(function(data){
				let result = data.result;
				alert(result.pet_name);
				
				var pet_name = result.pet_name
				var pet_weight = result.pet_weight
				var pet_type = result.type_no
				var pet_gender = result.pet_gender
				var pet_year= result.pYear
				var pet_Month= result.pMonth
				var pet_Day= result.pDay
				var pet_memo= result.pet_memo
				var pet_death= result.pet_death
				
				var now = new Date();
				var now_year = now.getFullYear();
				
				$("#petUpdateBirthYear").append("<option value=''>생년</option>");
			
				// 올해로 부터 -30년 까지
				for(var i = now_year; i >= (now_year - 30); i--){
				$("#petUpdateBirthYear").append("<option value='"+ i +"'>"+ i +"</option>");
				}
				
				$("#petUpdateBirthMonth").append("<option value=''>월</option>");
				// 월 (1~12월)
				for (var i = 1; i < 13; i++) {
	            $('#petUpdateBirthMonth').append('<option value="' + i + '">' + i + '</option>');
	       		 }
				
				$("#petUpdateBirthDay").append("<option value=''>일</option>");
				// 일 (1~31)
				 for (var i = 1; i < 32; i++) {
	             $('#petUpdateBirthDay').append('<option value="' + i + '">' + i + '</option>');
	       		 }

				
				$("#petUpdateName").val(pet_name);
				$("#petUpdateWeight").val(pet_weight);
				$("#petUpdateType").val(pet_type).prop("selected",true);
				$("#petUpdateSex").val(pet_gender).prop("selected",true);
				$("#petUpdateBirthYear").val(pet_year).prop("selected",true);
				$("#petUpdateBirthMonth").val(pet_Month).prop("selected",true);
				$("#petUpdateBirthDay").val(pet_Day).prop("selected",true);
				$("#petUpdateComments").val(pet_memo);
				$("#petDeath").val(pet_death);
				
				
				
				

				$("#petUpdateModal").modal("show");
				
			}).fail(function(xhr, status,errorThrown){
				alert("문제가 발생했습니다.");
			});
			
			
		$("#petUpdateSave").off().click(function(){
			var NumberExp = /[^0123456789.]/g;

			if($("#petUpdateName").val() == "" || $("#petUpdateName").val().length < 1){
				alert("이름을 1글자 이상 입력해주세요.");
				$("#petUpdateName").focus();
				return false; 
			}
			
			if((NumberExp.test($("#petUpdateWeight").val())) || $("#petUpdateWeight").val() == "" ||
				$("#petUpdateWeight").val().length < 1){
				alert("몸무게는 숫자와 소수점(.)만 입력 가능합니다.");
				$("#petUpdateWeight").focus();
				return false; 
			}
			
			
			if($("select[name=petUpdateType]").val() == "견종을 선택하세요"){
				alert("견종을 선택해 주세요.");
				$("#petUpdateType").focus();
				return false; 
			}
			
			if($("select[name=petUpdateSex]").val() == "성별을 선택하세요"){
				alert("성별을 선택해 주세요.");
				$("#petUpdateSex").focus();
				return false; 
			}
			
			if($("select[name=petUpdateBirthYear]").val() == ""){
				alert("생년을 선택해 주세요.");
				$("#petUpdateBirthYear").focus();
				return false; 
			}
			if($("select[name=petUpdateBirthMonth]").val() == ""){
				alert("생월을 선택해 주세요.");
				$("#petUpdateBirthMonth").focus();
				return false; 
			}
			if($("select[name=petUpdateBirthDay]").val() == ""){
				alert("생일을 선택해 주세요.");
				$("#petUpdateBirthDay").focus();
				return false; 
			}
			if($("#petDeath").val().length > 11){
				alert("사망날짜는 0000-00-00 형태로 입력해 주세요.");
				$("#petDeath").focus();
				return false; 
			}
				
			if(confirm("반려견 수정 정보를 저장하시겠습니까?")){
				let petUpdateName = $("#petUpdateName").val();
				let petUpdateWeight = $("#petUpdateWeight").val();
				let petUpdateType = $("select[name=petUpdateType]").val();
				let petUpdateSex = $("select[name=petUpdateSex]").val();
				let petUpdateBirthYear = $("select[name=petUpdateBirthYear]").val();
				let petUpdateBirthMonth = $("select[name=petUpdateBirthMonth]").val();
				let petUpdateBirthDay = $("select[name=petUpdateBirthDay]").val();
				let petUpdateComments = $("#petUpdateComments").val();
				let petDeath = $("#petDeath").val();
				
				//alert("견종 : " + petUpdateType);
				
				
				//백으로 보내서 수정하게 하기
    			$.post({
    				url : "/petUpdate",
    				data : {"petNo" : petNo,
							"petUpdateName" : petUpdateName,
    						"petUpdateWeight" : petUpdateWeight,
	    					"petUpdateType" : petUpdateType,
	    					"petUpdateSex" : petUpdateSex,
	    					"petUpdateBirthYear" : petUpdateBirthYear,
	    					"petUpdateBirthMonth" : petUpdateBirthMonth,
	    					"petUpdateBirthDay" : petUpdateBirthDay,
							"petUpdateComments" : petUpdateComments,
							"petDeath" : petDeath
    						},
    				dataType : "json"
    			}).done(function(data){
    				//alert("정상소통" + data.result);
    				if(data.result == 1){
    					alert("수정이 완료되었습니다.");
    					location.href = "/client";
    						
    				 } else {
    					alert("문제가 발생했습니다. \n다시 시도해주세요.");
    				}
    			}).fail(function(){
    				alert("문제가 발생했습니다.");
    			});
			}
			
		  });

			//반려견 수정 modal에서 삭제버튼 누를 경우
			$("#petUpdateDel").off().click(function(){
				//alert(petNo);
				let petDeath = $("#petDeath").val();
				//alert(petDeath);
				if(confirm("삭제하시겠습니까?")){
					location.href="petDelete?petNo="+petNo+"&petDeath="+petDeath;
				}
				
				
			});

			
		});
		
			
			
			
	});
		
	
	
	//보호자 상세보기 모달
	 $(".detail-btn").off().click(function(){
		
		
		 let detailNo = $(this).attr("value");
		//alert(detailNo + " : 버튼을 클릭했습니다.");
		 let clientNo = $(this).attr("value");
		
		$.post({
				url : "/clientDetailAjax",
				cache : false, //캐쉬 쓰지말고 새로운 값을 가져오라는 의미
				data : {"detailNo" : detailNo},
				dataType : "json"
			}).done(function(data){
				let result = data.result
				//alert(result[0].owner_name);
				let result2 = data.result2
				if(result2.length == 0){
					alert("반려견을 추가해 주세요.");
					return false;
				}
				
				$("#viewModalLabel").text(result[0].owner_name);
				$("#client_tel").text(result[0].owner_tel);
				$("#client_addr").text(result[0].owner_addr);
				$("#client_email").text(result[0].owner_email);
				$("#client_sms").text(result[0].owner_sms);
				$("#client_memo").text(result[0].owner_memo);
				
				var table = "";
				$('.petListModal').hide();
				//상세보기 클릭 시 이전 기록 reset
				$("#ajaxModalTable").empty();
				for(let i = 0; result2.length > i; i++){
					var pet_no = result2[i].pet_no;
					var pet_name = result2[i].pet_name;
					var type_name = result2[i].type_name
					var pet_gender = result2[i].pet_gender;
					var pet_birth = result2[i].pet_birth;
					var pet_memo = "";
					if(result2[i].pet_memo != undefined){
						pet_memo = result2[i].pet_memo;
					}
					table += "<tr class='petList' value="+pet_no+">";
					table += "<td>"+pet_no+"</td>";
					table += "<td>"+pet_name+"</td>";
					table += "<td>"+type_name+"</td>";
					table += "<td>"+pet_gender+"</td>";
					table += "<td>"+pet_birth+"</td>";
					table += "<td>"+pet_memo+"</td>";
					table += "</tr>";
				}
				
				$("#ajaxModalTable").append(table);
				$("#ajaxModalTable").show();
				
				//변경된 반려견 테이블의 반려견 삭제 기능
				$(document).off("click",".petList").on("click", ".petList", function(){
					
				
			//	$(".petList").off().click(function(){
					let petNo = $(this).attr("value");
					//alert(petNo);
					$(this).css("background-color", "#f4f4f4");
					
					$(".petList").not(this).each(function() {
						$(this).css('background-color', '');
					});
					
					
					//보호자 상세보기 modal에서 반려견 수정하기
					$(document).off("click",".cm_petUpdate").on("click", ".cm_petUpdate",function(){
						
//					$(".cm_petUpdate").off().click(function(){
						//alert(petNo);
						//버튼 클릭 시 기존의 tr을 삭제하도록
						$(".petList").hide();
						
						$.post({
							url: "/petUpdateAjax",
							cache: false,
							data: { "petNo": petNo },
							dataType: "json"
						}).done(function(data) {
							let result = data.result;
							alert(result.pet_name);

							var pet_name = result.pet_name
							var pet_weight = result.pet_weight
							var pet_type = result.type_no
							var pet_gender = result.pet_gender
							var pet_year = result.pYear
							var pet_Month = result.pMonth
							var pet_Day = result.pDay
							var pet_memo = result.pet_memo
							var pet_death = result.pet_death

							var now = new Date();
							var now_year = now.getFullYear();

							$("#petUpdateBirthYear").append("<option value=''>생년</option>");

							// 올해로 부터 -30년 까지
							for (var i = now_year; i >= (now_year - 30); i--) {
								$("#petUpdateBirthYear").append("<option value='" + i + "'>" + i + "</option>");
							}

							$("#petUpdateBirthMonth").append("<option value=''>월</option>");
							// 월 (1~12월)
							for (var i = 1; i < 13; i++) {
								$('#petUpdateBirthMonth').append('<option value="' + i + '">' + i + '</option>');
							}

							$("#petUpdateBirthDay").append("<option value=''>일</option>");
							// 일 (1~31)
							for (var i = 1; i < 32; i++) {
								$('#petUpdateBirthDay').append('<option value="' + i + '">' + i + '</option>');
							}


							$("#petUpdateName").val(pet_name);
							$("#petUpdateWeight").val(pet_weight);
							$("#petUpdateType").val(pet_type).prop("selected", true);
							$("#petUpdateSex").val(pet_gender).prop("selected", true);
							$("#petUpdateBirthYear").val(pet_year).prop("selected", true);
							$("#petUpdateBirthMonth").val(pet_Month).prop("selected", true);
							$("#petUpdateBirthDay").val(pet_Day).prop("selected", true);
							$("#petUpdateComments").val(pet_memo);
							$("#petDeath").val(pet_death);





							$("#petUpdateModal").modal("show");
							
							//X버튼 누를 경우 기존의 petlist 다시 띄우기
							$("#petUpdateModalClose").click(function(){
								$(".petList").show();
							});
							
							

						}).fail(function(xhr, status, errorThrown) {
							alert("문제가 발생했습니다.");
						});
						
						//반려견 수정 modal에서 삭제버튼 누를 경우
						$("#petUpdateDel").off().click(function() {
							//alert(petNo);
							let petDeath = $("#petDeath").val();
							//alert(petDeath);
							if (confirm("삭제하시겠습니까?")) {
								location.href = "petDelete?petNo=" + petNo + "&petDeath=" + petDeath;
							}


						});
						
						//반려견 정보 수정 후 저장 누르면 데이터로 전송
						$("#petUpdateSave").off().click(function() {
							var NumberExp = /[^0123456789.]/g;

							if ($("#petUpdateName").val() == "" || $("#petUpdateName").val().length < 1) {
								alert("이름을 1글자 이상 입력해주세요.");
								$("#petUpdateName").focus();
								return false;
							}

							if ((NumberExp.test($("#petUpdateWeight").val())) || $("#petUpdateWeight").val() == "" ||
								$("#petUpdateWeight").val().length < 1) {
								alert("몸무게는 숫자와 소수점(.)만 입력 가능합니다.");
								$("#petUpdateWeight").focus();
								return false;
							}


							if ($("select[name=petUpdateType]").val() == "견종을 선택하세요") {
								alert("견종을 선택해 주세요.");
								$("#petUpdateType").focus();
								return false;
							}

							if ($("select[name=petUpdateSex]").val() == "성별을 선택하세요") {
								alert("성별을 선택해 주세요.");
								$("#petUpdateSex").focus();
								return false;
							}

							if ($("select[name=petUpdateBirthYear]").val() == "") {
								alert("생년을 선택해 주세요.");
								$("#petUpdateBirthYear").focus();
								return false;
							}
							if ($("select[name=petUpdateBirthMonth]").val() == "") {
								alert("생월을 선택해 주세요.");
								$("#petUpdateBirthMonth").focus();
								return false;
							}
							if ($("select[name=petUpdateBirthDay]").val() == "") {
								alert("생일을 선택해 주세요.");
								$("#petUpdateBirthDay").focus();
								return false;
							}
							if ($("#petDeath").val().length > 11) {
								alert("사망날짜는 0000-00-00 형태로 입력해 주세요.");
								$("#petDeath").focus();
								return false;
							}

							if (confirm("반려견 수정 정보를 저장하시겠습니까?")) {
								let petUpdateName = $("#petUpdateName").val();
								let petUpdateWeight = $("#petUpdateWeight").val();
								let petUpdateType = $("select[name=petUpdateType]").val();
								let petUpdateSex = $("select[name=petUpdateSex]").val();
								let petUpdateBirthYear = $("select[name=petUpdateBirthYear]").val();
								let petUpdateBirthMonth = $("select[name=petUpdateBirthMonth]").val();
								let petUpdateBirthDay = $("select[name=petUpdateBirthDay]").val();
								let petUpdateComments = $("#petUpdateComments").val();
								let petDeath = $("#petDeath").val();

								//alert("견종 : " + petUpdateType);


								//백으로 보내서 수정하게 하기
								$.post({
									url: "/petUpdate",
									data: {
										"petNo": petNo,
										"petUpdateName": petUpdateName,
										"petUpdateWeight": petUpdateWeight,
										"petUpdateType": petUpdateType,
										"petUpdateSex": petUpdateSex,
										"petUpdateBirthYear": petUpdateBirthYear,
										"petUpdateBirthMonth": petUpdateBirthMonth,
										"petUpdateBirthDay": petUpdateBirthDay,
										"petUpdateComments": petUpdateComments,
										"petDeath": petDeath
									},
									dataType: "json"
								}).done(function(data) {
									//alert("정상소통" + data.result);
									if (data.result == 1) {
										alert("수정이 완료되었습니다.");
										$("#petUpdateModal").modal("hide");
										//수정된 정보 보호자 상세보기 모달로 불러오기
										$.post({
											url: "/clientDetailAjax",
											cache: false, //캐쉬 쓰지말고 새로운 값을 가져오라는 의미
											data: { "detailNo": detailNo },
											dataType: "json"
										}).done(function(data) {
											let result = data.result
											//alert(result[0].owner_name);
											var table = "";
											$('.petListModal').hide();
											//상세보기 클릭 시 이전 기록 reset
											$("#ajaxModalTable").empty();
											for (let i = 0; result.length > i; i++) {
												var pet_no = result[i].pet_no;
												var pet_name = result[i].pet_name;
												var type_name = result[i].type_name
												var pet_gender = result[i].pet_gender;
												var pet_birth = result[i].pet_birth;
												var pet_memo = "";
												if (result[i].pet_memo != undefined) {
													pet_memo = result[i].pet_memo;
												}
												table += "<tr class='petList' value=" + pet_no + ">";
												table += "<td>" + pet_no + "</td>";
												table += "<td>" + pet_name + "</td>";
												table += "<td>" + type_name + "</td>";
												table += "<td>" + pet_gender + "</td>";
												table += "<td>" + pet_birth + "</td>";
												table += "<td>" + pet_memo + "</td>";
												table += "</tr>";
											}

											$("#ajaxModalTable").append(table);
											$("#ajaxModalTable").show();
											
											
											
											
											
										});
										
										$("#detailModal").modal("show");
										
										
										
									} else {
										alert("문제가 발생했습니다. \n다시 시도해주세요.");
									}
									
									
								}).fail(function() {
									alert("문제가 발생했습니다.");
								});
							}
							
							
							

						});

						
					});
					
					$(".petDelete").off().click(function(){
						//반려견 행 클릭 후 삭제 버튼 누를 경우 삭제되게
						alert(petNo);
						 if(confirm("삭제하시겠습니까?")){
				 				location.href="petDelete?petNo="+petNo;
				 			}
						
					});
					
					
				});
				
				
				
				$(this).css("background-color", "#f4f4f4");
				
				$("#detailModal").modal("show");
				
				

			}).fail(function(xhr, status,errorThrown){
				alert("문제가 발생했습니다.");
			});
		
			//보호자 Modal에서 보호자 정보 삭제하기(그 아래의 반려견도 모두 삭제)
			 $(".detailDelete").off().click(function(){
				 //alert("클릭한 부분의 detailNo : " + detailNo);
				 if(confirm("삭제하시겠습니까?")){
					location.href="clientDelete?clientNo="+detailNo;
				}
		 	});
			
			//보호자 상세보기 Modal에서 보호자 정보 수정하기
			//정보 불러오기
			$(".detailUpdate").off().click(function(){
					//alert(detailNo);
					
					var m_owner_name = $("#viewModalLabel").text();
					var m_owner_tel = $("#client_tel").text();
					var m_owner_addr = $("#client_addr").text();
					var m_owner_email = $("#client_email").text();
					var m_owner_sms = $("#client_sms").text();
					var m_owner_memo = $("#client_memo").text();
				
					
					$("#detailModal").modal("hide");
					$("#updateClientName").val(m_owner_name); // 제목란에 원래 가지고 있던 title을 가져온다.
					$("#updateClientEmail").val(m_owner_email);
					$("#updateClientTel").val(m_owner_tel);
					$("#updateClientAddr").val(m_owner_addr);
					if(m_owner_sms =='Y'){
						$("#updateSmsAgree").prop('checked',true);
					}
					if(m_owner_sms == 'N'){
						$("#updateSmsDisagree").prop('checked',true);
					}
					$("#updateClientComments").val(m_owner_memo);
					
					$("#clientUpdateModal").modal("show");
				

			});
			
			//보호자 상세보기 Modal에서 수정 정보 저장하기
			$("#clientUpdateSave").off().click(function(){
				//alert(detailNo);
				//정규식 검사(email형식이 맞는지)
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				//특수문자 검사 정규식(전화번호에 - 들어가는 거 방지)
				var RegExp = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
				 
				if($("#updateClientName").val() == "" || $("#updateClientName").val().length < 1){
					alert("이름은 1글자 이상 입력해주세요");
					$("#updateClientName").focus();
					return false;
				}
				
				if(! (filter.test($("#updateClientEmail").val()) )){
					alert("올바른 email형식을 입력하세요.");
					$("#updateClientEmail").focus();
					return false;
				}
				
				if($("#updateClientTel").val() == "" || $("#updateClientTel").val().length > 11 || 
					RegExp.test($("#updateClientTel").val())	){
					alert("전화번호는 숫자만 입력해 주세요.");
					$("#updateClientTel").focus();
					return false;
				}
				
				if($("#updateClientAddr").val() == "" || $("#updateClientAddr").val().length < 1){
					alert("올바른 주소를 입력해 주세요.");
					$("#updateClientAddr").focus();
					return false;
				}
				
				if(confirm("보호자 수정 정보를 저장하시겠습니까?")){
				//보호자 상세보기 modal 수정 유효성 검사
				
				
				let updateOwnerName = $("#updateClientName").val();
				let updateOwnerEmail = $("#updateClientEmail").val();
				let updateOwnerTel = $("#updateClientTel").val();
				let updateOwnerAddr = $("#updateClientAddr").val();
				if($("#updateSmsAgree").is(":checked") == true){
				var updateOwnerSms = "Y";			
				}
				else if($("#updateSmsDisagree").is(":checked") == true){
				var updateOwnerSms = "N";				
				}
				let updateOwnerMemo = $("#updateClientComments").val();
				
				//alert("SMS : " + updateOwnerSms);
				
				//백으로 보내서 수정하게 하기,
    			$.post({
    				url : "/clientUpdate",
    				data : {"clientNo" : clientNo,
    						"updateOwnerName" : updateOwnerName,
	    					"updateOwnerEmail" : updateOwnerEmail,
	    					"updateOwnerTel" : updateOwnerTel,
	    					"updateOwnerAddr" : updateOwnerAddr,
	    					"updateOwnerSms" : updateOwnerSms,
	    					"updateOwnerMemo" : updateOwnerMemo
    						},
    				dataType : "json"
    			}).done(function(data){
    				//alert("정상소통" + data.result);
    				if(data.result == 1){
    					alert("수정이 완료되었습니다.");
    					$("#clientUpdateModal").modal("hide");
    					
    					$("#viewModalLabel").text(updateOwnerName);
    					$("#client_tel").text(updateOwnerTel);
    					$("#client_addr").text(updateOwnerAddr);
    					$("#client_email").text(updateOwnerEmail);
    					$("#client_sms").text(updateOwnerSms);
    					$("#client_memo").text(updateOwnerMemo);
    					
						
    					$("#detailModal").modal("show");
    						
    				 } else {
    					alert("문제가 발생했습니다. \n다시 시도해주세요.");
    				}
    			}).fail(function(){
    				alert("문제가 발생했습니다.");
    			});
			 }
				
			});
			
			//보호자 상세보기 modal에서 반려견 추가
			$(".petAdd").off().click(function(){
			alert(detailNo);
			$("#detailModal").modal("hide");
			$("#owner_noPAdd").val(detailNo);
			var now = new Date();
			var now_year = now.getFullYear();
			
			$("#petBirthYear").append("<option value=''>생년</option>");
			
			// 올해로 부터 -30년 까지
			for(var i = now_year; i >= (now_year - 30); i--){
			$("#petBirthYear").append("<option value='"+ i +"'>"+ i +"</option>");
			}
			
			$("#petBirthMonth").append("<option value=''>월</option>");
			// 월 (1~12월)
			for (var i = 1; i < 13; i++) {
            $('#petBirthMonth').append('<option value="' + i + '">' + i + '</option>');
       		 }
			
			$("#petBirthDay").append("<option value=''>일</option>");
			// 일 (1~31)
			 for (var i = 1; i < 32; i++) {
             $('#petBirthDay').append('<option value="' + i + '">' + i + '</option>');
       		 }
			
			
			
			$("#petAddModal").modal("show");
		});
		
		//보호자 상세보기 modal에서 몸무게 문자 제한 + 반려견 추가 정보 보내기
		$("#petAddSave").off().click(function(){
			//숫자와 .만 체크하는 정규식
			var NumberExp = /[^0123456789.]/g;
			$("#owner_noPAdd").val(detailNo);
			if($("#petAddName").val() == "" || $("#petAddName").val().length < 1){
				alert("이름을 1글자 이상 입력해주세요.");
				$("#petAddName").focus();
				return false; 
			}
			
			if((NumberExp.test($("#petAddWeight").val())) || $("#petAddWeight").val() == "" ||
				$("#petAddWeight").val().length < 1){
				alert("몸무게는 숫자와 소수점(.)만 입력 가능합니다.");
				$("#petAddWeight").focus();
				return false; 
			}
			
			
			if($("select[name=petAddType]").val() == "견종을 선택하세요"){
				alert("견종을 선택해 주세요.");
				$("#petAddType").focus();
				return false; 
			}
			
			if($("select[name=petSex]").val() == "성별을 선택하세요"){
				alert("성별을 선택해 주세요.");
				$("#petSex").focus();
				return false; 
			}
			
			if($("select[name=petBirthYear]").val() == ""){
				alert("생년을 선택해 주세요.");
				$("#petBirthYear").focus();
				return false; 
			}
			if($("select[name=petBirthMonth]").val() == ""){
				alert("생월을 선택해 주세요.");
				$("#petBirthMonth").focus();
				return false; 
			}
			if($("select[name=petBirthDay]").val() == ""){
				alert("생일을 선택해 주세요.");
				$("#petBirthDay").focus();
				return false; 
			}
			
			if(confirm("반려견을 등록 하시겠습니까?")){
				petAdd.submit();			
			}
			
		});
		
			
	 });
	
		
	
	//보호자 추가 버튼 모달
		$(".client-add").off().click(function(){
			//alert("클릭한 부분의 clientNo : " + clientNo);
			$("#clientAddModal").modal("show");

		});
	
		//모달 창 닫을 경우 남아있는 값 삭제
		$('#clientAddModal').on('hidden.bs.modal', function(e) {

		    // 텍스트 인풋 초기화
		    if($(this).find('form').length >0){
		    	$(this).find('form')[0].reset();
		   		var inputValue = $(this).find('select:eq(0) option:eq(0)');
		    }

		    // 셀렉트 초기화
		    //$('.select2').val(0).trigger('change.select2');
		});
	
	 $("#clientAddSave").off().click(function(){
			//정규식 검사(email형식이 맞는지)
			var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			//특수문자 검사 정규식(전화번호에 - 들어가는 거 방지)
			var RegExp = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
			 
			if($("#floatingClientName").val() == "" || $("#floatingClientName").val().length < 1){
				alert("이름은 1글자 이상 입력해주세요");
				$("#floatingClientName").focus();
				return false;
			}
			
			if(! (filter.test($("#floatingClientEmail").val()) )){
				alert("올바른 email형식을 입력하세요.");
				$("#email").focus();
				return false;
			}
			
			if($("#floatingClientTel").val() == "" || $("#floatingClientTel").val().length > 11 || 
				RegExp.test($("#floatingClientTel").val())	){
				alert("전화번호는 숫자만 입력해 주세요.");
				$("#floatingClientTel").focus();
				return false;
			}
			
			if($("#floatingClientAddr").val() == "" || $("#floatingClientAddr").val().length < 2){
				alert("올바른 주소를 입력해 주세요.");
				$("#floatingClientAddr").focus();
				return false;
			}
			
			
			//통과했다면
			if(confirm("보호자를 신규등록 하시겠습니까?")){
				let floatingClientName = $("#floatingClientName").val();
				let floatingClientEmail =$("#floatingClientEmail").val();
				let	floatingClientTel = $("#floatingClientTel").val();	
				let	floatingClientAddr = $("#floatingClientAddr").val();	
				var smsAgree = $("input[name='smsAgree']:checked").val();
				let	floatingClientComments = $("#floatingClientComments").val();
				//alert("이름 : " + floatingClientName + " 이메일 : " + floatingClientEmail + "\n전화번호 : " + floatingClientTel + " 주소 : " + floatingClientAddr + " 동의 여부 : " +  smsAgree + " 메모 : "+floatingClientComments);
			$.post({
    				url : "/clientAdd",
    				data : {"floatingClientName" : floatingClientName,
    						"floatingClientEmail" : floatingClientEmail,
	    					"floatingClientAddr" : floatingClientAddr,
	    					"floatingClientTel" : floatingClientTel,
	    					"smsAgree" : smsAgree,
	    					"floatingClientComments" : floatingClientComments
    						},
    				dataType : "json"
    			}).done(function(data){
    				//alert("정상소통" + data.result);
    				if(data.result == 1){
    					alert("저장이 완료되었습니다.");
    						
    				 } else {
    					alert("문제가 발생했습니다. \n다시 시도해주세요.");
    				}
    			});

				if(confirm("반려견을 바로 등록 하시겠습니까?")){
				//보호자 추가 모달 숨기기
				$("#clientAddModal").modal("hide");
				
				var clientName = $("#floatingClientName").val();
				//alert(clientName);
				$("#owner_nameAdd").val(clientName);
				var now = new Date();
				var now_year = now.getFullYear();
				
				$("#petBirthYear").append("<option value=''>생년</option>");
				
				// 올해로 부터 -30년 까지
				for(var i = now_year; i >= (now_year - 30); i--){
				$("#petBirthYear").append("<option value='"+ i +"'>"+ i +"</option>");
				}
				
				$("#petBirthMonth").append("<option value=''>월</option>");
				// 월 (1~12월)
				for (var i = 1; i < 13; i++) {
	            $('#petBirthMonth').append('<option value="' + i + '">' + i + '</option>');
	       		 }
				
				$("#petBirthDay").append("<option value=''>일</option>");
				// 일 (1~31)
				 for (var i = 1; i < 32; i++) {
	             $('#petBirthDay').append('<option value="' + i + '">' + i + '</option>');
	       		 }
		
		
						
				$("#petAddModal").modal("show");
					$("#petAddSave").off().click(function(){
						if(confirm("반려견을 등록 하시겠습니까?")){
							petAdd.submit();
						} else {
							location.reload();
						}
					});
				} else{
					location.reload();
				}
				
			}
	 });
	 
	
});
	