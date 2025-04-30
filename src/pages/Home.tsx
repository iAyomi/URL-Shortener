import Button from "../components/Button";
import Hyperlink from "../components/Hyperlink";
import { formResults } from "../utils/dummyData";

const Home = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center justify-center min-h-screen bg-gray-200">
      <div className="flex flex-col gap-y-3 text-center">
        <h1 className="text-3xl font-extrabold">
          Welcome to the Original URL Shortener!
        </h1>
        <p>
          This is a simple URL shortener application that allows you to shorten
          long URLs and manage your shortened links.
        </p>
      </div>

      <div className="w-1/2 p-5 bg-white rounded shadow-md">
        <form className="flex flex-col gap-y-3 text-center">
          <label htmlFor="url" className="text-xl font-bold">
            Shorten a long URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="https://example.com/very/long/url"
            className="p-2 border-2 border-gray-600 rounded-md"
            required
          />
          <Button type="submit">Shorten URL</Button>
        </form>
      </div>

      <div className="w-1/2 p-5 flex flex-col gap-y-5 items-center bg-white rounded shadow-md">
        <div className="flex flex-col gap-y-3 text-center">
          <h2 className="text-xl font-bold">Your Long URL:</h2>
          <p className="p-2 border-2 border-gray-600 rounded-md">
            {formResults?.longURL}
          </p>
          <h2 className="text-xl font-bold">Your Shortened URL:</h2>
          <p className="p-2 border-2 border-gray-600 rounded-md">
            {formResults?.shortURL}
          </p>
        </div>

        <div className="w-fit flex gap-x-3">
          <Button type="button">Copy</Button>
          <Hyperlink link={formResults?.shortURL}>Go to Link</Hyperlink>
        </div>

        <div className="w-fit flex gap-x-3">
          <Hyperlink link="/my-urls">My URLs</Hyperlink>
          <Hyperlink link="/" self>
            Shorten another
          </Hyperlink>
        </div>
      </div>
    </div>
  );
};

export default Home;
