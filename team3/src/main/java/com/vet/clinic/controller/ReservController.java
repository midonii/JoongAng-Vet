package com.vet.clinic.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vet.clinic.dto.ReservDTO;
import com.vet.clinic.service.ReservService;

@Controller
public class ReservController {

	@Autowired
	private ReservService reservService;

	// 전체리스트, 예약리스트
	@GetMapping("/reserv")
	public ModelAndView reserv(HttpServletRequest request) {

		ReservDTO reservDTO = new ReservDTO();
		ModelAndView mv = new ModelAndView("reservation/reserv");

		// 전체리스트
		List<ReservDTO> boardlist = reservService.boardlist(reservDTO);
		mv.addObject("boardlist", boardlist);

		// 예약 리스트
		List<ReservDTO> reservlist = reservService.reservlist(reservDTO);
		mv.addObject("reservlist", reservlist);

		// 접수 리스트
		List<ReservDTO> receplist = reservService.receplist(reservDTO);
		mv.addObject("receplist", receplist);

		return mv;
	}

	// 검색결과(검색리스트)
	@ResponseBody
	@GetMapping("/reservsearch") // url을 "/reservsearch"로 띄워주겠다
	public String resersearch(HttpServletRequest request) {
		ReservDTO reservDTO = new ReservDTO();
		reservDTO.setSearch_value(request.getParameter("searchValue")); // searchValue: script의 data의 key 명!,data: { "searchValue"}

		HttpSession session = request.getSession();
		reservDTO.setStaff_id((String) session.getAttribute("id"));

		JSONObject json = new JSONObject();
		List<ReservDTO> searchlist = reservService.searchlist(reservDTO);
		JSONArray jsonA = new JSONArray(searchlist); // json어레이로 감싸기

		json.put("result", searchlist);
		return json.toString();
	}

	// 예약하기
	@ResponseBody
	@PostMapping(value = "/reservAjax", produces = "application/json;charset=UTF-8")
	public String reservAjax(HttpServletRequest request) {
		ReservDTO reservDTO = new ReservDTO();
		// System.err.println(request.getParameter("detail_no")); //ok
		JSONObject json = new JSONObject();
		JSONArray jsonA = new JSONArray();
		reservDTO.setDetail_no(request.getParameter("detail_no"));
		if ((String) request.getParameter("detail_no") != null) {
//			if ((String)request.getParameter("searchValue") != null) {
			List<ReservDTO> searchDetail = reservService.reservAjax(reservDTO); // reservationview에서 가져옴
			jsonA = new JSONArray(searchDetail);
			json.put("result", searchDetail);
//			System.out.println(jsonA.getJSONObject(0).getString("pet_name")); //ok
		}

		//시간막기
		reservDTO.setReservation_date_day(request.getParameter("reservation_date_day"));
		//System.err.println("reservation_date_day:" + request.getParameter("reservation_date_day"));//ok
		List<ReservDTO> timeDetail = reservService.reservTimeCheck(reservDTO);
		jsonA = new JSONArray(timeDetail);
		json.put("result1", timeDetail);
		//System.err.println(timeDetail);//
		
		return json.toString();
	}
	
	
	
	
	

	// 예약한 시간 막기
	@ResponseBody
	@PostMapping(value = "/reservTimeCheck", produces = "application/json;charset=UTF-8")
	public String reservTimeCheck(HttpServletRequest request) {
		ReservDTO reservDTO = new ReservDTO();

		reservDTO.setReservation_date_day(request.getParameter("reservation_date_day"));
		System.err.println("reservation_date_day:" + request.getParameter("reservation_date_day"));
		JSONObject json = new JSONObject();

		List<ReservDTO> timeDetail = reservService.reservTimeCheck(reservDTO); // reservationview에서 가져옴
		JSONArray jsonA = new JSONArray(timeDetail);
		json.put("result", timeDetail);
//			System.out.println(jsonA.getJSONObject(0).getString("timeDetail")); //ok
		return json.toString();
	}

	// 예약완료 (예약테이블에 저장)
	@ResponseBody
	@PostMapping("reservAdd")
	public String reservAdd(HttpServletRequest request) {
		ReservDTO reservDTO = new ReservDTO();
		String reservation_date = request.getParameter("reservation_date"); // reservation_date 변수에 매개변수 값 할당

		HttpSession session = request.getSession();
		if (request.getParameter("reservation_memo") != null) {
			reservDTO.setReservation_memo(request.getParameter("reservation_memo"));
		}
		System.out.println(request.getParameter("reservation_memo"));
		reservDTO.setReservation_date(reservation_date); // dto의 속성 값 설정
		// db에 저장할 깂
		reservDTO.setStaff_id((String) session.getAttribute("id"));
		reservDTO.setPetNo(request.getParameter("petNo"));
//		reservDTO.setReservation_no(request.getParameter("reservation_no"));

		JSONObject json = new JSONObject();
		int result = reservService.reservAdd(reservDTO);
		json.put("result", result);
		 System.out.println(json);
		 System.out.println("result:"+result); //1

		return json.toString();
	}

