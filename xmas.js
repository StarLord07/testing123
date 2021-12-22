const cracker = document.getElementById("crackerWrapper");
const leftCracker = document.getElementById("leftCracker");
const rightCracker = document.getElementById("rightCracker");
const message = document.getElementById("message");
const jokeWrap = document.getElementById("jokeWrap");
const joke = document.getElementById("joke");
const punchline = document.getElementById("punchline");

let counter = 0
let jokes =[{Q: "What do you call a blind reindeer?" ,A: "No-eye deer."}, {Q: "Why are mummies such big fans of Christmas?" ,A: "Because they enjoy wrapping."}, {Q: "Why did Santa have to go to the hospital?" ,A: "Because of his poor elf."}, {Q: "What do you get when you cross a snowman with a vampire?" ,A: "Frostbite."}, {Q: "Why did no-one bid for Rudolph and Blitzen on eBay?" ,A: "Because they were two deer."}, {Q: "What do you call an old snowman?" ,A: "Water."}, {Q: "What do snowmen have for breakfast?" ,A: "Snowflakes!"}, {Q: "What is white and minty?" ,A: "A polo bear!"}, {Q: "Who is a Christmas tree’s favorite singer?" ,A: "Spruce Springsteen!"}, {Q: "Why don’t penguins fly?" ,A: "Because they’re not tall enough to be pilots!"}]
let num = Math.floor(Math.random() * jokes.length)

cracker.addEventListener('click', () => {
    if(counter < 13){
        counter++
    } else{
        leftCracker.style.animation = "left 1s forwards"
        rightCracker.style.animation = "right 1s forwards"
        message.style.animation = "title 1s forwards"
        jokeWrap.style.animation = "joke 2s forwards"
        cracker.style.transform = "scaleX(1)"
        jokeWrap.hidden = ""
    }
})

function Loop(){
    window.requestAnimationFrame(Loop);
    if(counter > 0 && counter < 13){
        cracker.style.transform = `scaleX(${1 + (counter / 100)})`
        counter -= 0.05
    }
}
Loop()

url = new URL(window.location.href);
if (url.searchParams.get('open')) {
    counter = 14;
    leftCracker.style.animation = "left 1s forwards"
    rightCracker.style.animation = "right 1s forwards"
    message.style.animation = "title 1s forwards"
    jokeWrap.style.animation = "joke 2s forwards"
    cracker.style.transform = "scaleX(1)"
    jokeWrap.hidden = ""
}

// Happy Xmas! by @neave

var Snowflake = (function() {

    var flakes;
    var flakesTotal = 250;
    var wind = 0;
    var mouseX;
    var mouseY;

    function Snowflake(size, x, y, vx, vy) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.hit = false;
        this.melt = false;
        this.div = document.createElement('div');
        this.div.classList.add('snowflake');
        this.div.style.width = this.size + 'px';
        this.div.style.height = this.size + 'px';
    }

    Snowflake.prototype.move = function() {
        if (this.hit) {
            if (Math.random() > 0.995) this.melt = true;
        } else {
            this.x += this.vx + Math.min(Math.max(wind, -10), 10);
            this.y += this.vy;
        }

        // Wrap the snowflake to within the bounds of the page
        if (this.x > window.innerWidth + this.size) {
            this.x -= window.innerWidth + this.size;
        }

        if (this.x < -this.size) {
            this.x += window.innerWidth + this.size;
        }

        if (this.y > window.innerHeight + this.size) {
            this.x = Math.random() * window.innerWidth;
            this.y -= window.innerHeight + this.size * 2;
            this.melt = false;
        }

        var dx = mouseX - this.x;
        var dy = mouseY - this.y;
        this.hit = !this.melt && this.y < mouseY && dx * dx + dy * dy < 2400;
    };

    Snowflake.prototype.draw = function() {
        this.div.style.transform =
            this.div.style.MozTransform =
                this.div.style.webkitTransform =
                    'translate3d(' + this.x + 'px' + ',' + this.y + 'px,0)';
    };

    function update() {
        for (var i = flakes.length; i--; ) {
            var flake = flakes[i];
            flake.move();
            flake.draw();
        }
        requestAnimationFrame(update);
    }

    Snowflake.init = function(container) {
        flakes = [];

        for (var i = flakesTotal; i--; ) {
            var size = (Math.random() + 0.2) * 12 + 1;
            var flake = new Snowflake(
                size,
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                Math.random() - 0.5,
                size * 0.3
            );
            container.appendChild(flake.div);
            flakes.push(flake);
        }

        container.onmousemove = function(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            wind = (mouseX - window.innerWidth / 2) / window.innerWidth * 6;
        };

        container.ontouchstart = function(event) {
            mouseX = event.targetTouches[0].clientX;
            mouseY = event.targetTouches[0].clientY;
            event.preventDefault();
        };

        window.ondeviceorientation = function(event) {
            if (event) {
                wind = event.gamma / 10;
            }
        };

        update();
    };

    return Snowflake;

}());

window.onload = function() {
    setTimeout(function() {
        Snowflake.init(document.getElementById('snow'));
    }, 500);
}