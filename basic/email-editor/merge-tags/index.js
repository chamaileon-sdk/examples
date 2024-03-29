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
			buttons: {
				textInsert: [
					{
						id: 'merge-tags',
						label: 'Merge tags',
						icon: 'https://raw.githubusercontent.com/ckeditor/ckeditor4/major/skins/kama/icons/paste.png'
					}
				]
			},
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
			onTextInsertPluginButtonClicked: async ({buttonId}) => {
				if (buttonId !== 'merge-tags') { // this value depends on your configuration. You can configure multiple buttons.
					return { value: '' }
				}
				const mergeTagModal = document.getElementById('merge-tags-modal')
				mergeTagModal.style.zIndex = 2011
				mergeTagModal.classList.add('visible')

				function closeMergeTagModal() {
					mergeTagModal.classList.remove('visible')

					setTimeout(() => {
						mergeTagModal.style.zIndex = -1
					}, 500)
				}

				return new Promise((resolve) => {
					document.getElementById('merge-tags-modal-close').onclick = () => {
						resolve({ value: '' }) // don't insert anything
						closeMergeTagModal()
					}

					document.getElementById('merge-tags-modal-firstName').onclick = () => {
						resolve({ value: '%%first_name%%' })
						closeMergeTagModal()
					}

					document.getElementById('merge-tags-modal-lastName').onclick = () => {
						resolve({ value: '%%last_name%%' })
						closeMergeTagModal()
					}

					document.getElementById('merge-tags-modal-unsubscribe').onclick = () => {
						resolve({ value: '%%unsubscribe%%' })
						closeMergeTagModal()
					}
				})
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
