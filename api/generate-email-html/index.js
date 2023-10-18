(async function() {
	const documentUrl = 'https://chamaileon-sdk.github.io/example-jsons/jsons/business-promo.json'

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	const exampleJsonTextArea = document.getElementById('exampleJson')
	const generatedHtmlTextArea = document.getElementById('generatedHtml')

	exampleJsonTextArea.value = JSON.stringify(documentJson)

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = async () => {
		const documentJson = JSON.parse(exampleJsonTextArea.value)
		documentJson.title = 'demo'

		const demoSettings = JSON.parse(localStorage.getItem('chamaileonSdkDemoSettings'))
		const apiKey = demoSettings.apiKey

		generatedHtmlTextArea.value = 'loading...'

		const genRequest = await fetch('https://sdk-api.chamaileon.io/api/v1/emails/generate', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				document: documentJson
			})
		})

		if (!genRequest.ok) {
			throw new Error("Auth error")
		}

		const response = await genRequest.json()

		generatedHtmlTextArea.value = response.result
	}
}())
