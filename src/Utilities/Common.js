// For common helpers used throughout app
import { generateFilter } from '@redhat-cloud-services/frontend-components-utilities/helpers/helpers';
const SAP_KEYS = ['SAP', 'All workloads'];

const capitalize = (string) => string[0].toUpperCase() + string.substring(1);
const workloadsPropType = (props, propName, componentName) => {
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

const globalFilters = (workloads, SID) => generateFilter({
    system_profile: {
        ...workloads?.SAP?.isSelected && { sap_system: true },
        ...workloads?.['Ansible Automation Platform']?.isSelected
            && { ansible: 'not_nil' },
        ...workloads?.['Microsoft SQL']?.isSelected
            && { mssql: 'not_nil' },
        ...SID?.length > 0 && { sap_sids: SID }
    }
}, undefined, { arrayEnhancer: 'contains' });

const supportsGlobalFilter = (selectedTags, workloads, SID) => workloads === undefined ||
    !Object.values(workloads).map(value => value.isSelected).reduce((res, cur) => res || cur, false) &&
    selectedTags.length === 0 && Object.entries(SID).length === 0;

export { capitalize, workloadsPropType, globalFilters, supportsGlobalFilter };
