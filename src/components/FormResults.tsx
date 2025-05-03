import Button from "./Button";
import Hyperlink from "./Hyperlink";
import { SubHeader, BorderedText } from "./Typography";

const FormResults = ({ longURL, shortURL }: FormResultsProps) => {
  return (
    <div className="relative w-[90%] p-5 flex flex-col gap-y-5 items-center bg-white rounded shadow-md lg:w-1/2">
      <div className="w-full flex flex-col gap-y-3 items-center">
        <SubHeader>Your Long URL:</SubHeader>
        <BorderedText text={longURL} />
        <SubHeader>Your Shortened URL:</SubHeader>
        <BorderedText text={shortURL} />
      </div>

      <div className="w-fit flex gap-x-3">
        <Button type="button">Copy</Button>
        <Hyperlink link={shortURL}>Go to Link</Hyperlink>
      </div>

      <div className="w-fit flex gap-x-3">
        <Hyperlink link="/my-urls" self>
          My URLs
        </Hyperlink>
        <Hyperlink link="/" self>
          Shorten another
        </Hyperlink>
      </div>
    </div>
  );
};

export default FormResults;

interface FormResultsProps {
  longURL: string;
  shortURL: string;
}
