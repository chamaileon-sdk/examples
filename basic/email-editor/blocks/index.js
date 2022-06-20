(async function() {
	const documentUrl = 'https://chamaileon-sdk.github.io/example-jsons/jsons/business-promo.json'

	const chamaileonPlugins = await initChamaileonSdk()

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	const exampleJsonTextArea = document.getElementById('exampleJson')
	const favoriteBlocksTextArea = document.getElementById('favoriteBlocks')

	exampleJsonTextArea.value = JSON.stringify(documentJson)

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'

	const emailBlocks = documentJson.body.children.map((block, idx ) => {
		return { _id: idx, title: `Block ${idx + 1}`, body: block }
	})

	const editorInstance = await chamaileonPlugins.createFullscreenPlugin({
		plugin: 'editor',
		data: { document: documentJson },
		settings: {
			buttons: {
				header: [
					{
						id: 'preview',
						type: 'button',
						icon: 'eye',
						label: 'Test Button',
						color: '#aaaaaa', // the button is "filled" with white
						style: 'text' // or filled
					},
					{
						icon: 'dog',
						label: 'Test Dropdown',
						color: "secondary",
						style: 'outlined',
						badge: false,
						items: [  // if any button has a items field will generate a dropdown button, and only the items get callbacks
							{
								id: "share-email",
								label: "Get shareable link",
								icon: "share",
							},
							{
								id: "send-test-email",
								label: "Send test email",
								icon: "email",
								onClick: "openVariableEditor",
							},
							{
								id: "request-review",
								label: "Request a review",
								icon: "comment-eye",
							},
						]
					}
				]
			},
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
			blockLibraries: [
				{
					id: 'email-blocks',
					label: 'Email\'s blocks',
					canDeleteBlock: false,
					canRenameBlock: false,
					canSaveBlock: false
				},
				{
					id: 'favorite-blocks',
					label: 'Favorite blocks',
					canDeleteBlock: true,
					canRenameBlock: true,
					canSaveBlock: true
				}
			],
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
			onLoadBlocks: async ({ libId }) => {
				if (libId === 'email-blocks') {
					return { blocks: emailBlocks }
				}

				return { blocks: favoriteBlocks }
			},
			onBlockSave: async ({ libId, block }) => {
				if (libId === 'email-blocks') {
					throw new Error('It is not allowed to save into this block library')
				}

				favoriteBlocks.push(block)

				console.log('fav blocks', favoriteBlocks)
				favoriteBlocksTextArea.value = JSON.stringify(favoriteBlocks)

				return { block } // resolve the block to instantly add it to the library in the editor.
			},
			onBlockRename: async ({ libId, block: { _id, title }}) => {
				if (libId === 'email-blocks') {
					throw new Error('You are not allowed to rename blocks in this block library.')
				}

				const blockToRename = favoriteBlocks.find(item => item._id === _id)
				blockToRename.title = title

				favoriteBlocksTextArea.value = JSON.stringify(favoriteBlocks)
			},
			onBlockDelete: async ({ libId, block: { _id }}) => {
				if (libId === 'email-blocks') {
					throw new Error('You are not allowed to delete from this block library.')
				}

				favoriteBlocks = favoriteBlocks.filter(item => item._id !== _id)

				favoriteBlocksTextArea.value = JSON.stringify(favoriteBlocks)
			},
			onHeaderButtonClicked: ({ buttonId }) => {
				alert(`${buttonId} clicked`)
			},
			close: () => {
				editorInstance.hide()
			}
		}
	})

	let favoriteBlocks = []

	showExampleButton.onclick = async () => {
		const documentJson = JSON.parse(exampleJsonTextArea.value)
		favoriteBlocks = JSON.parse(favoriteBlocksTextArea.value)

		documentJson.title = 'demo'

		editorInstance.showSplashScreen()
		editorInstance.show()
		await editorInstance.methods.updateData({ document: documentJson })
		editorInstance.hideSplashScreen()
	}
}())
