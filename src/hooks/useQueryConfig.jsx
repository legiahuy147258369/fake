
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import useQueryParams from './useQuery';




export default function useQueryConfig() {
    const queryParams = useQueryParams()
    const queryConfig = omitBy(
        {
            page: queryParams.page || 1,
            limit: queryParams.limit || 10,
            sort: queryParams.sort,
            search: queryParams.search,
            filterMaxPrice: queryParams.filterMaxPrice,
            filterMinPrice: queryParams.filterMinPrice,
            category: queryParams.category
        },
        isUndefined
    )
    return queryConfig
}