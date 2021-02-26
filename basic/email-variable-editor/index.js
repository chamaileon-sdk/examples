(async function() {
	const documentUrl = './layout1.json'

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
				onButtonClicked: async ({ buttonId }) => {
					if (buttonId === 'close') {
						const newJson = await variableEditor.getJson()
						exampleJsonTextArea.value = JSON.stringify(newJson)
						variableEditor.close()
					} else {
						alert(`${buttonId} clicked.`)
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