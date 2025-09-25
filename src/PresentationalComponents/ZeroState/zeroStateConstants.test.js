import { formatBrandName } from './zeroStateConstants';

describe('formatBrandName', () => {
    it('should handle "Insights" brand name with includeRedHat true', () => {
        const result = formatBrandName('Insights', true);
        expect(result).toBe('Red Hat Insights');
    });

    it('should handle "Red Hat Lightspeed" brand name with includeRedHat true', () => {
        const result = formatBrandName('Red Hat Lightspeed', true);
        expect(result).toBe('Red Hat Lightspeed');
    });

    it('should handle "Red Hat Insights" brand name with includeRedHat false', () => {
        const result = formatBrandName('Red Hat Insights', false);
        expect(result).toBe('Red Hat Insights');
    });
});
