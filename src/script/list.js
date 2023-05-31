function displayJsonData(url, colOrder) {
    function getHttpRequest(url, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function (event) {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    // 요청이 정상적으로 처리된 경우
                    console.log("success");
                    callback(request.responseText);
                } else {
                    // 에러가 발생한 경우
                }
            }
        }

        const method = "GET";
        request.open('get', url, true);
        request.send();
    }

    function createTable(obj, colOrder) {
        let table = document.createElement('table');
        table.classList.add("table");
        let i = 1;
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        obj.forEach(el => {
            let tr = document.createElement('tr');
            colOrder.forEach(col => {
                let td = document.createElement('td');
                if (col === 'image') {
                    td.appendChild(el[col]);
                } else if (col === 'image_src') {
                    td.textContent = i++;
                } else {
                    td.textContent = el[col];
                    if ((col === 'rental_status' || col === 'rent_status') && el[col] === '대출중') {
                        td.classList.add('rental-status-red'); // 대출중인 경우 클래스 추가
                    }
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        return table;
    }

    getHttpRequest(url, function (response) {
        var json = JSON.parse(response);

        for (var object in json) {
            let cover = document.createElement('img');
            cover.src = json[object].image_src;
            json[object].image = cover;
        }
        let table = createTable(json, colOrder);
        document.getElementById('list').appendChild(table);
    });
}
