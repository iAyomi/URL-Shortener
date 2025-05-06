import Button from "./Button";
import Hyperlink from "./Hyperlink";
import { SubHeader, BorderedText, Text } from "./Typography";
import { handleCopyShortURL } from "../utils";

const URLInfo = ({
  id,
  longURL,
  shortURL,
  dateCreated,
  noOfTimesAccessed,
  lastTimeAccessed,
}: URLProps) => {
  return (
    <div
      key={id}
      className="relative w-[90%] p-5 flex flex-col gap-y-3 items-start bg-white rounded shadow-md lg:w-1/2"
    >
      <div className="w-full flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <SubHeader>Your Long URL:</SubHeader>
          <BorderedText text={longURL} />
        </div>

        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <SubHeader>Your Shortened URL:</SubHeader>
          <BorderedText text={shortURL} />
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-3 md:flex-row md:gap-x-5">
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <SubHeader>Date Created:</SubHeader>
          <Text>{dateCreated}</Text>
        </div>

        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <SubHeader>No. of Times Accessed:</SubHeader>
          <Text>{noOfTimesAccessed}</Text>
        </div>

        {lastTimeAccessed && (
          <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
            <SubHeader>Last Time Accessed:</SubHeader>
            <Text>{lastTimeAccessed}</Text>
          </div>
        )}
      </div>

      <div className="w-fit flex gap-x-3">
        <Button type="button" onClick={() => handleCopyShortURL(shortURL)}>
          Copy
        </Button>
        <Hyperlink link={shortURL}>Go to Link</Hyperlink>
      </div>
    </div>
  );
};

export default URLInfo;

interface URLProps {
  id: string;
  longURL: string;
  shortURL: string;
  dateCreated: string;
  noOfTimesAccessed: number;
  lastTimeAccessed: string;
}
