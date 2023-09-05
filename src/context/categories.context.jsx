import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// data used to populate categories collection in firestore
// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    // get categories and documents from firestore
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();            
    }, []);


    const value = { categoriesMap };

    // used to populate categories collection in firestore
    // useEffect(() => {
    //     const collectionRef = addCollectionAndDocuments('categories', SHOP_DATA);
    //     console.log(collectionRef);
    // }, []);

    return <CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>
}
