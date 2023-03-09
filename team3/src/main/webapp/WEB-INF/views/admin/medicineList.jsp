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

			var medical_name = $("#medical_name").val();
			var medical_price = $("#medical_price").val();
			var medical_category = $("#medical_category").val();

			if (medical_name == "") {
				alert("이름을 입력해주세요.");
				$("#medical_name").focus();
				return false;
			}

			if (medical_price == "") {
				alert("가격을 입력해주세요.");
				$("#medical_price").focus();
				return false;
			}

// 			mediAddFrm.submit();

		});
		
		$(".medicineUpdate").click(function() {
			var medical_no = $(this).attr("value");
			$.post({
				url : "/medicineDetail",
				cache : false,
				data : {
					"medical_no" : medical_no
				},
				dataType : "json"
			}).done(function(data) {
				let result = data.result;
				if (confirm("수정하시겠습니까?")) {

					$("#medicine_noU").val(result.medical_no);
					$("#medicine_nameU").val(result.medical_name);
					$("#medicine_priceU").val(result.medical_price);

					$("#updateModal").modal("show"); //수정화면 모달 보기
				}
			}).fail(function(xhr, status, errorThrown) {
				alert("실패");
			});
		});
		$(".updateFrm").click(function() {

			let medical_no = $("#medicine_noU").val();
			let medical_name = $("#medicine_nameU").val();
			let medical_price = $("#medicine_priceU").val();

			$.post({
				url : "/medicineUpdate",
				data : {
					"medical_no" : medical_no,
					"medical_name" : medical_name,
					"medical_price" : medical_price
				},
				dataType : "json"
			}).done(function(data) {
				if (data.result == 1) {
					alert("수정이 완료되었습니다.");
					$("#updateModal").modal("hide");
					location.href="/medicine";
				} else {
					alert("문제가 발생했습니다. \n다시 시도해주세요.");
				}
			}).fail(function() {
				alert("문제발생");
			});
		});

	});
	
	function medicineDel(medical_no){
		if(confirm("정말 삭제하시겠습니까?")){
		location.href =  "/medicineDel?medical_no=" + medical_no;
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
					<div class="mb-1"
						style="font-size: 13px; margin-top: -10px; padding-left: 8px;">
						<a href="/index" style="text-decoration: none;"
							class="text-gray-600"><i class="fa-solid fa-house-chimney"></i></a>&nbsp;&nbsp;<i
							class="fa-sharp fa-solid fa-chevron-right"></i>&nbsp; <a
							href="/medicine" style="text-decoration: none;"
							class="text-gray-700">데이터 관리</a>&nbsp;&nbsp;<i
							class="fa-sharp fa-solid fa-chevron-right"></i> &nbsp;<a
							href="/medicine" style="text-decoration: none;"
							class="text-gray-700">약</a>
					</div>


					<!-- DataTales Example -->
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">데이터관리</h6>

						</div>

						<div class="card-body">
							<div style="margin-top: -5px;">
								<ul class="nav nav-tabs">
									<li class="nav-item"><a
										class="nav-link active font-weight-bolder text-primary"
										aria-current="page" href="/medicine" tabindex="0">약</a></li>
									<li class="nav-item "><a class="nav-link"
										href="/inspection">검사</a></li>
									<li class="nav-item"><a class="nav-link" href="/vaccine">접종</a></li>
									<li class="nav-item"><a class="nav-link" href="/petType">견종</a></li>
								</ul>
							</div>
							<div class="row justify-content-center">

								<!-- 데이터 추가 -->
								<div class="border-right col-6 col-md-6"
									style="padding: 10px; height: 570px;">
									<form id="mediAddFrm" name="mediAddFrm" action="/medicineAdd"
										method="post">
										<input type="hidden" value="약" id="medical_category"
											name="medical_category">
										<ul class="list-group list-group-flush">
											<li class="list-group-item">
												<div class="row">
													<div class="col-md-3" style="line-height: 38px;">이름</div>
													<div class="col-md-9">
														<input type="text" class="form-control" id="medical_name"
															name="medical_name">
													</div>
												</div>
											</li>
											<li class="list-group-item mb-4">
												<div class="row">
													<div class="col-md-3 " style="line-height: 40px;">가격</div>
													<div class="col-md-9">
														<input type="text" class="form-control" id="medical_price"
															name="medical_price">
													</div>
												</div>

											</li>


										</ul>


										<div class="text-center col-lg-12 col-12">
											<button type="submit" id="addBtn"
												class="btn btn-primary col-8 ">저장</button>
										</div>
									</form>
								</div>

								<!-- 리스트 출력 -->
								<div class="col-6 col-md-6"
									style="overflow: auto; height: 570px; padding: 10px;">

									<div class="input-group mb-3">
										<select class="form-control col-md-3">
											<option>이름</option>
											<option>가격</option>
										</select> <input type="text" class="form-control border-gray col-md-9"
											placeholder="검색어를 입력하세요">
										<div class="input-group-append">
											<button class="btn btn-primary" type="button">
												<i class="fas fa-search"></i>
											</button>
										</div>
									</div>
									<div class="table-responsive">
										<table class="table table-sm table-bordered text-center"
											id="dataTable" width="100%" cellspacing="0">
											<thead>
												<tr class="bg-gray-200">
													<th class="col-1">번호</th>
													<th class="col-3">이름</th>
													<th class="col-2">가격</th>
													<th class="col-1"></th>

												</tr>
											</thead>

											<tbody>
												<c:forEach items="${medicineList }" var="ml">
													<tr style="line-height: 30px;">
														<td>${ml.mno }</td>
														<td>${ml.medical_name }</td>
														<td>${ml.medical_price }원</td>
														<td>
															<button type="button"
																class="btn btn-circle btn-sm btn-warning medicineUpdate"
																value="${ml.medical_no }">
																<i class="fa-solid fa-pen"></i>
															</button>
															<button type="button"
																onclick="medicineDel(${ml.medical_no })"
																class="btn btn-circle btn-sm btn-danger">
																<i class="fa-solid fa-trash"></i>
															</button>
														</td>


													</tr>
												</c:forEach>

											</tbody>
										</table>
									</div>




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


			<!-- 약 데이터 수정 Modal-->
			<div class="modal fade" id="updateModal" tabindex="-1" role="dialog"
				aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Medicine 데이터
								수정</h5>
							<button class="close" type="button" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div class="modal-body">
							<input type="hidden" id="medicine_noU" name="medicine_noU">

							<ul class="list-group list-group-flush">
								<li class="list-group-item">
									<div class="row">
										<div class="col-md-3" style="line-height: 38px;">Name</div>
										<div class="col-md-9">
											<input type="text" class="form-control" id="medicine_nameU"
												name="medicine_nameU">
										</div>
									</div>
								</li>
								<li class="list-group-item mb-4">
									<div class="row">
										<div class="col-md-3 " style="line-height: 40px;">Price</div>
										<div class="col-md-9">
											<input type="text" class="form-control" id="medicine_priceU"
												name="medicine_priceU">
										</div>
									</div>
								</li>
							</ul>
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
