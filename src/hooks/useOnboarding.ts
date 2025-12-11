/**
 * ONBOARDING HOOK
 * 
 * React hook for managing onboarding state with automatic persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { OnboardingStatus } from '../types/onboarding';
import {
  loadOnboardingStatus,
  saveOnboardingStatus,
  completeStep,
  dismissBanner,
  dismissCurrentStepBanner,
  resetDismissed,
  isOnboardingComplete,
  getOnboardingProgress,
  getCompletedStepsCount,
  getRemainingStepsCount,
  shouldShowOnboardingBanner,
  shouldShowCurrentStepBanner,
  shouldAutoRedirectToOnboarding,
  getOnboardingSteps,
  getCurrentStep,
  isCurrentStepDismissed,
} from '../utils/onboarding';

export const useOnboarding = () => {
  const [status, setStatus] = useState<OnboardingStatus>(loadOnboardingStatus);

  // Save to localStorage whenever status changes
  useEffect(() => {
    saveOnboardingStatus(status);
  }, [status]);

  /**
   * Mark a step as complete
   */
  const markStepComplete = useCallback((step: 'step1' | 'step2' | 'step3') => {
    setStatus((prev) => completeStep(prev, step));
  }, []);

  /**
   * Dismiss the dashboard banner temporarily
   */
  const dismissOnboardingBanner = useCallback(() => {
    setStatus((prev) => dismissBanner(prev));
  }, []);

  /**
   * Dismiss the current step banner temporarily
   */
  const dismissCurrentStepBannerAction = useCallback(() => {
    setStatus((prev) => dismissCurrentStepBanner(prev));
  }, []);

  /**
   * Reset dismissed state (show banner again)
   */
  const showOnboardingBanner = useCallback(() => {
    setStatus((prev) => resetDismissed(prev));
  }, []);

  /**
   * Reload status from localStorage (useful after external changes)
   */
  const reloadStatus = useCallback(() => {
    setStatus(loadOnboardingStatus());
  }, []);

  return {
    // State
    status,
    
    // Computed values
    isComplete: isOnboardingComplete(status),
    progress: getOnboardingProgress(status),
    completedCount: getCompletedStepsCount(status),
    remainingCount: getRemainingStepsCount(status),
    shouldShowBanner: shouldShowOnboardingBanner(status),
    shouldShowCurrentStepBanner: shouldShowCurrentStepBanner(status),
    shouldAutoRedirect: shouldAutoRedirectToOnboarding(status),
    steps: getOnboardingSteps(status),
    currentStep: getCurrentStep(status),
    isCurrentStepDismissed: isCurrentStepDismissed(status),
    
    // Actions
    markStepComplete,
    dismissOnboardingBanner,
    dismissCurrentStepBanner: dismissCurrentStepBannerAction,
    showOnboardingBanner,
    reloadStatus,
  };
};