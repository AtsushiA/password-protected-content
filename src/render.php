<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$password = isset($attributes['password']) ? $attributes['password'] : '';
$locked_message = isset($attributes['lockedMessage']) ? $attributes['lockedMessage'] : 'このコンテンツはパスワードで保護されています。';
$content = isset($attributes['content']) ? $attributes['content'] : '';
$link_url = isset($attributes['linkUrl']) ? $attributes['linkUrl'] : '';
$link_text = isset($attributes['linkText']) ? $attributes['linkText'] : '詳細を見る';
$link_target = isset($attributes['linkTarget']) ? $attributes['linkTarget'] : '_self';

// Encode content as UTF-8 safe base64
$content_for_encryption = '';
if (!empty($password) && !empty($content)) {
	// Ensure UTF-8 encoding
	$utf8_content = mb_convert_encoding(wp_kses_post($content), 'UTF-8', 'UTF-8');
	$content_for_encryption = base64_encode($utf8_content);
}

// Generate password hash
$password_hash = !empty($password) ? hash('sha256', $password) : '';

?>
<div <?php echo get_block_wrapper_attributes(); ?> 
	data-content="<?php echo esc_attr($content_for_encryption); ?>" 
	data-password-hash="<?php echo esc_attr($password_hash); ?>"
	data-link-url="<?php echo esc_attr($link_url); ?>"
	data-link-text="<?php echo esc_attr($link_text); ?>"
	data-link-target="<?php echo esc_attr($link_target); ?>">
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