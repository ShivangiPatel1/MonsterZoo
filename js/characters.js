// (c) Saeed Mirjalili

/*jshint esversion: 6 */

function drawHappyMonster(ctx, cornerX, cornerY, monsterWidth, monsterHeight, monsterColor) {
    "use strict";
    ctx.save();
    ctx.translate(cornerX, cornerY);

    let wUnit = Math.floor(monsterWidth / 16),
        hUnit = Math.floor(monsterHeight / 22);

    //legs
    drawLine(ctx, 5 * wUnit, 15 * hUnit, 3.5 * wUnit, 22 * hUnit, "#ffa500", 1 * wUnit);
    drawLine(ctx, 11 * wUnit, 15 * hUnit, 12.5 * wUnit, 22 * hUnit, "#ffa500", 1 * wUnit);

    //feet
    drawSemicircle(ctx, 2 * wUnit, 22 * hUnit, 2 * wUnit, "#ffa500", "#ffa500", 1, true);
    drawSemicircle(ctx, 14 * wUnit, 22 * hUnit, 2 * wUnit, "#ffa500", "#ffa500", 1, true);

    //body
    // drawCircle(ctx, 8 * wUnit, 8 * hUnit, 8 * wUnit, monsterColor, monsterColor, 1);
    drawEllipse(ctx, 8 * wUnit, 8 * hUnit, 8 * wUnit, 8 * hUnit, 0, monsterColor, monsterColor, 0);

    //eyes
    //drawCircle(ctx, 4 * wUnit, 6 * hUnit, 2 * wUnit, "white", "white", 1);
    drawEllipse(ctx, 4 * wUnit, 6 * hUnit, 2 * wUnit, 2 * hUnit, 0, "white", "white", 1);
    //drawCircle(ctx, 8 * wUnit, 6 * hUnit, 2 * wUnit, "white", "white", 1);
    drawEllipse(ctx, 8 * wUnit, 6 * hUnit, 2 * wUnit, 2 * hUnit, 0, "white", "white", 1);
    //drawCircle(ctx, 12 * wUnit, 6 * hUnit, 2 * wUnit, "white", "white", 1);
    drawEllipse(ctx, 12 * wUnit, 6 * hUnit, 2 * wUnit, 2 * hUnit, 0, "white", "white", 1);

    //pupils
    //drawCircle(ctx, 4 * wUnit, 6 * hUnit, wUnit / 2, "black", "Black", 1);
    drawEllipse(ctx, 4 * wUnit, 6 * hUnit, wUnit / 2, hUnit / 2, 0, "black", "Black", 1);
    //drawCircle(ctx, 8 * wUnit, 6 * hUnit, wUnit / 2, "black", "black", 1);
    drawEllipse(ctx, 8 * wUnit, 6 * hUnit, wUnit / 2, hUnit / 2, 0, "black", "black", 1);
    //drawCircle(ctx, 12 * wUnit, 6 * hUnit, wUnit / 2, "black", "black", 1);
    drawEllipse(ctx, 12 * wUnit, 6 * hUnit, wUnit / 2, hUnit / 2, 0, "black", "black", 1);

    //mouth
    //drawSemicircle(ctx, 8 * wUnit, 10 * hUnit, 4 * wUnit, "black", "black", 1);
    drawSemiellipse(ctx, 8 * wUnit, 10 * hUnit, 4 * wUnit, 4 * hUnit, 0, "black", "black", 1);

    //teeth
    drawTriangle(ctx, 6 * wUnit, 12 * hUnit, -2 * wUnit, -2 * hUnit, "white", "white", 1);
    drawTriangle(ctx, 8 * wUnit, 12 * hUnit, 2 * wUnit, 2 * hUnit, "White", "white", 1);
    drawTriangle(ctx, 10 * wUnit, 12 * hUnit, -2 * wUnit, -2 * hUnit, "white", "white", 1);
    ctx.restore();
}

function drawAngryMonster(ctx, cornerX, cornerY, monsterWidth, monsterHeight, monsterColor) {
    "use strict";
    ctx.save();
    ctx.translate(cornerX, cornerY);

    let wUnit = monsterWidth / 16,
        hUnit = monsterHeight / 22;

    //legs
    drawLine(ctx, 4.5 * wUnit, 11 * hUnit, 4.5 * wUnit, 17 * hUnit, "#700301", 1 * wUnit);
    drawLine(ctx, 11.5 * wUnit, 11 * hUnit, 11.5 * wUnit, 17 * hUnit, "#700301", 1 * wUnit);

    //feet
    drawSemicircle(ctx, 4.5 * wUnit, 18 * hUnit, 1.5 * wUnit, "#370005", "#370005", 1, true);
    drawSemicircle(ctx, 11.5 * wUnit, 18 * hUnit, 1.5 * wUnit, "#370005", "#370005", 1, true);

    //body
    drawDiamond(ctx, 8 * wUnit, 2 * hUnit, 16 * wUnit, 16 * wUnit, monsterColor, monsterColor, 1);

    //eye
    drawCircle(ctx, 8 * wUnit, 6 * hUnit, 2 * wUnit, "white", "white", 1);
    drawCircle(ctx, 8 * wUnit, 6 * hUnit, wUnit / 2, "black", "black", 1);

    //mouth
    drawRectangle(ctx, 5 * wUnit, 10 * hUnit, 6 * wUnit, 2 * hUnit, "black", "black", 1);

    //teeth
    drawRectangle(ctx, 6 * wUnit, 10 * hUnit, 1 * wUnit, 1 * hUnit, "white", "white", 1);
    drawRectangle(ctx, 9 * wUnit, 10 * hUnit, 1 * wUnit, 1 * hUnit, "white", "white", 1);
    drawRectangle(ctx, 7.5 * wUnit, 11 * hUnit, 1 * wUnit, 1 * hUnit, "white", "white", 1);
    ctx.restore();
}

