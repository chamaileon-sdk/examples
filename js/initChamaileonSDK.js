async function fetchAccessToken({ apiKey }) {
	const accessTokenRequest = await fetch('https://sdk-api.staging.chamaileon.io/api/v1/tokens/generate', {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${apiKey}`,
		},
	})

	if (!accessTokenRequest.ok) {
		throw new Error("Auth error")
	}

	const accessTokenResponse = await accessTokenRequest.json()
	const accessToken = accessTokenResponse.result

	return accessToken
}

async function getAccessToken({ apiKey }) {
	let accessTokenCache = JSON.parse(localStorage.getItem('chamaileonSdkAccessTokenCache'))
	const now = new Date();

	if (!accessTokenCache || !accessTokenCache.accessToken || now - new Date(accessTokenCache.createdAt) > 3600000) {
		const accessToken = await fetchAccessToken({ apiKey })

		accessTokenCache = {
			accessToken,
			createdAt: now
		}

		localStorage.setItem('chamaileonSdkAccessTokenCache', JSON.stringify(accessTokenCache))
	}

	return accessTokenCache.accessToken
}

async function initChamaileonSdk() {
	const localStorageKey = 'chamaileonSdkDemoSettings'

	let demoSettings = JSON.parse(localStorage.getItem(localStorageKey))
	if (!demoSettings) {
		return openSettings()
	}

	try {
		const { apiKey, splashScreenUrl, createLogoJsUrl, primaryColor } = demoSettings
		const accessToken = await getAccessToken({ apiKey })

		const whitelabelConfig = {
			environmentName: "sdk-staging",
			locale: 'en',
			urls: {
				splashScreen: splashScreenUrl,
				createLogoJS: createLogoJsUrl,
			},
			colors: {
				'primary': primaryColor,
				'secondary': '#009f4a',
				'red': '#ff5546',
				'darkBlue': '#2d3291',
				'darkGreen': '#00af6e',
				'lightGreen': '#50d791',
				'weirdGreen': '#50d791',
				'pink': '#ff91a0',
				'yellow': '#ffd23c',
			}
		}

		const chamaileonPlugins = await window.chamaileonSdk({
			...whitelabelConfig,
			accessToken,
			getAccessToken: () => getAccessToken({ apiKey })
		})

		return chamaileonPlugins
	} catch(e) {
		alert('Authentication problem. Please check out your API key settings.')
		openSettings()
	}
}
