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

export function RecoilOpenModal(setAppRecoil: any, type: string) {
  setAppRecoil((prev: any) => {
    return {
      ...prev,
      viewModal: {
        ...prev.viewModal,
        view: type,
        open: true,
      }
    }
  });
}

export function RecoilCloseModal(setAppRecoil: any) {
  setAppRecoil((prev: any) => {
    return {
      ...prev,
      viewModal: {
        ...prev.viewModal,
        open: false,
      }
    }
  });
}