import './blocks'
import ScratchBlocks from 'scratch-blocks'

let workspace = ScratchBlocks.inject(
    'blocklyDiv',
    {
        toolbox: document.getElementById('toolbox')
    }
)

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

ScratchBlocks.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace)

function getBlocksCount () {
    let blocksDb = ScratchBlocks.mainWorkspace.blockDB_
    return Object.keys(blocksDb).filter(key => blocksDb[key].colourSecondary_ !== '#FFFFFF').length
}

workspace.addChangeListener(event => {
    let blocksCount = getBlocksCount()

    document.getElementById('blocksCount').innerText = blocksCount

    console.log('<code>')
    console.log(workspace.toJavaScript())
    console.log('</code>')
})

ScratchBlocks.mainWorkspace.toJavaScript = function () {
    let code = ''

    code = this.topBlocks_[0].toJavaScript(this.topBlocks_[0])

    return code
}

window.execute = async (button) => {
    button.disabled = true
    document.getElementById('reset-button').disabled = true
    blocksHighlight = []
    loadStage()
    let code = '(async () => {\n' + ScratchBlocks.mainWorkspace.toJavaScript() + '\nstop()\n})()'
    eval(code)
}

window.stop = () => {
    document.getElementById('run-button').disabled = false
    document.getElementById('reset-button').disabled = false
    ScratchBlocks.mainWorkspace.topBlocks_[0].disabled = false
    isCleard = stages[stage].map[player.y * mapSize.width + player.x] === 1
    
    if (isCleard)
    {
        document.getElementById('next-button').style.display = null
    }
}

window.reset = () => {
    loadStage()
}

window.next = () => {
    if (stage + 1 === stages.length) return
    stage++
    ScratchBlocks.mainWorkspace.clear()
    ScratchBlocks.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace)
    loadStage()
}


// Canvas
const PlayerImage = new Image()

