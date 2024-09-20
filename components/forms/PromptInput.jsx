const PromptInput = ({ value, onChange }) => (
  <div className="flex flex-col items-start gap-2">
    <label
      htmlFor="form-textarea"
      className="font-semibold text-lg text-label-black dark:text-white"
    >
      Your Prompt
    </label>
    <textarea
      placeholder="Write your prompt here..."
      id="form-textarea"
      className="bg-white w-full h-[200px] resize-none px-4 py-2 rounded-lg outline-0 border-2 border-black/10 dark:border-white/30 text-black"
      onChange={onChange}
      value={value}
    ></textarea>
  </div>
);

export default PromptInput;
