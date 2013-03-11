define(["box2d-html5", "requestAnimationFrame", "app"], function(box2d, requestAnimationFrame, app) {
    var width = 960, height = 540, scale = 20,
        velocityIter = 8, positionIter = 3,
        canvas = null, physics = null, lastUpdate = 0

    function render() {
        requestAnimationFrame(render)

        var now = Date.now(), upd = 0.01 * (now - lastUpdate)
        lastUpdate = now

        physics.Step(upd, velocityIter, positionIter)

        canvas.clearRect(0, 0, width, height)

        app.render(canvas, upd)
    }

    function main() {
        canvas = document.getElementsByTagName("canvas")[0].getContext("2d")
        physics = new box2d.b2World(new box2d.b2Vec2(0, 0.25))

        physics._width = width / scale
        physics._height = height / scale

        app.start(canvas, physics)

        lastUpdate = Date.now()

        canvas.lineWidth = 0.1
        canvas.scale(scale, scale)

        requestAnimationFrame(render)
    }

    return main
})