let ctx = document.getElementById('canvas').getContext('2d')
ctx.width = 600
ctx.height = 600
let map = []
let isCleard = false
let isError = false
let stages = [
    {
        sx: 4,
        sy: 5,
        angle: 90,
        minBlocks: 2,
        hint: '黄色のマスがゴールだ。「前に進む」ブロックで猫の向いている方向に1マス進めるぞ。上の「実行」ボタンで実行だ。',
        map: [
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,1,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
        ]
    },
    {
        sx: 4,
        sy: 5,
        angle: 90,
        minBlocks: 6,
        hint: '灰色のマスは壁だからぶつからないように「○に曲がる」ブロックで猫の向きを変えて進もう。',
        map: [
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,2,1,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
        ]
    },
    {
        sx: 0,
        sy: 5,
        angle: 90,
        minBlocks: 3,
        hint: 'ゴールまで遠いね。「○回繰り返す」の中にブロックを入れると○回繰り返して実行してくれるぞ。',
        map: [
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,1,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
        ]
    },
    {
        sx: 4,
        sy: 4,
        angle: 90,
        minBlocks: 5,
        hint: 'ここはちょっとむずかしいかな？よーく考えてみよう！',
        map: [
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,2,2,2,0,0,0,0,
            0,0,0,2,0,0,0,2,0,0,0,
            0,0,0,2,2,2,0,2,0,0,0,
            0,0,0,2,1,0,0,2,0,0,0,
            0,0,0,0,2,2,2,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
        ]
    },
    {
        sx: 3,
        sy: 5,
        angle: 90,
        minBlocks: 4,
        hint: '赤いマスは溶岩だぞ。触れるとプログラムが終了してしまうぞ。',
        map: [
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,2,2,2,2,0,0,0,0,
            0,0,2,0,0,3,1,2,0,0,0,
            0,0,0,2,2,2,2,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
        ]
    },
    {
        sx: 0,
        sy: 4,
        angle: 90,
        minBlocks: 9,
        map: [
            2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,
            0,0,0,0,0,0,0,0,0,0,0,
            2,2,2,2,2,2,2,2,2,2,0,
            1,3,0,0,0,0,0,0,0,0,0,
            2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,
        ]
    },
    {
        sx: 3,
        sy: 5,
        angle: 90,
        minBlocks: 4,
        hint: '濃い灰色のタイルはピンク色のボタンを押すと消えるぞ。ボタンを押すには「ボタンを押す」ブロックを使うぞ。',
        map: [
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,2,2,2,2,0,0,0,0,
            0,0,2,0,4,6,1,2,0,0,0,
            0,0,0,2,2,2,2,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,
        ]
    },
    {
        sx: 5,
        sy: 0,
        angle: 90,
        minBlocks: 12,
        hint: 'これが最後のステージだ。よーく考えてクリアしよう。',
        map: [
            0,0,0,0,0,4,0,0,0,0,0,
            0,0,0,0,4,0,4,0,0,0,0,
            0,0,0,4,0,0,0,4,0,0,0,
            0,0,4,0,0,0,0,0,4,0,0,
            0,4,0,0,2,6,2,0,0,4,0,
            4,0,0,0,6,1,6,0,0,0,4,
            0,4,0,0,2,6,2,0,0,4,0,
            0,0,4,0,0,0,0,0,4,0,0,
            0,0,0,4,0,0,0,4,0,0,0,
            0,0,0,0,4,0,4,0,0,0,0,
            0,0,0,0,0,4,0,0,0,0,0,
        ]
    },
]
let stage = 0
let mapSize = {
    width: 11,
    height: 11
}
function frame (callback) {
    return new Promise((resolve) => {
        let count = 0
        let interval = setInterval(() => {
            count++
            if (callback({count}) === false)
            {
                clearInterval(interval)
                resolve()
            }
        })
    })
}
function angleToAxis (angle) {
    let axis = {x: 0, y: 0}
    if (angle === 90)
    {
        axis.x = 1
    }
    if (angle === 270)
    {
       axis.x = -1
    }
    if (angle === 180)
    {
        axis.y = 1
    }
    if (angle === 360)
    {
        axis.y = -1
    }
    return axis
}
let player = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    size: ctx.height / mapSize.height,
    angle: 90,
    setDrawPoint () {
        let width = ctx.width / mapSize.width
        let height = ctx.height / mapSize.height
        this.dx = this.x * width
        this.dy = this.y * height
    },
    async moveForward ({highlight}) {
        if (isError === true) return
        blocksHighlight[highlight].show()
        let width = ctx.width / mapSize.width
        let axis = angleToAxis(player.angle)
        let mapTile = map[(player.y + axis.y) * mapSize.width + player.x + axis.x]
        if (mapTile === 2)
        {
            blocksHighlight[highlight].hide()
            return false
        }
        player.x += axis.x
        player.y += axis.y
        return frame(({count}) => {
            player.dx += axis.x
            player.dy += axis.y
            if (count >= width)
            {
                if (map[player.y * mapSize.width + player.x] === 3)
                {
                    isError = true
                    player.angle += 45
                }
                blocksHighlight[highlight].hide()
                return false
            }
        })
    },
    async turnRight ({highlight}) {
        if (isError === true) return
        blocksHighlight[highlight].show()
        return frame(({count}) => {
            player.angle++
            if (count === 90)
            {
                if (player.angle >= 450)
                {
                    player.angle = 90
                }
                blocksHighlight[highlight].hide()
                return false
            }
        })
    },
    async turnLeft ({highlight}) {
        if (isError === true) return
        blocksHighlight[highlight].show()
        return frame(({count}) => {
            player.angle--
            if (count === 90)
            {
                if (player.angle <= 0)
                {
                    player.angle = 360
                }
                blocksHighlight[highlight].hide()
                return false
            }
        })
    },
    async replaceLava ({highlight}) {
        if (isError === true) return
        const forward = {
            x: player.x + angleToAxis(player.angle).x,
            y: player.y + angleToAxis(player.angle).y
        }
        console.log(map[forward.y * mapSize.width + forward.x],player, angleToAxis(player.angle), forward)
        if (map[forward.y * mapSize.width + forward.x] !== 3)
        {
            return
        }
        blocksHighlight[highlight].show()
        let baseAngle = player.angle
        let targetAngle = player.angle + 45
        await frame(({count}) => {
            player.angle += (targetAngle - player.angle) / 10

            if (count === 30)
            {
                blocksHighlight[highlight].hide()
                return false
            }
        })
        map[forward.y * mapSize.width + forward.x] = 0
        await frame(({count}) => {
            player.angle += (baseAngle - player.angle) / 10

            if (count === 30)
            {
                player.angle = baseAngle
                blocksHighlight[highlight].hide()
                return false
            }
        })
    },
    async pushButton ({highlight}) {
        if (isError === true) return
        if (map[player.y * mapSize.width + player.x] !== 4)
        {
            return
        }
        blocksHighlight[highlight].show()
        let baseAngle = player.angle
        let targetAngle = player.angle + 45
        await frame(({count}) => {
            player.angle += (targetAngle - player.angle) / 10

            if (count === 30)
            {
                blocksHighlight[highlight].hide()
                return false
            }
        })
        map[player.y * mapSize.width + player.x] = 5
        await frame(({count}) => {
            player.angle += (baseAngle - player.angle) / 10

            if (count === 30)
            {
                player.angle = baseAngle
                blocksHighlight[highlight].hide()
                return false
            }
        })
    }
}

window.isForwardLava = () => {
    return true
}

function toRadian (deg)
{
    return deg * Math.PI / 180
}

