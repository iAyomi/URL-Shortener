import Button from "./Button";
import Hyperlink from "./Hyperlink";

interface URLProps {
  id: number;
  longURL: string;
  shortURL: string;
  dateCreated: string;
  noOfClicks: number;
}

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
      className="w-[90%] p-5 flex flex-col gap-y-3 items-start bg-white rounded shadow-md lg:w-1/2"
    >
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <h2 className="text-sm font-medium">Your Long URL:</h2>
          <p className="p-1 border-2 border-gray-600 rounded-md text-xs md:text-sm">
            {longURL}
          </p>
        </div>

        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:justify-start md:items-center">
          <h2 className="text-sm font-medium">Your Shortened URL:</h2>
          <p className="p-1 border-2 border-gray-600 rounded-md text-xs md:text-sm">
            {shortURL}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-5">
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-2 md:justify-start md:items-center">
          <h2 className="text-sm font-medium">Date Created:</h2>
          <p className="text-xs md:text-sm">{dateCreated}</p>
        </div>

        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-2 md:justify-start md:items-center">
          <h2 className="text-sm font-medium">No. of Clicks:</h2>
          <p className="text-xs md:text-sm">{noOfClicks}</p>
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
