import Button from "./Button";
import Hyperlink from "./Hyperlink";

interface FormResultsProps {
  longURL: string;
  shortURL: string;
}

const FormResults = ({ longURL, shortURL }: FormResultsProps) => {
  return (
    <div className="w-[90%] p-5 flex flex-col gap-y-5 items-center bg-white rounded shadow-md lg:w-1/2">
      <div className="flex flex-col gap-y-3 text-center">
        <h2 className="text-sm font-bold md:text-lg">Your Long URL:</h2>
        <p className="p-2 border-2 border-gray-600 rounded-md text-xs md:text-sm">
          {longURL}
        </p>
        <h2 className="text-sm font-bold md:text-lg">Your Shortened URL:</h2>
        <p className="p-2 border-2 border-gray-600 rounded-md text-xs md:text-sm">
          {shortURL}
        </p>
      </div>

      <div className="w-fit flex gap-x-3">
        <Button type="button">Copy</Button>
        <Hyperlink link={shortURL}>Go to Link</Hyperlink>
      </div>

      <div className="w-fit flex gap-x-3">
        <Hyperlink link="/my-urls">My URLs</Hyperlink>
        <Hyperlink link="/" self>
          Shorten another
        </Hyperlink>
      </div>
    </div>
  );
};

export default FormResults;
