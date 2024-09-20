const TagsInput = ({ value, onChange }) => (
  <div className="flex flex-col items-start gap-2">
    <label
      htmlFor="form-tag"
      className="font-semibold text-lg text-label-black dark:text-white"
    >
      Tags
    </label>
    <input
      type="text"
      placeholder="#tag, #webdevelopment, #web3"
      id="form-tag"
      className="bg-white w-full px-4 py-2 rounded-lg outline-0 border-2 border-black/10 dark:border-white/30 text-black"
      onChange={onChange}
      value={value}
    />
  </div>
);

export default TagsInput;
