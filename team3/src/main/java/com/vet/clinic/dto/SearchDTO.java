package com.vet.clinic.dto;

import lombok.Data;

@Data
public class SearchDTO {

	private String search_name, search_value, toDate, fromDate, todayDate; // 검색
	private String table, category;
}
