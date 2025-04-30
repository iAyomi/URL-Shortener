import { useState } from "react";
import Button from "../components/Button";
import FormResults from "../components/FormResults";
import { formResults } from "../utils/dummyData";

const Home = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const shortenURL = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-y-5 items-center justify-center min-h-screen bg-gray-200">
      <div className="flex flex-col gap-y-3 text-center">
        <h1 className="text-xl font-extrabold md:text-3xl">
          Welcome to the Original URL Shortener!
        </h1>
        <p className="text-sm md:text-normal">
          This is a simple URL shortener application that allows you to shorten
          long URLs and manage your shortened links.
        </p>
      </div>

      <div className="w-[90%] p-5 bg-white rounded shadow-md lg:w-1/2">
        <form className="flex flex-col gap-y-3 text-center">
          <label htmlFor="url" className="text-sm font-bold md:text-lg">
            Shorten a long URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="https://example.com/very/long/url"
            className="p-2 border-2 border-gray-600 rounded-md text-xs md:text-sm"
            autoComplete="off"
            autoFocus
            required
          />
          <Button type="submit" onClick={shortenURL}>
            Shorten URL
          </Button>
        </form>
      </div>

      {formSubmitted ? (
        <FormResults
          longURL={formResults?.longURL}
          shortURL={formResults?.shortURL}
        />
      ) : null}
    </div>
  );
};

export default Home;
