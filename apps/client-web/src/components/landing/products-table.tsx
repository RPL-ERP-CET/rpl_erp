import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@client-web/components/ui/table";
import { cn } from "@client-web/lib/utils";

export type Product = {
    displayName: string;
    unit: string;
    rate: number;
};

export default function ProductsTable({
    products,
    className,
}: {
    products: Product[];
    className?: string;
}) {
    return (
        <div className={cn("w-min h-96 flex", className)}>
            <Table className="h-full rounded-lg bg-white">
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Rate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.displayName}>
                            <TableCell>{product.displayName}</TableCell>
                            <TableCell>{product.unit}</TableCell>
                            <TableCell>{product.rate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
