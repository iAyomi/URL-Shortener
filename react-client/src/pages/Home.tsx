import { useState } from "react";
import Button from "../components/Button";
import FormResults from "../components/FormResults";
import { Header, Text } from "../components/Typography";
import { API_ENDPOINTS } from "../utils/index";

const Home = () => {
  const [formValues, setFormValues] = useState({
    longURL: "",
  });

  const [reqData, setReqData] = useState<null | reqDataType>(null);

  const handleLongURLInput = (e: { target: { value: string } }) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      longURL: e.target.value.trim(),
    }));
  };

  const handleURLSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReqData(null);

    try {
      const response = await fetch(API_ENDPOINTS.ENCODE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const { data } = await response.json();
      setReqData(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 items-center justify-center min-h-screen bg-gray-200">
      <div className="flex flex-col gap-y-3 text-center">
        <Header>Welcome to the Original URL Shortener!</Header>
        <Text>
          This is a simple URL shortener application that allows you to shorten
          long URLs and manage your shortened links.
        </Text>
      </div>

      <div className="w-[90%] p-5 bg-white rounded shadow-md lg:w-1/2">
        <form
          className="flex flex-col gap-y-3 text-center"
          onSubmit={handleURLSubmit}
        >
          <label htmlFor="url" className="text-sm font-bold md:text-lg">
            Shorten a long URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com/very/long/url"
            className="p-2 border-2 border-gray-600 rounded-md text-xs md:text-sm"
            autoComplete="off"
            autoFocus
            required
            onChange={handleLongURLInput}
          />
          <Button type="submit">Shorten URL</Button>
        </form>
      </div>

      {reqData && (
        <FormResults longURL={reqData?.longURL} shortURL={reqData?.shortURL} />
      )}
    </div>
  );
};

export default Home;

type reqDataType = {
  longURL: string;
  shortURL: string;
};
