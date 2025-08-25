/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  X,
  Home,
  Building,
  Mountain,
  LandPlot,
  Store,
  Hotel,
  Bed,
  Bath,
  Ruler,
  DollarSign,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

// Types
type PropertyType =
  | "villa"
  | "apartment"
  | "chalet"
  | "land"
  | "building"
  | "office"
  | "shop"
  | "all";
type PurposeType = "rent" | "sale" | "all";
type FurnishingType = "furnished" | "unfurnished" | "semi-furnished" | "all";
type ConditionType = "new" | "used" | "under-construction" | "all";

interface FilterState {
  city: string;
  district: string;
  propertyType: PropertyType;
  purpose: PurposeType;
  priceRange: [number, number];
  bedrooms: number;
  bathrooms: number;
  furnishing: FurnishingType;
  condition: ConditionType;
  area: number;
}

// Data
const saudiCities = [
  {
    id: "riyadh",
    name: "الرياض",
    districts: [
      "الملز",
      "المرسلات",
      "النخيل",
      "العليا",
      "اليرموك",
      "الشميسي",
      "الغربية",
      "المربع",
      "الشفا",
      "الناصرية",
      "المروج",
      "الرحمانية",
    ],
  },
  {
    id: "jeddah",
    name: "جدة",
    districts: [
      "الشاطئ",
      "النسيم",
      "الروضة",
      "الزهراء",
      "السلامة",
      "الرحمانية",
      "الحمراء",
      "الثغر",
      "المنتزه",
      "الفيحاء",
      "الاندلس",
      "النهضة",
    ],
  },
  {
    id: "dammam",
    name: "الدمام",
    districts: [
      "المنطقة الوسطى",
      "الكرامة",
      "النهضة",
      "الفيحاء",
      "المركز",
      "الشفاء",
      "الروضة",
      "العزيزية",
      "الخليج",
      "الجبيل",
      "الظهران",
      "القطيف",
    ],
  },
  {
    id: "khobar",
    name: "الخبر",
    districts: [
      "الراكة",
      "الحزام الذهبي",
      "التحلية",
      "الغربية",
      "الشاطئ",
      "النخيل",
      "الروضة",
      "العليا",
      "المحمدية",
      "الجزيرة",
      "الحمراء",
      "المرجان",
    ],
  },
  {
    id: "makkah",
    name: "مكة",
    districts: [
      "العزيزية",
      "الزاهر",
      "الشبيكة",
      "الشرائع",
      "الجموم",
      "العوالي",
      "الطنداوي",
      "الهجرة",
      "النسيم",
      "الزاهر",
      "الشوقية",
      "المنصور",
    ],
  },
  {
    id: "medina",
    name: "المدينة",
    districts: [
      "العزيزية",
      "المنتزة",
      "السلام",
      "العالية",
      "الخالدية",
      "قربان",
      "الرحبة",
      "العيون",
      "السهوة",
      "السيح",
      "البدائع",
      "العالية",
    ],
  },
];

const propertyTypes = [
  { value: "apartment", label: "شقة", icon: Building },
  { value: "villa", label: "فيلا", icon: Home },
  { value: "land", label: "أرض", icon: LandPlot },
  { value: "building", label: "عمارة", icon: Building },
  { value: "office", label: "مكتب", icon: Building },
  { value: "shop", label: "محل", icon: Store },
  { value: "chalet", label: "شاليه", icon: Mountain },
  { value: "all", label: "الكل", icon: Hotel },
];

// Utility Functions
const formatNumber = (num: number) => {
  return num.toLocaleString();
};

// Components

