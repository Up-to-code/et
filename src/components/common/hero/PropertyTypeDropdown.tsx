"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, X } from "lucide-react";

interface PropertyType {
  id: string;
  label: string;
}

interface PropertyCategory {
  سكني: PropertyType[];
  تجاري: PropertyType[];
}

interface PropertyTypeDropdownProps {
  onPropertyTypesChange?: (selectedTypes: string[]) => void;
  initialSelected?: string[];
}

type CategoryKey = keyof PropertyCategory;

const PropertyTypeDropdown: React.FC<PropertyTypeDropdownProps> = ({
  onPropertyTypesChange,
  initialSelected = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialSelected);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("سكني");

  const propertyTypes: PropertyCategory = {
    سكني: [
      { id: "house", label: "بيت شعبي" },
      { id: "apartment", label: "شقة" },
      { id: "resort", label: "استراحة" },
      { id: "villa", label: "فيلا" },
      { id: "chalet", label: "شاليه" },
      { id: "floor", label: "دور" },
      { id: "room", label: "غرفة" },
      { id: "building", label: "عمارة سكنية" },
      { id: "land", label: "أرض سكنية" },
    ],
    تجاري: [
      { id: "shop", label: "محل" },
      { id: "office", label: "مكتب" },
      { id: "warehouse", label: "مستودع" },
      { id: "commercial-land", label: "أرض تجارية" },
      { id: "commercial-building", label: "عمارة تجارية" },
    ],
  };

  const handleTypeToggle = (typeId: string) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter((id) => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelectedTypes);
    
    if (onPropertyTypesChange) {
      onPropertyTypesChange(newSelectedTypes);
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedTypes([]);
    if (onPropertyTypesChange) {
      onPropertyTypesChange([]);
    }
    setIsOpen(false);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTypes([]);
    if (onPropertyTypesChange) {
      onPropertyTypesChange([]);
    }
  };

  const getDisplayText = () => {
    if (selectedTypes.length === 0) return "اختر نوع العقار";
    if (selectedTypes.length === 1) {
      const selected = Object.values(propertyTypes)
        .flat()
        .find((t) => t.id === selectedTypes[0]);
      return selected?.label || "غير محدد";
    }
    return `${selectedTypes.length} أنواع محددة`;
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        dir="rtl"
      >
        <div className="flex items-center gap-2">
          {selectedTypes.length > 0 && (
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

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div className="absolute min-w-[300px] w-full top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {/* Tabs */}
            <div className="flex bg-gray-50 border-b border-gray-200">
              {(Object.keys(propertyTypes) as CategoryKey[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-1 py-3 text-sm font-medium ${
                    selectedCategory === cat
                      ? "text-blue-600 bg-white border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List (scrollable) */}
            <div className="max-h-60 overflow-y-auto p-3">
              <div className="space-y-2">
                {propertyTypes[selectedCategory].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeToggle(type.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all border ${
                      selectedTypes.includes(type.id)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                    dir="rtl"
                  >
                    <span className="flex-1 text-right mr-3 font-medium">
                      {type.label}
                    </span>
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedTypes.includes(type.id)
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedTypes.includes(type.id) && (
                        <Check size={12} className="text-white" strokeWidth={3} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
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
                disabled={selectedTypes.length === 0}
              >
                تأكيد ({selectedTypes.length})
              </Button>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default PropertyTypeDropdown;