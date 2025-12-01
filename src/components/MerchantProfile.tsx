import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Save,
  Copy,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import PageLayout from "./PageLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface MerchantProfileProps {
  initialProfile?: {
    businessName: string;
    businessType: string;
    website: string;
    description: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    notifications: {
      paymentCompleted: boolean;
      paymentFailed: boolean;
      dailySummary: boolean;
      weeklySummary: boolean;
      securityAlerts: boolean;
    };
    timezone: string;
    kybStatus: string;
    accountTier: string;
  };
  onSave?: (profile: any) => void;
}

const MerchantProfile: React.FC<MerchantProfileProps> = ({
  initialProfile,
  onSave,
}) => {
  const [profile, setProfile] = useState({
    businessName: initialProfile?.businessName || "PYMSTR Merchant Co.",
    businessType: initialProfile?.businessType || "ecommerce",
    website: initialProfile?.website || "https://merchant.example.com",
    description: initialProfile?.description || "Leading provider of digital products and services",
    contactName: initialProfile?.contactName || "John Doe",
    contactEmail: initialProfile?.contactEmail || "john@pymstr.com",
    contactPhone: initialProfile?.contactPhone || "+1 (555) 123-4567",
    notifications: initialProfile?.notifications || {
      paymentCompleted: true,
      paymentFailed: true,
      dailySummary: false,
      weeklySummary: true,
      securityAlerts: true,
    },
    timezone: initialProfile?.timezone || "America/New_York",
    kybStatus: initialProfile?.kybStatus || "verified",
    accountTier: initialProfile?.accountTier || "business",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(profile);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave?.(profile);
      setOriginalProfile(profile);
      setIsEditing(false);
      toast.success("Account updated successfully");
      setIsSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
    toast.info("Changes discarded");
  };

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const handleDeleteAccount = () => {
    // Simulate account deletion
    toast.error("Account deleted - This action cannot be undone");
    setShowDeleteDialog(false);
    // In a real app, this would call the API and redirect to login
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<User className="w-6 h-6 text-[#FF5914]" />}
        title="Account"
        subtitle={
          isEditing 
            ? "Update your business information, contact details, and preferences"
            : "View your business information, contact details, and preferences"
        }
      />

      <PageLayout.Content>
        <div className="space-y-6">
          {/* Main Action Buttons - Left-aligned below title/subtitle */}
          <div className="flex flex-col sm:flex-row gap-3">
            {isEditing ? (
              <>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="min-h-12 sm:min-h-10 px-6 py-2.5 rounded-full transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="min-h-12 sm:min-h-10 px-6 py-2.5 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
                >
                  <Save className="w-[18px] h-[18px] mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEdit}
                className="min-h-12 sm:min-h-10 px-6 py-2.5 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
              >
                <Edit className="w-[18px] h-[18px] mr-2" />
                Edit Account
              </Button>
            )}
          </div>

          {/* Account Status & Verification */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Account Status
              </CardTitle>
              <CardDescription>
                Your account verification and tier status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Verification Status</span>
                    {profile.kybStatus === "verified" ? (
                      <Badge className="bg-[#032e15] text-[#05df72] rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400 rounded-full">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {profile.kybStatus === "verified"
                      ? "Your business has been verified"
                      : "Verification in progress"}
                  </p>
                </div>

                <div className="p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Account Tier</span>
                    <Badge className="bg-[#07D7FF]/12 text-[#07D7FF] rounded-full">
                      {profile.accountTier.charAt(0).toUpperCase() + profile.accountTier.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Access to advanced features
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Business Information
              </CardTitle>
              <CardDescription>
                Your company details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={profile.businessName}
                    onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                    disabled={!isEditing}
                    className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={profile.businessType}
                    onValueChange={(value) => setProfile({ ...profile, businessType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="flex gap-2">
                  <Input
                    id="website"
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    disabled={!isEditing}
                    className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                  />
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(profile.website, "_blank")}
                      className="rounded-full flex-shrink-0"
                    >
                      <Globe className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Primary contact details for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={profile.contactName}
                  onChange={(e) => setProfile({ ...profile, contactName: e.target.value })}
                  disabled={!isEditing}
                  className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address</Label>
                <div className="flex gap-2">
                  <Input
                    id="contactEmail"
                    type="email"
                    value={profile.contactEmail}
                    onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
                    disabled={!isEditing}
                    className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                  />
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(profile.contactEmail)}
                      className="rounded-full flex-shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={profile.contactPhone}
                  onChange={(e) => setProfile({ ...profile, contactPhone: e.target.value })}
                  disabled={!isEditing}
                  className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                <div className="space-y-0.5">
                  <Label htmlFor="paymentCompleted" className="cursor-pointer">Payment Completed</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when a payment is successfully completed
                  </p>
                </div>
                <Switch
                  id="paymentCompleted"
                  checked={profile.notifications.paymentCompleted}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, paymentCompleted: checked },
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                <div className="space-y-0.5">
                  <Label htmlFor="paymentFailed" className="cursor-pointer">Payment Failed</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when a payment fails or is declined
                  </p>
                </div>
                <Switch
                  id="paymentFailed"
                  checked={profile.notifications.paymentFailed}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, paymentFailed: checked },
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                <div className="space-y-0.5">
                  <Label htmlFor="dailySummary" className="cursor-pointer">Daily Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of transactions
                  </p>
                </div>
                <Switch
                  id="dailySummary"
                  checked={profile.notifications.dailySummary}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, dailySummary: checked },
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklySummary" className="cursor-pointer">Weekly Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of performance
                  </p>
                </div>
                <Switch
                  id="weeklySummary"
                  checked={profile.notifications.weeklySummary}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, weeklySummary: checked },
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                <div className="space-y-0.5">
                  <Label htmlFor="securityAlerts" className="cursor-pointer">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify about security-related events
                  </p>
                </div>
                <Switch
                  id="securityAlerts"
                  checked={profile.notifications.securityAlerts}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, securityAlerts: checked },
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Timezone Settings */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timezone Settings
              </CardTitle>
              <CardDescription>
                Set your preferred timezone for dates and times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={profile.timezone}
                  onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone - Delete Account */}
          <Card className="rounded-2xl overflow-hidden border-[#FF5914] dark:border-[#FF5914]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#FF5914]">
                <AlertCircle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions that will permanently affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-[#FF5914] dark:border-[#FF5914] rounded-xl bg-[#FF5914]/5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900 dark:text-white">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="min-h-12 sm:min-h-10 px-6 py-2.5 rounded-full border-[#FF5914] text-[#FF5914] hover:bg-[#FF5914] hover:text-white hover:shadow-sm transition-all duration-200 flex-shrink-0"
                      >
                        <Trash2 className="w-[18px] h-[18px] mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-[#303030] rounded-3xl p-6 shadow-2xl max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-[#FF5914]">
                          <AlertCircle className="w-6 h-6" />
                          Delete Account Permanently?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3 pt-2">
                          <p>
                            This action will <span className="font-semibold text-[#FF5914]">permanently delete</span> your PYMSTR account and all associated data, including:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>All payment links and transaction history</li>
                            <li>Business profile and settings</li>
                            <li>API keys and webhook configurations</li>
                            <li>Team members and access permissions</li>
                          </ul>
                          <div className="p-3 bg-[#FF5914]/10 border border-[#FF5914] rounded-lg mt-4">
                            <p className="text-sm font-semibold text-[#FF5914] flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Legal Notice: Non-Recoverable Operation
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Once deleted, your account data cannot be recovered under any circumstances. This action is final and irreversible.
                            </p>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                        <AlertDialogCancel className="min-h-12 sm:min-h-10 px-6 py-2.5 rounded-full border-[#43586C] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 w-full sm:w-auto">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="min-h-12 sm:min-h-10 px-6 py-2.5 rounded-full bg-[#FF5914] text-white hover:bg-[#FF5914]/90 hover:shadow-sm transition-all duration-200 w-full sm:w-auto"
                        >
                          <Trash2 className="w-[18px] h-[18px] mr-2" />
                          Yes, Delete Permanently
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default MerchantProfile;
