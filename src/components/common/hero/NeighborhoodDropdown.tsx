"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Search, MapPin, Home } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Neighborhood {
  id: string;
  name: string;
  cityId: string;
}

interface NeighborhoodDropdownProps {
  onNeighborhoodChange?: (selectedNeighborhood: string | null) => void;
  initialSelected?: string | null;
  selectedCity?: string | null;
}

const NeighborhoodDropdown: React.FC<NeighborhoodDropdownProps> = ({ 
  onNeighborhoodChange, 
  initialSelected = null,
  selectedCity = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(initialSelected);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample neighborhoods data organized by city
  const allNeighborhoods: Neighborhood[] = [
    // Riyadh Neighborhoods
    { id: "al-olaya", name: "العليا", cityId: "riyadh" },
    { id: "al-nakheel", name: "النخيل", cityId: "riyadh" },
    { id: "al-malaz", name: "الملز", cityId: "riyadh" },
    { id: "al-sulimaniyah", name: "السليمانية", cityId: "riyadh" },
    { id: "al-moroj", name: "المرور", cityId: "riyadh" },
    { id: "al-aziziyah", name: "العزيزية", cityId: "riyadh" },
    { id: "al-narjis", name: "النجم", cityId: "riyadh" },
    { id: "al-rawdah", name: "الروضة", cityId: "riyadh" },
    { id: "al-yasmin", name: "الياسمين", cityId: "riyadh" },
    { id: "al-rabwah", name: "الربوة", cityId: "riyadh" },
    
    // Jeddah Neighborhoods
    { id: "al-hamra", name: "الحمرا", cityId: "jeddah" },
    { id: "al-salamah", name: "السلامة", cityId: "jeddah" },
    { id: "al-khalidiyah", name: "الخالدية", cityId: "jeddah" },
    { id: "al-rawdah-j", name: "الروضة", cityId: "jeddah" },
    { id: "al-nahdah", name: "النهضة", cityId: "jeddah" },
    { id: "al-shati", name: "الشاطئ", cityId: "jeddah" },
    { id: "al-baghdadiyah", name: "البغدادية", cityId: "jeddah" },
    { id: "al-andalus", name: "الأندلس", cityId: "jeddah" },
    { id: "al-faisaliyah", name: "الفيسيلية", cityId: "jeddah" },
    { id: "al-zahra", name: "الزهراء", cityId: "jeddah" },
    
    // Dammam Neighborhoods
    { id: "al-dana", name: "الدانة", cityId: "dammam" },
    { id: "al-aziziyah-d", name: "العزيزية", cityId: "dammam" },
    { id: "al-faisaliyah-d", name: "الفيسيلية", cityId: "dammam" },
    { id: "al-nakheel-d", name: "النخيل", cityId: "dammam" },
    { id: "al-rawdah-d", name: "الروضة", cityId: "dammam" },
    { id: "al-yasmin-d", name: "الياسمين", cityId: "dammam" },
    { id: "al-muruj", name: "المرور", cityId: "dammam" },
    { id: "al-ittihad", name: "الاتحاد", cityId: "dammam" },
    { id: "al-shatea", name: "الشاطئ", cityId: "dammam" },
    { id: "al-manar", name: "المنار", cityId: "dammam" },
  ];

  // Filter neighborhoods based on selected city and search query
  const filteredNeighborhoods = allNeighborhoods.filter(neighborhood => {
    const matchesCity = selectedCity ? neighborhood.cityId === selectedCity : true;
    const matchesSearch = neighborhood.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

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
    if (onNeighborhoodChange) {
      onNeighborhoodChange(selectedNeighborhood);
    }
  }, [selectedNeighborhood, onNeighborhoodChange]);

  const handleNeighborhoodSelect = (neighborhoodId: string) => {
    setSelectedNeighborhood(neighborhoodId);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleCancel = () => {
    setSelectedNeighborhood(null);
    setIsOpen(false);
    setSearchQuery("");
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNeighborhood(null);
  };

  const getDisplayText = () => {
    if (!selectedNeighborhood) return "اختر الحي";
    const selected = allNeighborhoods.find((n) => n.id === selectedNeighborhood);
    return selected?.name || "غير محدد";
  };

  return (
    <div className="max-w-sm relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        dir="rtl"
        disabled={!selectedCity} // Disable if no city is selected
      >
        <div className="flex items-center gap-2">
          <Home size={18} className="text-gray-400" />
          {selectedNeighborhood && (
            <button
              onClick={clearSelection}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={14} className="text-gray-500" />
            </button>
          )}
        </div>
        
        <span className={`flex-1 text-right font-medium ${!selectedCity ? 'text-gray-400' : 'text-gray-800'}`}>
          {!selectedCity ? "اختر المدينة أولاً" : getDisplayText()}
        </span>
        
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""} ${!selectedCity ? 'opacity-50' : ''}`}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && selectedCity && (
        <>
          <div className="absolute min-w-[300px] w-full top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {/* Header */}
            <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 border-b border-gray-200 flex items-center" dir="rtl">
              <Home size={18} className="text-green-600 ml-2" />
              <h3 className="text-lg font-semibold text-gray-800">اختر الحي</h3>
            </div>
            
            {/* Search Input */}
            <div className="p-3 border-b border-gray-100" dir="rtl">
              <div className="relative">
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن حي..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Neighborhoods List */}
            <div className="max-h-60 overflow-y-auto" dir="rtl">
              {filteredNeighborhoods.length > 0 ? (
                <div className="p-3 space-y-2">
                  {filteredNeighborhoods.map((neighborhood) => (
                    <button
                      key={neighborhood.id}
                      onClick={() => handleNeighborhoodSelect(neighborhood.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all border ${
                        selectedNeighborhood === neighborhood.id
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <Home size={16} className="text-gray-400 ml-2" />
                        <div className="text-right">
                          <div className="font-medium">{neighborhood.name}</div>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedNeighborhood === neighborhood.id
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedNeighborhood === neighborhood.id && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Search size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>لا توجد أحياء مطابقة</p>
                </div>
              )}
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

export default NeighborhoodDropdown;