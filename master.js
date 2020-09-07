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
    check1 = true,  // inner lines
    check2 = true,  // poly lines
    check3 = true,  // poly dots
    check4 = false,  // outer dot
    check5 = true,  // outer circle
    n = 3,
    vertices,
    speed,
    c1, c2, c3, c4, c5;

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    // WIDTH = window.innerWidth;
    // HEIGHT = window.innerHeight;
    WIDTH = r * 2 + 50;
    HEIGHT = r * 2 + 50;

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.translate(WIDTH / 2, HEIGHT / 2);

    addChecks();

    ani();
}

function ani() {
    ctx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);

    if (check5) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.closePath();
    }

    var v = Vector.fromAngle(angle);
    v.setMag(r);

    if (check1) {
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
    }

    if (check2) {
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
    }

    if (check3) {
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
    }

    if (check4) {
        point(v.x, v.y, c, miniR * 1.2);
    }

    angle += delta;

    requestAnimationFrame(ani);
}

function addChecks() {
    c1 = document.getElementById("check1");
    c2 = document.getElementById("check2");
    c3 = document.getElementById("check3");
    c4 = document.getElementById("check4");
    c5 = document.getElementById("check5");
    vertices = document.getElementById("vertices");
    speed = document.getElementById("speed");

    for (var i = 1; i < 6; i++) {
        if (eval("check" + i)) {
            c1.checked = true;
        }
    }

    vertices.value = n;
    speed.value = delta * 1000;

    c1.addEventListener('change', function () {
        check1 = !check1;
    });
    c2.addEventListener('change', function () {
        check2 = !check2;
    });
    c3.addEventListener('change', function () {
        check3 = !check3;
    });
    c4.addEventListener('change', function () {
        check4 = !check4;
    });
    c5.addEventListener('change', function () {
        check5 = !check5;
    });
    vertices.addEventListener('change', function () {
        n = this.value;
    });
    speed.addEventListener('change', function () {
        delta = this.value / 1000;
    });
}

function openNav() {
    document.getElementById("inputs").style.width = "250px";
    document.getElementById("inputs").style.paddingLeft = "25px";
}

function closeNav() {
    document.getElementById("inputs").style.width = "0";
    document.getElementById("inputs").style.paddingLeft = "0";
}

init();