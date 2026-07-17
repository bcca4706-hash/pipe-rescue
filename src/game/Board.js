import Pipe from "./Pipe.js";
import { PipeType, Direction, opposite } from "./PipeType.js";

export default class Board {

    constructor(width = 6, height = 6) {

        this.width = width;
        this.height = height;

        this.grid = [];

        for (let y = 0; y < height; y++) {

            this.grid[y] = [];

            for (let x = 0; x < width; x++) {

                this.grid[y][x] = new Pipe();

            }

        }

    }

    inside(x, y) {

        return (
            x >= 0 &&
            y >= 0 &&
            x < this.width &&
            y < this.height
        );

    }

    get(x, y) {

        if (!this.inside(x, y))
            return null;

        return this.grid[y][x];

    }

    set(x, y, pipe) {

        if (!this.inside(x, y))
            return;

        this.grid[y][x] = pipe;

    }

    rotate(x, y) {

        const pipe = this.get(x, y);

        if (!pipe)
            return;

        pipe.rotate();

    }

    clearPower() {

        for (let y = 0; y < this.height; y++) {

            for (let x = 0; x < this.width; x++) {

                this.grid[y][x].reset();

            }

        }

    }

    findStart() {

        for (let y = 0; y < this.height; y++) {

            for (let x = 0; x < this.width; x++) {

                if (this.grid[y][x].type === PipeType.START) {

                    return { x, y };

                }

            }

        }

        return null;

    }

    flow() {

        this.clearPower();

        const start = this.findStart();

        if (!start)
            return false;

        const queue = [];

        queue.push({

            x: start.x,
            y: start.y,
            from: null

        });

        while (queue.length > 0) {

            const current = queue.shift();

            const pipe = this.get(current.x, current.y);

            if (!pipe)
                continue;

            if (pipe.visited)
                continue;

            pipe.visited = true;
            pipe.powered = true;

            const exits = pipe.connections();

            for (const dir of exits) {

                let nx = current.x;
                let ny = current.y;

                switch (dir) {

                    case Direction.UP:
                        ny--;
                        break;

                    case Direction.RIGHT:
                        nx++;
                        break;

                    case Direction.DOWN:
                        ny++;
                        break;

                    case Direction.LEFT:
                        nx--;
                        break;

                }

                const next = this.get(nx, ny);

                if (!next)
                    continue;

                if (
                    next.accepts(
                        opposite(dir)
                    )
                ) {

                    queue.push({

                        x: nx,
                        y: ny,
                        from: opposite(dir)

                    });

                }

            }

        }

        return this.completed();

    }

    completed() {

        for (let y = 0; y < this.height; y++) {

            for (let x = 0; x < this.width; x++) {

                const pipe = this.grid[y][x];

                if (
                    pipe.type === PipeType.END &&
                    pipe.powered
                ) {

                    return true;

                }

            }

        }

        return false;

    }

    load(level) {

        this.width = level.width;
        this.height = level.height;

        this.grid = [];

        for (let y = 0; y < level.height; y++) {

            this.grid[y] = [];

            for (let x = 0; x < level.width; x++) {

                const d = level.tiles[y][x];

                const pipe = new Pipe(
                    d.type,
                    d.rotation
                );

                pipe.locked =
                    d.locked || false;

                this.grid[y][x] = pipe;

            }

        }

    }

}
