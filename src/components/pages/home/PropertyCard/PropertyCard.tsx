import { useState } from "react";
import { Heart, MapPin, Bed, Bath, Ruler } from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  purpose: "rent" | "sale";
}

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: (propertyId: string, isFavorite: boolean) => void;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onFavoriteToggle, 
  className = "" 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const {
    id,
    title,
    location,
    price,
    image,
    bedrooms,
    bathrooms,
    area,
    propertyType,
    purpose,
  } = property;

  const handleFavoriteClick = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    onFavoriteToggle?.(id, newFavoriteStatus);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow ${className}`}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            purpose === 'rent' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
          }`}>
            {purpose === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
          <span className="px-2 py-1 rounded bg-gray-800 text-white text-xs font-medium capitalize">
            {propertyType}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} 
          />
        </button>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        {/* Price */}
        <div className="text-xl font-bold text-blue-600 mb-1">
          {formatPrice(price)}
          {purpose === 'rent' && <span className="text-sm font-normal text-gray-500">/mo</span>}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{title}</h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        
        {/* Property Features */}
        <div className="flex justify-between border-t border-gray-100 pt-3 text-gray-700">
          <div className="flex items-center">
            <Bed size={16} className="mr-1 text-gray-600" />
            <span className="text-sm">{bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1 text-gray-600" />
            <span className="text-sm">{bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Ruler size={16} className="mr-1 text-gray-600" />
            <span className="text-sm">{area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample data
const sampleProperty: Property = {
  id: "prop-001",
  title: "Modern Apartment in Downtown",
  location: "Downtown, New York",
  price: 250000,
  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
  bedrooms: 2,
  bathrooms: 2,
  area: 85,
  propertyType: "apartment",
  purpose: "sale",
};

// Example usage
const PropertyListing: React.FC = () => {
  const handleFavoriteToggle = (propertyId: string, isFavorite: boolean) => {
    console.log(`Property ${propertyId} is now ${isFavorite ? 'favorited' : 'unfavorited'}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <PropertyCard 
        property={sampleProperty}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
};

export default PropertyCard;
export { PropertyListing, type Property, type PropertyCardProps };