import { Shimmer } from "@client-web/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@client-web/components/ui/table";
import { cn } from "@client-web/lib/utils";
import { use } from "react";

export type Product = {
  displayName: string;
  unit: string;
  rate: number;
};

type ProductsTableProps = {
  productsPromise?: Promise<{ data: Product[] }>;
  className?: string;
};

export default function ProductsTable({
  productsPromise,
  className,
}: ProductsTableProps) {
  const shouldUseSkeleton = productsPromise === undefined;
  const products = shouldUseSkeleton
    ? Array(3).fill(null)
    : use(productsPromise).data;
  return (
    <div className={cn("w-min h-96 flex", className)}>
      <Table className="h-full rounded-lg bg-primary-foreground">
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product, index: number) =>
            shouldUseSkeleton ? (
              <ProductsTableSkeletonItem key={index} />
            ) : (
              <ProductsTableItem product={product} key={product.displayName} />
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function ProductsTableItem({ product }: { product: Product }) {
  return (
    <TableRow>
      <TableCell>{product.displayName}</TableCell>
      <TableCell>{product.unit}</TableCell>
      <TableCell>{product.rate}</TableCell>
    </TableRow>
  );
}

function ProductsTableSkeletonItem() {
  return (
    <TableRow>
      <TableCell>
        <div className="h-4 w-24 rounded bg-gray-200 relative overflow-hidden">
          <Shimmer />
        </div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 rounded bg-gray-200 relative overflow-hidden">
          <Shimmer />
        </div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-12 rounded bg-gray-200 relative overflow-hidden">
          <Shimmer />
        </div>
      </TableCell>
    </TableRow>
  );
}
