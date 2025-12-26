/**
 * Client-side password protection with decryption
 */

// Hash password for verification
async function hashPassword(password) {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Decode base64 with UTF-8 support
function decodeBase64(base64) {
	try {
		// Decode base64 to binary string
		const binaryString = atob(base64);
		
		// Convert binary string to byte array
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		
		// Decode UTF-8 bytes to string
		const decoder = new TextDecoder('utf-8');
		return decoder.decode(bytes);
	} catch (error) {
		console.error('Decode error:', error);
		throw new Error('Failed to decode content');
	}
}

// Initialize all password-protected blocks
document.addEventListener('DOMContentLoaded', async function() {
	const blocks = document.querySelectorAll('.wp-block-telex-password-protected-content');
	
	for (const block of blocks) {
		const form = block.querySelector('.password-protected-content__form');
		const input = block.querySelector('.password-protected-content__input');
		const button = block.querySelector('.password-protected-content__button');
		const errorDiv = block.querySelector('.password-protected-content__error');
		const contentBase64 = block.dataset.content;
		const passwordHash = block.dataset.passwordHash;
		
		if (!form || !contentBase64 || !passwordHash) {
			continue;
		}
		
		form.addEventListener('submit', async function(e) {
			e.preventDefault();
			
			const password = input.value.trim();
			if (!password) {
				return;
			}
			
			// Disable form while processing
			button.disabled = true;
			button.textContent = '確認中...';
			
			if (errorDiv) {
				errorDiv.style.display = 'none';
			}
			
			try {
				// Verify password by comparing hashes
				const inputHash = await hashPassword(password);
				
				if (inputHash !== passwordHash) {
					throw new Error('Invalid password');
				}
				
				// Password is correct, decode and show content
				const content = decodeBase64(contentBase64);
				
				block.innerHTML = '<div class="password-protected-content__unlocked"><div class="password-protected-content__content">' + content + '</div></div>';
				block.classList.add('is-unlocked');
				
			} catch (error) {
				// Show error
				if (errorDiv) {
					errorDiv.textContent = 'パスワードが正しくありません。';
					errorDiv.style.display = 'block';
				}
				
				// Re-enable form
				button.disabled = false;
				button.textContent = '確認';
				input.value = '';
				input.focus();
			}
		});
	}
});