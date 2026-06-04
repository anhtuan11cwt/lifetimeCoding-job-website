import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

const FilterCard = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    setSelectedFilters({});
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  const hasFilters = Object.values(selectedFilters).some(Boolean);

  return (
    <div className="w-full bg-card border border-border p-5 rounded-xl shadow-sm">
      <h1 className="font-bold text-lg">Lọc việc làm</h1>
      <div className="mt-4 space-y-5">
        {filterData.map((data) => (
          <fieldset key={data.filterType}>
            <legend className="font-semibold text-sm text-foreground mb-2">
              {data.filterType}
            </legend>
            <RadioGroup
              onValueChange={(value) =>
                handleFilterChange(data.filterType, value)
              }
              value={selectedFilters[data.filterType] || ""}
            >
              {data.array.map((item) => (
                <div className="flex items-center space-x-2 py-1" key={item}>
                  <RadioGroupItem
                    id={`${data.filterType}-${item}`}
                    value={item}
                  />
                  <Label
                    className="text-sm font-normal cursor-pointer"
                    htmlFor={`${data.filterType}-${item}`}
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>
        ))}
      </div>
      {hasFilters && (
        <Button
          className="w-full mt-5"
          onClick={clearFilters}
          variant="outline"
        >
          <RotateCcw className="mr-2 size-4" />
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );
};

export default FilterCard;
