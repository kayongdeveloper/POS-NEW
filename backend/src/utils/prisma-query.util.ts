import {type  Prisma } from "../generated/prisma/client.js";

interface QueryParams {
    page?: number;
    limit?: number;
    search?: string;
}


interface buildQueryOptions {
    searchFields: string[];
    relationSearch?: Record<string, string[]>;

}


export const buildPaginationAndFilter = (params: QueryParams, options: buildQueryOptions) => {
    const { page = 1, limit = 10, search } = params;
    const skip = (page - 1) * limit;


    const where: Record<string, any>  = {
        deletedAt: null,
    };

    if (search) {
        const orConditions: Record<string , any>[] = [];
        //  filter for direct fields internal to the model
        options.searchFields.forEach(field => {
            orConditions.push({
                [field]: {
                    contains: search,
                    mode: 'insensitive' as Prisma.QueryMode
                }
            });
        });


        if (options.relationSearch) {
            Object.entries(options.relationSearch).forEach(([relationName, fields]) => {
                fields.forEach((field) => {
                    orConditions.push({
                        [relationName]: {
                            [field]: {
                                contains: search,
                                mode: 'insensitive' as Prisma.QueryMode
                            },
                        },
                    });
                });
            });
        }

        where.OR = orConditions;
    }

    return {
        where,
        skip,
        take : limit,
        limit,
        page,
    }

}