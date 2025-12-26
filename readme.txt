
=== Password Protected Content ===

Contributors:      WordPress Telex
Tags:              block, password, protection, security, private
Tested up to:      6.8
Stable tag:        0.1.1
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
* Enhanced UTF-8 encoding support for multilingual content
* Robust error handling and validation
* Improved initialization for better compatibility

Perfect for membership sites, private content, exclusive materials, or any content you want to restrict access to without complex authentication systems.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/password-protected-content` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Add the Password Protected Content block to any post or page
4. Set your password in the block settings
5. Add your content inside the block
6. Customize the locked message if desired

== Frequently Asked Questions ==

= Is the content secure? =

The content is encrypted using AES encryption with your password as the key. While this provides good protection against casual viewing of the source code, for highly sensitive content, consider additional server-side protection.

= Does this work on static sites? =

Yes! The encryption and decryption happens entirely in the browser using JavaScript, so it works perfectly on static sites, CDNs, or any hosting environment.

= Can I change the password after publishing? =

Yes, you can change the password at any time from the block settings. The content will be re-encrypted with the new password.

= What happens if someone forgets the password? =

Users will need to contact you to get the password. There is no password recovery mechanism built-in for security reasons.

== Screenshots ==

1. The block in the editor showing password settings
2. The locked state on the frontend
3. The unlocked content after password entry

== Changelog ==

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
