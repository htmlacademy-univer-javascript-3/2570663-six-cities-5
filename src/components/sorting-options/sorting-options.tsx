import { useState } from 'react';
import { SortingOption } from '../../types/sorting-option.ts';
import { SORTING_OPTIONS } from '../../const.ts';

type SortingOptionsProps = {
  onSortChange: (option: SortingOption) => void;
};

export function SortingOptions({ onSortChange }: SortingOptionsProps): JSX.Element {
  const [activeOption, setActiveOption] = useState<SortingOption>(SORTING_OPTIONS.Popular);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);

  const handleOptionClick = (option: SortingOption) => {
    setActiveOption(option);
    onSortChange(option);
    setIsOptionsVisible(false);
  };

  const handleArrowClick = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleArrowClick}>
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOptionsVisible ? 'places__options--opened' : ''}`}>
        {Object.values(SORTING_OPTIONS).map((option) => (
          <li
            key={option}
            className={`places__option ${option === activeOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}
