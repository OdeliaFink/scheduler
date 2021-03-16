import React from 'react';
import 'components/InterviewerListItem.scss';

export default function InterviewListItem(props) {
  return (
    <li className="interviews__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
    </li>
  );
}
