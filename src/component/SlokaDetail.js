import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SlokaDetail() {
  const { chapterId } = useParams();
  const [slokaData, setSlokaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSloka() {
      try {
        const response = await fetch(`https://api.thegita.org.in/api/v1/sloka/en/${chapterId}`);
        const data = await response.json();
        setSlokaData(data);
      } catch (error) {
        console.error("Error fetching sloka details:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }

    fetchSloka();
  }, [chapterId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!slokaData.length) {
    return <p className="text-center text-gray-500">No slokas found.</p>;
  }

  const totalPages = slokaData.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSlokaChange = (event) => {
    setCurrentPage(Number(event.target.value));
  };

  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <h2 className="text-2xl font-bold text-center mb-4">
          Chapter {slokaData[currentPage].chapterNumber}
        </h2>
        <h3 className="text-xl font-semibold text-center mb-2">
          Sloka {slokaData[currentPage].slokaNumber}
        </h3>
        <p className="text-md text-gray-600 mb-4">
          <strong>Speaker:</strong> {slokaData[currentPage].speaker}
        </p>
        <div className="border-l-4 border-gray-500 pl-4 mb-4">
          <p className="text-lg text-gray-800 leading-relaxed">
            <strong>Sloka:</strong> {slokaData[currentPage].sloka}
          </p>
        </div>
        <p className="text-md text-gray-500 mb-4">
          <strong>Meaning:</strong> {slokaData[currentPage].meaning}
        </p>

        {/* Dropdown for selecting sloka */}
        <div className="mb-6">
          <label htmlFor="slokaDropdown" className="block text-md font-medium text-gray-700 mb-2">
            Select Sloka:
          </label>
          <select
            id="slokaDropdown"
            value={currentPage}
            onChange={handleSlokaChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          >
            {slokaData.map((sloka, index) => (
              <option key={index} value={index}>
                Sloka {sloka.slokaNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Button Container */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`bg-red-500 text-white rounded px-4 py-2 transition duration-300 hover:bg-red-600 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`bg-green-500 text-white rounded px-4 py-2 transition duration-300 hover:bg-green-600 ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SlokaDetail;
