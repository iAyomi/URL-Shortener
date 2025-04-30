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
      className="w-1/2 p-5 flex flex-col gap-y-3 items-center bg-white rounded shadow-md"
    >
      <div className="flex flex-col gap-y-3 text-center">
        <div className="flex justify-center items-center gap-x-3">
          <h2 className="text-sm font-medium">Your Long URL:</h2>
          <p className="p-1 border-2 border-gray-600 rounded-md">{longURL}</p>
        </div>

        <div className="flex justify-center items-center gap-x-3">
          <h2 className="text-sm font-medium">Your Shortened URL:</h2>
          <p className="p-1 border-2 border-gray-600 rounded-md">{shortURL}</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-5">
        <div className="flex justify-center items-center gap-x-2">
          <h2 className="text-sm font-medium">Date Created:</h2>
          <p>{dateCreated}</p>
        </div>

        <div className="flex justify-center items-center gap-x-2">
          <h2 className="text-sm font-medium">No. of Clicks:</h2>
          <p>{noOfClicks}</p>
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
