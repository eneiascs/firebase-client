const modelModule = (function(){
    
	class Registration {
    	constructor(token = "", topics = []){
    		this.token = token;
    		this.topics = topics;
    	}
    }
	
	const firebaseConfig = {
			    apiKey: "AIzaSyBxIfM84sCwYoA_PsMHBxaz5fYIoeMkhhs",
			    authDomain: "teste-9e939.firebaseapp.com",
			    databaseURL: "https://teste-9e939.firebaseio.com",
			    projectId: "teste-9e939",
			    storageBucket: "teste-9e939.appspot.com",
			    messagingSenderId: "209298460869",
			    appId: "1:209298460869:web:ae3c24e56f2f22bd"
			  };
	
	const publicKey = "BL-qI2lkyb42dOgceA-584yHSihSxSPcEyktaVowGIcx51DIv9TKDIn71zBHLZzO8w_RJWC9ckGLFFKcXxSv8-4";
	
	const registerUrl = '/register'; 
	
	
	let registration = new Registration();
	
    return {
        getRegistration: () => registration,
        setRegistration: (token, topics = []) => registration = new Registration(token, topics),
        getFirebaseConfig: () => firebaseConfig,
        getPublicKey: () => publicKey,
        getRegisterUrl: () => registerUrl
      
    }
})();


var viewModule = (function(){
    var DOMStrings = {
        message: 'message',
        notifications: 'notifications',
        topics: 'topics',
        register: 'register'
    };
   
    
    return {
      
        getDOMStrings: () => DOMStrings,
        displayMessage: (message) => document.getElementById(DOMStrings.message).textContent = message,
        displayNotification: (message) => {
        	let html = `<div><h3>${message}</h3></div>`
        		document.getElementById(DOMStrings.notifications).insertAdjacentHTML('beforeend',html);
        	alert(message);
			 	
        },
        getTopics: () => Array.from(document.getElementById(DOMStrings.topics).querySelectorAll("input:checked")).map(topic => topic.value),

    }
})();

const controller = (function (model, view){
	const setupEventListeners = () => {
		model.getRegistration().topics = view.getTopics();
		
		Array.from(document.getElementById(view.getDOMStrings().topics).querySelectorAll("input")).forEach(input => input.addEventListener('change', () => model.getRegistration().topics = view.getTopics()));
			
		
		document.getElementById(view.getDOMStrings().register).addEventListener('click', () => {
			register(model.getRegistration());
		});
	}
	const register = (registration) => {
		
		let ajax = new XMLHttpRequest();

		
		ajax.open("POST", model.getRegisterUrl(), true);
		ajax.setRequestHeader("Content-type", "application/json");

		ajax.send(JSON.stringify(registration));

	
		ajax.onreadystatechange = function() {
	  
			
			view.displayMessage(ajax.responseText);

		}	
	};
	
	const initFirebase = () => {
		  let defaultProject = firebase.initializeApp(model.getFirebaseConfig());
		  console.log(defaultProject);
		  let messaging = firebase.messaging();
		  messaging.usePublicVapidKey(model.getPublicKey());
		  
		  messaging.onTokenRefresh(function() {
			    messaging.getToken().then(function(refreshedToken) {
			      console.log('Token refreshed.');
				  view.displayMessage(`Token refreshed: ${refreshedToken}`);
				  model.getRegistration().token = currentToken;
				  register(model.getRegistration());

			     
			    }).catch(function(err) {
			      console.log('Unable to retrieve refreshed token ', err);
			      view.displayMessage('Unable to retrieve refreshed token ');
			 
			    });
			  });
			  
			messaging.onMessage(function(payload) {
				 
				view.displayNotification(`${payload.notification.title}: ${payload.notification.body}`);	
				 
				 console.log('Message received. ', payload);
				  
				});
			
			Notification.requestPermission().then(function(permission) {
				  if (permission === 'granted') {
					  view.displayMessage('Notification permission granted.');
					 console.log('Notification permission granted.');
				   
				    messaging.getToken().then(function(currentToken) {
				    	  if (currentToken) {
				    		  console.log(`Token: ${currentToken}`);
					    	  model.getRegistration().token = currentToken;
				    		  view.displayMessage(`Token: ${currentToken}`);
				    		  
				    	  } else {
				    	    console.log('No Instance ID token available. Request permission to generate one.');
				    	    view.displayMessage('No Instance ID token available. Request permission to generate one.');
				    	    
				    	  }
				    	}).catch(function(err) {
				    	  console.log('An error occurred while retrieving token. ', err);
				    	  view.displayMessage('An error occurred while retrieving token. ');
				    	  
				    	});

				    
				    
				    
				    
				  } else {
				    console.log('Unable to get permission to notify.');
				    view.displayMessage('Unable to get permission to notify.');
				  }
				 });	
			
		 
	}
	
	
	
	
	
	return {
        init: function(){
            setupEventListeners();
            initFirebase();
            console.log('Application has started');
        }
    }    

})(modelModule,viewModule);

controller.init();










