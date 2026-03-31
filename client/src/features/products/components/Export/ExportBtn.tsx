import { useProducts } from "@/features/products/hooks";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import Papa from 'papaparse';
import type { Key } from "react";

export const ExportBtn = () => {

    const { products } = useProducts();

    const handleExportCsv = () => {
        const exportData = products.map(p => ({
            "ID": p.id,
            "Name": p.name,
            "Category": p.category,
            "Stock": p.stock,
            "LowStockThreshold": p.lowStockThreshold,
            "Price": p.price
        }));

        const csvString = Papa.unparse(exportData);
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const today = new Date().toLocaleDateString('en-CA');
        link.setAttribute("download", `inventory_export_${today.split('T')[0]}.csv`);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Inventory Master list", 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        const today = new Date().toLocaleDateString('en-CA');
        doc.text(`Generated on: ${today}`, 14, 30);

        const tableColumn = ["ID", "Name", "Category", "Stock", "Price"];
        const tableRows = products.map(p => [
            p.id,
            p.name,
            p.category,
            p.stock,
            `$${p.price.toFixed(2)}`
        ]);

        autotable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'striped',
            headStyles: { fillColor: [0, 112, 243] }
        });

        doc.save(`Inventory_Report_${new Date().toLocaleDateString('en-CA')}.pdf`);
    };

    const onAction = (key: Key) => {
        switch (key) {
            case 'csv':
                handleExportCsv();
                break;
            case 'pdf':
                handleExportPdf();
                break;
        }
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    color="primary"
                    size="lg"
                    radius="sm"
                >
                    <Download />
                    Export Data
                </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={onAction}>
                <DropdownItem key="pdf" startContent={<FileText />} >PDF</DropdownItem>
                <DropdownItem key="csv" startContent={<FileSpreadsheet />}>CSV</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};