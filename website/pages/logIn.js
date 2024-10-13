import { send } from "../utilities";
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let submitButton = document.getElementById("submitButton");
let messageDiv = document.getElementById("messageDiv");
submitButton.onclick = async function () {
    let id = await send("logIn", [usernameInput.value, passwordInput.value,]);
    if (id == null) {
        usernameInput.value = "";
        passwordInput.value = "";
        messageDiv.innerText = "Username or Password were incorrent";
    }
    else {
        localStorage.setItem("userId", id);
        location.href = "index.html";
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nSW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dJbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXBDLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFxQixDQUFDO0FBQ2pGLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFxQixDQUFDO0FBQ2pGLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFzQixDQUFDO0FBQ2hGLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFtQixDQUFDO0FBRXpFLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSztJQUMxQixJQUFJLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBRSxhQUFhLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBa0IsQ0FBQztJQUU1RixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7UUFDZCxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN6QixhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsU0FBUyxHQUFHLHFDQUFxQyxDQUFDO0tBQzlEO1NBQ0k7UUFDSCxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztLQUM5QjtBQUNILENBQUMsQ0FBQSJ9