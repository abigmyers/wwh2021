import React from "react";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import QueueSong from "./QueueSong.js";

function Queue(props) {
  return (
    <div className="Queue">
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <h1>Queue</h1>
        </AccordionSummary>
        {props.queue.map((song) => (
          <AccordionDetails>
            <QueueSong song={song} />
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
}

export default Queue;