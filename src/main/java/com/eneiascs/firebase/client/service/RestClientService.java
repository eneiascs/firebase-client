package com.eneiascs.firebase.client.service;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.web.client.RestClientException;

import com.eneiascs.firebase.client.domain.dto.RegistrationDTO;
import com.eneiascs.firebase.client.domain.dto.TopicDTO;

public interface RestClientService {

	RegistrationDTO register(RegistrationDTO registration) throws RestClientException, URISyntaxException;

	List<TopicDTO> getTopics();

}
