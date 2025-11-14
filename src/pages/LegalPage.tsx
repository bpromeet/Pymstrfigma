import React, { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { PrimaryTabs, PrimaryTabsList, PrimaryTabsTrigger, PrimaryTabsContent } from "../components/ui/primary-tabs";
import { Separator } from "../components/ui/separator";
import { Scale } from "lucide-react";

const LegalPage: React.FC = () => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Scale className="w-6 h-6 text-[#07D7FF]" />}
        title="Legal"
        subtitle="Terms, privacy, and policies"
      />
      <PageLayout.Content>
        <PrimaryTabs defaultValue="terms" className="space-y-6">
          <PrimaryTabsList>
            <PrimaryTabsTrigger value="terms">Terms of Service</PrimaryTabsTrigger>
            <PrimaryTabsTrigger value="privacy">Privacy Policy</PrimaryTabsTrigger>
            <PrimaryTabsTrigger value="cookies">Cookie Policy</PrimaryTabsTrigger>
            <PrimaryTabsTrigger value="acceptable">Acceptable Use</PrimaryTabsTrigger>
          </PrimaryTabsList>

          {/* Terms of Service */}
          <PrimaryTabsContent value="terms">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
                <CardDescription>
                  Last updated: January 10, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 prose dark:prose-invert max-w-none">
                <section>
                  <h3>1. Agreement to Terms</h3>
                  <p>
                    By accessing and using PYMSTR, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>2. Use of Services</h3>
                  <p>
                    PYMSTR provides a Web3 stablecoin payment processing platform for merchants and end users. You agree to use our services only for lawful purposes and in accordance with these Terms.
                  </p>
                  <ul>
                    <li>You must be at least 18 years old to use our services</li>
                    <li>You are responsible for maintaining the security of your wallet</li>
                    <li>You must provide accurate and complete information</li>
                    <li>You may not use our services for illegal activities</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>3. Payment Processing</h3>
                  <p>
                    PYMSTR facilitates cryptocurrency payments using stablecoins (USDC, USDT, EURC) across multiple blockchain networks (Ethereum, Polygon, Arbitrum, Optimism, Base).
                  </p>
                  <ul>
                    <li>Payment links are single-use only</li>
                    <li>Transactions are irreversible once confirmed on the blockchain</li>
                    <li>Network fees may apply and vary by blockchain</li>
                    <li>You are responsible for ensuring correct payment details</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>4. Wallet and Security</h3>
                  <p>
                    You are solely responsible for maintaining the security of your wallet credentials. PYMSTR uses Web3Auth for authentication and Account Abstraction infrastructure.
                  </p>
                  <ul>
                    <li>Never share your private keys or seed phrases</li>
                    <li>PYMSTR will never ask for your private keys</li>
                    <li>Enable all available security features</li>
                    <li>Report any security concerns immediately</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>5. Fees and Charges</h3>
                  <p>
                    PYMSTR may charge fees for certain services. All fees will be clearly disclosed before you complete a transaction.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>6. Limitation of Liability</h3>
                  <p>
                    PYMSTR is provided "as is" without warranties of any kind. We are not liable for any losses resulting from blockchain network issues, smart contract bugs, or user error.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>7. Modifications to Terms</h3>
                  <p>
                    We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>8. Contact Information</h3>
                  <p>
                    If you have questions about these Terms, please contact us at legal@pymstr.com
                  </p>
                </section>
              </CardContent>
            </Card>
          </PrimaryTabsContent>

          {/* Privacy Policy */}
          <PrimaryTabsContent value="privacy">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription>
                  Last updated: January 10, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 prose dark:prose-invert max-w-none">
                <section>
                  <h3>1. Information We Collect</h3>
                  <p>
                    We collect information necessary to provide our payment processing services:
                  </p>
                  <ul>
                    <li><strong>Wallet Information:</strong> Public wallet addresses for transaction processing</li>
                    <li><strong>Transaction Data:</strong> Payment amounts, currencies, and blockchain networks</li>
                    <li><strong>Authentication Data:</strong> Web3Auth login credentials (email, social accounts)</li>
                    <li><strong>Usage Data:</strong> How you interact with our platform</li>
                    <li><strong>Device Information:</strong> Browser type, IP address, device identifiers</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>2. How We Use Your Information</h3>
                  <p>
                    We use the collected information to:
                  </p>
                  <ul>
                    <li>Process and facilitate cryptocurrency payments</li>
                    <li>Authenticate users and prevent fraud</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Improve and optimize our services</li>
                    <li>Send transaction confirmations and notifications</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>3. Information Sharing</h3>
                  <p>
                    We do not sell your personal information. We may share data with:
                  </p>
                  <ul>
                    <li><strong>Blockchain Networks:</strong> Transaction data is publicly visible on blockchains</li>
                    <li><strong>Service Providers:</strong> Third-party services that help us operate (Web3Auth, Pimlico)</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>4. Data Security</h3>
                  <p>
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Secure authentication via Web3Auth</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal information</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>5. Your Privacy Rights</h3>
                  <p>
                    You have the right to:
                  </p>
                  <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to data processing</li>
                    <li>Export your data</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>6. Cookies and Tracking</h3>
                  <p>
                    We use cookies and similar technologies to improve your experience. See our Cookie Policy for details.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>7. Data Retention</h3>
                  <p>
                    We retain your information for as long as necessary to provide our services and comply with legal obligations. Transaction data may be retained indefinitely due to blockchain immutability.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>8. Contact Us</h3>
                  <p>
                    For privacy-related questions, contact us at privacy@pymstr.com
                  </p>
                </section>
              </CardContent>
            </Card>
          </PrimaryTabsContent>

          {/* Cookie Policy */}
          <PrimaryTabsContent value="cookies">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Cookie Policy</CardTitle>
                <CardDescription>
                  Last updated: January 10, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 prose dark:prose-invert max-w-none">
                <section>
                  <h3>1. What Are Cookies?</h3>
                  <p>
                    Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience and understand how you use our platform.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>2. Types of Cookies We Use</h3>
                  
                  <h4>Essential Cookies</h4>
                  <p>
                    Required for the platform to function properly:
                  </p>
                  <ul>
                    <li>Authentication and session management</li>
                    <li>Security and fraud prevention</li>
                    <li>Load balancing and performance</li>
                  </ul>

                  <h4>Functional Cookies</h4>
                  <p>
                    Enhance your experience with personalized features:
                  </p>
                  <ul>
                    <li>Language preferences</li>
                    <li>Dark/light mode settings</li>
                    <li>Wallet connection preferences</li>
                  </ul>

                  <h4>Analytics Cookies</h4>
                  <p>
                    Help us understand how users interact with PYMSTR:
                  </p>
                  <ul>
                    <li>Page views and navigation patterns</li>
                    <li>Feature usage statistics</li>
                    <li>Error tracking and debugging</li>
                  </ul>

                  <h4>Marketing Cookies</h4>
                  <p>
                    Used to deliver relevant content and advertisements:
                  </p>
                  <ul>
                    <li>Promotional campaigns</li>
                    <li>Referral tracking</li>
                    <li>A/B testing</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>3. Managing Cookies</h3>
                  <p>
                    You can control cookies through your browser settings:
                  </p>
                  <ul>
                    <li>Block all cookies (may affect functionality)</li>
                    <li>Delete existing cookies</li>
                    <li>Allow cookies only from specific sites</li>
                    <li>Configure cookie preferences in your account settings</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>4. Third-Party Cookies</h3>
                  <p>
                    We use third-party services that may set their own cookies:
                  </p>
                  <ul>
                    <li>Web3Auth for authentication</li>
                    <li>Analytics providers</li>
                    <li>Customer support tools</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>5. Contact Us</h3>
                  <p>
                    Questions about our cookie usage? Contact cookies@pymstr.com
                  </p>
                </section>
              </CardContent>
            </Card>
          </PrimaryTabsContent>

          {/* Acceptable Use Policy */}
          <PrimaryTabsContent value="acceptable">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Acceptable Use Policy</CardTitle>
                <CardDescription>
                  Last updated: January 10, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 prose dark:prose-invert max-w-none">
                <section>
                  <h3>1. Purpose</h3>
                  <p>
                    This Acceptable Use Policy outlines prohibited uses of the PYMSTR platform to ensure a safe and lawful environment for all users.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>2. Prohibited Activities</h3>
                  <p>
                    You may NOT use PYMSTR for:
                  </p>
                  
                  <h4>Illegal Activities</h4>
                  <ul>
                    <li>Money laundering or terrorist financing</li>
                    <li>Sale of illegal goods or services</li>
                    <li>Fraud, phishing, or identity theft</li>
                    <li>Violation of sanctions or export controls</li>
                  </ul>

                  <h4>Harmful Content</h4>
                  <ul>
                    <li>Adult content or services</li>
                    <li>Hate speech or discriminatory content</li>
                    <li>Violence or harassment</li>
                    <li>Misinformation or deceptive practices</li>
                  </ul>

                  <h4>Technical Abuse</h4>
                  <ul>
                    <li>Hacking or unauthorized access attempts</li>
                    <li>Distributed denial-of-service (DDoS) attacks</li>
                    <li>Malware, viruses, or harmful code</li>
                    <li>Automated abuse or spam</li>
                  </ul>

                  <h4>Financial Misconduct</h4>
                  <ul>
                    <li>Ponzi schemes or pyramid schemes</li>
                    <li>Unauthorized securities trading</li>
                    <li>Price manipulation or market abuse</li>
                    <li>Unlicensed gambling operations</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>3. Merchant Responsibilities</h3>
                  <p>
                    Merchants using PYMSTR must:
                  </p>
                  <ul>
                    <li>Clearly describe products or services</li>
                    <li>Honor refund and return policies</li>
                    <li>Comply with consumer protection laws</li>
                    <li>Maintain accurate business information</li>
                    <li>Not engage in deceptive pricing</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>4. Enforcement</h3>
                  <p>
                    Violations of this policy may result in:
                  </p>
                  <ul>
                    <li>Warning and required corrective action</li>
                    <li>Temporary suspension of services</li>
                    <li>Permanent account termination</li>
                    <li>Withholding of funds pending investigation</li>
                    <li>Reporting to law enforcement authorities</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3>5. Reporting Violations</h3>
                  <p>
                    If you become aware of any violations of this policy, please report them immediately to abuse@pymstr.com
                  </p>
                </section>

                <Separator />

                <section>
                  <h3>6. Updates to Policy</h3>
                  <p>
                    We may update this policy periodically. Continued use of PYMSTR after changes constitutes acceptance of the updated policy.
                  </p>
                </section>
              </CardContent>
            </Card>
          </PrimaryTabsContent>
        </PrimaryTabs>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default LegalPage;