// City Selection Component
interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => (
  <div className="filter-item">
    <Label className="mb-3 block font-medium text-gray-700 text-right text-base">
      المدينة
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-12 text-base">
        <SelectValue placeholder="اختر المدينة" />
      </SelectTrigger>
      <SelectContent>
        {saudiCities.map((city) => (
          <SelectItem key={city.id} value={city.id} className="text-base">
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// District Selection Component
interface DistrictSelectProps {
  cityId: string;
  value: string;
  onChange: (value: string) => void;
}

const DistrictSelect: React.FC<DistrictSelectProps> = ({ cityId, value, onChange }) => {
  const filteredDistricts = cityId
    ? saudiCities.find((city) => city.id === cityId)?.districts || []
    : [];

  if (!cityId) return null;

  return (
    <div className="filter-item">
      <Label className="mb-3 block font-medium text-gray-700 text-right text-base">
        المنطقة
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-12 text-base">
          <SelectValue placeholder="اختر المنطقة" />
        </SelectTrigger>
        <SelectContent>
          {filteredDistricts.map((district) => (
            <SelectItem key={district} value={district} className="text-base">
              {district}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Property Type Selection Component
interface PropertyTypeSelectProps {
  value: PropertyType;
  onChange: (value: PropertyType) => void;
}

const PropertyTypeSelect: React.FC<PropertyTypeSelectProps> = ({ value, onChange }) => (
  <div className="filter-item">
    <Label className="mb-3 block font-medium text-gray-700 text-right text-base">
      نوع العقار
    </Label>
    <div className="grid grid-cols-4 gap-3">
      {propertyTypes.map((type) => {
        const IconComponent = type.icon;
        return (
          <Button
            key={type.value}
            variant={value === type.value ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(type.value as PropertyType)}
            className="h-16 flex flex-col gap-2 text-sm border-gray-300 p-2"
          >
            <IconComponent size={16} />
            {type.label}
          </Button>
        );
      })}
    </div>
  </div>
);

// Purpose Selection Component
interface PurposeSelectProps {
  value: PurposeType;
  onChange: (value: PurposeType) => void;
}

const PurposeSelect: React.FC<PurposeSelectProps> = ({ value, onChange }) => (
  <div className="filter-item">
    <Label className="mb-3 block font-medium text-gray-700 text-right text-base">
      نوع العرض
    </Label>
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant={value === "rent" ? "default" : "outline"}
        className="h-12 border-gray-300 text-base"
        onClick={() => onChange(value === "rent" ? "all" : "rent")}
      >
        إيجار
      </Button>
      <Button
        variant={value === "sale" ? "default" : "outline"}
        className="h-12 border-gray-300 text-base"
        onClick={() => onChange(value === "sale" ? "all" : "sale")}
      >
        بيع
      </Button>
    </div>
  </div>
);

// Price Range Component
interface PriceRangeProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ value, onChange }) => (
  <div className="filter-item">
    <div className="flex justify-between items-center mb-3">
      <Label className="font-medium text-gray-700 text-right text-base flex items-center gap-2">
        <DollarSign size={16} className="text-blue-600" />
        السعر (ريال سعودي)
      </Label>
      <span className="text-base text-blue-600 font-medium">
        {formatNumber(value[0])} - {formatNumber(value[1])} ر.س
      </span>
    </div>
    <Slider
      min={0}
      max={10000000}
      step={100000}
      value={value}
      onValueChange={(newValue) => onChange(newValue as [number, number])}
      className="my-4 w-full"
    />
    <div className="flex justify-between text-sm text-gray-500">
      <span>0 ر.س</span>
      <span>10,000,000 ر.س</span>
    </div>
  </div>
);

// Rooms and Bathrooms Component
interface RoomsBathroomsProps {
  bedrooms: number;
  bathrooms: number;
  onBedroomsChange: (value: number) => void;
  onBathroomsChange: (value: number) => void;
}

const RoomsBathrooms: React.FC<RoomsBathroomsProps> = ({
  bedrooms,
  bathrooms,
  onBedroomsChange,
  onBathroomsChange,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="filter-item">
      <Label className="mb-3 font-medium text-gray-700 text-right text-base flex items-center gap-2">
        <Bed size={16} className="text-blue-600" />
        الغرف
      </Label>
      <Select
        value={bedrooms.toString()}
        onValueChange={(value) => onBedroomsChange(parseInt(value))}
      >
        <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-12 text-base">
          <SelectValue placeholder="أي عدد" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0" className="text-base">أي عدد</SelectItem>
          <SelectItem value="1" className="text-base">1+</SelectItem>
          <SelectItem value="2" className="text-base">2+</SelectItem>
          <SelectItem value="3" className="text-base">3+</SelectItem>
          <SelectItem value="4" className="text-base">4+</SelectItem>
          <SelectItem value="5" className="text-base">5+</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="filter-item">
      <Label className="mb-3 font-medium text-gray-700 text-right text-base flex items-center gap-2">
        <Bath size={16} className="text-blue-600" />
        الحمامات
      </Label>
      <Select
        value={bathrooms.toString()}
        onValueChange={(value) => onBathroomsChange(parseInt(value))}
      >
        <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-12 text-base">
          <SelectValue placeholder="أي عدد" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0" className="text-base">أي عدد</SelectItem>
          <SelectItem value="1" className="text-base">1+</SelectItem>
          <SelectItem value="2" className="text-base">2+</SelectItem>
          <SelectItem value="3" className="text-base">3+</SelectItem>
          <SelectItem value="4" className="text-base">4+</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

// Area Component
interface AreaSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const AreaSelect: React.FC<AreaSelectProps> = ({ value, onChange }) => (
  <div className="filter-item">
    <div className="flex justify-between items-center mb-3">
      <Label className="font-medium text-gray-700 text-right text-base flex items-center gap-2">
        <Ruler size={16} className="text-blue-600" />
        المساحة (م²)
      </Label>
      <span className="text-base text-blue-600 font-medium">
        {value > 0 ? `من ${formatNumber(value)} م²` : "أي مساحة"}
      </span>
    </div>
    <Slider
      min={0}
      max={1000}
      step={10}
      value={[value]}
      onValueChange={(newValue) => onChange(newValue[0])}
      className="my-4 w-full"
    />
    <div className="flex justify-between text-sm text-gray-500">
      <span>0 م²</span>
      <span>1000 م²</span>
    </div>
  </div>
);

// Furnishing and Condition Component
interface FurnishingConditionProps {
  furnishing: FurnishingType;
  condition: ConditionType;
  onFurnishingChange: (value: FurnishingType) => void;
  onConditionChange: (value: ConditionType) => void;
}

const FurnishingCondition: React.FC<FurnishingConditionProps> = ({
  furnishing,
  condition,
  onFurnishingChange,
  onConditionChange,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="filter-item">
      <Label className="mb-3 block font-medium text-gray-700 text-right text-base">
        التجهيز
      </Label>
      <Select value={furnishing} onValueChange={onFurnishingChange}>
        <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-12 text-base">
          <SelectValue placeholder="جميع الأنواع" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-base">جميع الأنواع</SelectItem>
          <SelectItem value="furnished" className="text-base">مؤثثة</SelectItem>
          <SelectItem value="semi-furnished" className="text-base">شبه مؤثثة</SelectItem>
          <SelectItem value="unfurnished" className="text-base">غير مؤثثة</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="filter-item">
      <Label className="mb-3 block font-medium text-gray-700 text-right text-base">
        الحالة
      </Label>
      <Select value={condition} onValueChange={onConditionChange}>
        <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-12 text-base">
          <SelectValue placeholder="جميع الحالات" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-base">جميع الحالات</SelectItem>
          <SelectItem value="new" className="text-base">جديد</SelectItem>
          <SelectItem value="used" className="text-base">مستعمل</SelectItem>
          <SelectItem value="under-construction" className="text-base">قيد الإنشاء</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

// Main Filter Drawer Component
export default function FilterDrawer() {
  const [filters, setFilters] = useState<FilterState>({
    city: "",
    district: "",
    propertyType: "all",
    purpose: "all",
    priceRange: [0, 5000000],
    bedrooms: 0,
    bathrooms: 0,
    furnishing: "all",
    condition: "all",
    area: 0,
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current && contentRef.current) {
      gsap.set(contentRef.current, { y: 20, opacity: 0 });
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open && contentRef.current) {
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    if (
      value &&
      value !== "" &&
      value !== 0 &&
      value !== "all" &&
      !(Array.isArray(value) && value[0] === 0 && value[1] === 5000000)
    ) {
      if (!activeFilters.includes(key)) {
        setActiveFilters((prev) => [...prev, key]);
      }
    } else {
      setActiveFilters((prev) => prev.filter((filter) => filter !== key));
    }
  };

  const resetFilters = () => {
    setFilters({
      city: "",
      district: "",
      propertyType: "all",
      purpose: "all",
      priceRange: [0, 5000000],
      bedrooms: 0,
      bathrooms: 0,
      furnishing: "all",
      condition: "all",
      area: 0,
    });
    setActiveFilters([]);
  };

  const applyFilters = () => {
    console.log("Applied filters:", filters);
  };

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        
          <Image src="/images/search.svg" alt="search" width={300} height={170} className="  h-[40px]" />
          {/* {activeFilters.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute top-0 right-0 h-6 w-6 p-0 flex items-center justify-center bg-blue-600 text-white rounded-full"
            >
              {activeFilters.length}
            </Badge>
          )} */}
        
      </DrawerTrigger>

      <DrawerContent className="max-h-[90vh] overflow-hidden" ref={drawerRef}>
        <DrawerHeader className="pb-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold flex items-center gap-3 text-gray-800">
              <MapPin size={20} className="text-blue-600" />
              فلترة العقارات
            </DrawerTitle>
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-sm text-gray-500 hover:text-gray-700 py-2 px-3"
              >
                مسح الكل
                <X size={16} className="mr-1" />
              </Button>
            )}
          </div>
        </DrawerHeader>

        <div className="p-5 overflow-y-auto bg-gray-50" ref={contentRef}>
          <div className="grid gap-6 pb-4">
            <CitySelect
              value={filters.city}
              onChange={(value) => handleFilterChange("city", value)}
            />

            <DistrictSelect
              cityId={filters.city}
              value={filters.district}
              onChange={(value) => handleFilterChange("district", value)}
            />

            <PropertyTypeSelect
              value={filters.propertyType}
              onChange={(value) => handleFilterChange("propertyType", value)}
            />

            <PurposeSelect
              value={filters.purpose}
              onChange={(value) => handleFilterChange("purpose", value)}
            />

            <PriceRange
              value={filters.priceRange}
              onChange={(value) => handleFilterChange("priceRange", value)}
            />

            <RoomsBathrooms
              bedrooms={filters.bedrooms}
              bathrooms={filters.bathrooms}
              onBedroomsChange={(value) => handleFilterChange("bedrooms", value)}
              onBathroomsChange={(value) => handleFilterChange("bathrooms", value)}
            />

            <AreaSelect
              value={filters.area}
              onChange={(value) => handleFilterChange("area", value)}
            />

            <FurnishingCondition
              furnishing={filters.furnishing}
              condition={filters.condition}
              onFurnishingChange={(value) => handleFilterChange("furnishing", value)}
              onConditionChange={(value) => handleFilterChange("condition", value)}
            />
          </div>
        </div>

        <DrawerFooter className="pt-5 border-t bg-white sticky bottom-0">
          <div className="grid grid-cols-2 gap-4">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="h-12 border-gray-300 hover:bg-gray-100 text-gray-700 text-base"
                onClick={resetFilters}
              >
                إعادة ضبط
              </Button>
            </DrawerClose>
            <Button
              className="h-12 bg-blue-600 hover:bg-blue-700 text-base"
              onClick={applyFilters}
            >
              تطبيق الفلاتر
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}