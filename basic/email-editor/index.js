(async function() {
	const documentUrl = 'https://chamaileon-sdk.github.io/example-jsons/jsons/business-promo.json'

	const chamaileonPlugins = await initChamaileonSdk()

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	const exampleJsonTextArea = document.getElementById('exampleJson')

	exampleJsonTextArea.value = JSON.stringify(documentJson)

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = () => {
		const documentJson = JSON.parse(exampleJsonTextArea.value)

		documentJson.title = 'demo'

		chamaileonPlugins.editEmail({
			document: documentJson,
			settings: {
				elements: {
					content: {
						text: true,
						image: true,
						button: true,
						social: true,
						divider: true,
						code: true
					},
					structure: {
						box: true,
						multiColumn: true
					},
					advanced: {
						loop: true,
						conditional: true,
						dynamicImage: true
					}
				},
				addons: {
					blockLock: {
						enabled: true,
					},
					variableSystem: {
						enabled: true
					}
				}
			},
			hooks: {
				onSave: ({ document }) => {
					exampleJsonTextArea.value = JSON.stringify(document)
				},
				onAutoSave: (params) => {
					alert(JSON.stringify(params))
				},
				onDropdownButtonClicked: (params) => {
					alert(JSON.stringify(params))
				}
			}
		})
	}
}())