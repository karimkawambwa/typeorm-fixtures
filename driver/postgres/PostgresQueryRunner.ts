import { BaseQueryRunner } from "../BaseQueryRunner";
import { Table, TableColumn } from "../../schema-builder/table/Table";
import { Query } from "../../query-builder/Query";

export class PostgresQueryRunner extends BaseQueryRunner {
    driver: any;
    createdEnumTypes: string[];

    constructor(driver: any) {
        super();
        this.driver = driver;
        this.createdEnumTypes = [];
    }

    /**
     * Creates a new table.
     */
    async createTable(
        table: Table,
        ifNotExist: boolean = false,
        createForeignKeys: boolean = true,
        createIndices: boolean = true
    ): Promise<void> {
        if (ifNotExist) {
            const isTableExist = await this.hasTable(table);
            if (isTableExist) return;
        }

        const upQueries: Query[] = [];
        const downQueries: Query[] = [];

        // if table have column with ENUM type, we must create this type in postgres.
        const enumColumns = table.columns.filter(
            (column: TableColumn) => column.type === "enum" || column.type === "simple-enum"
        );
        for (const column of enumColumns) {
            // TODO: Should also check if values of existing type matches expected ones
            const hasEnum = await this.hasEnumType(table, column);
            const enumName = this.buildEnumName(table, column);
            // if enum with the same "enumName" is defined more then once, me must prevent double creation
            if (!hasEnum && this.createdEnumTypes.indexOf(enumName) === -1) {
                this.createdEnumTypes.push(enumName);
                upQueries.push(this.createEnumTypeSql(table, column, enumName));
                downQueries.push(this.dropEnumTypeSql(table, column, enumName));
            }
        }

        // other table creation logic...
    }

    // other methods...
}

