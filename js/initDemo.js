const localStorageKey = 'chamaileonSdkDemoSettings'

document.getElementById('logo').appendChild(chamaileonLogo({ withText: true }))
document.getElementById('nav-logo').appendChild(chamaileonLogo())

function createSettingsSection() {
	const settingsSection = document.createElement('section');
	settingsSection.id = 'settings'
	settingsSection.innerHTML = `<h1>SDK Settings</h1>

	<p>TODO description</p>

	<div class="settings-input">
		<label for="apiKey">API Key</label>
		<input id="apiKey" />
	</div>
	<div class="settings-input">
		<label for="splashScreenUrl">Splash Screen URL</label>
		<input id="splashScreenUrl" />
	</div>
	<div class="settings-input">
		<label for="createLogoJsUrl">Create Logo JS URL</label>
		<input id="createLogoJsUrl" />
	</div>
	<div class="settings-input">
		<label for="primaryColor">Primary Color (hexa code)</label>
		<input id="primaryColor" />
	</div>
	<div class="settings-input">
		<button id="settings-save">Save Settings</button>
	</div>`

	const main = document.getElementById('main')
	main.parentNode.insertBefore(settingsSection, main.nextSibling)
}

function openSettings() {
	document.getElementById('main').style.display = 'none'
	document.getElementById('settings-button').style.display = 'none'
	document.getElementById('settings').style.display = 'block'

	const splashScreenDefault = 'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/splashScreen.html'
	const createLogoDefault = 'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js'
	const primaryColorDefault = '#2D3291'

	let demoSettings = JSON.parse(localStorage.getItem(localStorageKey))

	if (!demoSettings) {
		demoSettings = {
			apiKey: '',
			splashScreenUrl: splashScreenDefault,
			createLogoJsUrl: createLogoDefault,
			primaryColor: primaryColorDefault
		}

		localStorage.setItem(localStorageKey, JSON.stringify(demoSettings))
	}

	document.getElementById('apiKey').value = demoSettings.apiKey
	document.getElementById('splashScreenUrl').value = demoSettings.splashScreenUrl
	document.getElementById('createLogoJsUrl').value = demoSettings.createLogoJsUrl
	document.getElementById('primaryColor').value = demoSettings.primaryColor
}

function saveSettings() {
	const apiKey = document.getElementById('apiKey').value
	const splashScreenUrl = document.getElementById('splashScreenUrl').value
	const createLogoJsUrl = document.getElementById('createLogoJsUrl').value
	const primaryColor = document.getElementById('primaryColor').value

	const demoSettings = {
		apiKey,
		splashScreenUrl,
		createLogoJsUrl,
		primaryColor
	}

	localStorage.setItem(localStorageKey, JSON.stringify(demoSettings))

	location.reload()
}

createSettingsSection();
setTimeout(() => {
	document.getElementById('settings-button').onclick = openSettings
	document.getElementById('settings-save').onclick = saveSettings
}, 1)