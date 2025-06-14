/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState ,useRef} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PharmacyList from "../../components/PharmacyList/PharmacyList";
import { calculateDistance } from "../../utils/calculations";
import "./SearchResults.scss";
import HeroSection from "../../components/HeroSection/HeroSection";
import { Search } from "../../utils/handleSearch";
import { PharmacyDataType } from "../../utils/interfaces";
import { useGeoLocation, defaultCoordinates } from "../../hooks/useGeoLocation";
import PharmacyMap from "../../components/MapView/MapView";

const SearchResultsPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<PharmacyDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userLocation = useGeoLocation();
  const [visibleCount, setVisibleCount] = useState(5);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const userCoordinates: [number, number] =
    userLocation.latitude && userLocation.longitude
      ? [userLocation.latitude, userLocation.longitude]
      : defaultCoordinates;

  useEffect(() => {
    const drugName = searchParams.get("medication");
    const pharmacyName = searchParams.get("pharmacy");

    if (!drugName?.trim() && !pharmacyName?.trim()) {
      navigate("/");
      return;
    }

    // Call Search function
    Search({ drugName, pharmacyName }).then((results) => {
      setSearchResults(results);
      setIsLoading(false);
      if (searchResultsRef.current) {
        searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [searchParams, navigate]);

  const handleShowAll = () => {
    setVisibleCount(searchResults.length);
  };
  return (
    <div id="search-results" className="search-results-page">
      <HeroSection />
      <div className="search-results-wrapper">
        {/* Distance Filter */}

        <div ref={searchResultsRef} className="search-resuls">
          {isLoading ? (
            <p>Loading...</p>
          ) : searchResults.length > 0 ? (
            <>
              <h2 className="section-title">
                {searchResults.length} pharmacies found
              </h2>
              <PharmacyList
                pharmacies={searchResults}
                calculateDistance={calculateDistance}
                onShowAll={handleShowAll}
                showAllButton={visibleCount < searchResults.length}
              />
            </>
          ) : (
            <p className="no-results">
              No results found. Please refine your search.
            </p>
          )}
        </div>
      </div>

      {/* Map Section */}
      <h2 className="section-title">Find Pharmacies on Google Map</h2>
      {userLocation.latitude && userLocation.longitude ? (
        <PharmacyMap
          userCoordinates={userCoordinates}
          pharmacies={searchResults}
          userLocationError={userLocation.error}
        />
      ) : (
        <p>Please enable location services to view nearby pharmacies.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
