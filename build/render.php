<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$password = isset($attributes['password']) ? $attributes['password'] : '';
$locked_message = isset($attributes['lockedMessage']) ? $attributes['lockedMessage'] : 'このコンテンツはパスワードで保護されています。';
$content = isset($attributes['content']) ? $attributes['content'] : '';

// Encode content as UTF-8 safe base64
$content_for_encryption = !empty($password) ? base64_encode(wp_kses_post($content)) : '';

?>
<div <?php echo get_block_wrapper_attributes(); ?> 
	data-content="<?php echo esc_attr($content_for_encryption); ?>" 
	data-password-hash="<?php echo esc_attr(!empty($password) ? hash('sha256', $password) : ''); ?>">
	<div class="password-protected-content__locked">
		<div class="password-protected-content__icon">🔒</div>
		<div class="password-protected-content__message">
			<?php echo wp_kses_post($locked_message); ?>
		</div>
		<form class="password-protected-content__form">
			<input 
				type="password" 
				class="password-protected-content__input" 
				placeholder="パスワードを入力"
				required
				autocomplete="off"
			/>
			<button type="submit" class="password-protected-content__button">
				確認
			</button>
		</form>
		<div class="password-protected-content__error" style="display: none;"></div>
	</div>
</div>