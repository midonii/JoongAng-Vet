<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>Team 3</title>
<link rel="stylesheet"
	href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
<!-- Custom fonts for this template-->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
<link rel="stylesheet" href="https://kit.fontawesome.com/a31e2023c3.css"
	crossorigin="anonymous">
<script src="https://kit.fontawesome.com/a31e2023c3.js"
	crossorigin="anonymous"></script>
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet">

<!-- Custom styles for this template-->
<link href="css/sb-admin-2.min.css" rel="stylesheet">

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>

<script type="text/javascript">
	$(function() {
		$("#addBtn").click(function() {

			var type_name = $("#type_name").val();
			if (type_name == "") {
				alert("이름을 입력해주세요.");
				$("#type_name").focus();
				return false;
			}
			petTypeAddFrm.submit();
		});
		
// 		var actionFrm = $("#actionFrm");
// 		$(".paginate_button a").on("click", function(e){
// 			e.preventDefault();
// 			console.log("click");
// 			actionFrm.find("input[name='pageNum']").val($(this).attr("href"));
// 			actionFrm.submit();
// 		});

		$(".petTypeUpdate").click(function() {
			var type_no = $(this).attr("value");
			
			$.post({
				url : "/petTypeDetail",
				cache : false,
				data : {
					"type_no" : type_no
				},
				dataType : "json"
			}).done(function(data) {
				let result = data.result;
				if (confirm("수정하시겠습니까?")) {

					$("#type_noU").val(result.type_no);
					$("#type_nameU").val(result.type_name);

					$("#updateModal").modal("show"); //수정화면 모달 보기
				}
			}).fail(function(xhr, status, errorThrown) {
				alert("실패");
			});
		});
		
		$(".refresh").click(function(){
			$("#updateModal").modal("hide");
		});
		
		$(".updateFrm").click(function() {

			let type_no = $("#type_noU").val();
			let type_name = $("#type_nameU").val();

			//백으로 보내서 수정하게 하기,
			$.post({
				url : "/petTypeUpdate",
				data : {
					"type_no" : type_no,
					"type_name" : type_name,
				},
				dataType : "json"
			}).done(function(data) {
				if (data.result == 1) {
					alert("수정이 완료되었습니다.");
					$("#updateModal").modal("hide");
					location.href="/petType";
				} else {
					alert("문제가 발생했습니다. \n다시 시도해주세요.");
				}
			}).fail(function() {
				alert("문제발생");
			});
		});
		

	});
	function petTypeDel(type_no){
		if(confirm("정말 삭제하시겠습니까?")){
		location.href =  "/petTypeDel?type_no=" + type_no;
		}
	}
	

	
	
</script>
</head>

