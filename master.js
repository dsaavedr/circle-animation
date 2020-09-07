var r = 250,
    miniR = 8,
    delta = 0.025,
    angle = Math.PI,
    s = 1,
    val = 1,
    graphOffset = 20,
    cSin = "#fd2f24",
    cCos = "#fed800",
    c = "#ff6f01",
    n = 3;

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.translate(WIDTH / 2, HEIGHT / 2);

    ani();
}

function ani() {
    ctx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();

    var v = Vector.fromAngle(angle);
    v.setMag(r);

    ctx.save();
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var i = 0; i < n; i++) {
        var vec = Vector.fromAngle((Math.PI / n) * i);
        vec.setMag(r);
        ctx.moveTo(vec.x, vec.y);
        ctx.lineTo(-vec.x, -vec.y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.moveTo(v.x, 0);
    for (var i = 1; i <= n; i++) {
        ctx.save();
        ctx.lineWidth = 1;
        var ang = (Math.PI / n) * i;
        ctx.rotate(ang);
        ctx.lineTo(Math.cos(angle - ang) * r, 0);
        ctx.stroke();
        ctx.restore();
    }

    for (var i = 0; i < n; i++) {
        var ang = (Math.PI / n) * i;
        // var h = scale(ang % (Math.PI * 2), 0, Math.PI * 2, 0, 1);
        // var color = HSVtoRGB(h, s, val);
        ctx.save();
        ctx.rotate(ang);
        point(Math.cos(angle - ang) * r, 0, cCos, miniR);
        // point(Math.cos(angle - ang) * r, 0, color, miniR);
        ctx.restore();
    }

    // point(v.x, v.y, c, miniR * 1.2);

    angle += delta;

    requestAnimationFrame(ani);
}

init();
