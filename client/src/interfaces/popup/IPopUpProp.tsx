interface IPopUpProp {
  SetUpPopup: (
    title: string,
    description: string,
    titleColor: string,
    buttonConfirmColor: string,
    buttonConfirmBackground: string,
    onConfirm: () => void
  ) => void;
}

export default IPopUpProp;