function rect (x, y, width, height, color)
{
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

function rectFrame (x, y, width, height, color)
{
    ctx.strokeStyle = color
    ctx.strokeRect(x, y, width, height)
}

function drawPlayer (x, y, angle, width, height)
{
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(toRadian(angle - 90))
    ctx.drawImage(PlayerImage, -width / 2, -height /2, width, height)
    ctx.restore()
}

function drawText(text, x, y, size, color, align, stroke = false) {
    ctx.save()
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.textAlign = align
    ctx.font = `${size} "Arial"`
    stroke ? ctx.strokeText(text, x, y) : ctx.fillText(text, x, y)
    ctx.restore()
}

function waitLoad (object)
{
    return new Promise(resolve => {
        object.onload = resolve
    })
}

function loadStage () {
    location.hash = stage
    document.getElementById('next-button').style.display = 'none'
    document.getElementById('minBlocks').innerText = stages[stage].minBlocks
    document.getElementById('hint').innerText = stages[stage].hint || ''
    player.x = stages[stage].sx
    player.y = stages[stage].sy
    player.angle = stages[stage].angle
    map = stages[stage].map.concat()
    isCleard = false
    isError = false
    player.setDrawPoint()
}

async function init ()
{
    PlayerImage.src = './assets/scratch-cat.svg'
    await waitLoad(PlayerImage)
    loadStage()
}

function main ()
{
    setInterval(() => {
        let width = ctx.width / mapSize.width
        let height = ctx.height / mapSize.height
        rect(0, 0, ctx.width, ctx.height, 'black')
        for (var y = 0; y < mapSize.width; ++y)
        {
            for (var x = 0; x < mapSize.height; ++x)
            {
                let id = map[y * mapSize.width + x]
                if (id === 0)
                {
                    rect(x * width, y * height, width, height, '#4caf50')
                    rectFrame(x * width, y * height, width, height, 'white')
                }
                else if (id === 1)
                {
                    rect(x * width, y * height, width, height, '#ffeb3b')
                    rectFrame(x * width, y * height, width, height, 'white')
                    drawText('G', x * width + 10, y * height + 40, '32pt', 'black', 'left')
                }
                else if (id === 2)
                {
                    rect(x * width, y * height, width, height, '#424242')
                    rectFrame(x * width, y * height, width, height, 'white')
                }
                else if (id === 3)
                {
                    rect(x * width, y * height, width, height, '#c62828')
                    rectFrame(x * width, y * height, width, height, 'white')
                }
                else if (id === 4)
                {
                    let iWidth = width / 3
                    let iHeight = height / 3
                    rect(x * width, y * height, width, height, '#4caf50')
                    rect(x * width + iWidth / 2, y * height + iHeight / 2, width - iWidth, height - iHeight, '#E91E63')
                }
                else if (id === 5)
                {
                    let iWidth = width / 2
                    let iHeight = height / 2
                    rect(x * width, y * height, width, height, '#4caf50')
                    rect(x * width + iWidth / 2, y * height + iHeight / 2, width - iWidth, height - iHeight, '#880e4f')
                    rectFrame(x * width, y * height, width, height, 'white')
                }
                else if (id === 6)
                {
                    rect(x * width, y * height, width, height, '#212121')
                    rectFrame(x * width, y * height, width, height, 'white')
                }
            }
        }

        map.forEach((tile, i) => {
            if (tile === 6)
            {
                let unPushedButtonExsits = false
                map.forEach(tile2 => {
                    if (tile2 === 4)
                    {
                        unPushedButtonExsits = true
                    }
                })
                if (unPushedButtonExsits === false)
                {
                    map[i] = 0
                }
            }
        })
        
        if (isCleard)
        {
            drawText(`ステージ${stage + 1}クリア！`, 300, 250, '48pt', 'black', 'center', true)
            drawText(`ステージ${stage + 1}クリア！`, 300, 250, '48pt', 'yellow', 'center')
            drawText(`使ったブロック「${getBlocksCount()}」個`, 300, 350, '32pt', 'white', 'center')
            drawText('「次へボタン」で次のステージへ。「リセットボタン」でリトライ。', 300, 400, '12pt', 'black', 'center')
        }
        
        drawPlayer(player.dx + width / 2, player.dy + height / 2, player.angle, player.size * (400 / 467), player.size)
    },1000 / 60)
}

window.ScratchBlocks = ScratchBlocks
window.ctx = ctx
window.player = player
window.blocksHighlight = []

window.onload = async () => {
    if (location.hash !== '')
    {
        let stageHash = Number(location.hash.match(/#(\d*)/)[1])
        if (stageHash >= 0 && stageHash < stages.length)
        {
            stage = stageHash
        }
    }
    await init()
    main()
}