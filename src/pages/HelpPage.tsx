import React, { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { PrimaryTabs, PrimaryTabsList, PrimaryTabsTrigger, PrimaryTabsContent } from "../components/ui/primary-tabs";
import {
  Search,
  HelpCircle,
  Mail,
  MessageSquare,
  Wallet,
  CreditCard,
  Shield,
  Settings,
  ChevronRight,
  Book,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      toast("Please fill in all fields");
      return;
    }
    toast("Message sent! We'll get back to you within 24 hours.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<HelpCircle className="w-6 h-6 text-[#FF5914]" />}
        title="Help Center"
        subtitle="Find answers and get support"
      />
      <PageLayout.Content>
        <PrimaryTabs defaultValue="faq" className="space-y-6">
          <PrimaryTabsList>
            <PrimaryTabsTrigger value="faq">FAQ</PrimaryTabsTrigger>
            <PrimaryTabsTrigger value="guides">Guides</PrimaryTabsTrigger>
            <PrimaryTabsTrigger value="contact">Contact Support</PrimaryTabsTrigger>
          </PrimaryTabsList>

          {/* FAQ Section */}
          <PrimaryTabsContent value="faq" className="space-y-6">
            {/* Search */}
            <Card className="rounded-2xl">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded"
                  />
                </div>
              </CardContent>
            </Card>

            {/* General Questions */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>General Questions</CardTitle>
                <CardDescription>
                  Common questions about PYMSTR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is PYMSTR?</AccordionTrigger>
                    <AccordionContent>
                      PYMSTR is a Web3 stablecoin payment processor that enables merchants to accept cryptocurrency payments (USDC, USDT, EURC) across multiple blockchain networks (Ethereum, Polygon, Arbitrum, Optimism, Base). We provide a seamless checkout experience for end users and comprehensive payment management tools for merchants.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Which cryptocurrencies are supported?</AccordionTrigger>
                    <AccordionContent>
                      PYMSTR supports three stablecoins: USDC (USD Coin), USDT (Tether), and EURC (Euro Coin). These are available across five blockchain networks: Ethereum, Polygon, Arbitrum, Optimism, and Base.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I create an account?</AccordionTrigger>
                    <AccordionContent>
                      Click "Login" and choose your preferred Web3Auth method (Google, Email, Social). Your account is created automatically upon first login. For merchants, you'll need to complete KYC verification to start accepting payments.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Is PYMSTR secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes! PYMSTR uses Web3Auth for secure authentication and Account Abstraction infrastructure via Pimlico. All transactions are processed on public blockchains with cryptographic security. We never store your private keys.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What are the fees?</AccordionTrigger>
                    <AccordionContent>
                      PYMSTR charges a small processing fee on transactions. Network fees (gas fees) vary by blockchain and are paid by the sender. Detailed fee information is shown before confirming any transaction.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Wallet & Payments */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Wallet & Payments</CardTitle>
                <CardDescription>
                  Managing your crypto wallet and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I receive crypto?</AccordionTrigger>
                    <AccordionContent>
                      Go to the Wallet section, select your currency (USDC, USDT, or EURC), click "Receive", and share your wallet address or QR code. Make sure the sender uses the correct network to avoid losing funds.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I send crypto?</AccordionTrigger>
                    <AccordionContent>
                      In the Wallet section, select your currency, click "Send", choose the network, enter the recipient address and amount, then confirm. Always double-check the address - blockchain transactions cannot be reversed.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What are payment links?</AccordionTrigger>
                    <AccordionContent>
                      Payment links are unique URLs that allow you to request crypto payments. Each link is single-use and expires after one successful payment. Merchants can create payment links manually or via API.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I cancel a transaction?</AccordionTrigger>
                    <AccordionContent>
                      No. Once a blockchain transaction is confirmed, it cannot be cancelled or reversed. Always verify payment details before confirming. If you sent funds to the wrong address, you'll need to contact the recipient.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Why is my transaction pending?</AccordionTrigger>
                    <AccordionContent>
                      Transactions need blockchain confirmations to complete. This usually takes a few seconds to a few minutes depending on network congestion. You can check the status using the transaction hash (txHash) on a blockchain explorer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Merchant Questions */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Merchant Questions</CardTitle>
                <CardDescription>
                  For businesses accepting payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I integrate PYMSTR?</AccordionTrigger>
                    <AccordionContent>
                      You can integrate PYMSTR in two ways: 1) Create manual payment links in the dashboard for invoices and direct payments, or 2) Use our API to generate payment links programmatically for e-commerce checkout integration. API documentation is available in your merchant dashboard.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is the difference between manual and API payment links?</AccordionTrigger>
                    <AccordionContent>
                      Manual payment links are created directly in the admin UI for specific transactions. API-generated payment links are created programmatically when customers check out on your website. Both types are single-use only and follow the same completion rules.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do webhooks work?</AccordionTrigger>
                    <AccordionContent>
                      Webhooks notify your server when payment events occur (completed, failed, etc.). Configure your webhook URL in Settings → Webhooks. PYMSTR will POST event data to your endpoint in real-time.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I issue refunds?</AccordionTrigger>
                    <AccordionContent>
                      Blockchain transactions cannot be automatically reversed. To refund a customer, you'll need to initiate a new payment sending the funds back to their wallet address. Always verify the correct address with your customer.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I manage my team?</AccordionTrigger>
                    <AccordionContent>
                      Go to Settings → Team to invite team members, assign roles (Admin, Developer, Support), and manage permissions. Admins have full access, Developers can access API features, and Support can view transactions.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Security & Privacy */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>
                  Protecting your account and data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How is my wallet secured?</AccordionTrigger>
                    <AccordionContent>
                      PYMSTR uses Web3Auth for authentication, which provides social login security combined with non-custodial wallet technology. Your private keys are encrypted and never stored on our servers. We also use Account Abstraction for enhanced security features.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What if I lose access to my account?</AccordionTrigger>
                    <AccordionContent>
                      Web3Auth provides account recovery options through your social login or email. If you lose access, contact support@pymstr.com with proof of ownership. Note: We cannot recover your private keys if they are lost.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do you store my private keys?</AccordionTrigger>
                    <AccordionContent>
                      No. PYMSTR never stores your private keys. Web3Auth uses Multi-Party Computation (MPC) to manage keys in a distributed, non-custodial way. You always maintain control of your funds.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I enable two-factor authentication?</AccordionTrigger>
                    <AccordionContent>
                      Two-factor authentication is built into Web3Auth's social login system. Additional security options may be available depending on your chosen login method (Google, Email, etc.).
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What data do you collect?</AccordionTrigger>
                    <AccordionContent>
                      We collect wallet addresses, transaction data, and authentication information necessary to provide our services. See our Privacy Policy for complete details. We never sell your personal information.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </PrimaryTabsContent>

          {/* Guides Section */}
          <PrimaryTabsContent value="guides" className="space-y-6">
            {/* Getting Started */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Step-by-step guides for new users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Wallet className="w-5 h-5 text-[#07D7FF] flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">Setting Up Your Wallet</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Create and configure your PYMSTR wallet
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <CreditCard className="w-5 h-5 text-[#07D7FF] flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">Making Your First Payment</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Complete a transaction step-by-step
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Shield className="w-5 h-5 text-[#07D7FF] flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">Security Best Practices</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Keep your account and funds safe
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Button>
              </CardContent>
            </Card>

            {/* Merchant Guides */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Merchant Guides</CardTitle>
                <CardDescription>
                  For businesses accepting payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Settings className="w-5 h-5 text-[#07D7FF] flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">Merchant Account Setup</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Complete KYC and configure your business
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Book className="w-5 h-5 text-[#07D7FF] flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">Creating Payment Links</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Manual links and API integration
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <MessageSquare className="w-5 h-5 text-[#07D7FF] flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">Webhook Configuration</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Set up real-time payment notifications
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <ExternalLink className="w-5 h-5 text-[#07D7FF] flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">API Documentation</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Complete API reference and examples
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Button>
              </CardContent>
            </Card>

            {/* Advanced Topics */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Advanced Topics</CardTitle>
                <CardDescription>
                  Deep dives and technical details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3">
                    <Book className="w-5 h-5 text-[#07D7FF]" />
                    <div className="text-left">
                      <div className="font-medium text-foreground">Understanding Blockchain Networks</div>
                      <div className="text-sm text-muted-foreground">
                        Ethereum, Polygon, Arbitrum, Optimism, Base
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#07D7FF]" />
                    <div className="text-left">
                      <div className="font-medium text-foreground">Account Abstraction Explained</div>
                      <div className="text-sm text-muted-foreground">
                        How PYMSTR uses AA for better UX
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between rounded-full h-auto py-4"
                  onClick={() => toast("Opening guide...")}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-[#07D7FF]" />
                    <div className="text-left">
                      <div className="font-medium text-foreground">Gas Fees Optimization</div>
                      <div className="text-sm text-muted-foreground">
                        Save on transaction costs
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Watch and learn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Video player placeholder
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PrimaryTabsContent>

          {/* Contact Support Section */}
          <PrimaryTabsContent value="contact" className="space-y-6">
            {/* Contact Form */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  We typically respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="rounded min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full min-h-12 bg-[#1E88E5] hover:bg-[#1565C0] text-white rounded-full transition-all duration-200"
                  >
                    <Mail className="w-[18px] h-[18px] mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Direct Contact Options */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
                <CardDescription>
                  Choose your preferred contact method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#07D7FF]" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">
                        support@pymstr.com
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      window.location.href = "mailto:support@pymstr.com";
                    }}
                  >
                    Contact
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#07D7FF]" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">
                        Available Mon-Fri, 9am-5pm EST
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => toast("Opening live chat...")}
                  >
                    Start Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Common Issues */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
                <CardDescription>
                  Quick solutions to frequent problems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>My transaction is stuck</AccordionTrigger>
                    <AccordionContent>
                      Check the transaction status using your txHash on a blockchain explorer. If pending for over 30 minutes, the network may be congested. Contact support with your txHash for assistance.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>I can't login to my account</AccordionTrigger>
                    <AccordionContent>
                      Ensure you're using the same Web3Auth method (Google, Email, etc.) you used to create your account. If you still can't access it, contact support@pymstr.com with proof of ownership.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Payment link not working</AccordionTrigger>
                    <AccordionContent>
                      Payment links are single-use only. If a link has already been used, it will show as "completed". Create a new payment link for each transaction. Ensure the link hasn't expired if a time limit was set.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Incorrect balance shown</AccordionTrigger>
                    <AccordionContent>
                      Refresh the page to sync latest blockchain data. If the issue persists, check your wallet address on a blockchain explorer to verify the actual balance. Contact support if discrepancies remain.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </PrimaryTabsContent>
        </PrimaryTabs>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default HelpPage;