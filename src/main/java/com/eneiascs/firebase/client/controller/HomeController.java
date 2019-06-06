package com.eneiascs.firebase.client.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eneiascs.firebase.client.service.RestClientService;

@Controller
@RequestMapping(value = "/")
public class HomeController {
	@Resource
	private RestClientService restClientService;
	
	@GetMapping("/index")
	public String index(Model model) {
		model.addAttribute("topics",restClientService.getTopics());
		return "index";
	}
	
}
