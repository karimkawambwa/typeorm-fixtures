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
    // Other properties of FindOptions can be defined here
}

export class SelectQueryBuilder extends QueryBuilder {
    private findOptions?: FindOptions;

    // Public Methods
    // -------------------------------------------------------------------------
    setFindOptions(findOptions: FindOptions): this {
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

    /**
     * Other methods and logic of SelectQueryBuilder class...
     */
}

