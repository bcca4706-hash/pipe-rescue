export const PipeType = {

EMPTY:0,

START:1,

END:2,

STRAIGHT:3,

CORNER:4,

TEE:5,

CROSS:6,

LOCKED:7,

PORTAL:8,

BLOCK:9

}

export const Direction={

UP:0,

RIGHT:1,

DOWN:2,

LEFT:3

}

export function rotate(rotation){

return(rotation+1)%4

}

export function opposite(direction){

return(direction+2)%4

}
