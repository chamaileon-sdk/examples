(async function() {
	const documentUrl = './example.html'

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const html = await documentResponse.text()

	const exampleHtmlTextArea = document.getElementById('emailHtml')
	const outputJsonTextArea = document.getElementById('outputJson')

	exampleHtmlTextArea.value = html

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = async () => {
		const documentHtml = exampleHtmlTextArea.value

		const demoSettings = JSON.parse(localStorage.getItem('chamaileonSdkDemoSettings'))
		const apiKey = demoSettings.apiKey

		outputJsonTextArea.value = 'HTML import is a complicated process, it might take a while...'

		const importRequest = await fetch('https://sdk-api.staging.chamaileon.io/api/v1/emails/import', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				html: documentHtml
			})
		})

		if (!importRequest.ok) {
			throw new Error("Auth error")
		}

		const response = await importRequest.json()

		if (response.result.success) {
			outputJsonTextArea.value = JSON.stringify(response.result.document)
		} else {
			outputJsonTextArea.value = JSON.stringify(response.result)
		}
	}
}())
