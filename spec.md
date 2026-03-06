# BSSPL - Bhanoba Security Service

## Current State
A full BSSPL company website with Hero, Services, Gallery, Why Us, Contact, and Footer sections. No QR code present anywhere on the site.

## Requested Changes (Diff)

### Add
- A QR Code section/widget that displays a scannable QR code for the website URL, so visitors can share or scan to open the site on their phone.
- The QR code should auto-generate from the current page URL using the `qrcode.react` library.
- Place the QR code prominently -- either as a floating widget or a dedicated small section between the Contact section and Footer, or inside the Footer.

### Modify
- Install and use `qrcode.react` npm package for QR code rendering.

### Remove
- Nothing removed.

## Implementation Plan
1. Install `qrcode.react` in the frontend package.
2. Create a `QRSection` component in `App.tsx` that reads `window.location.href` and renders a styled QR code.
3. Add the `QRSection` between `ContactSection` and `Footer` in the main `App` component.
4. Style the section to match the existing navy/gold/teal design system.
