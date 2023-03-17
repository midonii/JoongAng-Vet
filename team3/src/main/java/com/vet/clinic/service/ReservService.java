package com.vet.clinic.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vet.clinic.dao.ReservDAO;
import com.vet.clinic.dto.ReservDTO;

@Service
public class ReservService {

	@Autowired
	private ReservDAO reservDAO;

	public List<ReservDTO> boardlist(ReservDTO reservDTO) {
		return reservDAO.boardlist(reservDTO);
	}

	public List<ReservDTO> searchlist(ReservDTO reservDTO) {
		return reservDAO.searchlist(reservDTO);
	}

	public List<ReservDTO> reservAjax(ReservDTO reservDTO) {
		return reservDAO.reservAjax(reservDTO);
	}

	public int reservAdd(ReservDTO reservDTO) {
		return reservDAO.reservAdd(reservDTO);
	}

	public List<ReservDTO> reservlist(ReservDTO reservDTO) {
		return reservDAO.reservlist(reservDTO);
	}

	public List<Map<String, Object>> indexReserv(Map<String, Object> map) {
		return reservDAO.indexReserv(map);
	}

	public List<ReservDTO> reservUpdate(ReservDTO reservDTO) {
		return reservDAO.reservUpdate(reservDTO);
	}


	public int reservUpdateSaved(ReservDTO reservDTO) {
		return reservDAO.reservUpdateSaved(reservDTO);
	}


	public int delete_reservation_no(ReservDTO reservDTO) {
		return reservDAO.delete_reservation_no(reservDTO);
	}


	public List<ReservDTO> receplist(ReservDTO reservDTO) {
		return reservDAO.receplist(reservDTO);
	}

	public List<Map<String, Object>> receivepay(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return reservDAO.receivepay(map);
	}

	public int receiveAdd(ReservDTO reservDTO) {
		return reservDAO.receiveAdd(reservDTO);
	}
}