
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	InspectorControls,
	RichText
} from '@wordpress/block-editor';

import { 
	PanelBody, 
	TextControl,
	Notice,
	ToggleControl
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props Block properties
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { password, lockedMessage, content, linkUrl, linkText, linkTarget } = attributes;
	const [ showPasswordWarning, setShowPasswordWarning ] = useState( false );

	useEffect( () => {
		if ( ! password || password.trim() === '' ) {
			setShowPasswordWarning( true );
		} else {
			setShowPasswordWarning( false );
		}
	}, [ password ] );

	const blockProps = useBlockProps( {
		className: 'password-protected-content-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'パスワード設定', 'password-protected-content' ) }>
					<TextControl
						label={ __( 'パスワード', 'password-protected-content' ) }
						value={ password }
						onChange={ ( value ) => setAttributes( { password: value } ) }
						help={ __( 'コンテンツを保護するパスワードを設定してください', 'password-protected-content' ) }
						type="text"
					/>
					<TextControl
						label={ __( '非公開時のメッセージ', 'password-protected-content' ) }
						value={ lockedMessage }
						onChange={ ( value ) => setAttributes( { lockedMessage: value } ) }
						help={ __( 'パスワード入力前に表示されるメッセージ', 'password-protected-content' ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'リンク設定', 'password-protected-content' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'リンクURL', 'password-protected-content' ) }
						value={ linkUrl }
						onChange={ ( value ) => setAttributes( { linkUrl: value } ) }
						help={ __( 'コンテンツ内に表示するリンクのURL', 'password-protected-content' ) }
						type="url"
						placeholder="https://example.com"
					/>
					<TextControl
						label={ __( 'ボタンテキスト', 'password-protected-content' ) }
						value={ linkText }
						onChange={ ( value ) => setAttributes( { linkText: value } ) }
						help={ __( 'リンクボタンに表示するテキスト', 'password-protected-content' ) }
					/>
					<ToggleControl
						label={ __( '新しいタブで開く', 'password-protected-content' ) }
						checked={ linkTarget === '_blank' }
						onChange={ ( value ) => setAttributes( { linkTarget: value ? '_blank' : '_self' } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ showPasswordWarning && (
					<Notice status="warning" isDismissible={ false }>
						{ __( '⚠️ パスワードが設定されていません。サイドバーからパスワードを設定してください。', 'password-protected-content' ) }
					</Notice>
				) }

				<div className="password-protected-content-editor__header">
					<span className="dashicon dashicons dashicons-lock"></span>
					<h3>{ __( 'パスワード保護コンテンツ', 'password-protected-content' ) }</h3>
				</div>

				<div className="password-protected-content-editor__locked-message">
					<strong>{ __( '非公開時のメッセージ:', 'password-protected-content' ) }</strong>
					<p>{ lockedMessage || __( 'メッセージが設定されていません', 'password-protected-content' ) }</p>
				</div>

				<div className="password-protected-content-editor__content">
					<label>{ __( '保護されるコンテンツ (この内容は暗号化されます):', 'password-protected-content' ) }</label>
					<RichText
						tagName="div"
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						placeholder={ __( 'パスワードで保護するコンテンツを入力...', 'password-protected-content' ) }
						multiline="p"
					/>
				</div>

				{ linkUrl && (
					<div className="password-protected-content-editor__link-preview">
						<strong>{ __( 'リンクプレビュー:', 'password-protected-content' ) }</strong>
						<div className="link-button-preview">
							<span className="dashicon dashicons dashicons-admin-links"></span>
							{ linkText || __( '詳細を見る', 'password-protected-content' ) }
							{ linkTarget === '_blank' && <span className="dashicon dashicons dashicons-external"></span> }
						</div>
						<small>URL: { linkUrl }</small>
					</div>
				) }

				{ password && (
					<div className="password-protected-content-editor__info">
						<p>
							{ __( '✓ パスワード設定済み', 'password-protected-content' ) }
							{ ' • ' }
							{ __( 'フロントエンドでは暗号化されて表示されます', 'password-protected-content' ) }
						</p>
					</div>
				) }
			</div>
		</>
	);
}
	