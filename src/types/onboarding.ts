/**
 * ONBOARDING SYSTEM - TYPE DEFINITIONS
 * 
 * Defines the 3-step merchant onboarding flow:
 * Step 1: Get API Credentials
 * Step 2: Test Payment Link
 * Step 3: Complete Integration (Webhooks + Go Live)
 */

export interface OnboardingStatus {
  // Step completion flags
  step1Complete: boolean; // API Keys obtained
  step2Complete: boolean; // Test payment link created
  step3Complete: boolean; // Webhooks configured + Go Live
  
  // Metadata
  completedAt: Date | null; // When all 3 steps completed
  dismissed: boolean; // User dismissed the dashboard banner temporarily (DEPRECATED - use per-step dismissal)
  
  // Per-step dismissal tracking
  step1Dismissed: boolean; // User dismissed Step 1 banner
  step2Dismissed: boolean; // User dismissed Step 2 banner
  step3Dismissed: boolean; // User dismissed Step 3 banner
  
  lastUpdated: Date; // Last time status was updated
  
  // Optional: Track individual step completion times
  step1CompletedAt?: Date | null;
  step2CompletedAt?: Date | null;
  step3CompletedAt?: Date | null;
}

export interface OnboardingStep {
  id: 'step1' | 'step2' | 'step3';
  title: string;
  description: string;
  completed: boolean;
  completedAt?: Date | null;
  action: {
    label: string;
    route: string; // Where to navigate when clicking CTA
  };
}

// Default initial state for new merchants
export const DEFAULT_ONBOARDING_STATUS: OnboardingStatus = {
  step1Complete: false,
  step2Complete: false,
  step3Complete: false,
  completedAt: null,
  dismissed: false,
  step1Dismissed: false,
  step2Dismissed: false,
  step3Dismissed: false,
  lastUpdated: new Date(),
  step1CompletedAt: null,
  step2CompletedAt: null,
  step3CompletedAt: null,
};