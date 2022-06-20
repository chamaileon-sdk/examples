(async function() {
	const documentUrl = 'https://chamaileon-sdk.github.io/example-jsons/jsons/business-promo.json'

	const chamaileonPlugins = await initChamaileonSdk()

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	const exampleJsonTextArea = document.getElementById('exampleJson')

	exampleJsonTextArea.value = JSON.stringify(documentJson)

	const editorInstance = await chamaileonPlugins.createFullscreenPlugin({
		plugin: 'editor',
		data: { document: documentJson },
		settings: {
			addons: {
				blockLock: {
					enabled: true,
				},
				variableSystem: {
					enabled: true
				},
			},
		},
		hooks: {
			onSave: ({ document }) => {
				exampleJsonTextArea.value = JSON.stringify(document)
			},
			close: () => {
				editorInstance.hide()
			}
		}
	})

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = async () => {
		const documentJson = JSON.parse(exampleJsonTextArea.value)

		documentJson.title = 'demo'

		editorInstance.showSplashScreen()
		editorInstance.show()
		await editorInstance.methods.updateData({ document: documentJson })
		editorInstance.hideSplashScreen()
	}
}())
