package com.eneiascs.firebase.client.controller;

import java.net.URISyntaxException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;

import com.eneiascs.firebase.client.domain.dto.RegistrationDTO;
import com.eneiascs.firebase.client.service.RestClientService;

@RestController
public class RegistrationController {
	@Resource
	private RestClientService restClientService;
	
	@PostMapping("/register")
	public  RegistrationDTO onRegistration(@RequestBody RegistrationDTO registration) throws RestClientException, URISyntaxException {
		return restClientService.register(registration);
	}
	@GetMapping("/topics")
	public List<String> topics() {
		
		return restClientService.getTopics();
	}
}
