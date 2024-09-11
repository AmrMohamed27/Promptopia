const Modal = ({
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  handleConfirm,
  handleCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-black border-2 border-transparent dark:border-white rounded-lg p-8 shadow-lg text-black dark:text-white">
        <h2 className="text-xl font-bold mb-4 ">Are you sure?</h2>
        <p className="text-gray-700 dark:text-white/60 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
          <button
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
