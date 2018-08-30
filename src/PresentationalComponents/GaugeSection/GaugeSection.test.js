describe('GaugeSection', () => {
    it('expect to write this test later', () => {

        const children = '<h1>Hellow</h1>';

        const wrapper = shallow(
            <div>
                {children}
            </div>
        );

        expect(wrapper.prop('children')).toContain(children);
    });
});
