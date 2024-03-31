import React, { useState, useEffect } from "react";
import "flowbite/dist/flowbite.css";
import axios from "axios";
import AddProductForm from "./AddProductForm";

const StockInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery) {
          response = await axios.get(
            `https://dummyjson.com/products/search?q=${searchQuery}`
          );
          console.log(response.data.products, "Search data...");
          setSearchResults(response.data.products);
        } else {
          response = await axios.get("https://dummyjson.com/products");
          console.log(response.data.products,"Product data..")
          setProductDetails(response.data.products);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to toggle the visibility of the popup form
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <>
      <div className="relative">
        {/* Conditionally render the AddProductForm based on isOpen state */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <AddProductForm />
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[1200px] mx-auto relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div>
            {/* <button
              className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              onClick={togglePopup}
            >
              Add Product
            </button> */}
            
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">ID</div>
        </th>
        <th scope="col" className="px-6 py-3">
          Product name
        </th>
        <th scope="col" className="px-6 py-3">
          BRAND
        </th>
        <th scope="col" className="px-6 py-3">
          Category
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
      {(searchQuery ? searchResults : productDetails)?.map((item, index) => (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="w-4 p-4">
            <div className="flex items-center">{index + 1}</div>
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.title}
          </td>
          <td className="px-6 py-4">{item.brand}</td>
          <td className="px-6 py-4">{item.category}</td>
          <td className="px-6 py-4">{item.price}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </>
  );
};

export default StockInfo;
