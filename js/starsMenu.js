const Stars = {
    canvas: null,
    context: null,
    circleArray: [],
    colorArray: ['#1a364c', '#1a344c', '#5d6268', '#192854', '#1f2e37', '#474848', '#cfd0ea', '#1f2c4c', '#b1b7d6', '#b1b2d6', '#4c4796'],
    menuArray: [
        {text: 'CodePen', color: '#d9594c', bgcolor: '#d9594c24', url: 'https://codepen.io/BartvanMaarschalkerweerd'},
        {text: 'GitHub', color: '#53a2be', bgcolor: '#53a2be80', url: 'https://github.com/bavmar'},
        {text: 'Projects', color: '#9a4cd9', bgcolor: '#9a4cd924', url: 'projects.html'},
        {text: 'Contact', color: '#419d78', bgcolor: '#419d7824', url: 'mailto:bart.vanmaarschalkerweerd@outlook.com'}
    ],

    // BACKGROUND
    mouseDistance: 75,
    starsAmount: 1200,
    radius: 1,
    maxRadius: 10,

    // MENU
    menuRadius: 50,
    menuMaxRadius: 100,

    //  MOUSE
    mouse: {
        x: undefined,
        y: undefined,
        down: false,
        move: false,
        clicked: false
    },

    //  INIT
    init: function () {
        this.canvas = document.getElementById('stars');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.display = 'block';
        this.context = this.canvas.getContext('2d');

        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('resize', this.resize);
        window.addEventListener('mouseup', this.mouseUp);
        window.addEventListener('mousedown', this.mouseDown);

        this.prepare();
        this.animate();
    },

    //  BACKGROUND CIRCLES
    Circle: function (x, y, dx, dy, radius, fill) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = this.radius;

        this.draw = function () {
            Stars.context.beginPath();
            Stars.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            Stars.context.fillStyle = fill;
            Stars.context.fill();
        };

        this.update = function () {
            if (this.x + this.radius > Stars.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
            if (this.y + this.radius > Stars.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;

            this.x += this.dx;
            this.y += this.dy;

            //  INTERACTIVITY
            if (Stars.mouse.x - this.x < Stars.mouseDistance && Stars.mouse.x - this.x > -Stars.mouseDistance && Stars.mouse.y - this.y < Stars.mouseDistance && Stars.mouse.y - this.y > -Stars.mouseDistance) {
            if (this.radius < Stars.maxRadius) this.radius += 1;
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.draw();
        };
    },

    //  MENU CIRCLES
    menuCircle: function (x, y, dx, dy, radius, fill, filltext, text, url) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = this.radius;

        this.draw = function () {
            Stars.context.beginPath();
            Stars.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            Stars.context.fillStyle = fill;
            Stars.context.fill();
            
            Stars.context.font = '24pt Tahoma';
            Stars.context.fillStyle = filltext;
            Stars.context.textAlign = 'center';
            Stars.context.fillText(text, this.x, this.y+10);
        };

        this.update = function () {
            if (this.x + this.radius > Stars.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
            if (this.y + this.radius > Stars.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;

            this.x += this.dx;
            this.y += this.dy;

            //  INTERACTIVITY
            if (Stars.mouse.x - this.x < Stars.mouseDistance && Stars.mouse.x - this.x > -Stars.mouseDistance && Stars.mouse.y - this.y < Stars.mouseDistance && Stars.mouse.y - this.y > -Stars.mouseDistance) {
            if (this.radius < Stars.menuMaxRadius) this.radius += 1, document.body.style.cursor = 'pointer';
            else if (Stars.mouse.clicked) window.open(url);
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
                document.body.style.cursor = '';
            }

            this.draw();
        };
        
    },

    //  PREPARE
    prepare: function () {
        this.circleArray = [];

        for (i = 0; i < this.starsAmount; i++) {
            const radius = Stars.radius;
            const x = Math.random() * (this.canvas.width - radius * 2) + radius;
            const y = Math.random() * (this.canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 1.5;
            const dy = (Math.random() - 1) * 1.5;
            const fill = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
            this.circleArray.push(new this.Circle(x, y, dx, dy, radius, fill));
        }
        for (i = 0; i < this.menuArray.length; i++) {
            const radius = Stars.menuRadius;
            const x = Math.random() * (this.canvas.width - radius * 2) + radius;
            const y = Math.random() * (this.canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 1;
            const dy = (Math.random() - 1) * 1;
            
            const item = this.menuArray[i];
            const fill = item.bgcolor;
            const text = item.text;
            const filltext = item.color;
            const url = item.url;
            
            this.circleArray.push(new this.menuCircle(x, y, dx, dy, radius, fill, filltext, text, url));
        }
    },

    //  ANIMATE
    animate: function () {
        requestAnimationFrame(Stars.animate);
        Stars.context.clearRect(0, 0, Stars.canvas.width, Stars.canvas.height);

        for (i = 0; i < Stars.circleArray.length; i++) {
            let circle = Stars.circleArray[i];
            circle.update();
        }
    },

    //  MOUSE MOVE
    mouseMove: function (event) {
        Stars.mouse.x = event.x;
        Stars.mouse.y = event.y;
    },
    // CLICKED 
    mouseUp: function (event) {
        Stars.mouse.clicked = event.buttons;
    },
    // CLICKED 
    mouseDown: function (event) {
        Stars.mouse.clicked = event.buttons;
    },

    //  RESIZE
    resize: function () {
        Stars.canvas.width = window.innerWidth;
        Stars.canvas.height = window.innerHeight;
    }
};

Stars.init();