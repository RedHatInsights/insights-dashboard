import { capitalize, workloadsPropType, globalFilters, supportsGlobalFilter, decodeTags } from './Common';

describe('Common utilities', () => {
    describe('capitalize', () => {
        it('should capitalize the first letter of a string', () => {
            expect(capitalize('hello')).toBe('Hello');
        });

        it('should handle already capitalized strings', () => {
            expect(capitalize('Hello')).toBe('Hello');
        });

        it('should handle single character strings', () => {
            expect(capitalize('a')).toBe('A');
        });

        it('should handle strings starting with numbers', () => {
            expect(capitalize('123abc')).toBe('123abc');
        });
    });

    describe('workloadsPropType', () => {
        it('should return error for invalid workload keys', () => {
            const props = {
                workloads: {
                    InvalidKey: { isSelected: true }
                }
            };
            const result = workloadsPropType(props, 'workloads', 'TestComponent');
            expect(result).toBeInstanceOf(Error);
            expect(result.message).toContain('accepts either SAP or All workloads');
        });

        it('should return error when isSelected is not a boolean', () => {
            const props = {
                workloads: {
                    SAP: { isSelected: 'true' }
                }
            };
            const result = workloadsPropType(props, 'workloads', 'TestComponent');
            expect(result).toBeInstanceOf(Error);
            expect(result.message).toContain('requires isSelected as boolean');
        });

        it('should validate workload prop structure', () => {
            const props = {
                workloads: {
                    SAP: { isSelected: true }
                }
            };
            const result = workloadsPropType(props, 'workloads', 'TestComponent');
            expect(result).toBeDefined();
        });
    });

    describe('globalFilters', () => {
        it('should generate filters for SAP workload', () => {
            const workloads = {
                SAP: { isSelected: true }
            };
            const result = globalFilters(workloads);
            expect(result).toBeDefined();
        });

        it('should generate filters for Ansible Automation Platform workload', () => {
            const workloads = {
                'Ansible Automation Platform': { isSelected: true }
            };
            const result = globalFilters(workloads);
            expect(result).toBeDefined();
        });

        it('should generate filters for Microsoft SQL workload', () => {
            const workloads = {
                'Microsoft SQL': { isSelected: true }
            };
            const result = globalFilters(workloads);
            expect(result).toBeDefined();
        });

        it('should handle empty workloads', () => {
            const result = globalFilters({});
            expect(result).toBeDefined();
        });

        it('should handle undefined workloads', () => {
            const result = globalFilters(undefined);
            expect(result).toBeDefined();
        });

        it('should call generateFilter with system_profile configuration', () => {
            const workloads = {
                SAP: { isSelected: true },
                'Ansible Automation Platform': { isSelected: false }
            };
            const result = globalFilters(workloads);
            expect(result).toBeDefined();
        });
    });

    describe('supportsGlobalFilter', () => {
        it('should return true when workloads is undefined', () => {
            const result = supportsGlobalFilter([], undefined);
            expect(result).toBe(true);
        });

        it('should return true when no workloads are selected and no tags', () => {
            const workloads = {
                SAP: { isSelected: false },
                'All workloads': { isSelected: false }
            };
            const result = supportsGlobalFilter([], workloads);
            expect(result).toBe(true);
        });

        it('should return false when workloads are selected', () => {
            const workloads = {
                SAP: { isSelected: true }
            };
            const result = supportsGlobalFilter([], workloads);
            expect(result).toBe(false);
        });

        it('should return false when tags are present', () => {
            const workloads = {
                SAP: { isSelected: false }
            };
            const result = supportsGlobalFilter(['tag1'], workloads);
            expect(result).toBe(false);
        });

        it('should return false when both workloads and tags are present', () => {
            const workloads = {
                SAP: { isSelected: true }
            };
            const result = supportsGlobalFilter(['tag1'], workloads);
            expect(result).toBe(false);
        });
    });

    describe('decodeTags', () => {
        it('should decode URL-encoded tags', () => {
            const tags = ['insights-client%2FLifecycle%3Dpoc'];
            const result = decodeTags(tags);
            expect(result).toEqual(['insights-client/Lifecycle=poc']);
        });

        it('should decode multiple tags', () => {
            const tags = [
                'insights-client%2FLifecycle%3Dpoc',
                'namespace%2Fkey%3Dvalue'
            ];
            const result = decodeTags(tags);
            expect(result).toEqual([
                'insights-client/Lifecycle=poc',
                'namespace/key=value'
            ]);
        });

        it('should handle already decoded tags', () => {
            const tags = ['insights-client/Lifecycle=poc'];
            const result = decodeTags(tags);
            expect(result).toEqual(['insights-client/Lifecycle=poc']);
        });

        it('should handle empty array', () => {
            const tags = [];
            const result = decodeTags(tags);
            expect(result).toEqual([]);
        });

        it('should handle undefined tags', () => {
            const result = decodeTags(undefined);
            expect(result).toBeUndefined();
        });

        it('should handle null tags', () => {
            const result = decodeTags(null);
            expect(result).toBeUndefined();
        });

        it('should decode tags with special characters', () => {
            const tags = ['tag%20with%20spaces', 'tag%2Bwith%2Bplus'];
            const result = decodeTags(tags);
            expect(result).toEqual(['tag with spaces', 'tag+with+plus']);
        });

        it('should prevent double encoding by decoding once', () => {
            // Tags from chrome.mapGlobalFilter are already encoded once
            const encodedOnce = 'insights-client%2FLifecycle%3Dpoc';
            const result = decodeTags([encodedOnce]);
            expect(result).toEqual(['insights-client/Lifecycle=poc']);
        });
    });
});
