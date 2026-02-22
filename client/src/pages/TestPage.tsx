import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Spinner, Table, TableCell, TableColumn, TableHeader, TableRow, TableBody } from "@heroui/react";
import { useProducts } from "@hooks/useProducts"

const TestPage = () => {
    const { products, loading } = useProducts();

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen text-center">
                <ThemeSwitcher className="absolute top-3 right-3" />
                {loading ? (
                    <div>
                        <Spinner label="Loading products..." size="lg" />
                    </div>
                ) :
                    <div>
                        <p>Products Loaded.</p>
                        <Table>
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>Name</TableColumn>
                                <TableColumn>Starting Stock</TableColumn>
                                <TableColumn>Incoming Stock</TableColumn>
                                <TableColumn>Ending Stock</TableColumn>
                                <TableColumn>Weekly Usage</TableColumn>
                                <TableColumn>Price</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => {
                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.id}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.startingStock}</TableCell>
                                            <TableCell>{product.incomingStock}</TableCell>
                                            <TableCell>{product.endingStock}</TableCell>
                                            <TableCell>{product.weeklyUsage}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>

                        </Table>
                    </div>
                }
            </div>
        </>
    )
}

export default TestPage