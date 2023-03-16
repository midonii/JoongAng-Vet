<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="en">
<% if(session.getAttribute("id") == null){
   response.sendRedirect("/login");
}
%>
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>회원정보</title>
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
<!-- Custom fonts for this template-->
<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet">
<!-- 	type="text/css"> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
<link rel="stylesheet" href="https://kit.fontawesome.com/a31e2023c3.css" crossorigin="anonymous">
<script src="https://kit.fontawesome.com/a31e2023c3.js" crossorigin="anonymous"></script>
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet">

<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
<!-- Custom styles for this template-->
<link href="../css/sb-admin-2.min.css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>

<script type="text/javascript">
//검색 시 selec 선택 검사
$(function(){
	$("#search_btn").click(function(){
		//alert("!");
		let searchName = $("#search_name").val();
		let searchValue = $("#search_value").val();
		//alert(searchName + " :: " + searchValue);
		if(searchName == null ){
			alert("검색하시려는 항목을 선택하세요.");
			return false;
		}
		searchForm.submit();

		
	});
	var hidden_search = $("#hidden_search").val();
	$("#search_name").val(hidden_search);
	
});

// pet_no 값을 가지고 petdetail 화면으로 가기 
$(function(){
	$(".petdetail-btn").click(function(){
		let petNo = $(this).attr("value");
		//alert(petNo);
		location.href="petinfo?petNo="+petNo;
	});
});
</script>
<style type="text/css">
.table{
	text-align: center;
}
</style>
<script src="js/client/client_add.js"></script>
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

				<!-- 회원 검색 -->
				 <div class="row">
					<form action="/client" method="get" name="searchForm">
						<div class="mb-2 mt-1 float-right" style="width: 35%">
							<div class="input-group">
								<input type="hidden" value="${search.getSearch_name() }" id="hidden_search">
								<select class="form-control form-control-sm col-md-3" name="search_name" id="search_name">
									<option value="" selected disabled="disabled">선택</option>
									<option value="owner">보호자명+전화번호</option>
									<option value="pet">반려견명+생일</option>
								</select> 
								<input type="text" class="form-control form-control-sm border-gray col-md-9" 
								placeholder="검색어를 입력하세요" value="${search.getSearch_value()}" name="search_value" id="search_value">
								<div class="input-group-append">
									<button class="btn btn-primary btn-sm" id="search_btn" type="submit">
										<i class="fas fa-search"></i>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>

					<!-- 보호자 테이블 -->
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">보호자</h6>
						</div>
						<c:choose>
							<c:when test="${fn:length(clientList) gt 0}">
								<div class="card-body">
									<div class="table-responsive">
										<div id="clientScroll" style="height: 250px; overflow: auto">
											<!--  <form name="clientInfo" action="profile" method="get"> -->
											<table class="table table-sm table-bordered table-hover"
												id="dataTable" width="100%" cellspacing="0">
												<thead>
													<tr>
														<th class="col-md-1">번호</th>
														<th class="col-md-2">이름</th>
														<th class="col-md-3">전화번호</th>
														<th class="col-md-5">주소</th>
														<th class="col-md-1">상세보기</th>
													</tr>
												</thead>

												<tbody id="client-table" data-spy="scroll"
													data-target="#list-example" data-offset="0"
													class="scrollspy-example">
													<c:forEach items="${clientList }" var="cl">
														<tr id="client-info" class="owner-tr"
															value="${cl.owner_no }">
															<td>${cl.owner_no }</td>
															<td id="client-name" value="${cl.owner_name }">${cl.owner_name }</td>
															<td>${cl.owner_tel }</td>
															<td>${cl.owner_addr }</td>
															<td>
																<button type="submit"
																	class="btn btn-outline-primary btn-sm detail-btn"
																	name="${cl.owner_no }" value="${cl.owner_no }">상세보기</button>
															</td>
														</tr>
													</c:forEach>
												</tbody>
											</table>
											<!-- </form> -->
										</div>

										<!-- 버튼 -->
										<div class="mt-4">
											<a class="btn btn-danger btn-icon-split float-right ml-2">
												<span class="icon text-white-50"> <i
													class="fas fa-trash"></i>
											</span> <span class="text clientDelete">삭제</span>
											</a> <a
												class="btn btn-info btn-icon-split float-right ml-2 clientUpdate">
												<span class="icon text-white-50"> <i
													class="fas fa-info-circle"></i>
											</span> <span class="text">수정</span>
											</a> <a
												class="btn btn-primary btn-icon-split float-right ml-2 client-add">
												<span class="icon text-white-50"> <i
													class="fas fa-flag"></i>
											</span> <span class="text">추가</span>
											</a> <a class="btn btn-success btn-icon-split  float-right"
												id="plus-btn"> <span class="icon text-white-50">
													<i class="fas fa-check"></i>
											</span> <span class="text">반려견 추가</span>
											</a>
										</div>
									</div>
								</div>
							</c:when>
							<c:otherwise>
								<h5 class="m-0 font-weight-bold text-gray-600 mt-1 mb-1 ml-1">데이터가 없습니다.</h5>
							</c:otherwise>
						</c:choose>
					</div>

					<!-- 반려견 테이블 -->
					<div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">반려견</h6>
                        </div>
                        <c:choose>
						<c:when test="${fn:length(petList) gt 0}">
                        <div class="card-body">
                            <div class="table-responsive">
										<div style="height: 250px; overflow: auto;">
											<table class="table table-sm table-bordered table-hover"
												id="dataTable" width="100%" cellspacing="0">
												<thead>
													<tr>
														<th class="col-md-1">번호</th>
														<th class="col-md-1">이름</th>
														<th class="col-md-2">견종</th>
														<th class="col-md-1">성별</th>
														<th class="col-md-2">생년월일</th>
														<th class="col-md-4">특이사항</th>
														<th class="col-md-1">상세보기</th>
													</tr>
												</thead>
												
												
												<c:forEach items="${petList }" var="pl">
												<tbody id="ajaxTable" value="${pl.pet_no }">
														<tr class="petList" value="${pl.pet_no }">
															<td class="petNo">${pl.pet_no }</td>
															<td class="petName">${pl.pet_name }</td>
															<td class="typeName">${pl.type_name }</td>
															<td class="petGender">${pl.pet_gender }</td>
															<td class="petBirth">${pl.pet_birth }</td>
															<td class="petMemo" style="text-align: left;">${pl.pet_memo }</td>
															<td>
																<button type="submit" id="petdetail-btn" class="btn btn-outline-primary btn-sm petdetail-btn"
																name="${pl.pet_no }" value="${pl.pet_no }">상세보기</button>
															</td>
														</tr>
													</c:forEach>
												</tbody>
											</table>
										</div>
								<!-- 반려견 버튼 -->
                                <div class="mt-4">
                                <a class="btn btn-danger btn-icon-split float-right ml-2 petDelete"> <span
									class="icon text-white-50"> <i class="fas fa-trash"></i>
								</span> <span class="text">삭제</span>
								</a>
								<a class="btn btn-info btn-icon-split float-right petUpdate"> <span
									class="icon text-white-50"> <i
										class="fas fa-info-circle"></i>
								</span>
								<span class="text">수정</span>
								</a>
								</div>
                            </div>
                        </div>
                        </c:when>
                        <c:otherwise>
								<h5 class="m-0 font-weight-bold text-gray-600 mt-1 mb-1 ml-1">데이터가 없습니다.</h5>
						</c:otherwise>
                        </c:choose>
                    </div>
     
				
			<%@ include file="./client_modal.jsp"%>

					


				</div>
				<!-- /.container-fluid -->

			</div>
			<!-- End of Main Content -->
			
       
			      <%@ include file="../bar/footer.jsp" %>
         		  <%@ include file="../bar/logoutModal.jsp" %>
			

	<!-- Bootstrap core JavaScript-->
	<script src="vendor/jquery/jquery.min.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Core plugin JavaScript-->
	<script src="vendor/jquery-easing/jquery.easing.min.js"></script>
	

	<!-- Custom scripts for all pages-->
	<script src="js/sb-admin-2.min.js"></script>
	<!-- JavaScript Bundle with Popper -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

</body>

</html>