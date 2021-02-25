(async function() {
	const documentUrl = 'https://chamaileon-sdk.github.io/example-jsons/jsons/business-promo.json'

	const chamaileonPlugins = await initChamaileonSdk()

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	const exampleJsonTextArea = document.getElementById('exampleJson')

	exampleJsonTextArea.value = JSON.stringify(documentJson)

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = async () => {
		const documentJson = JSON.parse(exampleJsonTextArea.value)

		documentJson.title = 'demo'

		const variableEditor = await chamaileonPlugins.editVariables({
			document: documentJson,
			hooks: {
				onButtonClicked: ({ buttonId }) => {
					if (buttonId === 'close') {
						variableEditor.close()
					}
				}
			},
			buttons: {
				header: {
					left: [{
						id: 'close',
						icon: 'arrow_back'
					}],
					right: [
						{
							id: 'next',
							label: 'Next'
						}
					]
				},
				footer: {
					left: [
						{
							id: 'prev',
							label: 'Prev'
						}
					]
				}
			},
			container: document.body
		})
	}
}())