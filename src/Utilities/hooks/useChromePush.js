import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

export const useChromePush = () => {
    const push = useChrome(({ chromeHistory: { push } = {} }) => push);
    return (e, link) => {
        if (typeof push === 'function') {
            e.preventDefault();
            push(link.replace(/^.\//, '/'));
        }
    };
};
