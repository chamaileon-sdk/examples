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
	
		if (contentProp === 'content1') {
			footerButtons.right.push(nextButton)
		} else if (contentProp === 'content2') {
			footerButtons.left.push(prevButton)
			footerButtons.right.push(nextButton)
		} else if (contentProp === 'content3') {
			footerButtons.left.push(prevButton)
		}
	
		const variableEditor = await chamaileonPlugins.previewVariableEmail({
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
					const actJson = await variableEditor.getJson()
					if (buttonId === 'close') {
						variableEditor.close()
					}
	
					if (buttonId === 'swap-layout') {
						if (layoutProp === 'layout1') {
							layoutProp = 'layout2'
						} else {
							layoutProp = 'layout1'
						}
	
						variableEditor.close()
						setTimeout(() => {
							loadVariableEditor()
						}, 1000);
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
						}, 1000);
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
						}, 1000);
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
	
	async function main() {
		chamaileonPlugins = await initChamaileonSdk()
	
		let documentResponse = await fetch('./layout1.json', { method: 'GET' })
		layouts.layout1 = await documentResponse.json()
	
		documentResponse = await fetch('./layout2.json', { method: 'GET' })
		layouts.layout2 = await documentResponse.json()
	
		const showExampleButton = document.getElementById('showExample')
		showExampleButton.style.display = 'inline-block'
		showExampleButton.onclick = async () => {
			loadVariableEditor()
		}
	}
}())
