# Webhook Endpoints - Design Proposal

## Design Analysis: Payment Links & API Keys Pattern

### Common Design Elements

**1. Card Structure:**
- Main container: `rounded-3xl` border with `p-4` padding
- Hover state: `hover:bg-gray-50 dark:hover:bg-gray-900/50`
- Clean white background with subtle borders
- Cursor pointer for interactivity

**2. Badge System (Top Row):**
- Status badge at top-left (Active/Inactive, Completed)
- Environment/Source badge next to status
- Color coding:
  - Green for active/completed: `bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400`
  - Cyan for active: `bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400`
  - Gray for inactive: `bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400`

**3. Icon + Title Section:**
- Circular icon background: `w-10 h-10 rounded-full`
- Icon colors match theme (cyan, blue)
- Title as h4 with truncate
- Subtitle/ID in mono font with muted color

**4. Grid Information Display:**
- `grid grid-cols-2 md:grid-cols-3/4` for responsive layout
- Label: `text-gray-600 dark:text-gray-400`
- Value: `text-gray-900 dark:text-white`

**5. Action Buttons (Bottom):**
- Border-top separator: `border-t border-gray-200 dark:border-gray-800`
- Right-aligned: `flex items-center justify-end space-x-2 pt-2`
- Icon-only buttons with `rounded-full`
- Destructive actions in orange: `text-[#FF5914]`

---

## Proposed Webhook Design

### Structure

```
┌─────────────────────────────────────────────────────────────┐
│ [Active Badge] [live Badge]                                 │
│                                                              │
│ [🔔 Icon] Production Webhook Endpoint                       │
│            https://api.mystore.com/webhooks/pymstr          │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ 🔑 Production API Key [live]                         │    │
│ └──────────────────────────────────────────────────────┘    │
│                                                              │
│ [Payment Completed] [Payment Failed] [Payment Pending]      │
│                                                              │
│ ┌────────────────── Signing Secret ──────────────────┐      │
│ │ whsec_K8JZ•••••••••••    [👁] [📋] [🔄]              │      │
│ └──────────────────────────────────────────────────────┘    │
│                                                              │
│ Created: Jan 15, 2025    Last Triggered: 2 hours ago        │
│ Total Deliveries: 1,247  Success Rate: 98.5%                │
│                                                              │
│ ───────────────────────────────────────────────────────────  │
│                          [Send Test] [Edit] [🗑️]            │
└─────────────────────────────────────────────────────────────┘
```

### Visual Hierarchy

**Level 1: Status Badges** (Top-left)
- Active/Inactive status (green/gray)
- Environment badge (live/test)

**Level 2: Identity** (Icon + URL)
- Circular webhook icon (cyan background)
- Webhook URL as title
- Description as subtitle (if provided)

**Level 3: API Key Association** (Highlighted box)
- Small inline card showing linked API key
- Key icon + name + environment badge

**Level 4: Event Types** (Badge row)
- Subscribed events as pill badges
- Outline style for secondary information

**Level 5: Secret Management** (Secure box)
- Background: `bg-[#FAFAFA] dark:bg-[#2E3C49]`
- Border: `border border-[#43586C]`
- Rounded: `rounded-2xl`
- Actions: Show/Hide, Copy, Regenerate

**Level 6: Metadata Grid** (Stats)
- 2x2 or 2x4 grid
- Created date, Last triggered, Total deliveries, Success rate

**Level 7: Actions** (Bottom border-top)
- Send Test (primary outlined)
- Edit (outlined)
- Delete (icon only, orange)

---

## Color Palette Mapping

**Webhooks:**
- Icon background: `bg-cyan-100 dark:bg-cyan-950` (cyan theme)
- Icon color: `text-cyan-600 dark:text-cyan-400`
- Active status: Green (`#7DD069`)
- Inactive status: Gray
- Live environment: Blue
- Test environment: Gray/Secondary

