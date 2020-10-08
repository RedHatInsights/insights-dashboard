// For common helpers used throughout app
const SAP_KEYS = ['SAP', 'All workloads'];
export const capitalize = (string) => string[0].toUpperCase() + string.substring(1);
export const workloadsPropType = (props, propName, componentName) => {
    let error;
    const prop = props?.[propName];
    if (typeof props !== 'object') {
        error = new Error(`\`${componentName}\` only accepts object as \`${propName}\` prop.`);
    }

    const keys = Object.keys(prop);
    if (keys.some((key) => !SAP_KEYS.includes(key))) {
        error = new Error(`\`${componentName}\` accepts either SAP or All workloads as \`${propName}.\` prop.`);
    }

    if (keys.find((key) => SAP_KEYS.includes(key))?.length > 1) {
        error = new Error(`\`${componentName}\` accepts only one of SAP or All workloads as \`${propName}.\` prop.`);
    }

    const values = Object.values(prop);
    const foundIncorrect = values.findIndex(({ isSelected }) => isSelected !== undefined && typeof isSelected !== 'boolean');
    if (foundIncorrect !== -1) {
        error = new Error(`\`${componentName}\` requires isSelected as boolean prop in \`${propName}.${keys?.[foundIncorrect]}\`.`);
    }

    return error;
};
