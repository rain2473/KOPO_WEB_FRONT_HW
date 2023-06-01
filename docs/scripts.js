function getHttpRequest(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function (event) {
        if (request.readyState == 4) {
            if (request.status == 200) {
                console.log("success");
                callback(request.responseText);
            } else {
            }
        }
    }

    const method = "GET";
    request.open('get', url, true);
    request.send();
}

function mainFunction(response) {
    var jsonData = JSON.parse(response);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(jsonData.length / itemsPerPage);
    let currentPage = 1;

    const tableBody = document.querySelector('#forumTable tbody');
    const pagination = document.getElementById('pagination');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');

    function displayData(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = jsonData.slice(startIndex, endIndex);

        tableBody.innerHTML = '';

        currentData.forEach((item, index) => {
            const row = document.createElement('tr');
            const checkboxCell = document.createElement('td');
            const idCell = document.createElement('td');
            const titleCell = document.createElement('td');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            checkbox.addEventListener('change', function (event) {
                if (event.target.checked) {
                    row.classList.add('checked');
                    row.setAttribute('draggable', true);
                } else {
                    row.classList.remove('checked');
                    row.setAttribute('draggable', false);
                }
            });

            checkboxCell.appendChild(checkbox);
            idCell.textContent = item.id;
            titleCell.textContent = item.title;

            if ((index + 1) % 2 === 0) {
                row.classList.add('even');
            } else {
                row.classList.add('odd');
            }

            checkboxCell.classList.add('checkbox');
            idCell.classList.add('id');
            titleCell.classList.add('title');

            row.appendChild(checkboxCell);
            row.appendChild(idCell);
            row.appendChild(titleCell);

            tableBody.appendChild(row);
        });

        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = createPageButton(i);
            pagination.appendChild(pageButton);
        }
    }

    function createPageButton(page) {
        const button = document.createElement('button');
        button.textContent = page;
        button.addEventListener('click', function () {
            currentPage = page;
            displayData(currentPage);
            clearCheckboxes();
        });
        return button;
    }

    function clearCheckboxes() {
        const checkboxes = tableBody.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            const row = checkbox.parentNode.parentNode;
            row.classList.remove('checked');
            row.setAttribute('draggable', false);
        });
        selectAllCheckbox.checked = false;
    }

    function handleSelectAll(event) {
        const checkboxes = tableBody.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = event.target.checked;
            const row = checkbox.parentNode.parentNode;
            if (checkbox.checked) {
                row.classList.add('checked');
                row.setAttribute('draggable', true);
            } else {
                row.classList.remove('checked');
                row.setAttribute('draggable', false);
            }
        });
    }

    selectAllCheckbox.addEventListener('change', handleSelectAll);

    displayData(currentPage);
}

function dragStart(e) {
    draggedElement = e.target;
    prevIndex = Array.from(draggedElement.parentNode.children)
        .indexOf(draggedElement);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", draggedElement.innerHTML);
    draggedElement.classList.add("dragging");
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const targetElement = event.target.closest("tr");
    if (targetElement && targetElement !== draggedElement) {
        const currentIndex = Array.from(targetElement.parentNode.children).indexOf(targetElement);
        if (currentIndex > prevIndex) {
            targetElement.parentNode.insertBefore(draggedElement, targetElement.nextSibling);
        } else {
            targetElement.parentNode.insertBefore(draggedElement, targetElement);
        }
        prevIndex = currentIndex;
    }
}

function dragEnd(event) {
    draggedElement.classList.remove("dragging");
    draggedElement = null;
    prevIndex = null;
}