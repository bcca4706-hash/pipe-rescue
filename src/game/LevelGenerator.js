import Pipe from "./Pipe.js";
import Board from "./Board.js";
import { PipeType } from "./PipeType.js";

export default class LevelGenerator {

    constructor(width = 6, height = 6) {

        this.width = width;
        this.height = height;

    }

    generate() {

        const board = new Board(this.width, this.height);

        for (let y = 0; y < this.height; y++) {

            for (let x = 0; x < this.width; x++) {

                let type = PipeType.EMPTY;

                const r = Math.random();

                if (r < 0.15)
                    type = PipeType.STRAIGHT;

                else if (r < 0.35)
                    type = PipeType.CORNER;

                else if (r < 0.55)
                    type = PipeType.TEE;

                else if (r < 0.70)
                    type = PipeType.CROSS;

                const pipe = new Pipe(
                    type,
                    Math.floor(Math.random() * 4)
                );

                board.set(x, y, pipe);

            }

        }

        board.set(
            0,
            0,
            new Pipe(PipeType.START, 0)
        );

        board.set(
            this.width - 1,
            this.height - 1,
            new Pipe(PipeType.END, 2)
        );

        return board;

    }

    generateDaily(seed) {

        let value = seed;

        Math.random = () => {

            value =
                (value * 9301 + 49297) % 233280;

            return value / 233280;

        };

        return this.generate();

    }

}
