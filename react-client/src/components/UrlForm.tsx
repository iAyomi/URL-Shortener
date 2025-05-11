import Button from "./Button";

const UrlForm = ({ onSubmit, onChange }: UrlFormProps) => {
  return (
    <>
      <form className="flex flex-col gap-y-3 text-start" onSubmit={onSubmit}>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="longURL" className="text-sm font-bold md:text-lg">
            Enter the URL you want to shorten:
          </label>
          <input
            type="url"
            id="longURL"
            name="longURL"
            placeholder="https://example.com/very/long/url"
            className="p-2 border-2 border-gray-600 rounded-md text-xs md:text-sm"
            autoComplete="off"
            autoFocus
            required
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="customUrl" className="text-sm font-bold md:text-lg">
            Do you have a custom URL in mind?
          </label>
          <input
            type="text"
            id="customUrl"
            name="customUrl"
            placeholder="short.url"
            className="p-2 border-2 border-gray-600 rounded-md text-xs md:text-sm"
            autoComplete="off"
            maxLength={7}
            onChange={onChange}
          />
        </div>

        <Button type="submit">Shorten URL</Button>
      </form>
    </>
  );
};

export default UrlForm;

interface UrlFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
