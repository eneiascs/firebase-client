package com.eneiascs.firebase.client.domain.dto;

public class TopicDTO {
	
	private String name;
	private String description;
	
	
	public TopicDTO() {
		super();
	}
	
	public TopicDTO(String description) {
		super();
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
