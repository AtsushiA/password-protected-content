
=== Password Protected Content ===

Contributors:      WordPress Telex
Tags:              block, password, protection, security, private
Tested up to:      6.8
Stable tag:        0.1.3
License:           GPLv2 or later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A secure block that allows you to password-protect content with client-side encryption, working even on static sites.

== Description ==

Password Protected Content is a powerful WordPress block that allows you to hide content behind a password. The block features:

* Client-side encryption of protected content
* Works on static sites (no server-side processing required)
* Customizable password from the block settings
* Customizable message shown before password entry
* Content is encrypted in the HTML source code
* Secure password-based decryption
* Clean, user-friendly interface
* Optional link button within protected content
* Customizable button text and target (new tab/same tab)
* Beautiful gradient-styled link buttons
* Enhanced UTF-8 encoding support for multilingual content
* Robust error handling and validation
* Link data is also encoded to prevent source code exposure

Perfect for membership sites, private content, exclusive materials, or any content you want to restrict access to without complex authentication systems.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/password-protected-content` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Add the Password Protected Content block to any post or page
4. Set your password in the block settings
5. Add your content inside the block
6. Customize the locked message if desired
7. (Optional) Add a link button in the Link Settings panel

== Frequently Asked Questions ==

= Is the content secure? =

The content is encrypted using AES encryption with your password as the key. While this provides good protection against casual viewing of the source code, for highly sensitive content, consider additional server-side protection.

= Does this work on static sites? =

Yes! The encryption and decryption happens entirely in the browser using JavaScript, so it works perfectly on static sites, CDNs, or any hosting environment.

= Can I change the password after publishing? =

Yes, you can change the password at any time from the block settings. The content will be re-encrypted with the new password.

= What happens if someone forgets the password? =

Users will need to contact you to get the password. There is no password recovery mechanism built-in for security reasons.

= How do I add a link button to the protected content? =

In the block settings sidebar, open the "Link Settings" panel. Enter your URL, customize the button text (default is "詳細を見る"), and choose whether to open the link in a new tab. The link button will appear below the protected content after the user enters the correct password.

= Can I customize the link button appearance? =

The link button uses a beautiful gradient design by default. You can further customize it using custom CSS by targeting the `.password-protected-content__link-button` class.

= Is the link information visible in the page source? =

No. As of version 0.1.3, link information (URL, text, and target) is encoded in base64 format and only decoded after the correct password is entered, preventing easy exposure in the HTML source code.

== Screenshots ==

1. The block in the editor showing password settings
2. The locked state on the frontend
3. The unlocked content after password entry

== Changelog ==

= 0.1.3 =
* Security Enhancement: Link data (URL, text, target) is now encoded in base64 format
* Security: Consolidated three separate data attributes (data-link-url, data-link-text, data-link-target) into a single encoded data-link-data attribute
* Security: Link information is no longer easily visible in HTML source code
* Improved: Link data is decoded only after successful password verification
* Improved: Added error handling for link data decoding failures

= 0.1.2 =
* New Feature: Added link button functionality to protected content
* New: Link settings panel with URL, button text, and target options
* New: Beautiful gradient-styled link buttons with icon support
* New: Link preview in the editor
* Enhanced: Link buttons support opening in new tab with proper security attributes (rel="noopener noreferrer")
* Enhanced: External link indicator icon for links opening in new tabs
* Improved: Content margin spacing for better visual hierarchy
* Improved: Editor interface with link preview functionality

= 0.1.1 =
* Enhanced: Improved UTF-8 encoding handling with mb_convert_encoding for better multilingual support
* Enhanced: Added base64 input validation and cleaning for more robust decryption
* Enhanced: Better error handling with detailed console logging for debugging
* Enhanced: Optimized initialization with document.readyState check for better compatibility
* Enhanced: Added empty content validation to prevent rendering issues
* Fixed: Error messages now display in Japanese for better user experience
* Fixed: Button text properly restored after failed password attempts

= 0.1.0 =
* Initial release
* Client-side AES encryption
* Customizable password and locked message
* Support for any WordPress content inside the block

== Security Notes ==

This block uses client-side encryption, which means:
- The encrypted content is sent to the user's browser
- A determined attacker with sufficient resources could potentially decrypt it
- This is suitable for content protection against casual viewers
- For highly sensitive content, consider server-side authentication methods

The encryption uses AES-256 algorithm with PBKDF2 key derivation.

Link Data Protection:
- Link information (URL, button text, target) is base64 encoded (not encrypted)
- Base64 encoding prevents casual viewing in HTML source but is not true encryption
- A technically savvy user could decode the link data without the password
- This provides obfuscation rather than cryptographic security
- For sensitive URLs, consider additional server-side protection
