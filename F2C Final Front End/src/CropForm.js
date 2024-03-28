
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './CropForm.css';

const CropForm = ({ selectedCropName, selectedCropSubtype, onCropNameChange, onCropSubtypeChange }) => {
  const cropNames = ["Rice", "Wheat", "Corn", "Chickpeas", "Lentils"];
  const cropSubtypes = {
    Rice: ["Ambemohar", "Basmati", "Jasmine", "Parboiled", "Bamboo", "Dubraj", "HMT Kolam", "Indrayani", "Mogra", "Sona Masuri", "Surti Kolam"],
    Wheat: ["Lokwan Wheat", "Malavraj Wheat", "Bhalia Wheat", "Khapli Wheat", "Sihore Wheat", "Sharbati Wheat", "Rajwadi Wheat"],
    Corn: ["Sweet Corn", "Field Corn", "Popcorn"],
    Lentils: ["Masoor Dal", "Toor Dal", "Chana Dal", "Mug Dal", "Urad Dal", "Matki", "Val Dal", "Ambat Chuka", "Harbara", "Kulith"],
    Chickpeas: ["Kabuli Chana", "Desi Chana"]
  };

  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [subtypeSuggestions, setSubtypeSuggestions] = useState([]);
  const [nameValue, setNameValue] = useState(selectedCropName);
  const [subtypeValue, setSubtypeValue] = useState(selectedCropSubtype);

  const onCropNameChangeAutoSuggest = (event, { newValue }) => {
    setNameValue(newValue);
    onCropNameChange(newValue);
  };

  const onCropSubtypeChangeAutoSuggest = (event, { newValue }) => {
    setSubtypeValue(newValue);
    onCropSubtypeChange(newValue);
  };

  const getSuggestions = (value, suggestionsArray) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? suggestionsArray : suggestionsArray.filter((item) => item.toLowerCase().startsWith(inputValue));
  };

  return (
    // <div>
       
    //   <div><label>
    //    Crop Name:
    //     </label>
    //   <Autosuggest
    //     suggestions={nameSuggestions}
    //     onSuggestionsFetchRequested={({ value }) => {
    //       setNameSuggestions(getSuggestions(value, cropNames));
    //     }}
    //     onSuggestionsClearRequested={() => {
    //       setNameSuggestions(cropNames); // Reset to full list when suggestions are cleared
    //     }}
    //     getSuggestionValue={(suggestion) => suggestion}
    //     renderSuggestion={(suggestion) => <div>{suggestion}</div>}
    //     inputProps={{
         
    //       value: nameValue,
    //       onChange: onCropNameChangeAutoSuggest,
    //       onClick: () => setNameSuggestions(cropNames), // Show entire cropNames list on click
    //     }}
    //   /></div>
    //    <div>
    //    <label>
    //    Crop Subtype:
    //     </label>
    //   <Autosuggest
    //     suggestions={subtypeSuggestions}
    //     onSuggestionsFetchRequested={({ value }) => {
    //       setSubtypeSuggestions(getSuggestions(value, cropSubtypes[selectedCropName] || []));
    //     }}
    //     onSuggestionsClearRequested={() => {
    //       setSubtypeSuggestions([]); // Reset to empty list when suggestions are cleared
    //     }}
    //     getSuggestionValue={(suggestion) => suggestion}
    //     renderSuggestion={(suggestion) => <div>{suggestion}</div>}
    //     inputProps={{
          
    //       value: subtypeValue,
    //       onChange: onCropSubtypeChangeAutoSuggest,
    //       onClick: () => setSubtypeSuggestions(cropSubtypes[selectedCropName] || []), // Show entire cropSubtypes list on click
    //     }}
    //   />
    //    </div>
       
    // </div>

    <div className="crop-form-container">
    <div>
      <label className="crop-form-label">
        Crop Name:
      </label>
      <Autosuggest
        className="react-autosuggest__input"
        suggestions={nameSuggestions}
        onSuggestionsFetchRequested={({ value }) => {
          setNameSuggestions(getSuggestions(value, cropNames));
        }}
        onSuggestionsClearRequested={() => {
          setNameSuggestions(cropNames); // Reset to full list when suggestions are cleared
        }}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        inputProps={{
          value: nameValue,
          onChange: onCropNameChangeAutoSuggest,
          onClick: () => setNameSuggestions(cropNames), // Show entire cropNames list on click
        }}
      />
    </div>
    <div>
      <label className="crop-form-label">
        Crop Subtype:
      </label>
      <Autosuggest
        className="react-autosuggest__input"
        suggestions={subtypeSuggestions}
        onSuggestionsFetchRequested={({ value }) => {
          setSubtypeSuggestions(getSuggestions(value, cropSubtypes[selectedCropName] || []));
        }}
        onSuggestionsClearRequested={() => {
          setSubtypeSuggestions([]); // Reset to empty list when suggestions are cleared
        }}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        inputProps={{
          value: subtypeValue,
          onChange: onCropSubtypeChangeAutoSuggest,
          onClick: () => setSubtypeSuggestions(cropSubtypes[selectedCropName] || []), // Show entire cropSubtypes list on click
        }}
      />
    </div>
  </div>
  );
};

export default CropForm;