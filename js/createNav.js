(function() {
	const main = document.getElementById('main')
	const nav = document.createElement('nav')
	nav.id = 'nav'
	nav.innerHTML = `
		<ul>
			<li>
				<a href="/basic">Basic Examples</a>
				<ul>
					<li><a href="/basic/email-thumbnail/">Email Thumbnail</a></li>
					<li><a href="/basic/email-preview/">Email Preview</a></li>
					<li><a href="/basic/email-editor/">Email Editor</a></li>
					<li><a href="/basic/email-variable-editor/">Email Variable Editor</a></li>
					<li><a href="/basic/email-html-import/">Email HTML Import</a></li>
				</ul>
			</li>
			<li>
				<a href="/variable-system/">Variable System</a>
			</li>
			<li>
				<a href="https://github.com/chamaileon-sdk/examples" target="_blank">View on Github</a>
			</li>
		</ul>
		<div id="nav-logo"></div>
	`
	main.insertBefore(nav, main.firstChild)
}())