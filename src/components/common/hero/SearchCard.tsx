"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Building, 
  Home, 
  DollarSign, 
  Ruler,
  Sparkles,
  TrendingUp,
  Filter,
  X
} from "lucide-react";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import PropertySpaceDropdown from "./PropertySpaceDropdown";
import PropertyPriceDropdown from "./PropertyPriceDropdown";
import CityDropdown from "./CityDropdown";
import NeighborhoodDropdown from "./NeighborhoodDropdown";

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div 
      className="animate-float"
      style={{ 
        animationDelay: `${delay}s`,
        animation: `float 3s ease-in-out infinite ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Active Filters Display Component
interface ActiveFiltersProps {
  selectedCity: string | null;
  selectedNeighborhood: string | null;
  selectedPropertyTypes: string[];
  selectedSpace: { min?: number; max?: number } | null;
  selectedPrice: { min?: number; max?: number } | null;
  onClearAll: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedCity,
  selectedNeighborhood,
  selectedPropertyTypes,
  selectedSpace,
  selectedPrice,
  onClearAll
}) => {
  const activeFiltersCount = [
    selectedCity,
    selectedNeighborhood,
    ...(selectedPropertyTypes.length > 0 ? ['propertyTypes'] : []),
    selectedSpace,
    selectedPrice
  ].filter(Boolean).length;

  if (activeFiltersCount === 0) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            {activeFiltersCount} فلتر نشط
          </span>
        </div>
        <div className="flex items-center gap-2">
          {selectedCity && (
            <Badge variant="secondary" className="bg-white/70 text-blue-700 border border-blue-200">
              <MapPin size={12} className="mr-1" />
              {selectedCity}
            </Badge>
          )}
          {selectedPropertyTypes.length > 0 && (
            <Badge variant="secondary" className="bg-white/70 text-blue-700 border border-blue-200">
              <Home size={12} className="mr-1" />
              {selectedPropertyTypes.length} نوع
            </Badge>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-blue-600 hover:text-blue-800 hover:bg-white/50 text-sm"
      >
        مسح الكل
        <X size={14} className="mr-1" />
      </Button>
    </div>
  );
};

function SearchCardPC() {
  // State for all dropdown values
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<{ min?: number; max?: number } | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<{ min?: number; max?: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Add custom CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup function - properly typed
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Handler for clearing all filters
  const handleClearAllFilters = () => {
    setSelectedCity(null);
    setSelectedNeighborhood(null);
    setSelectedPropertyTypes([]);
    setSelectedSpace(null);
    setSelectedPrice(null);
  };

  // Handler for search button
  const handleSearch = async () => {
    setIsSearching(true);
    
    console.log("Search parameters:", {
      city: selectedCity,
      neighborhood: selectedNeighborhood,
      propertyTypes: selectedPropertyTypes,
      space: selectedSpace,
      price: selectedPrice
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSearching(false);
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-2 sm:px-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0}>
          <div className="absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="absolute bottom-20 left-16 w-16 h-16 bg-purple-100 rounded-full opacity-30 blur-lg"></div>
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-indigo-100 rounded-full opacity-25 blur-md"></div>
        </FloatingElement>
      </div>

      <Card className="relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 pointer-events-none"></div>
        
        {/* Header Section */}
        <div className="relative p-8 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Search size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    البحث المتقدم للعقارات
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">اعثر على العقار المثالي بسهولة وسرعة</p>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-center p-3 bg-white/70 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-center gap-1 text-green-600 font-semibold text-sm">
                  <TrendingUp size={16} />
                  <span>15K+</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">عقار متاح</p>
              </div>
              <div className="text-center p-3 bg-white/70 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-center gap-1 text-blue-600 font-semibold text-sm">
                  <Sparkles size={16} />
                  <span>98%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">رضا العملاء</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="relative p-8">
          
          {/* Active Filters Display */}
          <ActiveFilters
            selectedCity={selectedCity}
            selectedNeighborhood={selectedNeighborhood}
            selectedPropertyTypes={selectedPropertyTypes}
            selectedSpace={selectedSpace}
            selectedPrice={selectedPrice}
            onClearAll={handleClearAllFilters}
          />

          {/* Main Search Grid */}
          <div className="grid gap-8">
            
            {/* Location Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">الموقع والمنطقة</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    المدينة
                  </label>
                  <div className="relative">
                    <CityDropdown 
                      onCityChange={setSelectedCity}
                      initialSelected={selectedCity}
                    />
                    {selectedCity && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Building size={16} className="text-gray-500" />
                    الحي
                  </label>
                  <div className="relative">
                    <NeighborhoodDropdown
                      selectedCity={selectedCity}
                      onNeighborhoodChange={setSelectedNeighborhood}
                      initialSelected={selectedNeighborhood}
                    />
                    {selectedNeighborhood && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Home size={20} className="text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">تفاصيل العقار</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Building size={16} className="text-gray-500" />
                    نوع العقار
                  </label>
                  <PropertyTypeDropdown 
                    onPropertyTypesChange={setSelectedPropertyTypes}
                    initialSelected={selectedPropertyTypes}
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Ruler size={16} className="text-gray-500" />
                    المساحة (م²)
                  </label>
                  <PropertySpaceDropdown 
                    onSpaceChange={setSelectedSpace}
                    initialSelected={selectedSpace}
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-500" />
                    نطاق السعر (ريال)
                  </label>
                  <PropertyPriceDropdown 
                    onPriceChange={setSelectedPrice}
                    initialSelected={selectedPrice}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Search Button Section */}
          <div className="mt-10 flex flex-col items-center gap-6">
            
            {/* Main Search Button */}
            <Button
              size="lg"
              disabled={isSearching}
              className={`relative overflow-hidden px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300 shadow-2xl min-w-[280px] group ${
                isSearching
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 hover:scale-105 hover:shadow-3xl'
              } text-white`}
              onClick={handleSearch}
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center justify-center gap-4">
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>جاري البحث...</span>
                  </>
                ) : (
                  <>
                    <Search size={26} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>ابدأ البحث الآن</span>
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
                  </>
                )}
              </div>
            </Button>

            {/* Popular Searches */}
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-500">عمليات بحث شائعة:</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  'شقق للإيجار بالرياض',
                  'فيلل للبيع بجدة', 
                  'أراضي بالدمام',
                  'مكاتب بالخبر'
                ].map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-xs bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 rounded-full px-4 py-2 h-auto transition-all duration-200 hover:scale-105"
                    onClick={() => console.log('Popular search:', search)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SearchCardPC;