const categoryType = [
    {
        value: 1,
        name: "Personal",
    },
    {
        value: 2,
        name: "Work",
    },
    {
        value: 3,
        name: "Others",
    },
]

const findCategoryType = (value: number) => {
    return categoryType.find(item => item.value === value)
}

export {
    categoryType,
    findCategoryType,
};