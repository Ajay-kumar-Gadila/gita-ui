// App.js
import React from "react";
import "./App.css";
import CardGallery from "./component/CardGallery";
import "swiper/css";

function App() {
  return (
    <div className="App">
      <header className=" text-black  pt-8">
        <h1 className="text-4xl font-bold text-center ">Bhagavad Gita Chapters</h1>
        </header>
      <CardGallery />
    </div>
  );
}

export default App;
