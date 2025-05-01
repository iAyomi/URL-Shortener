import Button from "./Button";
import Hyperlink from "./Hyperlink";
import { SubHeader, BorderedText } from "./Typography";

interface FormResultsProps {
  longURL: string;
  shortURL: string;
}

const FormResults = ({ longURL, shortURL }: FormResultsProps) => {
  return (
    <div className="relative w-[90%] p-5 flex flex-col gap-y-5 items-center bg-white rounded shadow-md lg:w-1/2">
      <div className="w-full flex flex-col gap-y-3 text-center">
        <SubHeader>Your Long URL:</SubHeader>
        <BorderedText>{longURL}</BorderedText>
        <SubHeader>Your Shortened URL:</SubHeader>
        <BorderedText>{shortURL}</BorderedText>
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
