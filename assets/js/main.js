var largura = window.innerWidth
var altura = window.innerHeight
var game=''

var comidas = {
    cenoura: 92,
    pao: 88,
    limao: 87,
    banana: 86,
    rabanete: 85,
    cogumelo: 81,
    laranja: 78,
    figo: 77,
    pera: 76
};

function random(array) { return array[Math.floor(Math.random() * array.length)] }

const preload = function () {
    // Carrega os recursos de imagens para o jogo
    this.load.atlas('hamtaro_atlas', 'assets/sprites/hamtaro/hamham.png', 'assets/sprites/maps/hamtaro.json')
    this.load.atlas('comida_atlas', 'assets/sprites/assest/food.png', 'assets/sprites/maps/food.json')
}

// Funcao para retornar um valor randomico 
function randomNumber(start, end) { return Phaser.Math.Between(start, end) }

function create() {
    // Adiciona um texto para informar o score a jogadora
    pontuacao = this.add.text(10, 10, 'SCORE: 0', {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    })

    this.score = 0;  

    // Cria um hamtaro que sera controlado pela participante
    hamtaro = this.physics.add.sprite(150, 150, 'hamtaro_atlas') 
    
    // Informa que o hamtaro colide com as bordas do jogo 
    hamtaro.body.collideWorldBounds = true;  
    hamtaro.body.bounce.set(1);

    // Cria um sprite de comida
    comida = this.physics.add.sprite(10, 60, 'comida_atlas', 'sprite92')

    // Informa que o hamtaro e a comida são passíveis de colisao
    this.physics.add.collider(hamtaro, comida)

    // Captura todas as teclas do teclado
    cursors = this.input.keyboard.createCursorKeys()

    const criaAnimacoes = (key, start, end) => {
        this.anims.create({
            key: key,
            frames: this.anims.generateFrameNames('hamtaro_atlas', {
                prefix: 'hamtaro_',
                start: start,
                end: end
            }),
            repeat: -1,
            duration: 300
        });
    }

    // Cria as animacoes
    criaAnimacoes('direita', 1, 3)
    criaAnimacoes('esquerda', 4, 6)
    criaAnimacoes('cima', 7, 8)
    criaAnimacoes('baixo', 9, 10)
    criaAnimacoes('parado', 11, 12)

    // Cria o evento que acontecera quando o hamtaro colidir com uma comida
    this.physics.add.overlap(hamtaro, comida, function () {

        // Escolhe randomicamente a nova posicao da comida
        comida.x = randomNumber(100, largura - 100)
        comida.y = randomNumber(100, altura - 100)
        comida.setTexture('comida_atlas', `sprite${random(comidas)}`)

        // Adiciona pontuacao ao score
        this.score +=3
        // Adiciona a informacao ao texto da tela
        pontuacao.setText(`SCORE: ${this.score}`)
    }, null, this);
}


// funcao para atualizar o jogo
function update() {
    // Controle pelas setas esquerda direita cima e baixo do teclado
    if (cursors.left.isDown) {
        hamtaro.x +=-5;
        hamtaro.anims.play('esquerda', true)
    } else if (cursors.right.isDown) {
        hamtaro.x +=5;
        hamtaro.anims.play('direita', true)
    } else if (cursors.up.isDown) {
        hamtaro.y +=-5;        
        hamtaro.anims.play('cima', true)
    } else if (cursors.down.isDown) {
        hamtaro.y +=5;
        hamtaro.anims.play('baixo', true)
    } else {
        hamtaro.anims.play('parado', true)
    }
}

function principal() {
    // cria uma variavel com as configurações do jogo
    var conf = {
        type: Phaser.AUTO,
        width: largura,
        height: altura,
        pixelArt: true,
        backgroundColor: '#E6E6FA',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    }
    game = new Phaser.Game(conf)    
}
// Funcao para o evento OnLoad da janela
window.onload = principal