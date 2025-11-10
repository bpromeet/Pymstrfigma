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
  Wallet,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Palette,
  HelpCircle,
  FileText,
  Save,
  Copy,
  Edit,
  Check,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

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
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2">
            <User className="w-6 h-6 text-[#07D7FF]" />
            Account
          </h2>
          <p className="text-muted-foreground">
            {isEditing 
              ? "Update your business information, contact details, and preferences"
              : "View your business information, contact details, and preferences"
            }
          </p>
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex gap-3">
          {isEditing ? (
            <>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="min-h-12 px-6 py-2.5 rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
              >
                <Save className="w-[18px] h-[18px] mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEdit}
              className="min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
            >
              <Edit className="w-[18px] h-[18px] mr-2" />
              Edit Account
            </Button>
          )}
        </div>
      </div>

      {/* Account Status & Verification */}
      <Card className="rounded-2xl">
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
            <div className="p-4 border rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Verification Status</span>
                {profile.kybStatus === "verified" ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full">
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

            <div className="p-4 border rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Account Tier</span>
                <Badge className="rounded-full bg-black text-white dark:bg-white dark:text-black">
                  {profile.accountTier === "business" ? "Business" : "Starter"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {profile.accountTier === "business"
                  ? "Full access to all features"
                  : "Basic features enabled"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Information */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Information
          </CardTitle>
          <CardDescription>
            Your connected wallet address for receiving payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Main wallet</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
            
            {/* Wallet Address as MAB (Main Action Button) */}
            <Button
              onClick={() => copyToClipboard("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb")}
              className="w-full min-h-12 px-6 py-3 bg-[#303030] text-[#F6F7F9] hover:bg-[#2E3C49] transition-all duration-200 rounded-full flex items-center justify-between"
            >
              <span className="font-mono text-sm truncate flex-1 text-left">
                0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
              </span>
              <Copy className="w-[18px] h-[18px] ml-3 flex-shrink-0" />
            </Button>

            <p className="text-xs text-muted-foreground mt-3">
              All payments will be sent to this wallet address
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Business Information
            </CardTitle>
            <CardDescription>
              Your company details and public information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={profile.businessName}
                onChange={(e) =>
                  setProfile({ ...profile, businessName: e.target.value })
                }
                disabled={!isEditing}
                className="rounded disabled:opacity-100 disabled:cursor-default"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={profile.businessType}
                onValueChange={(value) =>
                  setProfile({ ...profile, businessType: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="rounded disabled:opacity-100 disabled:cursor-default">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="nonprofit">Non-profit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="website"
                  value={profile.website}
                  onChange={(e) =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                  disabled={!isEditing}
                  className="pl-10 rounded disabled:opacity-100 disabled:cursor-default"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={profile.description}
                onChange={(e) =>
                  setProfile({ ...profile, description: e.target.value })
                }
                disabled={!isEditing}
                className="rounded-xl min-h-[100px] disabled:opacity-100 disabled:cursor-default"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your personal contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="contactName"
                  value={profile.contactName}
                  onChange={(e) =>
                    setProfile({ ...profile, contactName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="pl-10 rounded disabled:opacity-100 disabled:cursor-default"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="contactEmail"
                  type="email"
                  value={profile.contactEmail}
                  onChange={(e) =>
                    setProfile({ ...profile, contactEmail: e.target.value })
                  }
                  disabled={!isEditing}
                  className="pl-10 rounded disabled:opacity-100 disabled:cursor-default"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="contactPhone"
                  type="tel"
                  value={profile.contactPhone}
                  onChange={(e) =>
                    setProfile({ ...profile, contactPhone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="pl-10 rounded disabled:opacity-100 disabled:cursor-default"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Select
                  value={profile.timezone}
                  onValueChange={(value) =>
                    setProfile({ ...profile, timezone: value })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger className="rounded pl-10 disabled:opacity-100 disabled:cursor-default">
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
                    <SelectItem value="Asia/Singapore">Singapore (SGT)</SelectItem>
                    <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Preferences */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose which notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-xl">
            <div>
              <p>Payment Completed</p>
              <p className="text-sm text-muted-foreground">
                Notify when a payment is successfully completed
              </p>
            </div>
            <Switch
              checked={profile.notifications.paymentCompleted}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    paymentCompleted: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-xl">
            <div>
              <p>Payment Failed</p>
              <p className="text-sm text-muted-foreground">
                Notify when a payment attempt fails
              </p>
            </div>
            <Switch
              checked={profile.notifications.paymentFailed}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    paymentFailed: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-xl">
            <div>
              <p>Daily Summary</p>
              <p className="text-sm text-muted-foreground">
                Daily report of transactions and revenue
              </p>
            </div>
            <Switch
              checked={profile.notifications.dailySummary}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    dailySummary: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-xl">
            <div>
              <p>Weekly Summary</p>
              <p className="text-sm text-muted-foreground">
                Weekly performance and analytics report
              </p>
            </div>
            <Switch
              checked={profile.notifications.weeklySummary}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    weeklySummary: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-xl">
            <div>
              <p>Security Alerts</p>
              <p className="text-sm text-muted-foreground">
                Important security notifications and alerts
              </p>
            </div>
            <Switch
              checked={profile.notifications.securityAlerts}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    securityAlerts: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Branding
          </CardTitle>
          <CardDescription>
            Customize how your business appears to customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Business Logo</Label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center ${!isEditing ? 'opacity-60' : ''}`}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    disabled={!isEditing}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG or SVG (max 2MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Brand Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                defaultValue="#07D7FF"
                disabled={!isEditing}
                className="h-12 w-20 rounded cursor-pointer disabled:opacity-100 disabled:cursor-default"
              />
              <Input
                type="text"
                value="#07D7FF"
                readOnly
                className="rounded font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This color will be used in checkout and payment pages
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support & Help */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Support & Help
          </CardTitle>
          <CardDescription>
            Get help and access resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start rounded-full"
            onClick={() => toast.info("Opening documentation...")}
          >
            <FileText className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start rounded-full"
            onClick={() => toast.info("Opening support chat...")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start rounded-full"
            onClick={() => toast.info("Opening API reference...")}
          >
            <Globe className="w-4 h-4 mr-2" />
            API Reference
          </Button>
        </CardContent>
      </Card>

      {/* Mobile FAB - Above Bottom Navigation (MD3 Standard) */}
      {isEditing ? (
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center md:hidden disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isSaving ? "Saving changes..." : "Save changes"}
        >
          {isSaving ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Check className="w-6 h-6" />
          )}
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center md:hidden"
          aria-label="Edit account"
        >
          <Edit className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default MerchantProfile;
