# PYMSTR Documentation URLs

## Standalone Documentation Pages

These pages can be accessed directly via URL from external websites without showing the merchant navigation.

### Supported URL Formats

**Quick Start Guide:**
- `yourapp.com/#quickstart`
- `yourapp.com/#/quickstart`
- `yourapp.com/#/docs/quickstart`

**API Reference:**
- `yourapp.com/#api-reference`
- `yourapp.com/#/api-reference`
- `yourapp.com/#/docs/api-reference`
- `yourapp.com/#apireference`

**Code Examples:**
- `yourapp.com/#code-examples`
- `yourapp.com/#/code-examples`
- `yourapp.com/#/docs/code-examples`

### How It Works

1. When a user visits any of these URLs, the app detects the hash
2. The app renders the appropriate standalone page WITHOUT the merchant navigation
3. The page includes its own navigation sidebar and back button
4. Clicking back returns to the previous page (or your external site)

### Integration Example

To link to these pages from your external website:

```html
<!-- Quick Start Guide -->
<a href="https://yourapp.com/#quickstart">Quick Start Guide</a>

<!-- API Reference -->
<a href="https://yourapp.com/#api-reference">API Reference</a>

<!-- Code Examples -->
<a href="https://yourapp.com/#code-examples">Code Examples</a>
```

### Notes

- These URLs work with both hash formats (`#quickstart` or `#/docs/quickstart`)
- The case is not sensitive - both `#QuickStart` and `#quickstart` work
- The merchant app navigation is completely separate and unaffected
- These pages render as standalone pages with their own layout
