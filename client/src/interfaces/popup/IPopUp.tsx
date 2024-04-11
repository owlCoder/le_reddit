interface IPopUp {
  title: string;
  description: string;
  titleColor: string;
  buttonConfirmColor: string;
  buttonConfirmBackground: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default IPopUp;
