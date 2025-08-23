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
  Filter,
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

// Define types for our filter values
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

// Saudi cities and districts data
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
    // Initialize GSAP animations when component mounts
    if (drawerRef.current && contentRef.current) {
      gsap.set(contentRef.current, { y: 20, opacity: 0 });
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open && contentRef.current) {
      // Animate in
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

    // Update active filters
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
    // Here you would typically apply the filters to your data
    console.log("Applied filters:", filters);
  };

  // Filter districts based on selected city
  const filteredDistricts = filters.city
    ? saudiCities.find((city) => city.id === filters.city)?.districts || []
    : [];

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="font-medium gap-2 bg-white">
          <Filter size={16} />
          فتح الفلاتر
          {activeFilters.length > 0 && (
            <Badge
              variant="secondary"
              className="mr-1 h-5 w-5 p-0 flex items-center justify-center bg-blue-600 text-white"
            >
              {activeFilters.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[90vh] overflow-hidden" ref={drawerRef}>
        <DrawerHeader className="pb-3 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
              <MapPin size={18} className="text-blue-600" />
              فلترة العقارات
            </DrawerTitle>
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                مسح الكل
                <X size={14} className="mr-1" />
              </Button>
            )}
          </div>
        </DrawerHeader>

        <div className="p-4 overflow-y-auto bg-gray-50" ref={contentRef}>
          <div className="grid gap-5 pb-4">
            {/* المدينة */}
            <div className="filter-item">
              <Label className="mb-2 block font-medium text-gray-700 text-right">
                المدينة
              </Label>
              <Select
                value={filters.city}
                onValueChange={(value) => handleFilterChange("city", value)}
              >
                <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-10">
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {saudiCities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* المنطقة */}
            {filters.city && (
              <div className="filter-item">
                <Label className="mb-2 block font-medium text-gray-700 text-right">
                  المنطقة
                </Label>
                <Select
                  value={filters.district}
                  onValueChange={(value) =>
                    handleFilterChange("district", value)
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-10">
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* نوع العقار */}
            <div className="filter-item">
              <Label className="mb-2 block font-medium text-gray-700 text-right">
                نوع العقار
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {propertyTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <Button
                      key={type.value}
                      variant={
                        filters.propertyType === type.value
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleFilterChange(
                          "propertyType",
                          type.value as PropertyType
                        )
                      }
                      className="h-14 flex flex-col gap-1 text-xs border-gray-300"
                    >
                      <IconComponent size={14} />
                      {type.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* نوع العرض */}
            <div className="filter-item">
              <Label className="mb-2 block font-medium text-gray-700 text-right">
                نوع العرض
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={filters.purpose === "rent" ? "default" : "outline"}
                  className="h-10 border-gray-300"
                  onClick={() =>
                    handleFilterChange(
                      "purpose",
                      filters.purpose === "rent" ? "all" : "rent"
                    )
                  }
                >
                  إيجار
                </Button>
                <Button
                  variant={filters.purpose === "sale" ? "default" : "outline"}
                  className="h-10 border-gray-300"
                  onClick={() =>
                    handleFilterChange(
                      "purpose",
                      filters.purpose === "sale" ? "all" : "sale"
                    )
                  }
                >
                  بيع
                </Button>
              </div>
            </div>

            {/* السعر */}
            <div className="filter-item">
              <div className="flex justify-between items-center mb-2">
                <Label className="block font-medium text-gray-700 text-right flex items-center gap-1">
                  <DollarSign size={14} className="text-blue-600" />
                  السعر (ريال سعودي)
                </Label>
                <span className="text-sm text-blue-600 font-medium">
                  {formatNumber(filters.priceRange[0])} -{" "}
                  {formatNumber(filters.priceRange[1])} ر.س
                </span>
              </div>
              <Slider
                min={0}
                max={10000000}
                step={100000}
                value={filters.priceRange}
                onValueChange={(value) =>
                  handleFilterChange("priceRange", value as [number, number])
                }
                className="my-3 w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 ر.س</span>
                <span>10,000,000 ر.س</span>
              </div>
            </div>

            {/* الغرف والحمامات */}
            <div className="grid grid-cols-2 gap-3">
              <div className="filter-item">
                <Label className="mb-2 block font-medium text-gray-700 text-right flex items-center gap-1">
                  <Bed size={14} className="text-blue-600" />
                  الغرف
                </Label>
                <Select
                  value={filters.bedrooms.toString()}
                  onValueChange={(value) =>
                    handleFilterChange("bedrooms", parseInt(value))
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-10">
                    <SelectValue placeholder="أي عدد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">أي عدد</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="filter-item">
                <Label className="mb-2 block font-medium text-gray-700 text-right flex items-center gap-1">
                  <Bath size={14} className="text-blue-600" />
                  الحمامات
                </Label>
                <Select
                  value={filters.bathrooms.toString()}
                  onValueChange={(value) =>
                    handleFilterChange("bathrooms", parseInt(value))
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-10">
                    <SelectValue placeholder="أي عدد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">أي عدد</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* المساحة */}
            <div className="filter-item">
              <div className="flex justify-between items-center mb-2">
                <Label className="block font-medium text-gray-700 text-right flex items-center gap-1">
                  <Ruler size={14} className="text-blue-600" />
                  المساحة (م²)
                </Label>
                <span className="text-sm text-blue-600 font-medium">
                  {filters.area > 0
                    ? `من ${formatNumber(filters.area)} م²`
                    : "أي مساحة"}
                </span>
              </div>
              <Slider
                min={0}
                max={1000}
                step={10}
                value={[filters.area]}
                onValueChange={(value) => handleFilterChange("area", value[0])}
                className="my-3 w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 م²</span>
                <span>1000 م²</span>
              </div>
            </div>

            {/* التجهيز والحالة */}
            <div className="grid grid-cols-2 gap-3">
              <div className="filter-item">
                <Label className="mb-2 block font-medium text-gray-700 text-right">
                  التجهيز
                </Label>
                <Select
                  value={filters.furnishing}
                  onValueChange={(value: FurnishingType) =>
                    handleFilterChange("furnishing", value)
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-10">
                    <SelectValue placeholder="جميع الأنواع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="furnished">مؤثثة</SelectItem>
                    <SelectItem value="semi-furnished">شبه مؤثثة</SelectItem>
                    <SelectItem value="unfurnished">غير مؤثثة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="filter-item">
                <Label className="mb-2 block font-medium text-gray-700 text-right">
                  الحالة
                </Label>
                <Select
                  value={filters.condition}
                  onValueChange={(value: ConditionType) =>
                    handleFilterChange("condition", value)
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 h-10">
                    <SelectValue placeholder="جميع الحالات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="new">جديد</SelectItem>
                    <SelectItem value="used">مستعمل</SelectItem>
                    <SelectItem value="under-construction">
                      قيد الإنشاء
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* الأزرار في الأسفل */}
        <DrawerFooter className="pt-4 border-t bg-white sticky bottom-0">
          <div className="grid grid-cols-2 gap-3">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="h-10 border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={resetFilters}
              >
                إعادة ضبط
              </Button>
            </DrawerClose>
            <Button
              className="h-10 bg-blue-600 hover:bg-blue-700"
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
