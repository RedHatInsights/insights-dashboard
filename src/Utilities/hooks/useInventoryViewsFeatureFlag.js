import { useFeatureFlag } from '../Hooks';

export const INVENTORY_VIEWS_FLAG = 'ui.inventory-views';

export const useInventoryViewsFeatureFlag = () => {
  const hasUnleashFlag = useFeatureFlag(INVENTORY_VIEWS_FLAG);
  const hasLocalFlag = localStorage.getItem(INVENTORY_VIEWS_FLAG) === 'true';

  return hasUnleashFlag || hasLocalFlag;
};

export default useInventoryViewsFeatureFlag;
