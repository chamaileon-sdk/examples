(function() {
	const main = document.getElementById('main')
	const nav = document.createElement('nav')
	nav.id = 'nav'

	let baseUrl = '/'

	if (location.host === 'chamaileon-sdk.github.io') {
		baseUrl = 'https://chamaileon-sdk.github.io/examples/'
	}

	nav.innerHTML = `
		<ul>
			<li><a href="https://chamaileon.io/sdk/docs/" target="_blank">Read the Docs</a></li>
			<li>
				<a href="${baseUrl}basic/">Basic Examples</a>
				<ul>
					<li><a href="${baseUrl}basic/email-thumbnail/">Email Thumbnail</a></li>
					<li><a href="${baseUrl}basic/email-preview/">Email Preview</a></li>
					<li><a href="${baseUrl}basic/email-editor/">Email Editor</a></li>
					<li><a href="${baseUrl}basic/email-variable-editor/">Email Variable Editor</a></li>
					<!--<li><a href="${baseUrl}basic/email-html-import/">Email HTML Import</a></li>-->
					<li><a href="${baseUrl}basic/generate-email-html/">Generate Email HTML</a></li>
				</ul>
			</li>
			<li>
				<a href="${baseUrl}advanced/">Advanced Examples</a>
				<ul>
				<!--<li><a href="${baseUrl}advanced/email-editor/">Email Editor</a></li>-->
					<li><a href="${baseUrl}advanced/email-variable-editor/">Email Variable Editor</a></li>
				</ul>
			</li>
			<li>
				<a href="https://github.com/chamaileon-sdk/examples" target="_blank">View on Github</a>
			</li>
			<li>
				<a href="https://twitter.com/chamaileon_sdk" target="_blank">Follow us on Twitter for updates!</a>
			</li>
		</ul>
		<div id="nav-logo"></div>
	`
	main.insertBefore(nav, main.firstChild)
}())