import GaugeSection from './GaugeSection';

import renderer from 'react-test-renderer';

describe('GaugeSection', () => {
    it('expect GaugeSection to render GaugeSection', () => {
        const renders = renderer.create(
            <GaugeSection label='advisor' value={75} identifier='advisor-gauge'>
                {children}
            </GaugeSection>
        ).toJSON();

        expect(renders).toMatchSnapshot;
    });
});
