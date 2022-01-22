import React from 'react';

import '../style/columns.css';

const Columns = function () {
  return (
    <div className="main inline">
      <div className="left-block">To Do</div>
      <div className="center-block">In Progress</div>
      <div className="right-block">Done</div>
    </div>
  );
};

export default Columns;
