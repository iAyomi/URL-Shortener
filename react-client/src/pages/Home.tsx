import { useState } from "react";
import UrlForm from "../components/UrlForm";
import FormResults from "../components/FormResults";
import { Header, Text } from "../components/Typography";
import { API_ENDPOINTS } from "../utils/index";

const Home = () => {
  const [reqData, setReqData] = useState<null | reqDataType>(null);

  const [formValues, setFormValues] = useState({
    longURL: "",
    customUrl: "",
  });

  const handleSetFormValues = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value.trim(),
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
        <UrlForm onSubmit={handleURLSubmit} onChange={handleSetFormValues} />
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
