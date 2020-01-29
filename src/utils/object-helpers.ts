// export const updateObjecrInArray = (items, itemId, objPropName, newObjProps) => {
//     return items.map( i => {
//         if (i[objPropName] === itemId) {
//             return {...i, ...newObjProps}
//         }
//         return i;
//     })
// };

export const convertArrayToObject = (array:Array<any>, key:string) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue);
};