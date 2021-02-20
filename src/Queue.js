import React from "react";

import QueueSong from "./QueueSong.js";

function Queue() {
  return (
    <div className="Queue">
        <h1>This is Queue</h1>
      <QueueSong></QueueSong>
      <QueueSong></QueueSong>
      <QueueSong></QueueSong>
    </div>
  );
}

export default Queue;
