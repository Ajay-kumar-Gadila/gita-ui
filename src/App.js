import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src=""
          alt="Placeholder"
        />
        <div className="px-6 py-4">
        <p className="underline text-red-500">This underlined text is red.</p>

          <h3 className="font-bold text-xl mb-2 underline">Card Title</h3>
          <p className="text-gray-700 text-base ">
            Some example text to build on the card title and make up the bulk of
            the card's content.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #example
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #tag
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
