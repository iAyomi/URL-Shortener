import URLInfo from "../components/URLInfo";
import { myURLs } from "../utils/dummyData";

const MyURLs = () => {
  return (
    <div className="py-40 flex flex-col gap-y-5 items-center justify-center min-h-screen bg-gray-200">
      <div className="w-1/2 flex gap-x-3 justify-start items-center">
        <label htmlFor="searchValue" className="text-xl font-bold">
          Search
        </label>

        <input
          type="text"
          id="searchValue"
          name="searchValue"
          placeholder="Search for a URL"
          className="w-full p-2 border-2 border-gray-600 rounded-md"
        />
      </div>

      {myURLs.map((myUrl) => (
        <URLInfo
          key={myUrl?.id}
          id={myUrl?.id}
          longURL={myUrl?.longURL}
          shortURL={myUrl?.shortURL}
          dateCreated={myUrl?.dateCreated}
          noOfClicks={myUrl?.noOfClicks}
        />
      ))}
    </div>
  );
};

export default MyURLs;
