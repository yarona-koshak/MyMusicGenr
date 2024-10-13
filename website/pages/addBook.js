import { send } from "../utilities";
let titleInput = document.getElementById("titleInput");
let authorInput = document.getElementById("authorInput");
let imageSourceInput = document.getElementById("imageSourceInput");
let descriptionTextarea = document.getElementById("descriptionTextarea");
let addButton = document.getElementById("addButton");
addButton.onclick = async function () {
    await send("addBook", [
        titleInput.value,
        authorInput.value,
        imageSourceInput.value,
        descriptionTextarea.value,
        localStorage.getItem("userId"),
    ]);
    location.href = "index.html";
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQm9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZEJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVwQyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBcUIsQ0FBQztBQUMzRSxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBcUIsQ0FBQztBQUM3RSxJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQXFCLENBQUM7QUFDdkYsSUFBSSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUF3QixDQUFDO0FBQ2hHLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFzQixDQUFDO0FBRTFFLFNBQVMsQ0FBQyxPQUFPLEdBQUcsS0FBSztJQUN2QixNQUFNLElBQUksQ0FDUixTQUFTLEVBQ1Q7UUFDRSxVQUFVLENBQUMsS0FBSztRQUNoQixXQUFXLENBQUMsS0FBSztRQUNqQixnQkFBZ0IsQ0FBQyxLQUFLO1FBQ3RCLG1CQUFtQixDQUFDLEtBQUs7UUFDekIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7S0FDL0IsQ0FDRixDQUFDO0lBRUYsUUFBUSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7QUFDL0IsQ0FBQyxDQUFBIn0=