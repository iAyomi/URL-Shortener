import Button from "./Button";
import Hyperlink from "./Hyperlink";
import { SubHeader, BorderedText, Text } from "./Typography";

const URLInfo = ({
  id,
  longURL,
  shortURL,
  dateCreated,
  noOfClicks,
}: URLProps) => {
  return (
    <div
      key={id}
      className="relative w-[90%] p-5 flex flex-col gap-y-3 items-start bg-white rounded shadow-md lg:w-1/2"
    >
      <div className="w-full flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <SubHeader>Your Long URL:</SubHeader>
          <BorderedText>{longURL}</BorderedText>
        </div>

        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <SubHeader>Your Shortened URL:</SubHeader>
          <BorderedText>{shortURL}</BorderedText>
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-3 md:flex-row md:gap-x-5">
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <SubHeader>Date Created:</SubHeader>
          <Text>{dateCreated}</Text>
        </div>

        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <SubHeader>No. of Clicks:</SubHeader>
          <Text>{noOfClicks}</Text>
        </div>
      </div>

      <div className="w-fit flex gap-x-3">
        <Button type="button">Copy</Button>
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
  noOfClicks: number;
}
