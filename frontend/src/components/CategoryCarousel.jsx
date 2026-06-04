import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const category = [
  "Lập trình Frontend",
  "Lập trình Backend",
  "Khoa học dữ liệu",
  "Thiết kế đồ họa",
  "Lập trình FullStack",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-12 lg:px-24 xl:px-40">
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/2 lg:basis-1/3"
              key={cat}
            >
              <Button
                className="rounded-full"
                onClick={() => navigate(`/jobs?query=${cat}`)}
                variant="outline"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
