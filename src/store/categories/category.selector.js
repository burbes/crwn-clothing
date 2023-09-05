import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
    console.log('selector 1 fired');
    return state.categories;
}


export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        console.log('selector 2 fired');
        return categoriesSlice.categories
    }
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        console.log('selector 3 fired');
        return categories.reduce((accumulator, category) => {
            const { title, items } = category;
            accumulator[title.toLowerCase()] = items;
            return accumulator;
        }, {})
    }
    // always returns a new object
);


