import React from 'react';
import 'components/InterviewerListItem.scss';
import classnames from 'classnames';

export default function InterviewListItem(props) {
  const interviewListItemClass = classnames('interviews__item', {
    'interviewers__item--selected': props.selected,
  });

  const interviewerImageClass = classnames('interviewers__item-image', {
    'interviewers__item-image--selected': props.selected,
  });

  return (
    <li
      className={interviewListItemClass}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
        className={interviewerImageClass}
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  );
}
