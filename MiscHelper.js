import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';

export const mountWithIntl = (Component) => {
    const wrapper = mount(Component, {
        wrappingComponent: IntlProvider
    });
    const provider = wrapper.getWrappingComponent();
    provider.setProps({ locale: 'en' });

    return wrapper;
};

export const shallowWithIntl = (Component) => {
    const wrapper = shallow(Component, {
        wrappingComponent: IntlProvider
    });
    const provider = wrapper.getWrappingComponent();
    provider.setProps({ locale: 'en' });

    return wrapper;
};
