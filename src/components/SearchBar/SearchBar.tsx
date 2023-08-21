function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Search" data-testid="search-input" />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="ingredient"
        id="ingredient"
      />
      <input
        data-testid="name-search-radio"
        type="radio"
        name="name"
        id="name"
      />
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="firstLetter"
        id="firstLetter"
      />

      <button data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
