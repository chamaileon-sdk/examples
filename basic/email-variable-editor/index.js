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
				},
				onEditImage: async (params) => {
					console.log(params)
					return { src: 'https://www.freelogodesign.org/Content/img/logo-samples/flooop.png' }
				},
				onTextInsertPluginButtonClicked: async (params) => {
					console.log(params)
				}
			},
			buttons: {
				textInsertPluginButtons: [
					{
						id: 'merge-tags',
						label: 'Merge Tags',
						icon: 'https://raw.githubusercontent.com/ckeditor/ckeditor4/major/skins/kama/icons/paste.png'
					}
				],
				header: {
					left: [
						{
							id: 'close',
							icon: 'arrow_back'
						}
					]
				},
				footer: {
					left: [
						{
							id: 'prev',
							label: 'Prev'
						}
					],
					right: [
						{
							id: 'next',
							label: 'Next'
						}
					]
				}
			},
			container: document.body
		})
	}
}())