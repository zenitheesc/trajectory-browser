import React from 'react';

interface LaunchButtonProps {
  name: string;
  alt: number;
  datetime: string;
  onClick: () => void;
}

function LaunchButton(props: LaunchButtonProps): JSX.Element {
  const { name, alt, datetime, onClick } = props;

  const formattedAlt = (alt / 1000).toFixed(1);

  const formattedDate = new Date(datetime).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <button className="launchItem" onClick={onClick}>
      <span className="launchName">{`Uploader: ${name}`}</span>
      <span className="launchAlt">{`Max altitude: ${formattedAlt} km`}</span>
      <span className="launchDate">{`Date: ${formattedDate}`}</span>
    </button>
  );
}

export default LaunchButton;