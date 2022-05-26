(async function() {
	const documentUrl = 'https://chamaileon-sdk.github.io/example-jsons/jsons/business-promo.json'

	const chamaileonPlugins = await initChamaileonSdk()

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	const exampleJsonTextArea = document.getElementById('exampleJson')

	exampleJsonTextArea.value = JSON.stringify(documentJson)

	const previewInstance = await chamaileonPlugins.createFullscreenPlugin({
		plugin: 'preview',
		data: { document: {} },
		hooks: {
			close: () => {
				previewInstance.hide()
			}
		},
		settings: {}
	})

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = async () => {
		const documentJson = JSON.parse(exampleJsonTextArea.value)
		documentJson.title = 'demo'

		previewInstance.showSplashScreen()
		previewInstance.show()
		await previewInstance.methods.updateData({ document: documentJson })
		previewInstance.hideSplashScreen()
	}
}())