(async function() {
	const documentUrl = 'https://chamaileon-sdk.github.io/example-jsons/jsons/business-promo.json'

	const chamaileonPlugins = await initChamaileonSdk()

	const documentResponse = await fetch(documentUrl, { method: 'GET' })
	const documentJson = await documentResponse.json()

	const exampleJsonTextArea = document.getElementById('exampleJson')

	exampleJsonTextArea.value = JSON.stringify(documentJson)

	const showExampleButton = document.getElementById('showExample')
	showExampleButton.style.display = 'inline-block'

	async function showGallery() {
		const galleryModal = document.getElementById('gallery-modal')
		galleryModal.style.zIndex = 11
		galleryModal.classList.add('visible')

		function closeGalleryModal() {
			galleryModal.classList.remove('visible')

			setTimeout(() => {
				galleryModal.style.zIndex = -1
			}, 500)
		}

		return new Promise((resolve) => {
			document.getElementById('gallery-modal-close').onclick = () => {
				resolve({ src: null }) // don't insert anything
				closeGalleryModal()
			}

			const img1 = document.getElementById('gallery-modal-img1')
			const img2 = document.getElementById('gallery-modal-img2')
			const img3 = document.getElementById('gallery-modal-img3')

			img1.onclick = () => {
				resolve({ src: img1.src })
				closeGalleryModal()
			}

			img2.onclick = () => {
				resolve({ src: img2.src })
				closeGalleryModal()
			}

			img3.onclick = () => {
				resolve({ src: img3.src })
				closeGalleryModal()
			}
		})
	}

	showExampleButton.onclick = () => {
		const documentJson = JSON.parse(exampleJsonTextArea.value)

		documentJson.title = 'demo'

		chamaileonPlugins.editEmail({
			document: documentJson,
			hooks: {
				onSave: (params) => {
					console.log(param)
					exampleJsonTextArea.value = JSON.stringify(params.emailJson)
				},
				onEditImage: showGallery,
				onEditBackgroundImage: showGallery,
			}
		})
	}
}())