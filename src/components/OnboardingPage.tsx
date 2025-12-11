import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { Key, Link as LinkIcon, Webhook, Check, ArrowRight, Sparkles } from 'lucide-react';
import { PageLayout } from './PageLayout';

interface OnboardingPageProps {
  onGenerateApiKey?: () => void;
  onCreatePaymentLink?: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onGenerateApiKey, onCreatePaymentLink }) => {
  const { 
    steps, 
    progress, 
    completedCount, 
    isComplete,
    markStepComplete 
  } = useOnboarding();

  const handleNavigate = (route: string) => {
    window.location.hash = route;
  };

  const handleStepAction = (stepId: string, route: string) => {
    // Special handling for Step 1 (Generate API Key)
    if (stepId === 'step1' && onGenerateApiKey) {
      onGenerateApiKey();
    } 
    // Special handling for Step 2 (Create Payment Link)
    else if (stepId === 'step2' && onCreatePaymentLink) {
      onCreatePaymentLink();
    } 
    else {
      handleNavigate(route);
    }
  };

  const handleGoLive = () => {
    markStepComplete('step3');
    // Show celebration and redirect to dashboard
    setTimeout(() => {
      window.location.hash = '#/admin';
    }, 2000);
  };

  const stepIcons = {
    step1: Key,
    step2: LinkIcon,
    step3: Webhook,
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-white via-[#E3F2FD] to-[#E1F5FE] dark:from-[#0A0A0A] dark:via-[#0F1923] dark:to-[#0A0A0A]">
      <PageLayout className="!bg-transparent h-full overflow-hidden flex flex-col">
        <PageLayout.Header
          icon={<Sparkles className="w-6 h-6 text-[#FF5914]" />}
          title="Welcome to PYMSTR"
          subtitle="Complete these steps to start accepting payments"
          className="flex-shrink-0"
        />
        <PageLayout.Content className="flex-1 overflow-y-auto !py-0">
          {/* Progress Bar */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Setup Progress
              </span>
              <span className="text-sm font-medium text-[#1E88E5]">
                {completedCount}/3 Complete
              </span>
            </div>
            <div className="h-3 bg-[#43586C]/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1E88E5] to-[#07D7FF] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Success Message */}
          {isComplete && (
            <div className="mb-8 bg-gradient-to-r from-[#7DD069]/10 to-[#7DD069]/5 border border-[#7DD069]/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#7DD069] rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    🎉 Setup Complete!
                  </h3>
                  <p className="text-[#798A9B] mb-4">
                    You're all set to start accepting stablecoin payments. Your integration is ready to go live!
                  </p>
                  <button
                    onClick={() => window.location.hash = '#/admin'}
                    className="px-8 py-3 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200 inline-flex items-center gap-2"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = stepIcons[step.id];
              const isLast = index === steps.length - 1;
              
              return (
                <div key={step.id}>
                  <div 
                    className={`
                      bg-white dark:bg-[#303030] rounded-2xl shadow-sm p-6
                      transition-all duration-200 h-full flex flex-col
                      ${step.completed ? 'border-2 border-[#7DD069]' : 'border border-[#43586C]/20 hover:border-[#1E88E5]/50'}
                    `}
                  >
                    {/* Step Number / Icon */}
                    <div className="flex justify-center mb-4">
                      <div 
                        className={`
                          w-16 h-16 rounded-full flex items-center justify-center
                          transition-all duration-200
                          ${step.completed 
                            ? 'bg-[#7DD069] text-white' 
                            : 'bg-[#E3F2FD] dark:bg-[#2E3C49] text-[#1E88E5]'
                          }
                        `}
                      >
                        {step.completed ? (
                          <Check className="w-8 h-8" />
                        ) : (
                          <Icon className="w-8 h-8" />
                        )}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 flex flex-col text-center">
                      <div className="mb-4">
                        {step.completed && (
                          <span className="inline-flex px-3 py-1 bg-[#7DD069]/10 text-[#7DD069] rounded-full text-sm font-medium mb-3">
                            Complete
                          </span>
                        )}
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-[#798A9B] text-sm">
                          {step.description}
                        </p>
                      </div>

                      {/* Action Button */}
                      {!step.completed && (
                        <div className="mt-auto">
                          {step.id === 'step1' ? (
                            // Step 1: Filled button (primary action)
                            <button
                              onClick={() => handleStepAction(step.id, step.action.route)}
                              className="w-full px-6 py-2.5 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2"
                            >
                              {step.action.label}
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          ) : (
                            // Steps 2 & 3: Outlined buttons
                            <button
                              onClick={() => step.id === 'step3' ? handleGoLive() : handleStepAction(step.id, step.action.route)}
                              className="w-full px-6 py-2.5 min-h-12 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2"
                            >
                              {step.action.label}
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Completion Time */}
                      {step.completed && step.completedAt && (
                        <p className="text-sm text-[#798A9B] mt-4">
                          Completed {new Date(step.completedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skip for Now */}
          {!isComplete && (
            <div className="mt-8 text-center">
              <button
                onClick={() => window.location.hash = '#/admin'}
                className="text-[#798A9B] hover:text-[#1E88E5] transition-colors duration-200"
              >
                Skip for now, I'll complete this later
              </button>
            </div>
          )}
        </PageLayout.Content>
      </PageLayout>
    </div>
  );
};