	// 예약수정하기(모달 띄우기)
	@ResponseBody
	@PostMapping(value = "reservUpdate", produces = "application/json;charset=UTF-8")
	public String reservUpdate(HttpServletRequest request) {
		ReservDTO reservDTO = new ReservDTO();
		reservDTO.setReservation_no(request.getParameter("reservation_no"));
		// System.err.println(request.getParameter("detail_no")); //ok
		JSONObject json = new JSONObject();

//			if ((String)request.getParameter("searchValue") != null) {
		List<ReservDTO> reservDetail = reservService.reservUpdate(reservDTO); // reservationview에서 가져옴
		JSONArray jsonA = new JSONArray(reservDetail);
		json.put("result", reservDetail);
		// System.err.println("jsonA:"+jsonA); //ok //reservation_no없음(pet 테이블엔 ~컬럼이
		// 없으니까)
		// System.out.println(jsonA.getJSONObject(0).getString("reserv_time")); //ok

		// 시간막기
		reservDTO.setReservation_date_day(request.getParameter("reservation_date_day"));
		System.err.println("reservation_date_day:" + request.getParameter("reservation_date_day"));
		List<ReservDTO> timeDetail = reservService.reservTimeCheck(reservDTO);
		jsonA = new JSONArray(timeDetail);
		json.put("result1", timeDetail);

		return json.toString();
	}

	// 예약수정 완료
	@ResponseBody
	@PostMapping(value = "reservUpdateSaved", produces = "application/json;charset=UTF-8")
	public String reservUpdateSaved(HttpServletRequest request) {

		ReservDTO reservDTO = new ReservDTO();
		reservDTO.setUpdate_reservation_date(request.getParameter("update_reservation_date"));
		reservDTO.setUpdate_reservation_memo(request.getParameter("update_reservation_memo"));
		reservDTO.setUpdate_reservation_no(request.getParameter("update_reservation_no"));
		int result = reservService.reservUpdateSaved(reservDTO);
		// System.out.println(request.getParameter("update_reservation_no"));

		JSONObject json = new JSONObject();
		json.put("result", result);
		return json.toString();
	}

	// 예약삭제
	@GetMapping("reservDelete")
	public String reservDelete(HttpServletRequest request) {

		ReservDTO reservDTO = new ReservDTO();
		reservDTO.setDelete_reservation_no(request.getParameter("delete_reservation_no"));
		int result = reservService.delete_reservation_no(reservDTO);

		return "redirect:reserv";
	}

	// 예약에서 접수버튼 (접수테이블에 저장)
	@ResponseBody
	@PostMapping("receiveAdd")
	public String receiveAdd(HttpServletRequest request) {
		ReservDTO reservDTO = new ReservDTO();
		String reservNo = request.getParameter("reservNo"); // reservation_date 변수에 매개변수 값 할당

		HttpSession session = request.getSession();
		reservDTO.setStaff_id((String) session.getAttribute("id"));

		reservDTO.setReservNo(reservNo); // dto의 속성 값 설정
		reservDTO.setReceive_petNo(request.getParameter("receive_petNo"));
		reservDTO.setReceive_ownerNo(request.getParameter("receive_ownerNo"));
//		reservDTO.setReservation_Yn(request.getParameter("reservation_Yn"));
		JSONObject json = new JSONObject();

		int result = reservService.receiveAdd(reservDTO);
		result = reservService.receiveAdd_reservYn(reservDTO);
		json.put("result", result);

		return json.toString();
	}

	// 검색에서 접수버튼 (접수테이블에 저장)
	@ResponseBody
	@PostMapping("search_receiveAdd")
	public String search_receiveAdd(HttpServletRequest request) {
		ReservDTO reservDTO = new ReservDTO();

		HttpSession session = request.getSession();
		reservDTO.setStaff_id((String) session.getAttribute("id"));

		JSONObject json = new JSONObject();
		
		reservDTO.setSearch_petNo(request.getParameter("search_petNo"));
		reservDTO.setSearch_ownerNo(request.getParameter("search_ownerNo"));
		System.err.println(request.getParameter("search_ownerNo")); //안들어옴

		int result = reservService.search_receiveAdd(reservDTO);
		json.put("result", result);
		return json.toString();
	}

	// 접수삭제
	@GetMapping("receiveDelete")
	public String receiveDelete(HttpServletRequest request) {
		System.out.println("컨트롤러 입성");
		System.out.println(request.getParameter("delete_receive_no"));

		ReservDTO reservDTO = new ReservDTO();
		reservDTO.setDelete_receive_no(request.getParameter("delete_receive_no"));
		int result = reservService.receiveDelete(reservDTO);
		System.out.println("삭제 처리결과는 : " + result);
		return "redirect:reserv";
	}

	
	@GetMapping("/reservlist_calender")
	@ResponseBody
	public String getEvents(@RequestParam("date1") String date1) {
		ReservDTO reservDTO = new ReservDTO();
		JSONObject json = new JSONObject();
	    // date를 기반으로 이벤트 정보를 가져오는 코드 작성
		List<ReservDTO> events = reservService.reservlist_calender(reservDTO);
		JSONArray jsonA = new JSONArray(events);
		json.put("result", events);
		System.out.println(events);
//		return events;
		return json.toString();
	}
	
	@GetMapping("/calender_sm")
	public ModelAndView calender_sm() {
		ReservDTO reservDTO = new ReservDTO();
		ModelAndView mv = new ModelAndView("reservation/calender_sm");
		// 예약 리스트
		List<ReservDTO> reservlist = reservService.reservlist_calender(reservDTO);
		mv.addObject("reservlist", reservlist);
		
		return mv;
	}
	
//	@GetMapping("/calender_sm")
//	public String calender_sm() {
//		
//		return "/reservation/calender_sm";
//	}

}
