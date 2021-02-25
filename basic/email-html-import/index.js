(async function() {
	const chamaileonPlugins = await initChamaileonSdk()

	const exampleJsonTextArea = document.getElementById('exampleJson')

	const showExampleButton = document.getElementById('showExample')
	//showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = () => {
		chamaileonPlugins.openHtmlImport({
			container: document.getElementById('import'),
			hooks: {
				onImportFinished: (params) => {
					exampleJsonTextArea.value = JSON.stringify(params.mailJSON)
				}
			}
		})
	}
}())