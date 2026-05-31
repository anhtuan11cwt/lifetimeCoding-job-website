import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    array: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"],
    filterType: "Địa điểm",
  },
  {
    array: ["Lập trình Frontend", "Lập trình Backend", "Lập trình FullStack"],
    filterType: "Ngành nghề",
  },
  {
    array: ["0 - 10 triệu", "10 - 20 triệu", "20 - 50 triệu"],
    filterType: "Mức lương",
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-4 rounded-md">
      <h1 className="font-bold text-lg">Lọc việc làm</h1>
      <hr className="mt-3" />
      {filterData.map((data) => (
        <div key={data.filterType}>
          <h1 className="font-bold text-lg">{data.filterType}</h1>
          <RadioGroup>
            {data.array.map((item) => (
              <div className="flex items-center space-x-2 my-2" key={item}>
                <RadioGroupItem
                  id={`${data.filterType}-${item}`}
                  value={item}
                />
                <Label htmlFor={`${data.filterType}-${item}`}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
