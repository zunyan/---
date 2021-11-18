import App from "./app"
import { STAGE_HEIGHT, STAGE_WIDTH } from "./constant"

const app = new App({
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
    backgroundColor: 0xffffff
})

document.body.appendChild(app.view)
app.view.style.borderRadius = "20px"
app.view.style.margin = "auto"
app.view.style.boxShadow = "0 0 30px rgba(0,0,0,.1)"
document.body.style.background = "#f5f5f5"
document.body.style.margin = "0px"
document.body.style.height = "100%"
document.body.style.display = "flex"
document.body.style.justifyContent = "center"
document.documentElement.style.height = "100%"

