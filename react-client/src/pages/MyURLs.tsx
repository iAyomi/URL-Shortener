import { useState, useEffect } from "react";
import URLInfo from "../components/URLInfo";
import { API_ENDPOINTS } from "../utils";

const MyURLs = () => {
  const [searchValue, setSearchValue] = useState("");
  const [urlList, setUrlList] = useState<urlType[]>([]);

  const handleSearchValueInput = (e: { target: { value: string } }) => {
    const inputValue = e.target.value.trim();

    if (inputValue.length === 0) {
      setSearchValue("");
    }

    if (inputValue.length > 2) {
      setSearchValue(inputValue);
    }
  };

  const fetchMyURLs = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.LIST}${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data } = await response.json();
      setUrlList(data?.filteredURLs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyURLs();
  }, [searchValue]);

  return (
    <div className="py-40 flex flex-col gap-y-5 items-center justify-center min-h-screen bg-gray-200">
      <div className="w-[90%] flex gap-x-3 justify-start items-center lg:w-1/2">
        <label htmlFor="searchValue" className="text-sm font-bold md:text-lg">
          Search
        </label>

        <input
          type="text"
          id="searchValue"
          name="searchValue"
          placeholder="Search for a URL"
          className="w-full p-2 border-2 border-gray-600 rounded-md text-xs md:text-sm"
          onChange={(e) => handleSearchValueInput(e)}
        />
      </div>

      {urlList.map((url) => (
        <URLInfo
          key={url?.id}
          id={url?.id}
          longURL={url?.longURL}
          shortURL={url?.shortURL}
          dateCreated={url?.dateCreated}
          noOfTimesAccessed={url?.accessCount}
          lastTimeAccessed={url?.lastTimeAccessed}
        />
      ))}
    </div>
  );
};

export default MyURLs;

type urlType = {
  id: string;
  longURL: string;
  shortURL: string;
  dateCreated: string;
  accessCount: number;
  lastTimeAccessed: string;
};
