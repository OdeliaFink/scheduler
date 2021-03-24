import React from 'react';
import 'components/InterviewerListItem.scss';
import classnames from 'classnames';

export default function InterviewListItem(props) {
  const interviewerClass = classnames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  const interviewImageClass = classnames('interviewers__item-image', {
    'interviewers__item-image--selected': props.selected,
  });

  return (
    <li
      data-testid="interviewers__item"
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className={interviewImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
