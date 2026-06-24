import fs from "fs";

export class JsonHelper {

    static readJson(filePath: string): Record<string, string>[] {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Record<string, string>[];
    }

    static readJsonWithExecute(filePath: string): Record<string, string>[] {
        const rows = this.readJson(filePath);
        return rows.filter((row) => row.execute?.toLowerCase() === 'yes');
    }
}