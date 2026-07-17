import { PipeType, Direction, rotate } from "./PipeType.js";

export default class Pipe {

    constructor(type = PipeType.EMPTY, rotation = 0) {

        this.type = type;
        this.rotation = rotation;
        this.locked = false;
        this.powered = false;
        this.visited = false;

    }

    clone() {

        const p = new Pipe(this.type, this.rotation);

        p.locked = this.locked;
        p.powered = this.powered;
        p.visited = this.visited;

        return p;

    }

    rotate() {

        if (this.locked) return;

        this.rotation = rotate(this.rotation);

    }

    reset() {

        this.powered = false;
        this.visited = false;

    }

    setLocked(value = true) {

        this.locked = value;

    }

    isStart() {

        return this.type === PipeType.START;

    }

    isEnd() {

        return this.type === PipeType.END;

    }

    connections() {

        switch (this.type) {

            case PipeType.START:
                return this.rotateConnections([Direction.RIGHT]);

            case PipeType.END:
                return this.rotateConnections([Direction.LEFT]);

            case PipeType.STRAIGHT:
                return this.rotateConnections([
                    Direction.LEFT,
                    Direction.RIGHT
                ]);

            case PipeType.CORNER:
                return this.rotateConnections([
                    Direction.UP,
                    Direction.RIGHT
                ]);

            case PipeType.TEE:
                return this.rotateConnections([
                    Direction.LEFT,
                    Direction.UP,
                    Direction.RIGHT
                ]);

            case PipeType.CROSS:
                return [
                    Direction.UP,
                    Direction.RIGHT,
                    Direction.DOWN,
                    Direction.LEFT
                ];

            case PipeType.PORTAL:
                return [
                    Direction.UP,
                    Direction.RIGHT,
                    Direction.DOWN,
                    Direction.LEFT
                ];

            default:
                return [];

        }

    }

    rotateConnections(list) {

        return list.map(v => (v + this.rotation) % 4);

    }

    accepts(direction) {

        return this.connections().includes(direction);

    }

    exits(direction) {

        return this.connections().includes(direction);

    }

    canFlow(fromDirection) {

        return this.accepts(fromDirection);

    }

    nextDirections(fromDirection) {

        return this.connections().filter(v => v !== fromDirection);

    }

    toJSON() {

        return {

            type: this.type,
            rotation: this.rotation,
            locked: this.locked

        };

    }

    static fromJSON(data) {

        const p = new Pipe(
            data.type,
            data.rotation
        );

        p.locked = data.locked;

        return p;

    }

}
