import React from "react";
import IPopUp from "../../interfaces/popup/IPopUp";

const Popup: React.FC<{ popup: IPopUp }> = ({
  popup: {
    title,
    description,
    titleColor,
    buttonConfirmColor,
    buttonConfirmBackground,
    isOpen,
    onClose,
    onConfirm,
  },
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm"></div>
          <div className="fixed flex justify-center items-center w-full h-full">
            <div className="rounded-xl bg-white p-8 shadow-md">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className={`text-xl font-semibold text-center ${titleColor}`}>
                {title}
              </h2>
              <p className={`mt-4 text-md`}>{description}</p>
              <div className="mt-12 flex gap-2">
                <button
                  onClick={onConfirm}
                  type="button"
                  className={`rounded-full ${buttonConfirmBackground}-500 hover:${buttonConfirmBackground}-400 px-4 py-2 text-sm font-medium ${buttonConfirmColor}`}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gray-200/70 hover:bg-gray-200/60 hover:text-gray-500 px-4 py-2 text-sm font-medium text-gray-600"
                  onClick={onClose}
                >
                  No, go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
