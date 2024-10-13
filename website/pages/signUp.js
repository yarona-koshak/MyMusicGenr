import { send } from "../utilities";
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let submitButton = document.getElementById("submitButton");
let messageDiv = document.getElementById("messageDiv");
submitButton.onclick = async function () {
    let userId = await send("signUp", [usernameInput.value, passwordInput.value]);
    if (userId != null) {
        localStorage.setItem("userId", userId);
        location.href = "index.html";
    }
    else {
        messageDiv.innerText = "Username is already taken";
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnblVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lnblVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFcEMsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQXFCLENBQUM7QUFDakYsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQXFCLENBQUM7QUFDakYsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7QUFDaEYsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQW1CLENBQUM7QUFFekUsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLO0lBQzFCLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFrQixDQUFDO0lBRS9GLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtRQUNsQixZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztLQUM5QjtTQUNJO1FBQ0gsVUFBVSxDQUFDLFNBQVMsR0FBRywyQkFBMkIsQ0FBQztLQUNwRDtBQUNILENBQUMsQ0FBQSJ9