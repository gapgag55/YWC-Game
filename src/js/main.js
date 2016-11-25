(function($) {

  $(document).ready(function () {
    function game() {
      this.life = 100
      this.lifeMinus = 4
      this.lifeUp = 5
      this.letterLen = 0
      this.endGame = 16
      this.size = 10
      this.body = $('body')
      this.width = $(window).width()
      this.height = $(window).height()
      this.section = $('.section')

      this.init = function() {
        var starBtn = $('.start .btn')
        var NewBtn = $('.end .btn')

        starBtn.on('click', (function() {
          $(this.section[1]).addClass('active')
          $(this.section[0]).removeClass('active')

          this.moveCharacter()
          this.randomLetter()
          this.collide()
        }).bind(this))

        NewBtn.on('click', (function() {
          this.newGame()
        }).bind(this))

        this.effectFooter()


        // device detection
				if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
				    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
					$('.control-phone').addClass('active')
				}
      }

      this.moveCharacter = function() {
        var background = $('.game')
        var joyStick   = $('.game .joy .outside .inner')
        var character = background.find('.character')
        var halfWidth = Math.floor(this.width / 2)
        var halfHeight = Math.floor(this.height / 2)
        var posX = 0
        var posY = 0
        // var rotate = 0
        var speed = 20
        var keyCode = {
          65: false,
          87: false,
          68: false,
          83: false
        }

        this.body.on('keydown', (function(event) {
          keyCode[event.keyCode] = true

          if (keyCode[65] && keyCode[87] || keyCode[37] && keyCode[38]) {
            // left Top
            if(!(posX - speed >= halfWidth || posX - speed <= -halfWidth) && !(posY - speed >= halfHeight || posY - speed <= -halfHeight)) {
              posX -= speed
              posY -= speed
            }
            // rotate = -45

          } else if (keyCode[87] && keyCode[68] || keyCode[39] && keyCode[38]) {
            // Right Top      
            if(!(posX + speed >= halfWidth || posX + speed <= -halfWidth) && !(posY - speed >= halfHeight || posY - speed <= -halfHeight)) {
              posX += speed
              posY -= speed
            }
            // rotate = 45

          } else if (keyCode[65] && keyCode[83] || keyCode[37] && keyCode[40]) {
            // Left Bottom 
           if(!(posX - speed >= halfWidth || posX - speed <= -halfWidth) && !(posY + speed >= halfHeight || posY + speed <= -halfHeight)) {
              posX -= speed
              posY += speed
            }
            // rotate = 225

          } else if (keyCode[68] && keyCode[83] || keyCode[39] && keyCode[40]) {
            // Right Bottom 
            if(!(posX + speed >= halfWidth || posX + speed <= -halfWidth) && !(posY + speed >= halfHeight || posY + speed <= -halfHeight)) {
              posX += speed
              posY += speed
            }
            // rotate = 135

          } else if (keyCode[65] || keyCode[37]) {
            // Left
            if(!(posX - speed <= -halfWidth)) {
              posX -= speed
            }
            // rotate = -90
          } else if (keyCode[87] || keyCode[38]) {
            // Top
            if(!(posY - speed <= -halfHeight)) {
              posY -= speed
            }
            // rotate = 0
          } else if (keyCode[68] || keyCode[39]) {
            // Right
            if(!(posX + speed >= halfWidth)) {
              posX += speed
            }
            // rotate = 90
          } else if (keyCode[83] || keyCode[40]) {
            // bottom
            if(!(posY + speed >= halfHeight)) {
              posY += speed
            }
            // rotate = 180
          }
         
          character.css({
            'transform': 'translate(' + posX + 'px, ' + posY + 'px)'
          })

        }).bind(this))

        this.body.on('keyup', function(event) {
          keyCode[event.keyCode] = false
        })


        // Mobile Event 
        var left = $('.control-phone .left')
        var right = $('.control-phone .right')
        var top = $('.control-phone .top')
        var bottom = $('.control-phone .bottom')

        left.on('mousedown', function() {
          if(!(posX - speed <= -halfWidth)) {
            posX -= speed
          }

          character.css({
            'transform': 'translate(' + posX + 'px, ' + posY + 'px)'
          })
        })

        right.on('mousedown', function() {
          if(!(posX + speed >= halfWidth)) {
            posX += speed
          }

          character.css({
            'transform': 'translate(' + posX + 'px, ' + posY + 'px)'
          })
        })

        top.on('mousedown', function() {
          if(!(posY - speed <= -halfHeight)) {
            posY -= speed
          }

          character.css({
            'transform': 'translate(' + posX + 'px, ' + posY + 'px)'
          })
        })

        bottom.on('mousedown', function() {
          if(!(posY + speed >= halfHeight)) {
            posY += speed
          }

          character.css({
            'transform': 'translate(' + posX + 'px, ' + posY + 'px)'
          })
        })
      }
      this.randomLetter = function() {
        var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        var letterBox = $('.game').find('.letter')
        var time = 1000
        var pos = {x: 0, y: 0}
        var to = {x: 0, y: 0}
        var text, i, element, color, rotate
        var halfWidth = this.width / 2
        var halfHeight = this.height / 2

        setInterval((function () {
          text = letter[Math.floor(Math.random() * 25)]
          rotate = Math.random() * 360
          if(text == 'y' || text == 'd' || text == 'l' || text == 't') {
            color = '241,196,15'
          } else if(text == 'w' || text == 'a' || text == 'f' || text == 'g') {
            color = '46,204,113'
          } else if(text == 'c' || text == 'o' || text == 'i' || text == 'r') {
            color = '52,152,219'
          } else {
            color = '189, 195, 199'
          }
          
          pos = this.generatePos()
          
          element = $('<span style="top: '+ pos.y +'px; left:'+ pos.x +'px; color: rgb('+ color +'); transform: rotate('+ rotate +'deg);">'+ text +'</span>')
          letterBox.append(element)

          if(pos.x <= halfWidth) {
            to.x = Math.abs(pos.x) + this.width
          } else {
            to.x = pos.x - this.width
          }

          if(pos.y <= halfHeight) {
            to.y = this.height - pos.y
          } else {
            to.y = pos.y - this.height
          }

          element.animate({
            top: to.y,
            left: to.x
          }, {
            easing: "linear",
            duration: 20000
          })

        }).bind(this), 300)

        setInterval(function () {
          for(var i = 0; i < 10; i++) {
          	$(letterBox.find('span')[i]).remove()
          }
        }, 20000)
      }
      this.collide = function() {
        var letterBox, character
        var posX, posY, widthC, heightC
        var enemyX, enemyY, widthE, heightE
        var size = this.size
        
        var animate = function() {
          letterBox = $('.game').find('.letter').children('span')
          character = $('.game').find('.character')

          posX = character.position().left - 20
          posY = character.position().top - 20
          widthC = (posX + 20) + size
          heightC = (posY + 16) + size

          for(var i = 0; i < letterBox.length; i++) {
            enemyX = Math.floor($(letterBox[i]).css('left').split('px')[0])
            enemyY = Math.floor($(letterBox[i]).css('top').split('px')[0])
            widthE = (enemyX + 4)
            heightE = (enemyY + 8.5)

            if(posX <= enemyX && posY <= enemyY && heightE <= heightC && widthE <= widthC) {
              this.updateGlobal(letterBox[i].innerText)
              letterBox[i].remove()
            }
          }
          requestAnimationFrame(animate.bind(this))
        }

        requestAnimationFrame(animate.bind(this))
      }
      this.effectFooter = function() {
        var span = $('footer span')
        setInterval(function() {
          span.toggleClass('hide')
        }, 700)
      }
      // HElPERS
      this.updateGlobal = function(text) {
        var span = $('header').find('.top').children('span')
        var life = $('header').find('.bottom')
        var subLetter = ['Y','W', 'C', 'D', 'I', 'G', 'I', 'T', 'A', 'L', 'F', 'O', 'R', 'A', 'L', 'L']
        var class2, class1
        var check = 0

        for(var i = 0; i < subLetter.length; i++) {
          if(text == subLetter[i]) {

            // repeat letter So, add more life
            this.life += this.lifeUp
            if(this.life > 100) {
              this.life = 100
            } else {
              this.life += this.lifeUp
            }
            life[0].innerHTML = 'Life: ' + this.life + '%'  

            // Add Class active to span
            if(!$(span[i]).hasClass('active')) {
              $(span[i]).addClass('active')
              ++this.letterLen
              check = 1 
              break
            }
          }
        }

        if(check == 0) {
          this.life -= this.lifeMinus
          if(this.life <= 0) { 
            this.life = 0

            // Game Over
            $(this.section[2]).addClass('active')
            $(this.section[1]).removeClass('active')

            class1 = $(this.section[2]).find('.text')[0]
            class2 = $(this.section[2]).find('.text')[1]
            $(class1).removeClass('active')
            $(class2).addClass('active')

          }
          life[0].innerHTML = 'Life: ' + this.life + '%'
        }

        if(this.letterLen == this.endGame) {
          $(this.section[2]).addClass('active')
          $(this.section[1]).removeClass('active')
        }
      }
      this.generatePos = function () {
        var obj = {x: 0, y: 0}

        obj.x = Math.floor(Math.random() * (this.width + 100) - 50)
        if(obj.x < 0 || obj.y > this.width) {
          obj.y = Math.floor(Math.random() * this.height)
        } else {
          if(Math.floor(Math.random() * 2) == 1) {
            obj.y = Math.floor(Math.random() * -50)
          } else {
            obj.y = this.height + Math.floor(Math.random() * 50)
          }
        }
        
        return obj
      }
      this.newGame = function () {
        var span = $('header span')
        var life = $('header').find('.bottom')
        var letter = $('.game .letter span')
        var character = $('.game .character')   

        this.moveCharacter()
        this.randomLetter()
        this.collide()

        // Life Reset
        this.life = 100 
        life[0].innerHTML = 'Life: ' + this.life + '%'

        // Letter Reset
        for(var i = 0; i < letter.length; i++) {
          $(letter[i]).remove()
        }

        // Default Text
        for(var i = 0; i < span.length; i++) {
          $(span[i]).removeClass('active')
        }
        this.letterLen = 0

        // Postion Character
        character.css({transform: 'translate(0px, 0px)'})

        $(this.section[1]).addClass('active')
        $(this.section[2]).removeClass('active')

      }
    }

    new game().init()
  })

})(jQuery)