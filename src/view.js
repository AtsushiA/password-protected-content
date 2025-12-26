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
		// Validate base64 string
		if (!base64 || typeof base64 !== 'string') {
			throw new Error('Invalid base64 input');
		}
		
		// Clean the base64 string
		const cleanBase64 = base64.trim().replace(/\s/g, '');
		
		// Decode base64 to binary string
		const binaryString = atob(cleanBase64);
		
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
		throw new Error('コンテンツのデコードに失敗しました');
	}
}

// Initialize all password-protected blocks
function initPasswordProtection() {
	const blocks = document.querySelectorAll('.wp-block-telex-password-protected-content');
	
	for (const block of blocks) {
		const form = block.querySelector('.password-protected-content__form');
		const input = block.querySelector('.password-protected-content__input');
		const button = block.querySelector('.password-protected-content__button');
		const errorDiv = block.querySelector('.password-protected-content__error');
		const contentBase64 = block.dataset.content;
		const passwordHash = block.dataset.passwordHash;
		
		if (!form || !contentBase64 || !passwordHash) {
			console.warn('Password protected block missing required data:', block);
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
			const originalButtonText = button.textContent;
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
				
				if (!content) {
					throw new Error('Empty content');
				}
				
				block.innerHTML = '<div class="password-protected-content__unlocked"><div class="password-protected-content__content">' + content + '</div></div>';
				block.classList.add('is-unlocked');
				
			} catch (error) {
				console.error('Password verification error:', error);
				
				// Show error
				if (errorDiv) {
					errorDiv.textContent = 'パスワードが正しくありません。';
					errorDiv.style.display = 'block';
				}
				
				// Re-enable form
				button.disabled = false;
				button.textContent = originalButtonText;
				input.value = '';
				input.focus();
			}
		});
	}
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initPasswordProtection);
} else {
	// DOM is already ready
	initPasswordProtection();
}