<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<%
if (session.getAttribute("id") == null) {
	response.sendRedirect("/login?error=4321");
}
%>
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>수납</title>
<link rel="shortcut icon" type="image/x-icon" href="../img/favicon.png" />
<link rel="stylesheet"
	href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
<!-- Custom fonts for this template-->
<!-- <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" -->
<!-- 	type="text/css"> -->
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
<!-- payDetail css -->
<link href="css/payDetail.css" rel="stylesheet">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
<script>
	/* 전화번호 정규식  */
	$(document).ready(
			function() {
				var test = "${detail.owner_tel}";
				var testDate = test.replace(
						/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
						"$1-$2-$3");
				$("#telnum").text(testDate);
			});
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

					<!-- DataTales Example -->
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">수납</h6>
						</div>
						<div class="card-body">
							<div class="detailHead" style="width: 100%">

								<div class="addr">
									<div>중앙동물병원</div>
									<div>서울 강남구 테헤란로7길 7, 7층</div>
									<div>02-561-1911</div>
								</div>
								<div class="logo">
									<img src="img/paylogo.png" width="100px;" height="80px;">
								</div>
							</div>
							<!-- head -->
							<hr class="hr1">
							<table>
								<tr>
									<td align="right" valign="middle">차트번호 :&nbsp;</td>
									<td align="left" valign="middle">${detail.chart_no}</td>

								</tr>
								<tr>
									<td align="right" valign="middle">보호자명 :&nbsp;</td>
									<td align="left" valign="middle">${detail.owner_name}</td>
								</tr>
								<tr>
									<td align="right" valign="middle">동물명 :&nbsp;</td>
									<td align="left" valign="middle">${detail.pet_name }</td>

								</tr>
								<tr>
									<td align="right" valign="middle">전화번호 :&nbsp;</td>
									<td align="left" valign="middle" id="telnum" class="ml-3"></td>

								</tr>
							</table>
							<hr>
							<div class="detailBody" style="width: 100%">
								<div class="db1">청구서</div>
								&nbsp[&nbsp${detail.pay_date }&nbsp]<br>
								&nbsp[&nbsp동물명&nbsp : &nbsp${detail.pet_name }&nbsp]<br>
								&nbsp[&nbsp담당의&nbsp : &nbsp${chartdetail[0].staff_name }&nbsp]
								
								<div class="table-responsive"  style="min-height: 500px;" >
								<table class="table text-center"  >
									<tr style="height:50px; font-size: 16px;">
										<th class="col-2">구분</th>
										<th class="col-2">세부구분</th>
										<th class="col-3">이름</th>
										<th class="col-1">수량</th>
										<th class="col-2">금액</th>
										<th class="col-2">적용금액</th>
									</tr>
								 	<c:forEach var="first" items="${chartdetail}" varStatus="status">
										<tr style="height:50px;">
											<td>${first.medical_category }</td>
											<td>${first.medical_subcate }</td>
											<td>${first.medical_name }</td>
											<td>${first.medicaldata_ea }</td>
											<td><fmt:formatNumber value="${first.medical_price }"
												pattern="#,###" />원</td>
										<td><fmt:formatNumber value="${first.medical_price *first.medicaldata_ea }"
												pattern="#,###" />원</td>
											
										</tr>
									</c:forEach>
								</table>
								</div>
								<div style="float:left;  width:100%; border-top:1px solid #ccc; height:40px;">
								<div style="float:left; width:calc(100% - 400px); text-align:right; line-height: 40px;">
								<b>총 합계</b>
								</div>
								<div style="float:left; font-size:18px; width:280px; text-align:right; margin-right:120px; line-height: 40px;">
								<b><fmt:formatNumber value="${detail.totalPrice }"
												pattern="#,###" />원</b>
								</div>
								</div>
								<!--출력부분끝  -->

								<button type="button" class="btn btn-primary pbtn" value="print"
									onclick="window.print()">출력</button>
							</div>
							<!--detailBody  -->
						</div>
					</div>

				</div>
				<!-- /.container-fluid -->

			</div>
			<!-- End of Main Content -->

			<!-- 푸터, 로그아웃 모달  -->
			<%@ include file="../bar/footer.jsp"%>
			<%@ include file="../bar/logoutModal.jsp"%>
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
