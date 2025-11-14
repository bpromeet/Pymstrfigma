import MerchantSettings from "../components/MerchantSettings";
import { toast } from "sonner@2.0.3";

interface AcceptedPayment {
  token: string;
  chains: string[];
}

interface MerchantConfig {
  merchantId: string;
  acceptedPayments: AcceptedPayment[];
}

interface SettingsPageProps {
  merchantConfig: MerchantConfig;
  setMerchantConfig: React.Dispatch<React.SetStateAction<MerchantConfig>>;
}

export default function SettingsPage({
  merchantConfig,
  setMerchantConfig,
}: SettingsPageProps) {
  return (
    <MerchantSettings
      initialConfig={{
        merchantId: merchantConfig.merchantId,
        acceptedPayments:
          merchantConfig.acceptedPayments.map(
            (payment) => ({
              token: payment.token,
              chains: payment.chains.map(
                (chain) =>
                  chain.charAt(0).toUpperCase() +
                  chain.slice(1).toLowerCase(),
              ),
            }),
          ),
      }}
      onSave={(newConfig) => {
        setMerchantConfig(newConfig);
        toast.success(
          "Payment settings updated successfully",
        );
      }}
    />
  );
}
