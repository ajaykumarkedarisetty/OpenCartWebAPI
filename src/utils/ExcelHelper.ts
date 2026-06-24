import XLSX, { WorkBook, WorkSheet } from "xlsx";

export class ExcelHelper {
    static readExcel(filePath: string, sheetName?: string): Record<string, string>[] {
        const workbook: WorkBook = XLSX.readFile(filePath);
        const worksheet: WorkSheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);
    }

    static readExcelWithExecuteYes(filePath: string, sheetName?: string): Record<string, string>[] {
        const rows = this.readExcel(filePath, sheetName);
        return rows.filter((row) => row.execute?.toLowerCase() === 'yes');
    }
}