import React from "react";
import { Badge, Container } from "react-bootstrap";
import "./InfoBar.css";

export function InfoBar() {
  return (
    <div class="info-bar">
      <Badge className="startGridBadge">
        Drag yellow grid to set start position
      </Badge>
      <Badge className="endGridBadge">
        Drag orange grid to set end position
      </Badge>
      <Badge className="wallGridBadge">
        Drag over board to draw wall grids
      </Badge>
    </div>
  );

}