<body id="page-top">

	<!-- Page Wrapper -->
	<div id="wrapper">

		<%@ include file="../bar/sideBar.jsp"%>

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				<%@ include file="../bar/topBar.jsp"%>


				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- Page Heading -->
					<h5 class="h5 mb-4 text-gray-900">
						<b>데이터 관리</b>
					</h5>


					<!-- DataTales Example -->
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<ul class="nav nav-tabs">
								<li class="nav-item"><a class="nav-link"
									aria-current="page" href="/medicine" tabindex="0">약</a></li>
								<li class="nav-item "><a class="nav-link"
									href="/inspection">검사</a></li>
								<li class="nav-item"><a class="nav-link" href="/vaccine">접종</a></li>
								<li class="nav-item"><a
									class="nav-link font-weight-bolder active" href="/petType">견종</a></li>
							</ul>
						</div>

						<div class="card-body">
							<h4 class="m-0 font-weight-bold text-primary mb-3">PetType</h4>
							<div class="row justify-content-center">
								<!-- 데이터 추가 -->
								<div class="border-right col-6 col-md-6"
									style="padding: 10px; height: 570px;">
									<form id="petTypeAddFrm" name="petTypeAddFrm"
										action="/petTypeAdd" method="post">

										<ul class="list-group list-group-flush">

											<li class="list-group-item mb-4">
												<div class="row">
													<div class="col-md-3 " style="line-height: 40px;">견종</div>
													<div class="col-md-9">
														<input type="text" class="form-control" id="type_name"
															name="type_name">
													</div>
												</div>
											</li>
										</ul>

										<div class="text-center col-lg-12 col-12">
											<button type="button" id="addBtn"
												class="btn btn-primary col-8 ">저장</button>
										</div>
									</form>
								</div>

								<!-- 리스트 출력 -->
								<div class="col-6 col-md-6"
									style="overflow: auto; height: 570px; padding: 10px;">

									<div class="input-group mb-3">
										<input type="text" class="form-control border-gray col-md-12"
											placeholder="견종을 입력하세요">
										<div class="input-group-append">
											<button class="btn btn-primary" type="button">
												<i class="fas fa-search"></i>
											</button>
										</div>
									</div>
									<div class="table-responsive" id="printme">
										<table class="table table-sm table-bordered text-center"
											id="dataTable" width="100%" cellspacing="0">
											<thead>
												<tr class="bg-gray-200" style="line-height: 30px;">
													<th class="col-2">번호</th>
													<th class="col-8">견종</th>
													<th class="col-2"></th>
												</tr>
											</thead>

											<tbody>
												<c:forEach items="${petTypeList }" var="tl">
													<tr style="line-height: 30px;">
														<td >${tl.tno }</td>
														<td>${tl.type_name }</td>
														<td>
															<button type="button"
																class="btn btn-circle btn-sm btn-warning petTypeUpdate" value="${tl.type_no }">
																<i class="fa-solid fa-pen"></i>
															</button>
															<button type="button"
																onclick="petTypeDel(${tl.type_no })"
																class="btn btn-circle btn-sm btn-danger">
																<i class="fa-solid fa-trash"></i>
															</button>
														</td>
													</tr>
												</c:forEach>

											</tbody>
										</table
									</div>


									<!-- 									페이징 -->
									<!-- 									<form action="/petType" id="actionFrm" method="get"> -->
									<%-- 										<input type="hidden" name="pageNum" value="${pageMaker.cri.pageNum }"> --%>
									<%-- 										<input type="hidden" name="amount" value="${pageMaker.cri.amount }"> --%>
									<!-- 									</form> -->
									<!-- 									<ul class="pagination"> -->

									<%-- 										<c:if test="${pageMaker.prev}"> --%>
									<!-- 											<li class="paginate_button previous"><a -->
									<%-- 												href="${pageMaker.startPage -1 }">Previous</a></li> --%>
									<%-- 										</c:if> --%>

									<%-- 										<c:forEach var="num" begin="${pageMaker.startPage }" --%>
									<%-- 											end="${pageMaker.endPage }"> --%>
									<%-- 											<li class="paginate_button${pageMaker.cri.pageNum==num ? "active":"" }"> --%>
									<%-- 												<a href="${num }">${num }</a> --%>
									<!-- 											</li> -->
									<%-- 										</c:forEach> --%>

									<%-- 										<c:if test="${pageMaker.next}"> --%>
									<!-- 											<li class="paginate_button next"><a -->
									<%-- 												href="${pageMaker.endPage+1 }">Next</a></li> --%>
									<%-- 										</c:if> --%>
									<!-- 									</ul> -->
									<!-- 									/페이징 -->



								</div>
							</div>



						</div>
					</div>
				</div>



				<!-- /.container-fluid -->

			</div>
			<!-- End of Main Content -->

			<%@ include file="../bar/footer.jsp"%>

			<%@ include file="../bar/logoutModal.jsp"%>


			<!-- 견종 수정 Modal-->
			<div class="modal fade" id="updateModal" tabindex="-1" role="dialog"
				aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">견종 이름 수정</h5>
							<button class="close" type="button" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div class="modal-body">

							<input type="hidden" id="type_noU" name="type_noU"> <input
								type="text" class="form-control" id="type_nameU"
								name="type_nameU">
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn btn-primary updateFrm">수정</button>
						</div>
					</div>
				</div>
			</div>



			<!-- Bootstrap core JavaScript-->
			<script src="vendor/jquery/jquery.min.js"></script>
			<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

			<!-- Core plugin JavaScript-->
			<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

			<!-- Custom scripts for all pages-->
			<script src="js/sb-admin-2.min.js"></script>
</body>

</html>
