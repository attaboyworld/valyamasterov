


const scriptsInEvents = {

	async Registration_Event1(runtime, localVars)
	{
		var phone = document.getElementById('phoneInput');
		
		if (phone.value.length > 8) {
			phone.value = phone.value.substring(0, 8);
		}
	},

	async Registration_Event3(runtime, localVars)
	{
		var codeToInsert = `
		                var GTAGscript = document.createElement('script');
		                GTAGscript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MYP3XBSHW3';
		                GTAGscript.async = true;
		                document.head.appendChild(GTAGscript);
		
		                window.dataLayer = window.dataLayer || [];
		                function gtag() {
		                    window.dataLayer.push(arguments);
		                }
		                gtag('js', new Date());
		                gtag('config', 'G-MYP3XBSHW3');
		            `;
		
		            // Create a script element
		            var scriptElement = document.createElement('script');
		            scriptElement.textContent = codeToInsert;
		
		            // Append the script element to the head
		            document.head.appendChild(scriptElement);
	},

	async Registration_Event21(runtime, localVars)
	{
		gtag('event', 'ac_registration', {
		  'event_category': 'ac_game',
		  'event_label': 'ac_registration'
		});
	},

	async LoadingFix_Event2(runtime, localVars)
	{
		var codeToInsert = `
		                var GTAGscript = document.createElement('script');
		                GTAGscript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MYP3XBSHW3';
		                GTAGscript.async = true;
		                document.head.appendChild(GTAGscript);
		
		                window.dataLayer = window.dataLayer || [];
		                function gtag() {
		                    window.dataLayer.push(arguments);
		                }
		                gtag('js', new Date());
		                gtag('config', 'G-MYP3XBSHW3');
		            `;
		
		            // Create a script element
		            var scriptElement = document.createElement('script');
		            scriptElement.textContent = codeToInsert;
		
		            // Append the script element to the head
		            document.head.appendChild(scriptElement);
	},

	async LoadingFix_Event5(runtime, localVars)
	{
		gtag('event', 'ac_begin_game', {
		  'event_category': 'ac_game',
		  'event_label': 'ac_game'
		});
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

