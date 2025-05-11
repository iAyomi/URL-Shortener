import { useState } from "react";
import Button from "./Button";
import Option from "./Option";

const UrlForm = ({ onSubmit, onChange, options }: UrlFormProps) => {
  const [customUrl, setCustomUrl] = useState<string>("");

  const handleOptionClick = (name: string) => {
    setCustomUrl(name);
    onChange({
      target: {
        name: "customUrl",
        value: name,
      },
    });
  };

  return (
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
          onChange={(e) => {
            setCustomUrl(e.target.value);
            onChange(e);
          }}
          value={customUrl}
        />
      </div>

      {options && (
        <div className="flex flex-col gap-y-2 text-center">
          <p className="text-xs font-semibold text-red-500 md:text-sm">
            URL already taken. Choose an alternative URL option:
          </p>
          <div className="flex gap-x-2 items-center justify-center text-xs font-semibold md:text-sm">
            {options.map(({ id, name }) => (
              <Option
                key={id}
                id={id}
                name={name}
                onClick={handleOptionClick}
              />
            ))}
          </div>
        </div>
      )}

      <Button type="submit">Shorten URL</Button>
    </form>
  );
};

export default UrlForm;

interface UrlFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: { target: { name: string; value: string } }) => void;
  options:
    | null
    | {
        id: string;
        name: string;
      }[];
}
