import { PipeType } from "../game/PipeType.js";

export default {

    width:6,

    height:6,

    tiles:[

        [

            {type:PipeType.START,rotation:0},
            {type:PipeType.STRAIGHT,rotation:0},
            {type:PipeType.CORNER,rotation:1},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0}

        ],

        [

            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.STRAIGHT,rotation:1},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0}

        ],

        [

            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.TEE,rotation:2},
            {type:PipeType.STRAIGHT,rotation:0},
            {type:PipeType.CORNER,rotation:2},
            {type:PipeType.EMPTY,rotation:0}

        ],

        [

            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.STRAIGHT,rotation:1},
            {type:PipeType.EMPTY,rotation:0}

        ],

        [

            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.CORNER,rotation:0},
            {type:PipeType.END,rotation:2}

        ],

        [

            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0},
            {type:PipeType.EMPTY,rotation:0}

        ]

    ]

}
