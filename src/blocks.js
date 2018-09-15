import ScratchBlocks from 'scratch-blocks'

let loopId = 0

ScratchBlocks.Block.prototype.hasChild = function () {
    return this.childBlocks_.length > 0
}

Array.prototype.nestedText = function (nest = 0) {
    let text = ''

    this.forEach(value => {
        if (value instanceof Array)
        {
            text += value.nestedText(nest + 1)
        }
        else
        {
            text += '  '.repeat(nest) + value + '\n'
        }
    })

    return text
}

function addHighlight (path) {
    blocksHighlight.push({
        show () {
            path.setAttribute('stroke', 'yellow')
        },
        hide () {
            path.setAttribute('stroke', '#1a78c2')
        }
    })
    return blocksHighlight.length - 1
}

ScratchBlocks.Blocks.ci_move_forward = {
    init () {
        this.appendDummyInput().appendField('前に進む')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('#2196F3')

        this.toJavaScript = function (code) {
            code.push(`await player.moveForward({highlight: ${addHighlight(this.svgGroup_.children[0])}})`)
            

            if (this.hasChild())
            {
                this.childBlocks_[0].toJavaScript(code)
            }
        }
    }
}

ScratchBlocks.Blocks.ci_turn_left = {
    init () {
        this.appendDummyInput().appendField('左に曲がる')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('#2196F3')

        this.toJavaScript = function (code) {
            code.push(`await player.turnLeft({highlight: ${addHighlight(this.svgGroup_.children[0])}})`)

            if (this.hasChild())
            {
                this.childBlocks_[0].toJavaScript(code)
            }
        }
    }
}

ScratchBlocks.Blocks.ci_turn_right = {
    init () {
        this.appendDummyInput().appendField('右に曲がる')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('#2196F3')

        this.toJavaScript = function (code) {
            code.push(`await player.turnRight({highlight: ${addHighlight(this.svgGroup_.children[0])}})`)

            if (this.hasChild())
            {
                this.childBlocks_[0].toJavaScript(code)
            }
        }
    }
}


ScratchBlocks.Blocks.ci_exe = {
    init () {
        this.appendDummyInput().appendField('実行する')
        this.appendStatementInput('statement').setCheck(null)
        this.setColour('#009688')

        this.isRoot = true
        this.movable_ = false

        this.toJavaScript = function () {
            let code = []
            if (this.hasChild())
            {
                this.childBlocks_[0].toJavaScript(code)
            }

            return code.nestedText()
        }
    }
}

ScratchBlocks.Blocks.ci_control_repeat = {
    init () {
        this.appendValueInput('count').setCheck('Number')
        this.appendDummyInput().appendField('回繰り返す')
        this.appendStatementInput('statement').setCheck(null)
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('#2196F3')

        this.toJavaScript = function (code) {
            let statementCode = []

            if (this.childBlocks_[1] && this.svgGroup_.children[4] === this.childBlocks_[1].svgGroup_)
            {
                this.childBlocks_[1].toJavaScript(statementCode)
            }

            
            let id = loopId
            let name = `loop${id}`
            let count = Number(this.svgGroup_.children[1].children[1].children[0].innerHTML)

            code.push(`for (let ${name} = 0; ${name} < ${count}; ${name}++)`)
            code.push('{')
            code.push(statementCode)
            code.push('}')
            if (this.childBlocks_[2])
            {
                this.childBlocks_[2].toJavaScript(code)
            }

            loopId++
        }
    }
}

ScratchBlocks.Blocks.ci_replace_lava = {
    init () {
        this.appendDummyInput().appendField('もし前方に溶岩があれば埋める')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('#2196F3')

        this.toJavaScript = function (code) {
            code.push(`await player.replaceLava({highlight: ${addHighlight(this.svgGroup_.children[0])}})`)

            if (this.hasChild())
            {
                this.childBlocks_[0].toJavaScript(code)
            }
        }
    }
}

ScratchBlocks.Blocks.ci_push_button = {
    init () {
        this.appendDummyInput().appendField('ボタンを押す')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour('#2196F3')

        this.toJavaScript = function (code) {
            code.push(`await player.pushButton({highlight: ${addHighlight(this.svgGroup_.children[0])}})`)

            if (this.hasChild())
            {
                this.childBlocks_[0].toJavaScript(code)
            }
        }
    }
}