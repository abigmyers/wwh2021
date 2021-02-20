import React from "react";

import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';

import QueueSong from "./QueueSong.js";

function Queue(props) {
  return (
    <div className="Queue">
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h3">Queue</Typography>
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
