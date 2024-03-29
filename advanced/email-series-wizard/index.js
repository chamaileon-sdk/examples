(async function() {
	let chamaileonPlugins = null
	let layoutProp = "layout1"
	let contentProp = "content1"
	let editMode = "content" // other value: "colorsAndLogo"

	const layouts = {
		layout1: null,
		layout2: null
	}

	const primaryColor = {
		"type":"color",
		"name":"primaryColor",
		"value":"#00bee6",
	}

	const logo = {
		"type":"image",
		"name":"logo",
		"value":"https://chamaileon.io/wp-content/uploads/2020/02/Chamaileon-Logo-e1582208205164.png"
	}

	const content = {
		content1: [
			{
				"type":"text",
				"name":"heroText",
				"value":"<h1>Hello %%firstname%%</h1><p>Thank you for your registration at Chamaileon! There is one final step left:</p>"
			},
			{
				"type":"text",
				"name":"buttonText",
				"value":"Confirm Registration"
			},
			{
				"type":"link",
				"name":"buttonLink",
				"value":"https://example.com"
			}
		],
		content2: [
			{
				"type":"text",
				"name":"heroText",
				"value":"<h1>Hello %%firstname%%</h1><p>Have you forgotten your password?</p>"
			},
			{
				"type":"text",
				"name":"buttonText",
				"value":"Reset Password"
			},
			{
				"type":"link",
				"name":"buttonLink",
				"value":"https://example.com"
			}
		],
		content3: [
			{
				"type":"text",
				"name":"heroText",
				"value":"<h1>Hello %%firstname%%</h1><p>%%inviter%% has invited you to their workspace. Happy collaboration!</p>"
			},
			{
				"type":"text",
				"name":"buttonText",
				"value":"Accept Invitation"
			},
			{
				"type":"link",
				"name":"buttonLink",
				"value":"https://example.com"
			}
		]
	}

	function createActDocument() {
		let title = 'demo'

		if (editMode === 'content') {
			if (contentProp === 'content1') {
				title = 'Confirm Registration'
			} else if (contentProp === 'content2') {
				title = 'Forgot Password'
			} else if (contentProp === 'content3') {
				title = 'Accept Invitation'
			}
		} else {
			title = 'Set Colors & Logo'
		}

		const actContent = content[contentProp]
		const actLayout = layouts[layoutProp]

		const document = {
			title,
			variables: [
				primaryColor,
				logo,
				...actContent
			],
			body: actLayout.body
		}

		return document
	}

	function createActSettings() {
		let variablesToEdit = []

		const buttons = {
			header: {
				left: [{
					id: 'close',
					icon: 'arrow-left',
					color: '#000',
				}],
				right: []
			},
			footer: {
				left: [],
				right: []
			}
		}

		const prevButton = { id: 'prev', label: 'Prev', color: '#000', style: 'outlined' }
		const nextButton = { id: 'next', label: 'Next', color: '#000', style: 'outlined' }
		const finishButton = { id: 'finish', label: 'Finish', color: '#000', style: 'outlined' }

		const changeColorsAndLogoButton = { id: 'change-colors-and-logo', label: 'Change Colors & Logo', color: '#000', style: 'outlined' }
		const swapLayoutButton = { id: 'swap-layout', label: 'Swap Layout', color: '#000', style: 'outlined' }

		const okButton = { id: 'ok', label: 'Ok' }
		const cancelButton = { id: 'cancel', label: 'Cancel' }


		if (editMode === 'content') {
			variablesToEdit = ['heroText', 'buttonText', 'buttonLink']

			buttons.header.right = [changeColorsAndLogoButton, swapLayoutButton]

			if (contentProp === 'content1') {
				buttons.footer.right.push(nextButton)
			} else if (contentProp === 'content2') {
				buttons.footer.left.push(prevButton)
				buttons.footer.right.push(nextButton)
			} else if (contentProp === 'content3') {
				buttons.footer.left.push(prevButton)
				buttons.footer.right.push(finishButton)
			}
		} else { // editMode === 'colorsAndLogo'
			variablesToEdit = ['primaryColor', 'logo']

			buttons.footer.left.push(cancelButton)
			buttons.footer.right.push(okButton)
		}


		const settings = {
			variablesToEdit,
			buttons
		}

		return settings
	}

	let thumbnailInstance1
	let thumbnailInstance2
	let thumbnailInstance3
	async function initThumbnails() {
		const thumb1 = document.getElementById('thumbnail1')
		const thumb2 = document.getElementById('thumbnail2')
		const thumb3 = document.getElementById('thumbnail3')

		thumbnailInstance1 = await chamaileonPlugins.createInlinePlugin({
			plugin: 'thumbnail',
			data: {
				document: {
					variables: [
						primaryColor,
						logo,
						...content.content1
					],
					body: {
						...layouts[layoutProp].body
					}
				}
			},
			settings: {
				scroll: false
			}
		}, {
			container: thumb1,
			dimensions: {
				width: 640,
				height: 480,
				scale: 0.5,
			}
		})

		thumbnailInstance2 = await chamaileonPlugins.createInlinePlugin({
			plugin: 'thumbnail',
			data: {
				document: {
					variables: [
						primaryColor,
						logo,
						...content.content2
					],
					body: {
						...layouts[layoutProp].body
					}
				}
			},
			settings: {
				scroll: false
			}
		}, {
			container: thumb2,
			dimensions: {
				width: 640,
				height: 480,
				scale: 0.5,
			}
		})

		thumbnailInstance3 = await chamaileonPlugins.createInlinePlugin({
			plugin: 'thumbnail',
			data: {
				document: {
					variables: [
						primaryColor,
						logo,
						...content.content3
					],
					body: {
						...layouts[layoutProp].body
					}
				}
			},
			settings: {
				scroll: false
			}
		}, {
			container: thumb3,
			dimensions: {
				width: 640,
				height: 480,
				scale: 0.5,
			}
		})
	}

	function updateThumbnails() {
		thumbnailInstance1.methods.updateData({
			document: {
				variables: [
					primaryColor,
					logo,
					...content.content1
				],
				body: {
					...layouts[layoutProp].body
				}
			}
		})

		thumbnailInstance2.methods.updateData({
			document: {
				variables: [
					primaryColor,
					logo,
					...content.content2
				],
				body: {
					...layouts[layoutProp].body
				}
			}
		})

		thumbnailInstance3.methods.updateData({
			document: {
				variables: [
					primaryColor,
					logo,
					...content.content3
				],
				body: {
					...layouts[layoutProp].body
				}
			}
		})
	}

	async function onButtonClickedContentState({ buttonId }) {
		const actJson = await variableEditorInstance.methods.getDocument()

		content[contentProp][0].value = actJson.variables.find(e => e.name === "heroText").value
		content[contentProp][1].value = actJson.variables.find(e => e.name === "buttonText").value
		content[contentProp][2].value = actJson.variables.find(e => e.name === "buttonLink").value

		if (buttonId === 'close') {
			variableEditorInstance.hide()

			contentProp = "content1"
			editMode = "content"

			return
		}

		if (buttonId === 'finish') {
			updateThumbnails()
			variableEditorInstance.hide()

			contentProp = "content1"
			editMode = "content"

			return
		}

		if (buttonId === 'change-colors-and-logo') {
			editMode = 'colorsAndLogo'
		} else if (buttonId === 'swap-layout') {
			if (layoutProp === 'layout1') {
				layoutProp = 'layout2'
			} else {
				layoutProp = 'layout1'
			}
		} else if (buttonId === 'next') {
			if (contentProp === 'content1') {
				contentProp = 'content2'
			} else if (contentProp === 'content2') {
				contentProp = 'content3'
			}
		} else if (buttonId === 'prev') {
			if (contentProp === 'content2') {
				contentProp = 'content1'
			} else if (contentProp === 'content3') {
				contentProp = 'content2'
			}
		}
	}

	async function onButtonClickedColorsState({ buttonId }) {
		if (buttonId === 'ok') {
			const actJson = await variableEditorInstance.methods.getDocument()

			logo.value = actJson.variables.find(e => e.name === "logo").value
			primaryColor.value = actJson.variables.find(e => e.name === "primaryColor").value
		}

		editMode = 'content'
	}

	chamaileonPlugins = await initChamaileonSdk()

	let documentResponse = await fetch('./layout1.json', { method: 'GET' })
	layouts.layout1 = await documentResponse.json()

	documentResponse = await fetch('./layout2.json', { method: 'GET' })
	layouts.layout2 = await documentResponse.json()

	const variableEditorInstance = await chamaileonPlugins.createFullscreenPlugin({
		plugin: 'variable-editor',
		data: { document: {} },
		settings: {},
		hooks: {
			onButtonClicked: async ({ buttonId }) => {
				if (editMode === 'content') {
					await onButtonClickedContentState({ buttonId })
				} else if (editMode === 'colorsAndLogo') {
					await onButtonClickedColorsState({ buttonId })
				}

				variableEditorInstance.methods.updateData({ document: createActDocument() })
				variableEditorInstance.methods.updateSettings(createActSettings())
			}
		}
	})

	async function main() {
		initThumbnails(0.5)

		const showExampleButton = document.getElementById('showExample')
		showExampleButton.style.display = 'inline-block'
		showExampleButton.onclick = async () => {
			variableEditorInstance.methods.updateData({ document: createActDocument() })
			variableEditorInstance.methods.updateSettings(createActSettings())
			variableEditorInstance.show()
		}
	}

	main()
}())
