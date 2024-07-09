import { FindOptionsWhere } from "./FindOptionsWhere";
import { FindOptionsSelect, FindOptionsSelectByString } from "./FindOptionsSelect";
import { FindOptionsRelationByString, FindOptionsRelations } from "./FindOptionsRelations";
import { FindOptionsOrder } from "./FindOptionsOrder";
import { Brackets } from "../query-builder/Brackets";
import { NotBrackets } from "../query-builder/NotBrackets";
import { SelectQueryBuilder } from "../query-builder/SelectQueryBuilder";

/**
 * Defines a special criteria to find specific entity.
 */
export interface FindOneOptions<Entity = any> {
    /**
     * Simple condition that should be applied to match entities.
     */
    where?: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity> | Brackets | NotBrackets | ((qb: SelectQueryBuilder<Entity>) => string);
    /**
     * Indicates what relations of entity should be loaded (simplified left join form).
     */
    relations?: FindOptionsRelations<Entity> | FindOptionsRelationByString[];
    /**
     * Order, in which entities should be ordered.
     */
    order?: FindOptionsOrder<Entity>;
    /**
     * Specifies what columns should be retrieved.
     */
    select?: FindOptionsSelect<Entity> | FindOptionsSelectByString[];
}

