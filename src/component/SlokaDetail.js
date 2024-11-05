import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fluteImage from '../assets/flute.png'; // Update path based on the new location

function SlokaDetail() {
  const { chapterId } = useParams();
  const [slokaData, setSlokaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const slokasPerPage = 9;

  useEffect(() => {
    async function fetchSloka() {
      try {
        const response = await fetch(`https://api.thegita.org.in/api/v1/sloka/en/${chapterId}`);
        const data = await response.json();
        setSlokaData(data);
      } catch (error) {
        console.error("Error fetching sloka details:", error);
      } finally {
        setLoading(false);
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

  const totalPages = Math.ceil(slokaData.length / slokasPerPage);

  const currentSlokas = slokaData.slice(
    currentPage * slokasPerPage,
    (currentPage + 1) * slokasPerPage
  );

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

  return (
    <div className="flex flex-col items-center py-8">
      <div className="p-8 w-full">
        
        <div className="flex flex-col items-center  relative">
          <h2 className="text-[22px] font-bold text-center  relative z-10">
            Chapter {chapterId} - Slokas
          </h2>
          <img src={fluteImage} alt="Flute" className="w-120 h-auto mt-[-88px] mr-[34px] z-0" />
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSlokas.map((sloka, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-300 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 h-2 w-1/4 bg-orange-500 rounded-bl-lg"></div>

              <h3 className="text-xl font-bold mb-2 text-center text-blue-600">
                Sloka {sloka.slokaNumber}
              </h3>
              <p className="text-md text-gray-700 mb-1">
                <strong>
                  <span className="inline-block px-2 py-1 bg-yellow-600 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-200">
                    Speaker: {sloka.speaker}
                  </span>
                </strong>
              </p>
              <hr className="my-4 border-t-2 border-gray-300" />

              <p className="text-gray-800 mb-2">
                <strong>Sloka:</strong> {sloka.sloka}
              </p>
              <p className="text-gray-600">
                <strong>Meaning:</strong> {sloka.meaning}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`bg-red-500 text-white rounded px-4 py-2 transition duration-300 hover:bg-red-600 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`bg-green-500 text-white rounded px-4 py-2 transition duration-300 ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SlokaDetail;
