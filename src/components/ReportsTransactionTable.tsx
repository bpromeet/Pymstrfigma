import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { ChainIcon } from './ChainIcon';

interface Transaction {
  id: string;
  linkId: string;
  date: string;
  price: number;
  crypto: string;
  chain: string;
  status: string;
  txHash: string;
}

interface ReportsTransactionTableProps {
  transactions: Transaction[];
  dateFrom: string;
  dateTo: string;
  chainFilter?: string;
  currencyFilter?: string;
  getExplorerUrl: (chain: string, txHash: string) => string;
  isFiltered?: boolean;
}

const ReportsTransactionTable: React.FC<ReportsTransactionTableProps> = ({
  transactions,
  dateFrom,
  dateTo,
  chainFilter = 'all',
  currencyFilter = 'all',
  getExplorerUrl,
  isFiltered = false,
}) => {
  const filteredTransactions = transactions.filter((tx) => {
    // Date range filter
    const txDate = new Date(tx.date);
    const matchesDateRange =
      (!dateFrom || txDate >= new Date(dateFrom)) &&
      (!dateTo || txDate <= new Date(dateTo + 'T23:59:59'));

    // Chain filter
    const matchesChain =
      chainFilter === 'all' || tx.chain.toLowerCase() === chainFilter.toLowerCase();

    // Currency filter
    const matchesCurrency =
      currencyFilter === 'all' || tx.crypto.toUpperCase() === currencyFilter.toUpperCase();

    return matchesDateRange && matchesChain && matchesCurrency;
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="overflow-hidden">
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tr-ID</TableHead>
                <TableHead className="w-[90px]">Date</TableHead>
                <TableHead className="w-[70px]">Time</TableHead>
                <TableHead className="w-[130px]">Payment ID</TableHead>
                <TableHead className="w-[100px]">Amount</TableHead>
                <TableHead className="w-[90px]">Stablecoin</TableHead>
                <TableHead className="w-[70px]">Chain</TableHead>
                <TableHead className="w-[90px]">Status</TableHead>
                <TableHead className="w-[80px]">Fee</TableHead>
                <TableHead className="w-[80px] text-center">Explorer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono">{tx.id}</TableCell>
                  <TableCell>
                    {new Date(tx.date).toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(tx.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </TableCell>
                  <TableCell>{tx.linkId}</TableCell>
                  <TableCell>${tx.price}</TableCell>
                  <TableCell>{tx.crypto}</TableCell>
                  <TableCell>
                    <ChainIcon chain={tx.chain} size={20} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.status === 'Success'
                          ? 'default'
                          : tx.status === 'Pending'
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${(tx.price * 0.029).toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <a
                      href={getExplorerUrl(tx.chain, tx.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors"
                      title={`View on ${tx.chain} explorer`}
                    >
                      <ExternalLink className="w-4 h-4 text-[#07D7FF]" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="border rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{tx.id}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      tx.status === 'Success'
                        ? 'default'
                        : tx.status === 'Pending'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {tx.status}
                  </Badge>
                  <a
                    href={getExplorerUrl(tx.chain, tx.txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors"
                    title={`View on ${tx.chain} explorer`}
                  >
                    <ExternalLink className="w-4 h-4 text-[#07D7FF]" />
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date(tx.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span>
                    {new Date(tx.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment ID:</span>
                  <span>{tx.linkId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold">${tx.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stablecoin:</span>
                  <span>{tx.crypto}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain:</span>
                  <ChainIcon chain={tx.chain} size={20} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee:</span>
                  <span>${(tx.price * 0.029).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTransactionTable;