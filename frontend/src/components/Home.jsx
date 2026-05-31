import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJobCards from "@/components/LatestJobCards";
import Footer from "@/components/shared/Footer";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <div className="max-w-5xl mx-auto my-20 px-4">
        <h1 className="text-2xl font-bold">Việc làm mới và nổi bật</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <LatestJobCards key={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
