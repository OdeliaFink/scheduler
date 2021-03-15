import React from 'react';
import 'components/DayListItem.scss';
import classnames from 'classnames';

export default function DayListItem(props) {
  const dayListItemClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = (numberOfSpots) => {
    if (numberOfSpots === 0) {
      return 'no spots remaining';
    } else if (numberOfSpots === 1) {
      return `${numberOfSpots} spot remaining`;
    } else {
      return `${numberOfSpots} spots remaining`;
    }
  };

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
