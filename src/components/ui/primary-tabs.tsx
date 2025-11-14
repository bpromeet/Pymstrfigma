"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs@1.1.3";
import { cn } from "./utils";

/**
 * MD3 Primary Tabs Component
 * 
 * Material Design 3 compliant tabs for content navigation with 3+ sections.
 * Features:
 * - Scrollable horizontal layout
 * - Underline indicator on active tab
 * - Text-only labels (no pill background)
 * - Clean, minimal appearance
 * - Good for 3-7 content sections
 * 
 * Use Cases:
 * - Legal pages (Terms, Privacy, Cookies, etc.)
 * - Help/FAQ sections
 * - Settings with multiple categories
 * - Documentation pages
 * 
 * DO NOT use for:
 * - Filters (use segmented tabs instead)
 * - 2 options only (use segmented tabs)
 * - Toggle controls (use switch)
 */

function PrimaryTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="primary-tabs"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  );
}

/**
 * PrimaryTabsList - Scrollable horizontal tab strip
 * 
 * MD3 Specifications:
 * - No background container (transparent)
 * - Horizontal scrollable layout
 * - No border (clean minimal appearance)
 * - No padding around tabs
 * - Tabs align to left (not centered)
 */
function PrimaryTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="primary-tabs-list"
      className={cn(
        "inline-flex w-full items-center overflow-x-auto scrollbar-hide",
        className
      )}
      {...props}
    />
  );
}

/**
 * PrimaryTabsTrigger - Individual tab button
 * 
 * MD3 Specifications:
 * - Text-only label (no background)
 * - Bottom border indicator when active (3px)
 * - Minimum height 48px (MD3 touch target)
 * - Horizontal padding 16px (px-4)
 * - Text color: muted (inactive), primary (active)
 * - Transition: 200ms (MD3 standard)
 * - Active indicator: primary blue (#1E88E5)
 * - Hover: subtle background (8% state layer)
 */
function PrimaryTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="primary-tabs-trigger"
      className={cn(
        // Layout
        "inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12",
        // Typography - uses semantic styling from globals.css
        "font-medium transition-all duration-200",
        // Inactive state
        "text-[#798A9B] dark:text-[#798A9B]",
        // Active state
        "data-[state=active]:text-[#1E88E5] dark:data-[state=active]:text-[#1E88E5]",
        // Bottom border indicator (3px when active)
        "relative",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px]",
        "after:bg-transparent",
        "data-[state=active]:after:bg-[#1E88E5]",
        "after:transition-all after:duration-200",
        // Hover state (8% state layer)
        "hover:bg-black/[0.04] dark:hover:bg-white/[0.04]",
        // Focus state
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2",
        // Disabled state
        "disabled:pointer-events-none disabled:opacity-38",
        className
      )}
      {...props}
    />
  );
}

/**
 * PrimaryTabsContent - Content panel for each tab
 * 
 * MD3 Specifications:
 * - No special styling (transparent background)
 * - Spacing from tabs handled by parent gap
 * - Focus outline for accessibility
 */
function PrimaryTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="primary-tabs-content"
      className={cn(
        "flex-1 outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}

export { PrimaryTabs, PrimaryTabsList, PrimaryTabsTrigger, PrimaryTabsContent };