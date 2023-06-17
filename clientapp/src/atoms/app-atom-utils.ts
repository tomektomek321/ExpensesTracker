export function RecoilToggleModal(setAppRecoil: any, open: boolean) {
  setAppRecoil((prev: any) => {
    return {
      ...prev,
      viewModal: {
        ...prev.viewModal,
        open,
      }
    }
  });
}

