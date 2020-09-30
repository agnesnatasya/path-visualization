import React from "react";
import { Badge } from "react-bootstrap";
import "./InfoBar.css";

export function InfoBar() {
  return (
    <div className="info-bar">
      <Badge className="startGridBadge">
        Drag the yellow grid to set start position
      </Badge>
      <Badge className="endGridBadge">
        Drag the orange grid to set end position
      </Badge>
      <Badge className="wallGridBadge">
        Drag over the board to draw wall grids
      </Badge>
      <Badge className="exploredGridBadge">
        Grids explored but not in the path to goal
      </Badge>
    </div>
  );

}
