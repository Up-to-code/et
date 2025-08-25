"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Search, MapPin, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";

interface City {
  id: string;
  name: string;
}

interface CityDropdownProps {
  onCityChange?: (selectedCity: string | null) => void;
  initialSelected?: string | null;
}

const CityDropdown: React.FC<CityDropdownProps> = ({ 
  onCityChange, 
  initialSelected = null 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(initialSelected);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cities: City[] = [
    // Major Cities
    { id: "riyadh", name: "الرياض" },
    { id: "jeddah", name: "جدة" },
    { id: "dammam", name: "الدمام" },
    { id: "mecca", name: "مكة المكرمة" },
    { id: "medina", name: "المدينة المنورة" },
    { id: "khobar", name: "الخبر" },
    { id: "taif", name: "الطائف" },
    { id: "buraidah", name: "بريدة" },
    { id: "tabuk", name: "تبوك" },
    { id: "abha", name: "أبها" },
    { id: "jazan", name: "جازان" },
    { id: "hail", name: "حائل" },
    { id: "najran", name: "نجران" },
    { id: "yanbu", name: "ينبع" },
    { id: "khamismushait", name: "خميس مشيط" },
    { id: "dhahran", name: "الظهران" },
    { id: "jubail", name: "الجبيل" },
    { id: "qatif", name: "القطيف" },
    { id: "unayzah", name: "عنيزة" },
    { id: "hafralbatin", name: "حفر الباطن" },
    
    // Other important cities
    { id: "arar", name: "عرعر" },
    { id: "sakaka", name: "سكاكا" },
    { id: "alahsa", name: "الأحساء" },
    { id: "alula", name: "العُلا" },
    { id: "alkharj", name: "الخرج" },
    { id: "qurayyat", name: "القريات" },
    { id: "almajmaah", name: "المجمعة" },
    { id: "wadi_aldawasir", name: "وادي الدواسر" },
    { id: "aflaj", name: "الأفلاج" },
    { id: "zulfi", name: "الزلفي" },
    { id: "dawadmi", name: "الدوادمي" },
    { id: "rass", name: "الرس" },
    { id: "almuzahimiyah", name: "المزاحمية" },
    { id: "albaha", name: "الباحة" },
    { id: "bisha", name: "بيشة" },
    { id: "muhayil", name: "محايل عسير" },
    { id: "sabya", name: "صبيا" },
    { id: "samtah", name: "صامطة" },
    { id: "farasan", name: "فرسان" },
    { id: "sharurah", name: "شرورة" },
    { id: "rafha", name: "رفحاء" },
    { id: "turaif", name: "طريف" },
    { id: "badr", name: "بدر" },
    { id: "khaybar", name: "خيبر" },
    { id: "mahd_aldhahab", name: "مهد الذهب" },
    { id: "ras_tanura", name: "رأس تنورة" },
    { id: "safwa", name: "سيهات - صفوى" },
    { id: "tarout", name: "تاروت" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (onCityChange) {
      onCityChange(selectedCity);
    }
  }, [selectedCity, onCityChange]);

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleCancel = () => {
    setSelectedCity(null);
    setIsOpen(false);
    setSearchQuery("");
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCity(null);
  };

  const getDisplayText = () => {
    if (!selectedCity) return "اختر المدينة";
    const selected = cities.find((c) => c.id === selectedCity);
    return selected?.name || "غير محددة";
  };

  const filteredCities = cities.filter(city => {
    return city.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-sm relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        dir="rtl"
      >
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-gray-400" />
          {selectedCity && (
            <button
              onClick={clearSelection}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={14} className="text-gray-500" />
            </button>
          )}
        </div>
        
        <span className="flex-1 text-right text-gray-800 font-medium">
          {getDisplayText()}
        </span>
        
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <>
          <div className="absolute min-w-[300px] w-full top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {/* Header */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex items-center" dir="rtl">
              <Globe size={18} className="text-blue-600 ml-2" />
              <h3 className="text-lg font-semibold text-gray-800">اختر المدينة</h3>
            </div>
            
            {/* Search Input */}
            <div className="p-3 border-b border-gray-100" dir="rtl">
              <div className="relative">
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن مدينة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Cities List */}
            <div className="max-h-60 overflow-y-auto" dir="rtl">
              {filteredCities.length > 0 ? (
                <div className="p-3 space-y-2">
                  {filteredCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all border ${
                        selectedCity === city.id
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <MapPin size={16} className="text-gray-400 ml-2" />
                        <div className="text-right">
                          <div className="font-medium">{city.name}</div>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedCity === city.id
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedCity === city.id && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Search size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>لا توجد مدن مطابقة</p>
                </div>
              )}
            </div>

            {/* Action Buttons - Only Cancel button needed for single selection */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 flex gap-2" dir="rtl">
              <Button
                variant="outline"
                className="flex-1 text-gray-600 hover:bg-gray-200"
                onClick={handleCancel}
              >
                إلغاء
              </Button>
            </div>
          </div>

          {/* Backdrop with Blur Effect */}
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default CityDropdown;