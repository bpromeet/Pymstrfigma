import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ArrowLeft, LogOut } from "lucide-react";

interface UserSettingsSectionProps {
  userLoginMethod: string;
  onLogout: () => void;
  onBackToMerchant: () => void;
}

/**
 * UserSettingsSection - End User Settings
 * 
 * Displays:
 * - Account info (login method)
 * - Notification preferences
 * - App preferences
 * - Logout action
 * - Back to Merchant view
 */
const UserSettingsSection: React.FC<UserSettingsSectionProps> = ({
  userLoginMethod,
  onLogout,
  onBackToMerchant,
}) => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Account Info */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Login Method</Label>
            <p className="mt-1">{userLoginMethod}</p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive transaction confirmations via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about account activity
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full min-h-12 rounded-full justify-start"
            onClick={onBackToMerchant}
          >
            <ArrowLeft className="w-[18px] h-[18px] mr-2" />
            Back to Merchant View
          </Button>

          <Button
            variant="outline"
            className="w-full min-h-12 rounded-full justify-start border-[#FF5914] text-[#FF5914] hover:bg-[#FF5914] hover:text-white"
            onClick={onLogout}
          >
            <LogOut className="w-[18px] h-[18px] mr-2" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettingsSection;
