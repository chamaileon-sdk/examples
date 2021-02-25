(async function() {
	const documentUrl = 'https://chamaileon-sdk.github.io/example-jsons/jsons/business-promo.json'

	const chamaileonPlugins = await initChamaileonSdk()

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	document.getElementById('exampleJson').value = JSON.stringify(documentJson)

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = () => {
		const thumbnail = document.getElementById('thumbnail')
		thumbnail.style.display = 'block'

		thumbnail.innerHTML = ''

		const documentJson = JSON.parse(document.getElementById('exampleJson').value)

		chamaileonPlugins.createThumbnail({
			document: documentJson.body,
			width: 640,
			height: 480,
			scale: 1,
			scroll: false,
			container: thumbnail
		})
	}
}())