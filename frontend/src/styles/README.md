# Styles Integration

## Casesy Styles

To integrate styles from the "casesy" folder:

1. Copy the CSS/styling files from your casesy folder to this directory
2. Import them in `src/index.css` or `src/App.css`
3. Update component styles as needed to match the casesy design system

Example:
```css
/* In src/index.css */
@import './styles/casesy/main.css';
```

Or if you have specific component styles:
```css
/* In component files */
@import '../styles/casesy/components.css';
```

## Current Styling

The app currently uses a custom design system with:
- Primary color: #e91e63 (Pink/Magenta)
- Clean, modern UI with cards and gradients
- Responsive design for mobile and desktop

You can replace or enhance these styles with your casesy styles while maintaining the component structure.

