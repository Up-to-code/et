"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Search, DollarSign, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PriceOption {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

interface PropertyPriceDropdownProps {
  onPriceChange?: (price: { min?: number; max?: number } | null) => void;
  initialSelected?: { min?: number; max?: number } | null;
}

const PropertyPriceDropdown: React.FC<PropertyPriceDropdownProps> = ({
  onPriceChange,
  initialSelected = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PriceOption | null>(null);
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const priceOptions: PriceOption[] = [
    {
      id: "budget",
      label: "اقتصادي (50,000 - 100,000 ر.س)",
      min: 50000,
      max: 100000,
    },
    {
      id: "affordable",
      label: "معقول (100,000 - 250,000 ر.س)",
      min: 100000,
      max: 250000,
    },
    {
      id: "moderate",
      label: "متوسط (250,000 - 500,000 ر.س)",
      min: 250000,
      max: 500000,
    },
    {
      id: "expensive",
      label: "غالي (500,000 - 1,000,000 ر.س)",
      min: 500000,
      max: 1000000,
    },
    {
      id: "premium",
      label: "فاخر (1,000,000 - 2,500,000 ر.س)",
      min: 1000000,
      max: 2500000,
    },
    {
      id: "luxury",
      label: "فخم (2,500,000 - 5,000,000 ر.س)",
      min: 2500000,
      max: 5000000,
    },
    { id: "elite", label: "نخبة (5,000,000+ ر.س)", min: 5000000 },
  ];

  // Initialize with initialSelected if provided
  useEffect(() => {
    if (initialSelected) {
      const matchingOption = priceOptions.find(
        opt => opt.min === initialSelected.min && opt.max === initialSelected.max
      );
      
      if (matchingOption) {
        setSelectedOption(matchingOption);
      } else {
        setCustomMin(initialSelected.min?.toString() || "");
        setCustomMax(initialSelected.max?.toString() || "");
      }
    }
  }, [initialSelected]);

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

  const filteredOptions = priceOptions.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    setIsOpen(false);
    
    let priceValue = null;
    if (customMin || customMax) {
      priceValue = {
        min: customMin ? parseInt(customMin) : undefined,
        max: customMax ? parseInt(customMax) : undefined
      };
    } else if (selectedOption) {
      priceValue = {
        min: selectedOption.min,
        max: selectedOption.max
      };
    }
    
    if (onPriceChange) {
      onPriceChange(priceValue);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedOption(null);
    setCustomMin("");
    setCustomMax("");
    setSearchQuery("");
    
    if (onPriceChange) {
      onPriceChange(null);
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setCustomMin("");
    setCustomMax("");
    
    if (onPriceChange) {
      onPriceChange(null);
    }
  };

  const formatPrice = (price: string) => {
    if (!price) return "0";
    return parseInt(price).toLocaleString("ar-SA");
  };

  const getDisplayText = () => {
    if (customMin || customMax) {
      return `من ${customMin ? formatPrice(customMin) + " ر.س" : "؟"} إلى ${
        customMax ? formatPrice(customMax) + " ر.س" : "؟"
      }`;
    }
    return selectedOption ? selectedOption.label : "اختر السعر";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        dir="rtl"
      >
        <div className="flex items-center gap-2">
          <DollarSign size={18} className="text-gray-400" />
          {(selectedOption || customMin || customMax) && (
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
            <div
              className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex items-center"
              dir="rtl"
            >
              <Filter size={18} className="text-blue-600 ml-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                فلترة حسب السعر
              </h3>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-gray-100" dir="rtl">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="ابحث عن نطاق سعر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto" dir="rtl">
              {filteredOptions.length > 0 ? (
                <div className="p-3 space-y-2">
                  {filteredOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedOption(opt);
                        setCustomMin("");
                        setCustomMax("");
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all border ${
                        selectedOption?.id === opt.id
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="flex-1 text-right">{opt.label}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedOption?.id === opt.id
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedOption?.id === opt.id && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Search size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>لا توجد خيارات مطابقة</p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2"></div>

            {/* Custom Input */}
            <div className="p-3 space-y-2" dir="rtl">
              <p className="text-sm font-medium text-gray-600 flex items-center">
                <DollarSign size={16} className="ml-1" />
                أدخل سعر مخصص (ريال سعودي)
              </p>
              <div className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <Input
                    type="number"
                    placeholder="الحد الأدنى"
                    value={customMin}
                    onChange={(e) => {
                      setCustomMin(e.target.value);
                      setSelectedOption(null);
                    }}
                    className="text-center pr-8"
                    min="0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ر.س
                  </span>
                </div>
                <span className="text-gray-500">-</span>
                <div className="flex-1 relative">
                  <Input
                    type="number"
                    placeholder="الحد الأقصى"
                    value={customMax}
                    onChange={(e) => {
                      setCustomMax(e.target.value);
                      setSelectedOption(null);
                    }}
                    className="text-center pr-8"
                    min="0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ر.س
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">
                اترك الحقل فارغاً للحدود المفتوحة
              </p>
            </div>

            {/* Action Buttons */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 flex gap-2" dir="rtl">
              <Button
                variant="outline"
                className="flex-1 text-gray-600 hover:bg-gray-200"
                onClick={handleCancel}
              >
                إلغاء
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleConfirm}
                disabled={!selectedOption && !customMin && !customMax}
              >
                تطبيق
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

export default PropertyPriceDropdown;