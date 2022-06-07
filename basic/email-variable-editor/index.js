(async function() {
	const documentUrl = './layout1.json'

	const chamaileonPlugins = await initChamaileonSdk()

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	const exampleJsonTextArea = document.getElementById('exampleJson')

	exampleJsonTextArea.value = JSON.stringify(documentJson)

	const variableEditorInstance = await chamaileonPlugins.createFullscreenPlugin({
		plugin: 'variable-editor',
		data: { document: {} },
		settings: {
			variablesToEdit: ['primaryColor', 'logo'],
			buttons: {
				textInsertPlugin: [
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
							icon: 'arrow-left',
							color: '#000',
						}
					]
				},
				footer: {
					left: [
						{
							id: 'prev',
							label: 'Prev',
							color: '#000',
							style: 'outlined'
						}
					],
					right: [
						{
							id: 'next',
							label: 'Next',
							color: '#000',
							style: 'outlined'
						}
					]
				}
			}
		},
		hooks: {
			onButtonClicked: async ({ buttonId }) => {
				if (buttonId === 'close') {
					const newJson = await variableEditorInstance.methods.getDocument()
					exampleJsonTextArea.value = JSON.stringify(newJson)
					variableEditorInstance.hide()
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
		}
	})

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'
	showExampleButton.onclick = async () => {
		const documentJson = JSON.parse(exampleJsonTextArea.value)

		documentJson.title = 'demo'

		variableEditorInstance.showSplashScreen()
		variableEditorInstance.show()
		await variableEditorInstance.methods.updateData({ document: documentJson })
		variableEditorInstance.hideSplashScreen()
	}
}())
