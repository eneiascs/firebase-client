package com.eneiascs.firebase.client.service.impl;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.eneiascs.firebase.client.domain.dto.RegistrationDTO;
import com.eneiascs.firebase.client.domain.dto.TopicDTO;
import com.eneiascs.firebase.client.service.RestClientService;

@Service
public class RestClientServiceImpl implements RestClientService {
	@Value( "${firebase.server.topics}" )
	private String topicsUrl;
	
	@Value( "${firebase.server.register}" )
	private String registerUrl;
	@Override
	public RegistrationDTO register(RegistrationDTO registration) throws RestClientException, URISyntaxException {
		RestTemplate restTemplate = new RestTemplate();
	     
	    ResponseEntity<RegistrationDTO> result = restTemplate.postForEntity(new URI(registerUrl), registration, RegistrationDTO.class);

		return result.getBody();
	}

	@Override
	public List<TopicDTO> getTopics() {
	     
	     
	    RestTemplate restTemplate = new RestTemplate();
	    ResponseEntity<List<TopicDTO>> response = restTemplate.exchange(
	    		topicsUrl,
	      HttpMethod.GET,
	      null,
	      new ParameterizedTypeReference<List<TopicDTO>>(){});
	    List<TopicDTO> topics = response.getBody();
	 
	  
		return topics;
	}

}
