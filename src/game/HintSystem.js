import Board from "./Board.js";
import WaterFlow from "./WaterFlow.js";

export default class HintSystem {

    constructor(board) {

        this.board = board;

    }

    findHint() {

        let best = null;
        let bestScore = -1;

        for (let y = 0; y < this.board.height; y++) {

            for (let x = 0; x < this.board.width; x++) {

                const pipe = this.board.get(x, y);

                if (pipe.locked)
                    continue;

                const original = pipe.rotation;

                for (let r = 0; r < 4; r++) {

                    pipe.rotation = r;

                    const clone = this.cloneBoard();

                    const flow = new WaterFlow(clone);

                    flow.start();

                    const score = this.countPowered(clone);

                    if (score > bestScore) {

                        bestScore = score;

                        best = {

                            x,
                            y,
                            rotation: r,
                            score

                        };

                    }

                }

                pipe.rotation = original;

            }

        }

        return best;

    }

    countPowered(board) {

        let total = 0;

        for (let y = 0; y < board.height; y++) {

            for (let x = 0; x < board.width; x++) {

                if (board.get(x, y).powered)
                    total++;

            }

        }

        return total;

    }

    cloneBoard() {

        const clone = new Board(
            this.board.width,
            this.board.height
        );

        for (let y = 0; y < this.board.height; y++) {

            for (let x = 0; x < this.board.width; x++) {

                clone.set(
                    x,
                    y,
                    this.board.get(x, y).clone()
                );

            }

        }

        return clone;

    }

}
