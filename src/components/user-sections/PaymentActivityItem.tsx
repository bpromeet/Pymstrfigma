import React from "react";
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react";
import { CryptoIcon } from "../CryptoIcon";
import { ChainIcon } from "../ChainIcon";

interface PaymentActivityItemProps {
  payment: {
    id: string;
    merchant: string;
    amount: string;
    crypto: string;
    chain: string;
    date: string;
    txHash: string;
    type: 'sent' | 'received';
  };
  formatDate: (date: string) => string;
  getExplorerUrl: (chain: string, txHash: string) => string;
}

/**
 * PaymentActivityItem - MD3 Compliant Payment Activity Row
 * 
 * Displays:
 * - Payment direction icon (sent/received)
 * - Merchant name and timestamp
 * - Amount with crypto/chain icons
 * - Explorer link
 * 
 * MD3 Compliance:
 * - Medium radius (12px): rounded-xl
 * - 8% state layer: hover:bg-gray-100
 * - 48dp touch target: p-4 (16px padding + content)
 * - Transition duration: 200ms
 * - Semantic colors: Error (#FF5914) for sent, Success (#7DD069) for received
 */
export const PaymentActivityItem: React.FC<PaymentActivityItemProps> = ({
  payment,
  formatDate,
  getExplorerUrl
}) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#2E3C49] hover:bg-gray-100 dark:hover:bg-[#1D2E3F] transition-colors duration-200">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Icon - Send or Receive (MD3 Semantic Colors) */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          payment.type === 'sent' 
            ? 'bg-[#FF5914]/10' 
            : 'bg-[#7DD069]/10'
        }`}>
          {payment.type === 'sent' ? (
            <ArrowUpRight className="w-5 h-5 text-[#FF5914]" />
          ) : (
            <ArrowDownLeft className="w-5 h-5 text-[#7DD069]" />
          )}
        </div>

        {/* Payment Details */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate">
            {payment.merchant}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDate(payment.date)}
          </p>
        </div>

        {/* Amount and Explorer */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className={`${
              payment.type === 'sent' 
                ? 'text-gray-900 dark:text-white' 
                : 'text-[#7DD069]'
            }`}>
              {payment.type === 'sent' ? '-' : '+'}${payment.amount}
            </p>
            <div className="flex items-center gap-1 justify-end mt-1">
              <CryptoIcon symbol={payment.crypto} size={16} />
              <p className="text-xs text-muted-foreground hidden sm:inline">{payment.crypto}</p>
              <ChainIcon chain={payment.chain} size={16} />
            </div>
          </div>
          
          {/* Explorer Link - MD3 Small radius (8px) */}
          <a
            href={getExplorerUrl(payment.chain, payment.txHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white dark:hover:bg-[#303030] rounded-lg transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4 text-[#07D7FF]" />
          </a>
        </div>
      </div>
    </div>
  );
};