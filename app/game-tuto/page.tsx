"use client";

import { createGame, mergeSprites } from "odyc";
import { useEffect, useState } from "react";
import {
  chick,
  colors,
  farm,
  fence,
  floorTile,
  grassTile,
  hayTile,
  hole,
  leftSign,
  letters,
  mine,
  pedestal,
  pedestalRoom,
  playerSprite,
  farmPnj,
  rightSign,
  rock,
  rockTile,
  wall,
  minePnj,
  SpawnPnj,
} from "./const";
import getCookie from "./GetCookie";

export default function Page() {
  let lastPlayerPos: [number, number] = [5, 4];
  let coinCount = 0;
  let hasPickaxe = false;
  let remainingHit = 0;
  let title: string[] | undefined = [
    "Participez aux quetes",
    "et récuperez votre pseudo",
  ];
  const username: number[] = [];

  async function openPedestalRoom() {
    const game = createGame({
      title: title,
      screenWidth: 10,
      screenHeight: 10,
      cameraWidth: 4,
      cameraHeight: 4,
      colors: colors,
      player: {
        sprite: playerSprite,
        position: lastPlayerPos,
      },
      templates: {
        p: {
          sprite: mergeSprites(floorTile, pedestal),
        },
        w: {
          sprite: wall,
        },
        r: {
          sprite: mergeSprites(floorTile, rightSign),
          dialog: "Mine de lettres",
          sound: "BLIP",
        },
        l: {
          sprite: mergeSprites(floorTile, leftSign),
          dialog: "Pole emploi",
          sound: "BLIP",
        },
        t: {
          sprite: floorTile,
          solid: false,
          onEnterStart(target) {
            title = undefined;
            if (target.position[0] == 9 && target.position[1] == 5) {
              lastPlayerPos = [8, 5];
              openMine();
            } else if (target.position[0] == 0 && target.position[1] == 5) {
              lastPlayerPos = [1, 5];
              openWork();
            }
          },
        },
        g: {
          sprite: mergeSprites(floorTile, SpawnPnj),
          dialog:
            "%Bienvenue dans la salle du pseudo|Pour sauvegarder ton score, tu dois aller récuperer les lettres dans la mine|Il te faudra aussi acheter une pioche grâce à l'argent gagné à Pole emploi%",
        },
      },
      map: pedestalRoom,
      background: 1,
    });
    for (let index = 0; index < username.length; index++) {
      game.updateCellAt(1 + index, 1, {
        sprite: mergeSprites(pedestal, letters[username[index]]),
      });
    }
    if (username.length >= 8) {
      const user = username
        .map((val) => {
          if (val > 9) {
            return String.fromCharCode(val + 65 - 10);
          } else {
            return String.fromCharCode(val + 48);
          }
        })
        .join("");
      fetch("/claim_username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session: await getCookie(),
          username: user,
        }),
      }).then(() => {
        resetGame();
      });
    }

    function resetGame() {
      lastPlayerPos = [5, 5];
      coinCount = 0;
      hasPickaxe = false;
      remainingHit = 0;
      title = ["Participez aux quetes", "et récuperez votre pseudo"];
      username.splice(0, 8);
      game.end("Votre score est enregistré");
    }
  }

  function openMine() {
    const game = createGame({
      screenWidth: 10,
      screenHeight: 10,
      cameraWidth: 4,
      cameraHeight: 4,
      colors: colors,
      player: {
        sprite: playerSprite,
        position: [1, 5],
      },
      templates: {
        r: {
          sprite: mergeSprites(rockTile, rock),
        },
        l: {
          sprite: mergeSprites(rockTile, leftSign),
          dialog: "Salle du pseudo",
          sound: "BLIP",
        },
        d: {
          sprite: rockTile,
          solid: false,
          onEnterStart(target) {
            if (target.position[0] == 0 && target.position[1] == 5) {
              openPedestalRoom();
            }
          },
        },
        h: {
          sprite: mergeSprites(rockTile, hole),
          sound: "EXPLOSION",
          async onCollide(target) {
            if (hasPickaxe) {
              const charNumber = Math.floor(Math.random() * 36);
              remainingHit--;
              if (remainingHit == 0) {
                hasPickaxe = false;
              }
              if (username.length >= 8) {
                game.openDialog(
                  "Votre pseudo est déja complet|Revenez en salle des pseudo pour le valider"
                );
                return;
              }
              let char = "";
              if (charNumber > 9) {
                char = String.fromCharCode(charNumber + 65 - 10);
              } else {
                char = String.fromCharCode(charNumber + 48);
              }
              await game.openDialog(`Vous avez trouvé un \"${char}\"`);
              await game.openDialog(`Voulez vous le garder ?`);
              const choice = await game.prompt("Oui", "Non");
              if (choice == 0) {
                username.push(charNumber);
              }
              game.setCellAt(target.position[0], target.position[1], "d");
            }
          },
        },
        p: {
          sprite: mergeSprites(rockTile, minePnj),
          async onCollide() {
            if (coinCount > 0 && !hasPickaxe) {
              await game.openDialog("Voulez vous acheter une pioche ?");
              const choice = await game.prompt("Oui", "Non");
              if (choice == 0) {
                coinCount--;
                hasPickaxe = true;
                remainingHit = 4;
              }
            } else if (hasPickaxe) {
              game.openDialog("Vous possedez déja une pioche");
            } else {
              game.openDialog("Vous n'avez pas assez d'argent");
            }
          },
        },
      },
      map: mine,
      background: 2,
    });
  }

  function openWork() {
    let chickCount = 0;
    let gameFinish = false;
    const game = createGame({
      screenWidth: 10,
      screenHeight: 10,
      cameraWidth: 4,
      cameraHeight: 4,
      colors: colors,
      player: {
        sprite: playerSprite,
        position: [8, 5],
      },
      templates: {
        g: {
          sprite: grassTile,
          solid: false,
          onEnterStart(target) {
            if (target.position[0] == 9 && target.position[1] == 5) {
              openPedestalRoom();
            }
          },
        },
        b: {
          sprite: mergeSprites(grassTile, fence),
        },
        r: {
          sprite: mergeSprites(grassTile, rightSign),
          dialog: "Salle du pseudo",
          sound: "BLIP",
        },
        c: {
          sprite: mergeSprites(grassTile, chick),
          sound: "HIT",
          onCollide(target) {
            const [px, py] = game.player.position;
            const [tx, ty] = target.position;
            const [dx, dy] = [tx - px, ty - py];
            const nextCell = game.getCellAt(tx + dx, ty + dy);
            if (
              !nextCell.solid &&
              (nextCell.position[0] != 9 || nextCell.position[1] != 5)
            ) {
              game.setCellAt(tx + dx, ty + dy, target.symbol);
              if (
                !gameFinish &&
                nextCell.position[0] == 3 &&
                nextCell.position[1] == 2
              ) {
                if (dx < 0) {
                  chickCount++;
                  if (chickCount == 3) {
                    coinCount++;
                    gameFinish = false;
                    game.openDialog(
                      "Bravo vous avez bien mérité cette pièce !"
                    );
                    game.playSound("PICKUP");
                  }
                } else {
                  chickCount--;
                }
              }
              game.player.position = [tx, ty];
              game.setCellAt(tx, ty, "g");
            }
          },
        },
        p: {
          sprite: mergeSprites(grassTile, farmPnj),
          dialog: "Aidez moi à mettre mes poulets dans l'enclos",
          async onCollide(target) {
            if (target.dialog != "") {
              target.dialog = "";
            } else {
              await game.openDialog("Vous semblez être bloqués !");
              const choice = await game.prompt("Reset", "Continuer");
              if (choice == 0) {
                chickCount = 0;
                game.end();
              }
            }
          },
        },
      },
      map: farm,
      background: 0,
    });
  }

  useEffect(() => {
    openPedestalRoom();
  }, []);

  return <div className="bg-brown"></div>;
}
