import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"; 
import { useMediaQuery } from 'react-responsive';

const chapters = [
  { name: "Arjuna Visada Yoga", verses: 47, img: "1", description: "Arjuna's Dilemma" },
  { name: "Sankhya Yoga", verses: 72, img: "2", description: "Transcendental Knowledge" },
  { name: "Karma Yoga", verses: 43, img: "3", description: "Path of Selfless Service" },
  { name: "Jnana Karma Yoga", verses: 42, img: "4", description: "Path of Knowledge and the Disciplines of Action" },
  { name: "Karma Sanyasa Yoga", verses: 29, img: "5", description: "Path of Renuncitaion" },
  { name: "Dhyana Yoga", verses: 47, img: "6", description: "Path of Meditation" },
  { name: "Gyaan Vigyana Yoga", verses: 30, img: "7", description: "Self - knowledge and Enlightment" },
  { name: "Akshara Brahma Yoga", verses: 28, img: "8", description: "Path of the Eternal God" },
  { name: "Raja Vidya Yoga", verses: 34, img: "9", description: "Yoga through the king of sciences" },
  { name: "Vibhooti Yoga", verses: 42, img: "10", description: "Yoga through Appreciating the Infinte Opulences of god" },
  { name: "Vishwaroopa Darshana Yoga", verses: 55, img: "11", description: "Yoga through the Cosmic Form of God" },
  { name: "Bhakti Yoga", verses: 20, img: "12", description: "The yoga of Devotion" },
  { name: "Ksetra Ksetrajna Vibhaaga Yoga", verses: 35, img: "13", description: "Yoga through distinguishing the Field and the knower of the Field" },
  { name: "Gunatraya Vibhage Yoga", verses: 27, img: "14", description: "Yoga through Understanding the three modes of material Nature " },
  { name: "Purushottama Yoga", verses: 20, img: "15", description: "The yoga of the Supreme Divine Personality" },
  { name: "Daivasura Sampad Vibhaga Yoga", verses: 24, img: "16", description: "Yoga through Discerning the Divine and Demoniac Natures" },
  { name: "Sraddhatraya Vibhaga Yoga", verses: 28, img: "17", description: "Yoga through Discerning the three divisions of Faith " },
  { name: "Moksha Sanyaas Yoga", verses: 78, img: "18", description: "Yoga through the Perfection of Renunciation and surrender" },
];

const Card = ({ chapter, index }) => (
  <div className="pt-4 max-w-sm bg-white rounded-lg overflow-hidden shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="relative">
      <img
        className="w-full h-full object-cover"
        src={`https://thegita.org.in/images/chapters/${chapter.img}.jpeg`}
        alt={`Chapter ${index + 1}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold">
        {chapter.name}
      </h2>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between ">
        <span className="inline-block bg-orange-500 rounded-full px-3 py-1 text-sm font-semibold text-white">
          Chapter {index + 1}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {chapter.verses} Verses
        </span>
      </div>
      <p className="text-gray-700 font-bold text-xl">
        {chapter.description}
      </p>
    </div>
  </div>
);

function CardGallery() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <div className="container mx-auto px-4">
      {isMobile ? (
        // Map through rows, each containing three chapters
        <>
          {[0, 3, 6, 9, 12, 15].map((startIndex) => (
            <Swiper
              key={startIndex}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              className="mb-6"
            >
              {chapters.slice(startIndex, startIndex + 3).map((chapter, index) => (
                <SwiperSlide key={index + startIndex}>
                  <Card chapter={chapter} index={index + startIndex} />
                </SwiperSlide>
              ))}
            </Swiper>
          ))}
        </>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 pt-4">
          {chapters.map((chapter, index) => (
            <Card key={index} chapter={chapter} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardGallery;
