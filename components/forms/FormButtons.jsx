const FormButtons = ({ onSubmit, onClear, onCancel, isEdit }) => (
  <div className="flex flex-row gap-4 justify-start items-center">
    <button
      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
      onClick={onSubmit}
    >
      {isEdit ? "Save" : "Create"}
    </button>
    <button
      className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
      onClick={onClear}
    >
      Clear
    </button>
    <button
      className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
      onClick={onCancel}
    >
      Cancel
    </button>
  </div>
);

export default FormButtons;
