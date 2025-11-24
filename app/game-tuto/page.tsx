"use client";

import { createGame } from "odyc";
import { useEffect, useState } from "react";

export default function Page() {
  const [game, setGame] = useState<any>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const game = createGame({
      player: {
        sprite: `
			........
			..3333..
			..3030..
			.333433.
			.333333.
			..3333..
			..3..3..
			.33..33.
			`,
        position: [1, 1],
      },
      templates: {
        x: {
          sprite: 2,
        },
        k: {
          sprite: `
			........
			........
			.....555
			.....5.5 
			555555.5
			5.5..5.5
			5....555
			........
			`,
          dialog: "LA GROSSE CLEF MIAM",
          onCollide(target) {
            target.remove();
            game.updateCells(
              { symbol: "d" },
              {
                dialog: "It's britney bitch",
              }
            );
          },
        },
        d: {
          sprite: `
			...99...
			..9999..
			.999999.
			.999999.
			.999999.
			.999909.
			.999999.
			.999999.
			`,
          dialog: "It looks closed.",
          onCollide(target) {
            if (hasKey) {
              game.updateCells(
                { symbol: "d" },
                {
                  solid: false,
                  dialog: "The door is now open.",
                }
              );
            }
            target.remove();
          },
        },
      },
      map: `
	xxxxxxxx
	x....k.x
	x......x
	x......x
	x......x
	xxxdxxxx
	x......x
	xxxxxxxx
	`,
      background: 1,
    });
    // setGame(gameInstance);
  }, []);

  return <div className="bg-brown"></div>;
}
