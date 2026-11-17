export interface SelectedWorkspace {
  id: string;
  name: string;
}

export const useSelectedWorkspace = (): SelectedWorkspace | undefined =>
  // TODO(RHCLOUD-48799): return the chrome selection once the consumer API ships
  undefined;
