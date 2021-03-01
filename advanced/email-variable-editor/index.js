(async function() {
	let chamaileonPlugins = null
	let layoutProp = "layout1"
	let contentProp = "content1"
	
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
	
	async function loadVariableEditor() {
		const actContent = content[contentProp]
		const actLayout = layouts[layoutProp]
	
		const footerButtons = {
			left: [],
			right: []
		}
	
		const prevButton = { id: 'prev', label: 'Prev' }
		const nextButton = { id: 'next', label: 'Next' }
		const finishButton = { id: 'finish', label: 'Finish' }
	
		if (contentProp === 'content1') {
			footerButtons.right.push(nextButton)
		} else if (contentProp === 'content2') {
			footerButtons.left.push(prevButton)
			footerButtons.right.push(nextButton)
		} else if (contentProp === 'content3') {
			footerButtons.left.push(prevButton)
			footerButtons.right.push(finishButton)
		}
	
		const variableEditor = await chamaileonPlugins.editVariables({
			document: {
				title: 'demo',
				variables: [
					primaryColor,
					logo,
					...actContent
				],
				body: actLayout.body
			},
			hooks: {
				onButtonClicked: async ({ buttonId }) => {
					const timeout = 500;
					const actJson = await variableEditor.getDocument()
					if (buttonId === 'close') {
						variableEditor.close()
					}

					logo.value = actJson.variables.find(e => e.name === "logo").value
					primaryColor.value = actJson.variables.find(e => e.name === "primaryColor").value
					
					content[contentProp][0].value = actJson.variables.find(e => e.name === "heroText").value
					content[contentProp][1].value = actJson.variables.find(e => e.name === "buttonText").value
					content[contentProp][2].value = actJson.variables.find(e => e.name === "buttonLink").value
	
					if (buttonId === 'swap-layout') {
						if (layoutProp === 'layout1') {
							layoutProp = 'layout2'
						} else {
							layoutProp = 'layout1'
						}
	
						variableEditor.close()
						setTimeout(() => {
							loadVariableEditor()
						}, timeout);
					}
	
					if (buttonId === 'next') {
						if (contentProp === 'content1') {
							contentProp = 'content2'
						} else if (contentProp === 'content2') {
							contentProp = 'content3'
						}
	
						variableEditor.close()
						setTimeout(() => {
							loadVariableEditor()
						}, timeout);
					}
	
					if (buttonId === 'prev') {
						if (contentProp === 'content2') {
							contentProp = 'content1'
						} else if (contentProp === 'content3') {
							contentProp = 'content2'
						}
	
						variableEditor.close()
						setTimeout(() => {
							loadVariableEditor()
						}, timeout);
					}

					if (buttonId === 'finish') {
						updateThumbnails(0.5)
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
					right: [{
						id: 'swap-layout',
						label: 'Swap Layout'
					}]
				},
				footer: footerButtons
			},
			container: document.body
		})
	}

	function updateThumbnails(scale) {
		const thumb1 = document.getElementById('thumbnail1')
		const thumb2 = document.getElementById('thumbnail2')
		const thumb3 = document.getElementById('thumbnail3')

		thumb1.innerHTML = ''
		thumb2.innerHTML = ''
		thumb3.innerHTML = ''

		chamaileonPlugins.createThumbnail({
			document: {
				variables: [
					primaryColor,
					logo,
					...content.content1
				],
				body: {
					...layouts[layoutProp].body
				}
			},
			width: 640,
			height: 480,
			scale,
			scroll: false,
			container: thumb1
		})

		chamaileonPlugins.createThumbnail({
			document: {
				variables: [
					primaryColor,
					logo,
					...content.content2
				],
				body: {
					...layouts[layoutProp].body
				}
			},
			width: 640,
			height: 480,
			scale,
			scroll: false,
			container: thumb2
		})

		chamaileonPlugins.createThumbnail({
			document: {
				variables: [
					primaryColor,
					logo,
					...content.content3
				],
				body: {
					...layouts[layoutProp].body
				}
			},
			width: 640,
			height: 480,
			scale,
			scroll: false,
			container: thumb3
		})
	}
	
	async function main() {
		chamaileonPlugins = await initChamaileonSdk()
	
		let documentResponse = await fetch('./layout1.json', { method: 'GET' })
		layouts.layout1 = await documentResponse.json()
	
		documentResponse = await fetch('./layout2.json', { method: 'GET' })
		layouts.layout2 = await documentResponse.json()

		updateThumbnails(0.5)
	
		const showExampleButton = document.getElementById('showExample')
		showExampleButton.style.display = 'inline-block'
		showExampleButton.onclick = async () => {
			loadVariableEditor()
		}
	}

	main()
}())
