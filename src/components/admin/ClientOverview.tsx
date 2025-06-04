import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ClientOverview = () => {
  const [client, setClient] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
console.log("Extracted ID:", id);

if (!id) return;
    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${id}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client")
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <section className=" text-white p-4 mt-10 md:mt-0">
      <div className="mb-4 px-4 text-black bg-gray-800">
        <h1 className="text-white p-4 font-bold text-2xl">
          {client?.client_firstname + " " + client.client_lastname ?? "Loading client..."}
        </h1>
      </div>
    </section>
  );
};
