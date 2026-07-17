import Board from "./Board.js";
import Pipe from "./Pipe.js";

export default class LevelLoader {

    static load(level){

        const board=new Board(
            level.width,
            level.height
        );

        for(let y=0;y<level.height;y++){

            for(let x=0;x<level.width;x++){

                const tile=level.tiles[y][x];

                const pipe=new Pipe(
                    tile.type,
                    tile.rotation??0
                );

                pipe.locked=tile.locked??false;

                board.set(
                    x,
                    y,
                    pipe
                );

            }

        }

        return board;

    }

    static clone(board){

        const copy=new Board(
            board.width,
            board.height
        );

        for(let y=0;y<board.height;y++){

            for(let x=0;x<board.width;x++){

                copy.set(
                    x,
                    y,
                    board.get(x,y).clone()
                );

            }

        }

        return copy;

    }

    static export(board){

        const json={

            width:board.width,
            height:board.height,
            tiles:[]

        };

        for(let y=0;y<board.height;y++){

            json.tiles[y]=[];

            for(let x=0;x<board.width;x++){

                json.tiles[y][x]=
                board.get(x,y).toJSON();

            }

        }

        return json;

    }

}
