import { Brackets } from "./Brackets";
import { RawSqlResultsToEntityTransformer } from "./transformer/RawSqlResultsToEntityTransformer";
import { PessimisticLockTransactionRequiredError } from "../error/PessimisticLockTransactionRequiredError";
import { NoVersionOrUpdateDateColumnError } from "../error/NoVersionOrUpdateDateColumnError";
import { OptimisticLockVersionMismatchError } from "../error/OptimisticLockVersionMismatchError";
import { OptimisticLockCanNotBeUsedError } from "../error/OptimisticLockCanNotBeUsedError";
import { JoinAttribute } from "./JoinAttribute";
import { RelationIdAttribute } from "./RelationIdAttribute";
import { RelationCountAttribute } from "./RelationCountAttribute";
import { QueryBuilder } from "./QueryBuilder";
import { RelationLoader } from "../query-builder/RelationLoader";
import { RelationIdLoader } from "../query-builder/RelationIdLoader";
import { DriverUtils } from "../driver/DriverUtils";
import { EntityMetadata } from "../metadata/EntityMetadata";
import { FindOptionsUtils } from "../find-options/FindOptionsUtils";
import { TableAlias } from "./TableAlias";
import { ObjectUtils } from "../util/ObjectUtils";
import { QueryExpressionMap } from "./QueryExpressionMap";
import { ApplyValueTransformers } from "./transformer/ApplyValueTransformers";

interface FindOptions {
    where?: any;
    relations?: string[];
    order?: { [key: string]: "ASC" | "DESC" };
    select?: string[];
}

export class SelectQueryBuilder<Entity> extends QueryBuilder<Entity> {
    private findOptions?: FindOptions;

    // Public Methods
    // -------------------------------------------------------------------------
    setFindOptions(findOptions?: FindOptions): this {
        if (typeof findOptions?.where === "function" || findOptions?.where instanceof Brackets) {
            this.findOptions = {
                ...findOptions,
                where: undefined
            };
        } else {
            this.findOptions = findOptions;
        }
        this.applyFindOptions();
        if (typeof findOptions?.where === "function" || findOptions?.where instanceof Brackets) {
            this.andWhere(!(findOptions?.where instanceof Brackets) ? new Brackets(findOptions?.where) : findOptions.where);
        }
        return this;
    }

    private applyFindOptions(): void {
        if (!this.findOptions) return;

        if (this.findOptions.select) {
            this.select(this.findOptions.select);
        }

        if (this.findOptions.where) {
            this.where(this.findOptions.where);
        }

        if (this.findOptions.relations) {
            this.findOptions.relations.forEach(relation => {
                this.leftJoinAndSelect(`${this.alias}.${relation}`, relation);
            });
        }

        if (this.findOptions.order) {
            Object.keys(this.findOptions.order).forEach(key => {
                this.addOrderBy(key, this.findOptions.order[key]);
            });
        }
    }

    /**
     * Other methods and logic of SelectQueryBuilder class...
     */
}

