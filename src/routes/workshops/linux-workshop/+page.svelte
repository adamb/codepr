<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Linux Workshop"
	description="Defenestration Workshop: Installing Linux on Your PC. A free, hands-on workshop at Code Puerto Rico."
/>

<h1>Defenestration Workshop: Installing Linux on Your PC</h1>

<p class="subtitle">A free, hands-on workshop at Code Puerto Rico</p>

<section class="details">
	<div class="detail-card">
		<p><strong>Date:</strong> Tuesday, May 26, 2026 | 6:00 PM – 8:00 PM AST</p>
		<p><strong>Location:</strong> <a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></p>
		<p><strong>Cost:</strong> Free</p>
		<p><strong>Instructor:</strong> <a href="https://reala.io/about-us" target="_blank" rel="noopener">Owen</a></p>
	</div>
</section>

<section class="about">
	<h2>About This Workshop</h2>
	<p>Join <a href="https://reala.io/about-us" target="_blank" rel="noopener">Owen</a> for this free, hands-on, 2-hour workshop designed to help you take control of your computer and explore a third option beyond Windows or Mac. This event is ideal for people who want to become more technical but are unsure where to start.</p>
	<p>We will guide you through the process of installing Linux on your PC, covering steps like unlocking the BIOS, booting from a flash drive, installation, and a test drive. The focus is specifically on installing Linux on a PC, not a VM or macOS.</p>
</section>

<section class="prerequisites">
	<h2>What You'll Do</h2>
	<ul>
		<li>Learn why Linux is a powerful, free alternative to Windows and Mac.</li>
		<li>Unlock your PC's BIOS and configure it to boot from a flash drive.</li>
		<li>Walk through a full Linux installation step by step.</li>
		<li>Take your new Linux setup for a test drive.</li>
	</ul>

	<h3>Mandatory Prerequisites</h3>
	<ul class="warning">
		<li><strong>Bring Your Own Computer (BYOC):</strong> You must bring your own working condition PC/laptop (MacBooks are not supported).</li>
		<li><strong>Data Backup:</strong> Installing Linux will remove all existing data from the computer. You are required to back up all your data before attending the workshop.</li>
	</ul>
</section>

<section class="registration">
	<h2>Register for this workshop</h2>
	<form class="registration-form" action="mailto:info@code.pr" method="GET" enctype="text/plain">
		<label class="checkbox">
			<input type="checkbox" required />
			<span>I understand I must bring my own <strong>working condition</strong> PC (not a MacBook), even if it’s old or slow. Linux will be installed on it, which will <strong>remove all existing data</strong>. I have backed up everything I need.</span>
		</label>
		<button type="submit" class="btn primary">Register via Email →</button>
	</form>
</section>

<style>
	.subtitle {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.detail-card {
		background: #f8f9fa;
		padding: 1.5rem 2rem;
		border-radius: 12px;
		margin-bottom: 2rem;
	}

	.detail-card p {
		margin: 0.5rem 0;
	}

	section {
		margin-bottom: 3rem;
	}

	.warning {
		background: #fff8e1;
		border-left: 4px solid #ffab00;
		padding: 1.5rem 2rem;
		border-radius: 0 8px 8px 0;
	}

	.warning li {
		margin-bottom: 0.75rem;
	}

	.registration-form {
		background: #f8f9fa;
		padding: 2rem;
		border-radius: 12px;
	}

	.checkbox {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
		cursor: pointer;
	}

	.checkbox input {
		margin-top: 0.25rem;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		border: 2px solid #667eea;
		background: #667eea;
		color: white;
		cursor: pointer;
		font-size: 1rem;
	}

	.btn:hover {
		background: #5568d3;
		border-color: #5568d3;
	}
</style>
