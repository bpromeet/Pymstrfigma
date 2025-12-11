/**
 * ONBOARDING UTILITIES
 * 
 * Helper functions for managing merchant onboarding state
 */

import { OnboardingStatus, DEFAULT_ONBOARDING_STATUS, OnboardingStep } from '../types/onboarding';

const ONBOARDING_STORAGE_KEY = 'pymstr_onboarding_status';

/**
 * Load onboarding status from localStorage
 */
export const loadOnboardingStatus = (): OnboardingStatus => {
  try {
    const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!stored) {
      return DEFAULT_ONBOARDING_STATUS;
    }
    
    const parsed = JSON.parse(stored);
    
    // Convert date strings back to Date objects
    return {
      ...parsed,
      completedAt: parsed.completedAt ? new Date(parsed.completedAt) : null,
      lastUpdated: parsed.lastUpdated ? new Date(parsed.lastUpdated) : new Date(),
      step1CompletedAt: parsed.step1CompletedAt ? new Date(parsed.step1CompletedAt) : null,
      step2CompletedAt: parsed.step2CompletedAt ? new Date(parsed.step2CompletedAt) : null,
      step3CompletedAt: parsed.step3CompletedAt ? new Date(parsed.step3CompletedAt) : null,
    };
  } catch (error) {
    console.error('Failed to load onboarding status:', error);
    return DEFAULT_ONBOARDING_STATUS;
  }
};

/**
 * Save onboarding status to localStorage
 */
export const saveOnboardingStatus = (status: OnboardingStatus): void => {
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(status));
  } catch (error) {
    console.error('Failed to save onboarding status:', error);
  }
};

/**
 * Check if onboarding is fully complete (all 3 steps done)
 */
export const isOnboardingComplete = (status: OnboardingStatus): boolean => {
  return status.step1Complete && status.step2Complete && status.step3Complete;
};

/**
 * Get onboarding progress (0-100%)
 */
export const getOnboardingProgress = (status: OnboardingStatus): number => {
  const completedSteps = [
    status.step1Complete,
    status.step2Complete,
    status.step3Complete,
  ].filter(Boolean).length;
  
  return Math.round((completedSteps / 3) * 100);
};

/**
 * Get number of completed steps
 */
export const getCompletedStepsCount = (status: OnboardingStatus): number => {
  return [
    status.step1Complete,
    status.step2Complete,
    status.step3Complete,
  ].filter(Boolean).length;
};

/**
 * Get number of remaining steps
 */
export const getRemainingStepsCount = (status: OnboardingStatus): number => {
  return 3 - getCompletedStepsCount(status);
};

/**
 * Mark a specific step as complete
 */
export const completeStep = (
  status: OnboardingStatus,
  step: 'step1' | 'step2' | 'step3'
): OnboardingStatus => {
  const now = new Date();
  const updatedStatus: OnboardingStatus = {
    ...status,
    [`${step}Complete`]: true,
    [`${step}CompletedAt`]: now,
    lastUpdated: now,
  };
  
  // Reset dismissal for next step (so next step's banner auto-opens)
  if (step === 'step1') {
    updatedStatus.step2Dismissed = false; // Next step banner will show
  } else if (step === 'step2') {
    updatedStatus.step3Dismissed = false; // Next step banner will show
  }
  
  // Check if all steps are now complete
  if (isOnboardingComplete(updatedStatus) && !updatedStatus.completedAt) {
    updatedStatus.completedAt = now;
  }
  
  return updatedStatus;
};

/**
 * Dismiss the onboarding banner (temporary)
 */
export const dismissBanner = (status: OnboardingStatus): OnboardingStatus => {
  return {
    ...status,
    dismissed: true,
    lastUpdated: new Date(),
  };
};

/**
 * Dismiss the current step's banner specifically
 */
export const dismissCurrentStepBanner = (status: OnboardingStatus): OnboardingStatus => {
  const updatedStatus = { ...status, lastUpdated: new Date() };
  
  // Dismiss the banner for whichever step is currently active
  if (!status.step1Complete) {
    updatedStatus.step1Dismissed = true;
  } else if (!status.step2Complete) {
    updatedStatus.step2Dismissed = true;
  } else if (!status.step3Complete) {
    updatedStatus.step3Dismissed = true;
  }
  
  return updatedStatus;
};

/**
 * Reset dismissed state (show banner again)
 */
export const resetDismissed = (status: OnboardingStatus): OnboardingStatus => {
  return {
    ...status,
    dismissed: false,
    lastUpdated: new Date(),
  };
};

/**
 * Get formatted step data for UI rendering
 */
export const getOnboardingSteps = (status: OnboardingStatus): OnboardingStep[] => {
  return [
    {
      id: 'step1',
      title: 'Get API Credentials',
      description: 'Create your API keys to start integration',
      completed: status.step1Complete,
      completedAt: status.step1CompletedAt,
      action: {
        label: 'Generate API Keys',
        route: '#/api-keys',
      },
    },
    {
      id: 'step2',
      title: 'Test Payment Link',
      description: 'Create and validate a test payment',
      completed: status.step2Complete,
      completedAt: status.step2CompletedAt,
      action: {
        label: 'Test Payment Link',
        route: '#/links',
      },
    },
    {
      id: 'step3',
      title: 'Complete Integration',
      description: 'Set up webhooks and go live',
      completed: status.step3Complete,
      completedAt: status.step3CompletedAt,
      action: {
        label: 'Setup Webhooks',
        route: '#/webhooks',
      },
    },
  ];
};

/**
 * Check if should show onboarding banner on dashboard
 */
export const shouldShowOnboardingBanner = (status: OnboardingStatus): boolean => {
  // Don't show if fully complete
  if (isOnboardingComplete(status)) {
    return false;
  }
  
  // Don't show if dismissed (until next login or reset)
  if (status.dismissed) {
    return false;
  }
  
  return true;
};

/**
 * Get the current active onboarding step
 */
export const getCurrentStep = (status: OnboardingStatus): OnboardingStep | null => {
  const steps = getOnboardingSteps(status);
  
  // Find first incomplete step
  return steps.find(step => !step.completed) || null;
};

/**
 * Check if current step's banner is dismissed
 */
export const isCurrentStepDismissed = (status: OnboardingStatus): boolean => {
  if (!status.step1Complete) {
    return status.step1Dismissed;
  } else if (!status.step2Complete) {
    return status.step2Dismissed;
  } else if (!status.step3Complete) {
    return status.step3Dismissed;
  }
  return false;
};

/**
 * Check if should show banner for current step
 */
export const shouldShowCurrentStepBanner = (status: OnboardingStatus): boolean => {
  // Don't show if fully complete
  if (isOnboardingComplete(status)) {
    return false;
  }
  
  // Don't show if current step is dismissed
  if (isCurrentStepDismissed(status)) {
    return false;
  }
  
  return true;
};

/**
 * Check if should auto-redirect to onboarding page
 * (First-time users with no steps complete)
 */
export const shouldAutoRedirectToOnboarding = (status: OnboardingStatus): boolean => {
  return getCompletedStepsCount(status) === 0 && !status.dismissed;
};

/**
 * Reset entire onboarding (for testing/debugging)
 */
export const resetOnboarding = (): OnboardingStatus => {
  const resetStatus = DEFAULT_ONBOARDING_STATUS;
  saveOnboardingStatus(resetStatus);
  return resetStatus;
};