var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade:{
            debug: false,
            gravity: {y: 5000,/*x:300*/},
        },
        
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var player;
var cursors;


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bg1', 'assets/fond/fond1.jpg');
    this.load.image('bg2', 'assets/fond/fond2.jpg');
    this.load.image('char', 'assets/char/char.png');
    this.load.image('rock','assets/decor/rock.png')
    this.load.image('sol','assets/decor/sol.jpg')
    this.load.image('p', 'assets/decor/plateforme.jpg')
    this.load.image('pv', 'assets/decor/plateformev.jpg')
    this.load.image('pi', 'assets/decor/pi.png')
    this.load.image('piv', 'assets/decor/piv.png')
    this.load.image('t', 'assets/decor/teleporteur.png')
}

function create ()
{
    //limite de la cam + le monde
    this.cameras.main.setBounds(0, 0, 81920, 768);
    this.physics.world.setBounds(0, 0, 81920, 768);
    //Groupe
    rock = this.physics.add.staticGroup();
    sol = this.physics.add.staticGroup();
    platforme = this.physics.add.staticGroup();
    platformev = this.physics.add.staticGroup();
    platformei = this.physics.add.staticGroup();
    platformeiv = this.physics.add.staticGroup();
    teleporteur = this.physics.add.staticGroup();
    gene = this.physics.add.staticGroup();


    //fond
    fond = this.add.image(0, 0, 'bg1').setOrigin(0);
    fond2 = this.add.image(1024, 0, 'bg2').setOrigin(0);
    
    //player
    cursors = this.input.keyboard.createCursorKeys();
    player = this.physics.add.image(0, 740, 'char');
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player, true, 0.05, 0.05);

    

    //Niveau 1
    sol.create(1024,790, 'sol' ).setScale(50).refreshBody()
    //sol.create(2048,767, 'sol' )
    //sol.create(3072,767, 'sol' )
    //sol.create(4096,767, 'sol' )
    rock.create(20, 727, 'rock').setOrigin(0).refreshBody();
    platforme.create(130,670,'p').setOrigin(0).refreshBody();
    platforme.create(300, 570, 'p').setOrigin(0).refreshBody();
    platformev.create(300,300, 'pv').setOrigin(0).refreshBody();
    platformev.create(750, 300, 'pv').setOrigin(0).refreshBody();
    platforme.create(600, 670, 'p').setOrigin(0).refreshBody();
    platforme.create(800, 570, 'p').setOrigin(0).refreshBody();
    /*teleporteur.create(1014, 767, 't');
    teleporteur.create(1014, 567, 't');*/
    gene.create(50,660,'t')

    //Niveau 2
   /* platformeiv.create(1034,700,'piv');
    platformeiv.create(1034, 600, 'piv');
    platformeiv.create(1034, 550, 'piv');
    platformei.create(1074, 510, 'pi')
    platformeiv.create(1124, 490, 'piv');
    platformei.create(1184, 450, 'pi')
    platformeiv.create(1184, 440, 'piv');*/

    //colision
    this.physics.add.collider(player, rock);
    this.physics.add.collider(player, sol);
    this.physics.add.collider(player, platforme);
    this.physics.add.collider(player, platformev);
    this.physics.add.collider(teleporteur, sol);
    this.physics.add.collider(player, platformei);
    this.physics.add.collider(player, platformeiv);
    
    //event
    this.physics.add.collider(player,teleporteur,tp1,null,this);
    this.physics.add.collider(player,gene,endless,null,this);


}

function update ()
{
    /*player.setVelocityX(350);
    if (cursors.left.isDown){
        player.setVelocityX(-8000);
    }
    else if (cursors.right.isDown){
        player.setVelocityX(8000);
    }*/

    /*if (cursors.up.isDown){
        player.setVelocityY(-6600);
    }
    else if (cursors.down.isDown){
        player.setVelocityY(500);
    }*/

    if (cursors.up.isDown  && player.body.touching.down) {
        player.setVelocityY(-1500);
    }
    if (cursors.down.isDown) {
        player.setVelocityY(500);
    }
    
}

function tp1(player,teleporteur){
    player.setPosition( player.x-720,player.y)
}

function endless(plateforme,gene){
    gene.disableBody(true,true);
    console.log('test !')
    var y = 1200;
    for (let index = 0; index < 150; index++) {
        var x = Phaser.Math.Between(500, 700)
        var x2 = Phaser.Math.Between(0, 767)
        var plateforme = platforme.create(y,x,'p');
        var plateforme = platforme.create(y+150,x2,'p');
        y += 250;
        
    }
}