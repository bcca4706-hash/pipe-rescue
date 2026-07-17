import Phaser from 'phaser'

class GameScene extends Phaser.Scene {

    constructor() {
        super('Game')
    }

    create() {

        this.cameras.main.setBackgroundColor('#111827')

        const size = 90

        this.board = []

        for (let y = 0; y < 6; y++) {

            this.board[y] = []

            for (let x = 0; x < 6; x++) {

                let tile = this.add.rectangle(
                    120 + x * size,
                    120 + y * size,
                    70,
                    70,
                    0x2d3748
                )

                tile.setStrokeStyle(4,0xffffff)

                tile.rotation = Phaser.Math.Between(0,3) * Math.PI / 2

                tile.setInteractive()

                tile.on('pointerdown',()=>{

                    tile.rotation += Math.PI/2

                })

                this.board[y][x]=tile

            }

        }

        this.add.text(
            20,
            20,
            'PIPE RESCUE PROTOTYPE',
            {
                fontSize:'28px',
                color:'#ffffff'
            }
        )

    }

}

const config = {

    type: Phaser.AUTO,

    parent:'game',

    width:720,

    height:1280,

    backgroundColor:'#111827',

    scene:[GameScene],

    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    }

}

new Phaser.Game(config)