**Consistency with existing:**
- Payment Links use cyan theme
- API Keys use blue theme
- Webhooks should use cyan/teal theme (matches communication/notification concept)

---

## Responsive Behavior

**Desktop (md+):**
- Full grid display (2x4 or 3 columns)
- All badges inline
- Actions right-aligned

**Mobile (<md):**
- Stacked badges
- Single column grid
- Full-width action buttons
- Secret box with responsive icon buttons

---

## Key Improvements from Current Design

1. **Consistent Badge Placement**: Status badges at top-left (not mixed with title)
2. **API Key Visibility**: Dedicated inline card showing linked API key (critical for understanding)
3. **Better Secret Management**: Dedicated box with inline actions (not hidden in dropdown)
4. **Statistics Grid**: Show delivery metrics directly (like API keys show total calls)
5. **Visual Hierarchy**: Icon → Title → Context → Details → Actions (same as Payment Links)
6. **Cleaner Actions**: Border-top separator with right-aligned buttons (consistent pattern)

---

## Implementation Notes

**Remove:**
- Current vertical layout with all details in one column
- Hidden dropdowns for secrets
- Complex nested sections

**Add:**
- Top-row badge system
- API Key association box (inline, not just small icon)
- Statistics grid (created, last triggered, total deliveries, success rate)
- Clean border-top action row
- Consistent icon theming (cyan/teal for webhooks)

**Keep:**
- Rounded-3xl cards
- Hover states
- Icon + title pattern
- Event type badges
- Secret masking/revealing functionality
- Copy/regenerate actions

---

## Mock Component Structure

```tsx
<div className="border rounded-3xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
  
  {/* Top Row: Status Badges */}
  <div className="flex items-center gap-2 mb-3">
    <Badge>Active</Badge>
    <Badge>live</Badge>
  </div>

  {/* Icon + Title */}
  <div className="flex items-center gap-3 mb-3">
    <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950">
      <Webhook className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
    </div>
    <div className="flex-1 min-w-0">
      <h4>Production Webhook Endpoint</h4>
      <code className="text-sm">https://api.mystore.com/webhooks/pymstr</code>
    </div>
  </div>

  {/* API Key Association */}
  <div className="bg-muted p-3 rounded-2xl mb-3">
    <div className="flex items-center gap-2">
      <Key className="w-4 h-4" />
      <span>Production API Key</span>
      <Badge>live</Badge>
    </div>
  </div>

  {/* Event Types */}
  <div className="flex gap-2 flex-wrap mb-3">
    <Badge variant="outline">Payment Completed</Badge>
    <Badge variant="outline">Payment Failed</Badge>
  </div>

  {/* Secret Box */}
  <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] p-3 rounded-2xl mb-3">
    <Label>Signing Secret</Label>
    <div className="flex items-center gap-2">
      <code>whsec_K8JZ••••••••••••••••</code>
      <Button size="sm" variant="ghost">[Eye]</Button>
      <Button size="sm" variant="ghost">[Copy]</Button>
      <Button size="sm" variant="ghost">[Refresh]</Button>
    </div>
  </div>

  {/* Stats Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
    <div>
      <p className="text-muted">Created</p>
      <p>Jan 15, 2025</p>
    </div>
    <div>
      <p className="text-muted">Last Triggered</p>
      <p>2 hours ago</p>
    </div>
    <div>
      <p className="text-muted">Total Deliveries</p>
      <p>1,247</p>
    </div>
    <div>
      <p className="text-muted">Success Rate</p>
      <p>98.5%</p>
    </div>
  </div>

  {/* Actions */}
  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-800">
    <Button variant="outline" size="sm">Send Test</Button>
    <Button variant="outline" size="sm">Edit</Button>
    <Button variant="outline" size="sm" className="text-[#FF5914]">
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>

</div>
```

This design maintains 100% consistency with Payment Links and API Keys while being optimized for webhook-specific information (events, secrets, delivery stats).
