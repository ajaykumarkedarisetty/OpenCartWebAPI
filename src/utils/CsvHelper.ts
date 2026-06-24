import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class CsvHelper {

    static readCsv(filePath: string): Record<string, string>[] {

        return parse(fs.readFileSync(filePath, 'utf-8'), {

            columns: true, // First Row is always header
            skip_empty_lines: true, // Ignore empty Lines
            trim: true, // Trim spaces
            // relax_column_count: true, // Allow rows with more or fewer columns
        }) as Record<string, string>[];

    }

    static readCsvWithExecute(filePath: string): Record<string, string>[] {
        const rows = this.readCsv(filePath);
        return rows.filter((row) => row.execute?.trim().toLowerCase() === 'yes');
    }

}