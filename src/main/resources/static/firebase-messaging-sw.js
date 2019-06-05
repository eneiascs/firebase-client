importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


var firebaseConfig = {
	    messagingSenderId: "209298460869",
	  };
	  // Initialize Firebase
	  let defaultProject = firebase.initializeApp(firebaseConfig);
	  console.log(defaultProject);
	  var messaging = firebase.messaging();
	 

messaging.setBackgroundMessageHandler(function(payload) {
	  console.log('[firebase-messaging-sw.js] Received background message ', payload);
	  // Customize notification here
	  var notificationTitle = 'Background Message Title';
	  var notificationOptions = {
	    body: 'Background Message body.',
	    icon: '/firebase-logo.png'
	  };

	  return self.registration.showNotification(notificationTitle,
	    notificationOptions);
	});
