import React, { useEffect } from 'react';

export default function Redirect({ props }) {
  const { link } = props.match.params;

  console.log(link);
  return <div />;
}
