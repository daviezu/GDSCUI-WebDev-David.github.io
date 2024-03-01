var categories = ["Sekolah", "Kerja", "Personal"];

const newButton = document.getElementById("new-button");
newButton.addEventListener("click", addNewRow);

// archive button
const toDoTable = document.getElementById("todo-table");
toDoTable.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("delete-button"))
    archiveTask(event.target);
});

// checkbox clicks
// toDoTable.addEventListener("change", function (event) {
//   if (event.target && event.target.type === "checkbox") {
//     const tasKRow = event.target.closest("tr");
//     if (taskRow) {
//       const taskCell = taskRow.querySelector(".task");
//       if (taskCell) {
//         if (event.target.checked) {
//           taskCell.classList.add("completed");
//         } else {
//           taskCell.classList.remove("completed");
//         }
//       }
//     }
//   }
// });

// checkbox clicks
toDoTable.addEventListener("change", function (event) {
  if (event.target && event.target.type === "checkbox") {
    if (event.target.checked) {
      event.target.parentNode.parentNode
        .querySelector(".task")
        .classList.add("completed");
    } else {
      event.target.parentNode.parentNode
        .querySelector(".task")
        .classList.remove("completed");
    }
  }
});

// delete button
const archiveTable = document.getElementById("archive-table");
archiveTable.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("delete-button"))
    deleteArchiveTask(event.target);
});

// add new category button
const addCategoryButton = document.getElementById("todo-table");
addCategoryButton.addEventListener("click", function (event) {
  if (
    event.target &&
    event.target.classList.contains("add-new-category-button")
  ) {
    console.log("Add new category button clicked", event);
    addCategory(event);
  }
});

// filter button
const filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click", filterTasks);

function addNewRow() {
  // validasi untuk memeriksa jika row sebelumnya  sudah diisi atau belum
  var table = document
    .getElementById("todo-table")
    .getElementsByTagName("tbody")[0];

  var inputs = table.querySelectorAll("input[type=text], select");
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      alert("Task tidak boleh kosong");
      return;
    }
  }

  var newRow = table.insertRow();
  const cells = [];
  for (let i = 0; i < 6; i++) {
    cells.push(newRow.insertCell(i));
  }
  const [
    taskCell,
    categoryCell,
    statusCell,
    completeStatusCell,
    deleteCell,
    addNewCategoryCell,
  ] = cells;

  // Create input elements
  var taskInput = document.createElement("input");
  taskInput.type = "text";
  taskCell.appendChild(taskInput);

  var statusInput = document.createElement("input");
  statusInput.type = "text";
  statusCell.appendChild(statusInput);

  // Create select element for categories
  var categorySelect = document.createElement("select");
  categorySelect.classList.add("category-select"); // tambahkan kelas untuk selection
  updateCategorySelect(categorySelect); // Update select dengan kategori yang ada
  categoryCell.appendChild(categorySelect);

  // Create checkbox for complete status
  var completeCheckbox = document.createElement("input");
  completeCheckbox.type = "checkbox";
  completeCheckbox.addEventListener("change", function () {
    if (this.checked) {
      // taskInput.style.textDecoration = "line-through";
      taskInput.classList.add("completed");
    } else {
      // taskInput.style.textDecoration = "none";
      taskInput.classList.remove("completed");
    }
  });
  completeStatusCell.appendChild(completeCheckbox);

  // Adding delete button
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
  deleteButton.classList.add("delete-button");
  deleteCell.appendChild(deleteButton);

  // Create a new category
  var addCategoryButton = document.createElement("button");
  addCategoryButton.textContent = "Tambah kategori baru";
  addCategoryButton.classList.add("add-new-category-button");
  addNewCategoryCell.appendChild(addCategoryButton);

  console.log("New row added");
}

function deleteArchiveTask(button) {
  var task = button.parentNode.parentNode;
  const confirmDelete = confirm("Apakah anda yakin ingin menghapus task ini?");
  if (confirmDelete) task.parentNode.removeChild(task);
  console.log("Task deleted");
}

function archiveTask(button) {
  var taskRow = button.parentNode.parentNode;
  const confirmDelete = confirm("Apakah anda yakin ingin menghapus task ini?");
  if (confirmDelete) {
    var clonedTask = taskRow.cloneNode(true);
    var archiveTable = document
      .getElementById("archive-table")
      .getElementsByTagName("tbody")[0];
    archiveTable.appendChild(clonedTask); // Append the cloned task to the archive table
    taskRow.parentNode.removeChild(taskRow); // Remove the task from the todo table
  }
}

function addCategory(event) {
  var newCategory = prompt("Enter the new category: ");
  if (newCategory) {
    // tambahkan kategori baru untuk global array
    categories.push(newCategory);
    // update element
    var selectElements = document.querySelectorAll("select.category-select");
    selectElements.forEach(function (selectElement) {
      updateCategorySelect(selectElement);
    });
  }
}

function updateCategorySelect(selectElement) {
  // clear existing option
  selectElement.innerHTML = "";

  // menambah opsi dari global array
  categories.forEach(function (category) {
    var option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    selectElement.appendChild(option);
  });
}

function filterTasks() {
  var filterInput = document.getElementById("filter-input").value.trim();
  // .toLowerCase();
  var todoRows = document
    .getElementById("todo-table")
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");

  for (let i = 0; i < todoRows.length; i++) {
    var taskRow = todoRows[i];

    var taskInput = taskRow.querySelector('input[type="text"]');
    var categoryCell = taskRow.getElementsByTagName("td")[1];
    var statusCell = taskRow.getElementsByTagName("td")[2];

    var taskText = taskInput ? taskInput.value.toLowerCase() : ""; // Check if task input field exists

    var categorySelect = categoryCell.querySelector(".category-select");
    var selectedOption = categorySelect.options[categorySelect.selectedIndex];
    var categoryText = selectedOption.value.toLowerCase().trim();
    var statusText = statusCell
      .querySelector('input[type="text"]')
      .value.toLowerCase();
    if (
      taskText.includes(filterInput) ||
      categoryText.includes(filterInput) ||
      statusText.includes(filterInput)
    ) {
      taskRow.style.display = "";
      console.log("1");
    } else {
      taskRow.style.display = "none";
      console.log("2");
    }
  }

  console.log("Filter task success!!");
}
