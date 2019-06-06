package com.eneiascs.firebase.client.domain.dto;

import java.util.List;

public class RegistrationDTO {
	private String token;
	private List<String> topics;
	
	
	public RegistrationDTO() {
		super();
	}
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public List<String> getTopics() {
		return topics;
	}
	public void setTopics(List<String> topics) {
		this.topics = topics;
	}
	
}
