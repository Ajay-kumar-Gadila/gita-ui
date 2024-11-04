import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SlokaDetail() {
  const { chapterId } = useParams();
  const [slokaData, setSlokaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchFilters, setSearchFilters] = useState({
    slokaNumber: '',
    speaker: '',
    sloka: '',
    meaning: '',
  });

  const slokasPerPage = 10;

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

  const sortedData = [...slokaData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const filteredData = sortedData.filter((sloka) =>
    Object.keys(searchFilters).every((key) =>
      sloka[key].toString().toLowerCase().includes(searchFilters[key].toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / slokasPerPage);

  const currentSlokas = filteredData.slice(
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

  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full relative">
        <h2 className="text-2xl font-bold text-center mb-6">
          Chapter {chapterId} - Slokas
        </h2>

        {/* Responsive Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {['slokaNumber', 'speaker', 'sloka', 'meaning'].map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="py-3 px-4 text-md font-semibold text-gray-700 cursor-pointer"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key && (
                      <span>{sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'}</span>
                    )}
                  </th>
                ))}
              </tr>
              {/* Search Row */}
              <tr className="border-b border-gray-200 bg-gray-50">
                {['slokaNumber', 'speaker', 'sloka', 'meaning'].map((key) => (
                  <th key={key} className="py-2 px-4">
                    <input
                      type="text"
                      name={key}
                      value={searchFilters[key]}
                      onChange={handleSearchChange}
                      placeholder={`Search ${key}`}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentSlokas.map((sloka, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 whitespace-nowrap">{sloka.slokaNumber}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{sloka.speaker}</td>
                  <td className="py-3 px-4 whitespace-normal">{sloka.sloka}</td>
                  <td className="py-3 px-4 whitespace-normal">{sloka.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
